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
      return NotFound("Servis hesabı bulunamadı.");

    var transactions = await _context.ServiceAccountTransactions
        .Where(x => x.ServiceBusinessId == serviceBusiness.Id && !x.IsDeleted)
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
          x.PaidAt,
          x.Description,
          x.TransactionDate,
          x.DueDate,
          x.ServiceWorkOrderId,

          CustomerName = x.ServiceCustomer != null
    ? x.ServiceCustomer.FullName
    : x.CustomerNameSnapshot,

          Vehicle = x.CustomerVehicle != null
    ? x.CustomerVehicle.Brand + " " + x.CustomerVehicle.Model
    : x.VehicleSnapshot,

          Plate = x.CustomerVehicle != null
    ? x.CustomerVehicle.Plate
    : x.PlateSnapshot,

          x.SourceTitle
        })
        .ToListAsync();

    return Ok(transactions);
  }

  [HttpPost]
  public async Task<IActionResult> CreateTransaction(CreateServiceAccountTransactionDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var isPaid = dto.PaidAmount >= dto.Amount;

    var customer = await _context.ServiceCustomers
    .FirstOrDefaultAsync(x =>
        x.Id == dto.ServiceCustomerId &&
        x.ServiceBusinessId == serviceBusiness.Id);

    if (customer == null)
      return NotFound("Müşteri bulunamadı.");

    CustomerVehicle? vehicle = null;

    if (dto.CustomerVehicleId.HasValue)
    {
      vehicle = await _context.CustomerVehicles
          .FirstOrDefaultAsync(x =>
              x.Id == dto.CustomerVehicleId.Value &&
              x.ServiceBusinessId == serviceBusiness.Id);
    }

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

      CustomerNameSnapshot = customer.FullName,
      VehicleSnapshot = vehicle != null ? $"{vehicle.Brand} {vehicle.Model}" : null,
      PlateSnapshot = vehicle?.Plate,
      SourceTitle = dto.ServiceWorkOrderId.HasValue
    ? "Manuel iş emri bağlantısı"
    : "Manuel cari kayıt",

      TransactionDate = dto.TransactionDate,
      DueDate = dto.DueDate,

      IsPaid = isPaid,
      PaidAt = isPaid ? DateTime.UtcNow : null,
      IsDeleted = false
    };

    _context.ServiceAccountTransactions.Add(transaction);
    await _context.SaveChangesAsync();

    return Ok(new
    {
      transaction.Id,
      transaction.Type,
      transaction.SourceTitle,
      transaction.Amount,
      transaction.PaidAmount,
      RemainingAmount = transaction.Amount - transaction.PaidAmount,
      transaction.IsPaid,
      transaction.PaidAt,
      transaction.Description,
      transaction.TransactionDate,
      transaction.DueDate,
      transaction.ServiceWorkOrderId,
      CustomerName = transaction.CustomerNameSnapshot,
      Vehicle = transaction.VehicleSnapshot,
      Plate = transaction.PlateSnapshot
    });
  }

  [HttpPut("{id:int}")]
  public async Task<IActionResult> UpdateTransaction(
      int id,
      UpdateServiceAccountTransactionDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var transaction = await _context.ServiceAccountTransactions
        .FirstOrDefaultAsync(x =>
            x.Id == id &&
            x.ServiceBusinessId == serviceBusiness.Id &&
            !x.IsDeleted);

    if (transaction == null)
      return NotFound("Cari kayıt bulunamadı.");

    var wasPaid = transaction.IsPaid;
    var isPaid = dto.IsPaid || dto.PaidAmount >= dto.Amount;

    transaction.ServiceCustomerId = dto.ServiceCustomerId;
    transaction.CustomerVehicleId = dto.CustomerVehicleId;
    transaction.ServiceWorkOrderId = dto.ServiceWorkOrderId;
    transaction.Type = dto.Type;
    transaction.Amount = dto.Amount;
    transaction.PaidAmount = dto.PaidAmount;
    transaction.Description = dto.Description;
    transaction.IsPaid = isPaid;
    transaction.TransactionDate = dto.TransactionDate;
    transaction.DueDate = dto.DueDate;

    if (!wasPaid && isPaid)
      transaction.PaidAt = DateTime.UtcNow;

    if (!isPaid)
      transaction.PaidAt = null;

    await _context.SaveChangesAsync();

    return Ok(new
    {
      transaction.Id,
      transaction.Type,
      transaction.SourceTitle,
      transaction.Amount,
      transaction.PaidAmount,
      RemainingAmount = transaction.Amount - transaction.PaidAmount,
      transaction.IsPaid,
      transaction.PaidAt,
      transaction.Description,
      transaction.TransactionDate,
      transaction.DueDate,
      transaction.ServiceWorkOrderId,
      CustomerName = transaction.CustomerNameSnapshot,
      Vehicle = transaction.VehicleSnapshot,
      Plate = transaction.PlateSnapshot
    });
  }

  [HttpPost("{id:int}/mark-paid")]
  public async Task<IActionResult> MarkPaid(int id)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var transaction = await _context.ServiceAccountTransactions
        .FirstOrDefaultAsync(x =>
            x.Id == id &&
            x.ServiceBusinessId == serviceBusiness.Id &&
            !x.IsDeleted);

    if (transaction == null)
      return NotFound("Cari kayıt bulunamadı.");

    transaction.IsPaid = true;
    transaction.PaidAmount = transaction.Amount;
    transaction.PaidAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(new
    {
      transaction.Id,
      transaction.IsPaid,
      transaction.PaidAmount,
      transaction.PaidAt
    });
  }

  [HttpDelete("{id:int}")]
  public async Task<IActionResult> DeleteTransaction(int id)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(x => x.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var transaction = await _context.ServiceAccountTransactions
        .FirstOrDefaultAsync(x =>
            x.Id == id &&
            x.ServiceBusinessId == serviceBusiness.Id &&
            !x.IsDeleted);

    if (transaction == null)
      return NotFound("Cari kayıt bulunamadı.");

    transaction.IsDeleted = true;

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
      return NotFound("Servis hesabı bulunamadı.");

    var transactions = await _context.ServiceAccountTransactions
        .Where(x =>
            x.ServiceBusinessId == serviceBusiness.Id &&
            !x.IsDeleted)
        .ToListAsync();

    var totalReceivable = transactions
        .Where(x => x.Type == "Receivable" && !x.IsPaid)
        .Sum(x => x.Amount - x.PaidAmount);

    var totalPayable = transactions
        .Where(x => x.Type == "Payable" && !x.IsPaid)
        .Sum(x => x.Amount - x.PaidAmount);

    var totalCollected = transactions
        .Where(x => x.Type == "Receivable" && x.IsPaid)
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

    if (workOrder.Status != "Completed")
      return BadRequest("Cari alacak oluşturmak için iş emri tamamlanmış olmalı.");

    var exists = await _context.ServiceAccountTransactions
        .AnyAsync(x =>
            x.ServiceBusinessId == serviceBusiness.Id &&
            x.ServiceWorkOrderId == workOrder.Id && !x.IsDeleted);

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

      CustomerNameSnapshot =
     workOrder.CustomerVehicle.ServiceCustomer.FullName,

      VehicleSnapshot =
     $"{workOrder.CustomerVehicle.Brand} {workOrder.CustomerVehicle.Model}",

      PlateSnapshot =
     workOrder.CustomerVehicle.Plate,

      SourceTitle =
     workOrder.Title,

      TransactionDate = DateTime.UtcNow,
      DueDate = null,

      IsPaid = false,
      PaidAt = null,
      IsDeleted = false
    };

    _context.ServiceAccountTransactions.Add(transaction);
    await _context.SaveChangesAsync();

    return Ok(new
    {
      transaction.Id,
      transaction.Type,
      transaction.SourceTitle,
      transaction.Amount,
      transaction.PaidAmount,
      RemainingAmount = transaction.Amount - transaction.PaidAmount,
      transaction.IsPaid,
      transaction.PaidAt,
      transaction.Description,
      transaction.TransactionDate,
      transaction.DueDate,
      CustomerName = workOrder.CustomerVehicle.ServiceCustomer.FullName,
      Vehicle = workOrder.CustomerVehicle.Brand + " " + workOrder.CustomerVehicle.Model,
      Plate = workOrder.CustomerVehicle.Plate
    });
  }
}