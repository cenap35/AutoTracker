using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.VehicleNotes;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VehicleNotesController : ControllerBase
{
  private readonly AppDbContext _context;

  public VehicleNotesController(AppDbContext context)
  {
    _context = context;
  }

  private int GetUserId()
  {
    return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
  }

  [HttpGet]
  public async Task<ActionResult<List<VehicleNoteDto>>> GetNotes()
  {
    var userId = GetUserId();

    var notes = await _context.VehicleNotes
        .Include(n => n.Vehicle)
        .Where(n => n.Vehicle.AppUserId == userId)
        .OrderByDescending(n => n.CreatedAt)
        .Select(n => new VehicleNoteDto
        {
          Id = n.Id,
          VehicleId = n.VehicleId,
          VehicleName = n.Vehicle.Brand + " " + n.Vehicle.Model,
          PlateNumber = n.Vehicle.PlateNumber,
          Title = n.Title,
          Content = n.Content,
          Priority = n.Priority,
          IsCompleted = n.IsCompleted,
          CreatedAt = n.CreatedAt
        })
        .ToListAsync();

    return Ok(notes);
  }

  [HttpPost]
  public async Task<ActionResult<VehicleNoteDto>> CreateNote(CreateVehicleNoteDto dto)
  {
    var userId = GetUserId();

    var vehicle = await _context.Vehicles
        .FirstOrDefaultAsync(v => v.Id == dto.VehicleId && v.AppUserId == userId);

    if (vehicle == null)
    {
      return NotFound("Araç bulunamadı.");
    }

    var note = new VehicleNote
    {
      VehicleId = dto.VehicleId,
      Title = dto.Title,
      Content = dto.Content,
      Priority = dto.Priority,
      IsCompleted = false
    };

    _context.VehicleNotes.Add(note);
    await _context.SaveChangesAsync();

    var result = new VehicleNoteDto
    {
      Id = note.Id,
      VehicleId = note.VehicleId,
      VehicleName = vehicle.Brand + " " + vehicle.Model,
      PlateNumber = vehicle.PlateNumber,
      Title = note.Title,
      Content = note.Content,
      Priority = note.Priority,
      IsCompleted = note.IsCompleted,
      CreatedAt = note.CreatedAt
    };

    return Ok(result);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateNote(int id, UpdateVehicleNoteDto dto)
  {
    var userId = GetUserId();

    var note = await _context.VehicleNotes
        .Include(n => n.Vehicle)
        .FirstOrDefaultAsync(n => n.Id == id && n.Vehicle.AppUserId == userId);

    if (note == null)
    {
      return NotFound("Not bulunamadı.");
    }

    note.Title = dto.Title;
    note.Content = dto.Content;
    note.Priority = dto.Priority;
    note.IsCompleted = dto.IsCompleted;

    await _context.SaveChangesAsync();

    return Ok("Not güncellendi.");
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteNote(int id)
  {
    var userId = GetUserId();

    var note = await _context.VehicleNotes
        .Include(n => n.Vehicle)
        .FirstOrDefaultAsync(n => n.Id == id && n.Vehicle.AppUserId == userId);

    if (note == null)
    {
      return NotFound("Not bulunamadı.");
    }

    _context.VehicleNotes.Remove(note);
    await _context.SaveChangesAsync();

    return Ok("Not silindi.");
  }
}