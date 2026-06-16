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
}