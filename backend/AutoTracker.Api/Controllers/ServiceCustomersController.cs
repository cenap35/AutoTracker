using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.ServiceCustomers;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceCustomersController : ControllerBase
{
  private readonly AppDbContext _context;

  public ServiceCustomersController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<IActionResult> GetCustomers()
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var customers = await _context.ServiceCustomers
     .Where(c => c.ServiceBusinessId == serviceBusiness.Id)
     .OrderByDescending(c => c.CreatedAt)
     .Select(c => new
     {
       c.Id,
       c.FullName,
       c.Phone,
       c.Note,
       c.ServiceBusinessId,
       c.CreatedAt
     })
     .ToListAsync();

    return Ok(customers);
  }

  [HttpPost]
  public async Task<IActionResult> CreateCustomer(CreateServiceCustomerDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var customer = new ServiceCustomer
    {
      FullName = dto.FullName,
      Phone = dto.Phone,
      Note = dto.Note,
      ServiceBusinessId = serviceBusiness.Id
    };

    _context.ServiceCustomers.Add(customer);
    await _context.SaveChangesAsync();

    return Ok(new
    {
      customer.Id,
      customer.FullName,
      customer.Phone,
      customer.Note,
      customer.ServiceBusinessId,
      customer.CreatedAt
    });
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetCustomerById(int id)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var serviceBusiness = await _context.ServiceBusinesses
        .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

    if (serviceBusiness == null)
      return NotFound("Servis hesabı bulunamadı.");

    var customer = await _context.ServiceCustomers
        .Where(c => c.Id == id && c.ServiceBusinessId == serviceBusiness.Id)
        .Select(c => new
        {
          c.Id,
          c.FullName,
          c.Phone,
          c.Note,
          c.CreatedAt,

          Vehicles = _context.CustomerVehicles
                .Where(v => v.ServiceCustomerId == c.Id)
                .Select(v => new
                {
                  v.Id,
                  v.Brand,
                  v.Model,
                  v.Plate,
                  v.CurrentMileage
                })
                .ToList(),

          WorkOrders = _context.ServiceWorkOrders
                .Where(w => w.CustomerVehicle.ServiceCustomerId == c.Id)
                .OrderByDescending(w => w.CreatedAt)
                .Select(w => new
                {
                  w.Id,
                  w.Title,
                  w.Status,
                  w.TotalCost,
                  VehicleName = w.CustomerVehicle.Brand + " " + w.CustomerVehicle.Model,
                  Plate = w.CustomerVehicle.Plate,
                  w.CreatedAt
                })
                .ToList(),

          TotalSpent = _context.ServiceWorkOrders
                .Where(w =>
                    w.CustomerVehicle.ServiceCustomerId == c.Id &&
                    w.Status == "Completed")
                .Sum(w => w.TotalCost)
        })
        .FirstOrDefaultAsync();

    if (customer == null)
      return NotFound("Müşteri bulunamadı.");

    return Ok(customer);
  }

  [HttpPut("{id}")]
public async Task<IActionResult> UpdateCustomer(
  int id,
  UpdateServiceCustomerDto dto)
{
  var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

  var serviceBusiness = await _context.ServiceBusinesses
      .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

  if (serviceBusiness == null)
    return NotFound("Servis hesabı bulunamadı.");

  var customer = await _context.ServiceCustomers
      .FirstOrDefaultAsync(c =>
          c.Id == id &&
          c.ServiceBusinessId == serviceBusiness.Id);

  if (customer == null)
    return NotFound("Müşteri bulunamadı.");

  customer.FullName = dto.FullName;
  customer.Phone = dto.Phone;
  customer.Note = dto.Note;

  await _context.SaveChangesAsync();

  return Ok(new
  {
    customer.Id,
    customer.FullName,
    customer.Phone,
    customer.Note,
    customer.ServiceBusinessId,
    customer.CreatedAt
  });
}

[HttpDelete("{id}")]
public async Task<IActionResult> DeleteCustomer(int id)
{
  var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

  var serviceBusiness = await _context.ServiceBusinesses
      .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

  if (serviceBusiness == null)
    return NotFound("Servis hesabı bulunamadı.");

  var customer = await _context.ServiceCustomers
      .FirstOrDefaultAsync(c =>
          c.Id == id &&
          c.ServiceBusinessId == serviceBusiness.Id);

  if (customer == null)
    return NotFound("Müşteri bulunamadı.");

  var hasVehicle = await _context.CustomerVehicles
      .AnyAsync(v => v.ServiceCustomerId == customer.Id);

  if (hasVehicle)
    return BadRequest("Bu müşteriye ait araç bulunduğu için silinemez.");

  _context.ServiceCustomers.Remove(customer);

  await _context.SaveChangesAsync();

  return NoContent();
}
}