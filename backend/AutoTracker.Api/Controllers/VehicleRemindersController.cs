using System.Security.Claims;
using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.VehicleReminders;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class VehicleRemindersController : ControllerBase
{
    private readonly AppDbContext _context;

    public VehicleRemindersController(AppDbContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    }

    private bool IsValidReminderType(string type)
    {
        var allowedTypes = new[] { "Sigorta", "Kasko", "MTV", "Muayene" };

        return allowedTypes.Contains(type);
    }


    [HttpGet]
    public async Task<ActionResult<List<VehicleReminderDto>>> GetReminders()
    {
        var userId = GetUserId();

        var reminders = await _context.VehicleReminders
            .Include(r => r.Vehicle)
            .Where(r => r.Vehicle.AppUserId == userId)
            .OrderBy(r => r.DueDate)
            .Select(r => new VehicleReminderDto
            {
                Id = r.Id,
                VehicleId = r.VehicleId,
                VehicleName = r.Vehicle.Brand + " " + r.Vehicle.Model,
                PlateNumber = r.Vehicle.PlateNumber,
                Type = r.Type,
                DueDate = r.DueDate,
                Amount = r.Amount,
                Description = r.Description,
                IsCompleted = r.IsCompleted,
                CreatedAt = r.CreatedAt
            })
            .ToListAsync();

        return Ok(reminders);
    }

    [HttpPost]
    public async Task<ActionResult<VehicleReminderDto>> CreateReminder(
        CreateVehicleReminderDto dto
    )
    {
        var userId = GetUserId();

        var vehicle = await _context.Vehicles
            .FirstOrDefaultAsync(v => v.Id == dto.VehicleId && v.AppUserId == userId);

        if (vehicle == null)
        {
            return NotFound("Araç bulunamadı.");
        }

        if (!IsValidReminderType(dto.Type))
        {
            return BadRequest("Geçersiz takip türü.");
        }

        var reminder = new VehicleReminder
        {
            VehicleId = dto.VehicleId,
            Type = dto.Type,
            DueDate = dto.DueDate,
            Amount = dto.Amount,
            Description = dto.Description,
            IsCompleted = false
        };

        _context.VehicleReminders.Add(reminder);
        await _context.SaveChangesAsync();

        var reminderDto = new VehicleReminderDto
        {
            Id = reminder.Id,
            VehicleId = reminder.VehicleId,
            VehicleName = vehicle.Brand + " " + vehicle.Model,
            PlateNumber = vehicle.PlateNumber,
            Type = reminder.Type,
            DueDate = reminder.DueDate,
            Amount = reminder.Amount,
            Description = reminder.Description,
            IsCompleted = reminder.IsCompleted,
            CreatedAt = reminder.CreatedAt
        };

        return Ok(reminderDto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReminder(
        int id,
        UpdateVehicleReminderDto dto
    )
    {
        var userId = GetUserId();

        var reminder = await _context.VehicleReminders
            .Include(r => r.Vehicle)
            .FirstOrDefaultAsync(r => r.Id == id && r.Vehicle.AppUserId == userId);

        if (reminder == null)
        {
            return NotFound("Hatırlatma bulunamadı.");
        }

        if (!IsValidReminderType(dto.Type))
        {
            return BadRequest("Geçersiz takip türü.");
        }

        reminder.Type = dto.Type;
        reminder.DueDate = dto.DueDate;
        reminder.Amount = dto.Amount;
        reminder.Description = dto.Description;
        reminder.IsCompleted = dto.IsCompleted;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReminder(int id)
    {
        var userId = GetUserId();

        var reminder = await _context.VehicleReminders
            .Include(r => r.Vehicle)
            .FirstOrDefaultAsync(r => r.Id == id && r.Vehicle.AppUserId == userId);

        if (reminder == null)
        {
            return NotFound("Hatırlatma bulunamadı.");
        }

        _context.VehicleReminders.Remove(reminder);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}