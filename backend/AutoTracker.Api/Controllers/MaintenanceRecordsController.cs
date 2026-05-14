using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.Maintenance;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/vehicles/{vehicleId}/maintenance-records")]
[Authorize]
public class MaintenanceRecordsController : ControllerBase
{
  private readonly AppDbContext _context;

  public MaintenanceRecordsController(AppDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<List<MaintenanceRecordDto>>> GetMaintenanceRecords(int vehicleId)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var vehicleExists = await _context.Vehicles
        .AnyAsync(v => v.Id == vehicleId && v.AppUserId == userId);

    if (!vehicleExists)
    {
      return NotFound();
    }

    var records = await _context.MaintenanceRecords
        .Where(r => r.VehicleId == vehicleId)
        .Select(r => new MaintenanceRecordDto
        {
          Id = r.Id,
          VehicleId = r.VehicleId,
          Title = r.Title,
          Description = r.Description,
          Mileage = r.Mileage,
          Cost = r.Cost,
          MaintenanceDate = r.MaintenanceDate,
          CreatedAt = r.CreatedAt
        })
        .ToListAsync();

    return Ok(records);
  }

  [HttpPost]
  public async Task<ActionResult<MaintenanceRecordDto>> CreateMaintenanceRecord(
    int vehicleId,
    CreateMaintenanceRecordDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var vehicleExists = await _context.Vehicles
        .AnyAsync(v => v.Id == vehicleId && v.AppUserId == userId);

    if (!vehicleExists)
    {
      return NotFound();
    }

    var record = new MaintenanceRecord
    {
      VehicleId = vehicleId,
      Title = dto.Title,
      Description = dto.Description,
      Mileage = dto.Mileage,
      Cost = dto.Cost,
      MaintenanceDate = dto.MaintenanceDate
    };

    _context.MaintenanceRecords.Add(record);
    await _context.SaveChangesAsync();

    var recordDto = new MaintenanceRecordDto
    {
      Id = record.Id,
      VehicleId = record.VehicleId,
      Title = record.Title,
      Description = record.Description,
      Mileage = record.Mileage,
      Cost = record.Cost,
      MaintenanceDate = record.MaintenanceDate,
      CreatedAt = record.CreatedAt
    };

    return CreatedAtAction(
        nameof(GetMaintenanceRecords),
        new { vehicleId = vehicleId },
        recordDto
    );
  }

  [HttpGet("{recordId}")] // GET /api/vehicles/{vehicleId}/maintenance-records/{recordId}
  public async Task<ActionResult<MaintenanceRecordDto>> GetMaintenanceRecordById(
    int vehicleId,
    int recordId)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var record = await _context.MaintenanceRecords
        .Where(r =>
            r.Id == recordId &&
            r.VehicleId == vehicleId &&
            r.Vehicle.AppUserId == userId)
        .Select(r => new MaintenanceRecordDto
        {
          Id = r.Id,
          VehicleId = r.VehicleId,
          Title = r.Title,
          Description = r.Description,
          Mileage = r.Mileage,
          Cost = r.Cost,
          MaintenanceDate = r.MaintenanceDate,
          CreatedAt = r.CreatedAt
        })
        .FirstOrDefaultAsync();

    if (record is null)
    {
      return NotFound();
    }

    return Ok(record);
  }

  [HttpPut("{recordId}")]
  public async Task<IActionResult> UpdateMaintenanceRecord(
    int vehicleId,
    int recordId,
    UpdateMaintenanceRecordDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var record = await _context.MaintenanceRecords
        .FirstOrDefaultAsync(r =>
            r.Id == recordId &&
            r.VehicleId == vehicleId &&
            r.Vehicle.AppUserId == userId);

    if (record is null)
    {
      return NotFound();
    }

    record.Title = dto.Title;
    record.Description = dto.Description;
    record.Mileage = dto.Mileage;
    record.Cost = dto.Cost;
    record.MaintenanceDate = dto.MaintenanceDate;

    await _context.SaveChangesAsync();

    return NoContent();
  }

  [HttpDelete("{recordId}")]
  public async Task<IActionResult> DeleteMaintenanceRecord(int vehicleId, int recordId)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var record = await _context.MaintenanceRecords
        .FirstOrDefaultAsync(r =>
            r.Id == recordId &&
            r.VehicleId == vehicleId &&
            r.Vehicle.AppUserId == userId);

    if (record is null)
    {
      return NotFound();
    }

    _context.MaintenanceRecords.Remove(record);

    await _context.SaveChangesAsync();

    return NoContent();
  }

}
