using AutoTracker.Api.Data;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoTracker.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VehiclesController : ControllerBase
{
  private readonly AppDbContext _context;

  public VehiclesController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<List<VehicleDto>>> GetVehicles()
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var vehicles = await _context.Vehicles
        .Where(v => v.AppUserId == userId)
        .Select(v => new VehicleDto
        {
          Id = v.Id,
          Brand = v.Brand,
          Model = v.Model,
          Year = v.Year,
          PlateNumber = v.PlateNumber,
          CurrentMileage = v.CurrentMileage,
          CreatedAt = v.CreatedAt
        })
        .ToListAsync();

    return Ok(vehicles);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<VehicleDto>> GetVehicleById(int id)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var vehicle = await _context.Vehicles
        .Where(v => v.Id == id && v.AppUserId == userId)
        .Select(v => new VehicleDto
        {
          Id = v.Id,
          Brand = v.Brand,
          Model = v.Model,
          Year = v.Year,
          PlateNumber = v.PlateNumber,
          CurrentMileage = v.CurrentMileage,
          CreatedAt = v.CreatedAt
        })
        .FirstOrDefaultAsync();

    if (vehicle is null)
    {
      return NotFound();
    }

    return Ok(vehicle);
  }

  [HttpPost]
  public async Task<ActionResult<VehicleDto>> CreateVehicle(CreateVehicleDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    var vehicle = new Vehicle
    {
      Brand = dto.Brand,
      Model = dto.Model,
      Year = dto.Year,
      PlateNumber = dto.PlateNumber,
      CurrentMileage = dto.CurrentMileage,
      AppUserId = userId
    };

    _context.Vehicles.Add(vehicle);

    await _context.SaveChangesAsync();

    var vehicleDto = new VehicleDto
    {
      Id = vehicle.Id,
      Brand = vehicle.Brand,
      Model = vehicle.Model,
      Year = vehicle.Year,
      PlateNumber = vehicle.PlateNumber,
      CurrentMileage = vehicle.CurrentMileage,
      CreatedAt = vehicle.CreatedAt
    };

    return CreatedAtAction(
        nameof(GetVehicleById),
        new { id = vehicle.Id },
        vehicleDto
    );
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteVehicle(int id)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var vehicle = await _context.Vehicles
        .FirstOrDefaultAsync(v => v.Id == id && v.AppUserId == userId);

    if (vehicle is null)
    {
      return NotFound();
    }

    _context.Vehicles.Remove(vehicle);

    await _context.SaveChangesAsync();

    return NoContent();
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateVehicle(int id, UpdateVehicleDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var vehicle = await _context.Vehicles
        .FirstOrDefaultAsync(v => v.Id == id && v.AppUserId == userId);

    if (vehicle is null)
    {
      return NotFound();
    }

    vehicle.Brand = dto.Brand;
    vehicle.Model = dto.Model;
    vehicle.Year = dto.Year;
    vehicle.PlateNumber = dto.PlateNumber;
    vehicle.CurrentMileage = dto.CurrentMileage;

    await _context.SaveChangesAsync();

    return NoContent();
  }
}