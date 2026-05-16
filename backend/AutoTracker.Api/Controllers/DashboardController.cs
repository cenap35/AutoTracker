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
}