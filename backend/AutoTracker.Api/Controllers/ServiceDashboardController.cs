using AutoTracker.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceDashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServiceDashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboardStats()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var totalCustomers = await _context.ServiceCustomers
            .CountAsync(c => c.ServiceBusinessId == serviceBusiness.Id);

        var totalVehicles = await _context.CustomerVehicles
            .CountAsync(v => v.ServiceBusinessId == serviceBusiness.Id);

        var totalWorkOrders = await _context.ServiceWorkOrders
            .CountAsync(w => w.ServiceBusinessId == serviceBusiness.Id);

        var completedWorkOrders = await _context.ServiceWorkOrders
            .CountAsync(w =>
                w.ServiceBusinessId == serviceBusiness.Id &&
                w.Status == "Completed");

        var pendingWorkOrders = await _context.ServiceWorkOrders
            .CountAsync(w =>
                w.ServiceBusinessId == serviceBusiness.Id &&
                w.Status == "Pending");

        var inProgressWorkOrders = await _context.ServiceWorkOrders
            .CountAsync(w =>
                w.ServiceBusinessId == serviceBusiness.Id &&
                w.Status == "InProgress");

        var totalRevenue = await _context.ServiceWorkOrders
            .Where(w =>
                w.ServiceBusinessId == serviceBusiness.Id &&
                w.Status == "Completed")
            .SumAsync(w => w.TotalCost);

        var currentMonth = DateTime.UtcNow.Month;
        var currentYear = DateTime.UtcNow.Year;

        var monthlyRevenue = await _context.ServiceWorkOrders
            .Where(w =>
                w.ServiceBusinessId == serviceBusiness.Id &&
                w.Status == "Completed" &&
                w.CompletedAt != null &&
                w.CompletedAt.Value.Month == currentMonth &&
                w.CompletedAt.Value.Year == currentYear)
            .SumAsync(w => w.TotalCost);

        var monthlyRevenueStats = await _context.ServiceWorkOrders
            .Where(w =>
                w.ServiceBusinessId == serviceBusiness.Id &&
                w.Status == "Completed" &&
                w.CompletedAt != null)
            .GroupBy(w => new
            {
                Year = w.CompletedAt!.Value.Year,
                Month = w.CompletedAt!.Value.Month
            })
            .Select(g => new
            {
                year = g.Key.Year,
                month = g.Key.Month,
                revenue = g.Sum(w => w.TotalCost)
            })
            .OrderBy(x => x.year)
            .ThenBy(x => x.month)
            .ToListAsync();

        var recentWorkOrders = await _context.ServiceWorkOrders
            .Where(w => w.ServiceBusinessId == serviceBusiness.Id)
            .OrderByDescending(w => w.CreatedAt)
            .Take(5)
            .Select(w => new
            {
                w.Id,
                w.Title,
                w.Status,
                w.TotalCost,
                VehicleName = w.CustomerVehicle.Brand + " " + w.CustomerVehicle.Model,
                Plate = w.CustomerVehicle.Plate,
                CustomerName = w.CustomerVehicle.ServiceCustomer.FullName,
                w.CreatedAt
            })
            .ToListAsync();

        return Ok(new
        {
            serviceBusiness = new
            {
                serviceBusiness.Id,
                serviceBusiness.Name,
                serviceBusiness.City
            },
            totalCustomers,
            totalVehicles,
            totalWorkOrders,
            completedWorkOrders,
            pendingWorkOrders,
            inProgressWorkOrders,
            totalRevenue,
            monthlyRevenue,
            monthlyRevenueStats,
            recentWorkOrders
        });
    }
}