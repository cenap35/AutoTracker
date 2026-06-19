using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.ServiceAccountTransactions;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceAccountTransactionsController : ControllerBase
{
  private readonly AppDbContext _context;

  public ServiceAccountTransactionsController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<IActionResult> GetTransactions()
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound();

    var transactions = await _context.ServiceAccountTransactions
        .Where(x => x.ServiceBusinessId == serviceBusiness.Id)
        .Include(x => x.ServiceCustomer)
        .Include(x => x.CustomerVehicle)
        .OrderByDescending(x => x.TransactionDate)
        .Select(x => new
        {
          x.Id,
          x.Type,
          x.Amount,
          x.PaidAmount,
          RemainingAmount = x.Amount - x.PaidAmount,
          x.IsPaid,
          x.Description,
          x.TransactionDate,
          x.DueDate,

          CustomerName = x.ServiceCustomer.FullName,

          Vehicle =
                x.CustomerVehicle != null
                ? x.CustomerVehicle.Brand + " " + x.CustomerVehicle.Model
                : null
        })
        .ToListAsync();

    return Ok(transactions);
  }

  [HttpPost]
  public async Task<IActionResult> CreateTransaction(
      CreateServiceAccountTransactionDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound();

    var transaction = new ServiceAccountTransaction
    {
      ServiceBusinessId = serviceBusiness.Id,
      ServiceCustomerId = dto.ServiceCustomerId,
      CustomerVehicleId = dto.CustomerVehicleId,
      ServiceWorkOrderId = dto.ServiceWorkOrderId,

      Type = dto.Type,
      Amount = dto.Amount,
      PaidAmount = dto.PaidAmount,

      Description = dto.Description,

      TransactionDate = dto.TransactionDate,
      DueDate = dto.DueDate,

      IsPaid = dto.Amount <= dto.PaidAmount
    };

    _context.ServiceAccountTransactions.Add(transaction);

    await _context.SaveChangesAsync();

    return Ok(transaction);
  }

  [HttpPost("{id:int}/mark-paid")]
  public async Task<IActionResult> MarkPaid(int id)
  {
    var transaction = await _context.ServiceAccountTransactions
        .FirstOrDefaultAsync(x => x.Id == id);

    if (transaction == null)
      return NotFound();

    transaction.PaidAmount = transaction.Amount;
    transaction.IsPaid = true;

    await _context.SaveChangesAsync();

    return Ok(new
    {
      transaction.Id,
      transaction.IsPaid
    });
  }

  [HttpPut("{id:int}")]
  public async Task<IActionResult> UpdateTransaction(
  int id,
  UpdateServiceAccountTransactionDto dto)
  {
    var transaction = await _context.ServiceAccountTransactions
        .FirstOrDefaultAsync(x => x.Id == id);

    if (transaction == null)
      return NotFound();

    transaction.ServiceCustomerId = dto.ServiceCustomerId;
    transaction.CustomerVehicleId = dto.CustomerVehicleId;
    transaction.ServiceWorkOrderId = dto.ServiceWorkOrderId;
    transaction.Type = dto.Type;
    transaction.Amount = dto.Amount;
    transaction.PaidAmount = dto.PaidAmount;
    transaction.Description = dto.Description;
    transaction.IsPaid = dto.IsPaid || dto.PaidAmount >= dto.Amount;
    transaction.TransactionDate = dto.TransactionDate;
    transaction.DueDate = dto.DueDate;

    await _context.SaveChangesAsync();

    return Ok(transaction);
  }

  [HttpDelete("{id:int}")]
  public async Task<IActionResult> DeleteTransaction(int id)
  {
    var transaction = await _context.ServiceAccountTransactions
        .FirstOrDefaultAsync(x => x.Id == id);

    if (transaction == null)
      return NotFound();

    _context.ServiceAccountTransactions.Remove(transaction);
    await _context.SaveChangesAsync();

    return NoContent();
  }

  [HttpGet("stats")]
  public async Task<IActionResult> GetStats()
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound();

    var transactions = await _context.ServiceAccountTransactions
        .Where(x => x.ServiceBusinessId == serviceBusiness.Id)
        .ToListAsync();

    var totalReceivable = transactions
        .Where(x => x.Type == "Receivable")
        .Sum(x => x.Amount - x.PaidAmount);

    var totalPayable = transactions
        .Where(x => x.Type == "Payable")
        .Sum(x => x.Amount - x.PaidAmount);

    var totalCollected = transactions
        .Where(x => x.Type == "Receivable")
        .Sum(x => x.PaidAmount);

    var waitingCount = transactions.Count(x => !x.IsPaid);

    return Ok(new
    {
      TotalReceivable = totalReceivable,
      TotalPayable = totalPayable,
      NetBalance = totalReceivable - totalPayable,
      TotalCollected = totalCollected,
      WaitingCount = waitingCount
    });
  }

  [HttpPost("from-work-order/{workOrderId:int}")]
  public async Task<IActionResult> CreateFromWorkOrder(int workOrderId)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var workOrder = await _context.ServiceWorkOrders
        .Include(x => x.CustomerVehicle)
        .ThenInclude(x => x.ServiceCustomer)
        .FirstOrDefaultAsync(x =>
            x.Id == workOrderId &&
            x.ServiceBusinessId == serviceBusiness.Id);

    if (workOrder == null)
      return NotFound("İş emri bulunamadı.");

    var exists = await _context.ServiceAccountTransactions
        .AnyAsync(x =>
            x.ServiceBusinessId == serviceBusiness.Id &&
            x.ServiceWorkOrderId == workOrder.Id);

    if (exists)
      return BadRequest("Bu iş emri için zaten cari kayıt oluşturulmuş.");

    var transaction = new ServiceAccountTransaction
    {
      ServiceBusinessId = serviceBusiness.Id,
      ServiceCustomerId = workOrder.CustomerVehicle.ServiceCustomerId,
      CustomerVehicleId = workOrder.CustomerVehicleId,
      ServiceWorkOrderId = workOrder.Id,
      Type = "Receivable",
      Amount = workOrder.TotalCost,
      PaidAmount = 0,
      Description = $"İş emri alacağı: {workOrder.Title}",
      TransactionDate = DateTime.UtcNow,
      DueDate = null,
      IsPaid = false
    };

    _context.ServiceAccountTransactions.Add(transaction);
    await _context.SaveChangesAsync();

    return Ok(new
    {
      transaction.Id,
      transaction.Type,
      transaction.Amount,
      transaction.PaidAmount,
      RemainingAmount = transaction.Amount - transaction.PaidAmount,
      transaction.IsPaid,
      transaction.Description,
      transaction.TransactionDate,
      transaction.DueDate,
      CustomerName = workOrder.CustomerVehicle.ServiceCustomer.FullName,
      Vehicle = workOrder.CustomerVehicle.Brand + " " + workOrder.CustomerVehicle.Model
    });
  }


}