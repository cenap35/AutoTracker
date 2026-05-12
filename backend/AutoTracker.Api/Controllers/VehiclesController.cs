using AutoTracker.Api.Data;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoTracker.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class VehiclesController : ControllerBase
{
  private readonly AppDbContext _context;

  public VehiclesController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet] 
  public async Task<ActionResult<List<Vehicle>>> GetVehicles()
  {
    var vehicles = await _context.Vehicles.ToListAsync();

    return Ok(vehicles);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Vehicle>> GetVehicleById(int id)
  {
    var vehicle = await _context.Vehicles.FindAsync(id);

    if (vehicle is null)
    {
      return NotFound();
    }

    return Ok(vehicle);
  }

  [HttpPost]
  public async Task<ActionResult<Vehicle>> CreateVehicle(Vehicle vehicle)
  {
    _context.Vehicles.Add(vehicle);

    await _context.SaveChangesAsync();

    return CreatedAtAction(
        nameof(GetVehicles),
        new { id = vehicle.Id },
        vehicle
    );
  }

  [HttpDelete("{id}")]
public async Task<IActionResult> DeleteVehicle(int id)
{
    var vehicle = await _context.Vehicles.FindAsync(id);

    if (vehicle is null)
    {
        return NotFound();
    }

    _context.Vehicles.Remove(vehicle);

    await _context.SaveChangesAsync();

    return NoContent();
}

[HttpPut("{id}")]
public async Task<IActionResult> UpdateVehicle(int id, Vehicle updatedVehicle)
{
    var vehicle = await _context.Vehicles.FindAsync(id);

    if (vehicle is null)
    {
        return NotFound();
    }

    vehicle.Brand = updatedVehicle.Brand;
    vehicle.Model = updatedVehicle.Model;
    vehicle.Year = updatedVehicle.Year;
    vehicle.PlateNumber = updatedVehicle.PlateNumber;
    vehicle.CurrentMileage = updatedVehicle.CurrentMileage;

    await _context.SaveChangesAsync();

    return NoContent();
}
}