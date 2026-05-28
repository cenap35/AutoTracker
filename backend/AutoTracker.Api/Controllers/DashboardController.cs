using AutoTracker.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var totalVehicles = await _context.Vehicles
            .CountAsync(v => v.AppUserId == userId);

        var totalMaintenanceRecords = await _context.MaintenanceRecords
            .CountAsync(r => r.Vehicle.AppUserId == userId);

        var totalMaintenanceCost = await _context.MaintenanceRecords
            .Where(r => r.Vehicle.AppUserId == userId)
            .SumAsync(r => r.Cost);

        return Ok(new
        {
            totalVehicles,
            totalMaintenanceRecords,
            totalMaintenanceCost
        });
    }

    [HttpGet("recent-maintenance")]
    public async Task<IActionResult> GetRecentMaintenance()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var records = await _context.MaintenanceRecords
            .Where(r => r.Vehicle.AppUserId == userId)
            .OrderByDescending(r => r.CreatedAt)
            .Take(5)
            .Select(r => new
            {
                r.Id,
                r.Title,
                r.Description,
                r.Mileage,
                r.Cost,
                r.MaintenanceDate,
                CreatedAt = r.CreatedAt,
                VehicleId = r.VehicleId,
                VehicleName = r.Vehicle.Brand + " " + r.Vehicle.Model,
                PlateNumber = r.Vehicle.PlateNumber
            })
            .ToListAsync();

        return Ok(records);
    }

    [HttpGet("cost-by-vehicle")]
    public async Task<IActionResult> GetCostByVehicle()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var data = await _context.Vehicles
            .Where(v => v.AppUserId == userId)
            .Select(v => new
            {
                VehicleName = v.Brand + " " + v.Model,
                PlateNumber = v.PlateNumber,
                TotalCost = v.MaintenanceRecords.Sum(r => r.Cost)
            })
            .ToListAsync();

        return Ok(data);
    }


    [HttpGet("monthly-expenses")]
    public async Task<IActionResult> GetMonthlyExpenses()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var now = DateTime.UtcNow;
        var startDate = new DateTime(
            now.Year,
            now.Month,
            1,
            0,
            0,
            0,
            DateTimeKind.Utc
        ).AddMonths(-5);

        var maintenanceExpenses = await _context.MaintenanceRecords
            .Where(r =>
                r.Vehicle.AppUserId == userId &&
                r.MaintenanceDate >= startDate)
            .GroupBy(r => new
            {
                r.MaintenanceDate.Year,
                r.MaintenanceDate.Month
            })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                MaintenanceCost = g.Sum(r => r.Cost)
            })
            .ToListAsync();

        var reminderExpenses = await _context.VehicleReminders
            .Where(r =>
                r.Vehicle.AppUserId == userId &&
                r.DueDate >= startDate)
            .GroupBy(r => new
            {
                r.DueDate.Year,
                r.DueDate.Month
            })
            .Select(g => new
            {
                g.Key.Year,
                g.Key.Month,
                ReminderCost = g.Sum(r => r.Amount ?? 0)
            })
            .ToListAsync();

        var result = Enumerable.Range(0, 6)
            .Select(i =>
            {
                var date = startDate.AddMonths(i);

                var maintenanceCost = maintenanceExpenses
                    .FirstOrDefault(x => x.Year == date.Year && x.Month == date.Month)
                    ?.MaintenanceCost ?? 0;

                var reminderCost = reminderExpenses
                    .FirstOrDefault(x => x.Year == date.Year && x.Month == date.Month)
                    ?.ReminderCost ?? 0;

                return new
                {
                    Month = date.ToString("yyyy-MM"),
                    MaintenanceCost = maintenanceCost,
                    ReminderCost = reminderCost,
                    TotalCost = maintenanceCost + reminderCost
                };
            })
            .ToList();

        return Ok(result);
    }
}