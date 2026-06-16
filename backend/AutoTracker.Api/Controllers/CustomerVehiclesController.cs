using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.CustomerVehicles;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CustomerVehiclesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CustomerVehiclesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetVehicles()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var vehicles = await _context.CustomerVehicles
            .Where(v => v.ServiceBusinessId == serviceBusiness.Id)
            .OrderByDescending(v => v.CreatedAt)
            .Select(v => new
            {
                v.Id,
                v.Brand,
                v.Model,
                v.Year,
                v.Plate,
                v.CurrentMileage,
                v.ChassisNumber,
                v.ServiceCustomerId,
                CustomerName = v.ServiceCustomer.FullName,
                v.ServiceBusinessId,
                v.CreatedAt
            })
            .ToListAsync();

        return Ok(vehicles);
    }

    [HttpPost]
    public async Task<IActionResult> CreateVehicle(CreateCustomerVehicleDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var customer = await _context.ServiceCustomers
            .FirstOrDefaultAsync(c =>
                c.Id == dto.ServiceCustomerId &&
                c.ServiceBusinessId == serviceBusiness.Id);

        if (customer == null)
            return NotFound("Müşteri bulunamadı.");

        var vehicle = new CustomerVehicle
        {
            Brand = dto.Brand,
            Model = dto.Model,
            Year = dto.Year,
            Plate = dto.Plate,
            CurrentMileage = dto.CurrentMileage,
            ChassisNumber = dto.ChassisNumber,
            ServiceCustomerId = customer.Id,
            ServiceBusinessId = serviceBusiness.Id
        };

        _context.CustomerVehicles.Add(vehicle);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            vehicle.Id,
            vehicle.Brand,
            vehicle.Model,
            vehicle.Year,
            vehicle.Plate,
            vehicle.CurrentMileage,
            vehicle.ChassisNumber,
            vehicle.ServiceCustomerId,
            CustomerName = customer.FullName,
            vehicle.ServiceBusinessId,
            vehicle.CreatedAt
        });
    }
}