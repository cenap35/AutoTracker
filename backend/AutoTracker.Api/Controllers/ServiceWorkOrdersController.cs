using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.ServiceWorkOrders;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceWorkOrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServiceWorkOrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetWorkOrders()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var workOrders = await _context.ServiceWorkOrders
            .Where(w => w.ServiceBusinessId == serviceBusiness.Id)
            .OrderByDescending(w => w.CreatedAt)
            .Select(w => new
            {
                w.Id,
                w.Title,
                w.Description,
                w.Mileage,
                w.LaborCost,
                w.PartsCost,
                w.TotalCost,
                w.Status,
                w.CustomerVehicleId,
                VehicleName = w.CustomerVehicle.Brand + " " + w.CustomerVehicle.Model,
                Plate = w.CustomerVehicle.Plate,
                CustomerName = w.CustomerVehicle.ServiceCustomer.FullName,
                w.ServiceBusinessId,
                w.CreatedAt,
                w.CompletedAt
            })
            .ToListAsync();

        return Ok(workOrders);
    }

    [HttpPost]
    public async Task<IActionResult> CreateWorkOrder(CreateServiceWorkOrderDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var vehicle = await _context.CustomerVehicles
            .Include(v => v.ServiceCustomer)
            .FirstOrDefaultAsync(v =>
                v.Id == dto.CustomerVehicleId &&
                v.ServiceBusinessId == serviceBusiness.Id);

        if (vehicle == null)
            return NotFound("Araç bulunamadı.");

        var totalCost = dto.LaborCost + dto.PartsCost;

        var workOrder = new ServiceWorkOrder
        {
            CustomerVehicleId = vehicle.Id,
            ServiceBusinessId = serviceBusiness.Id,
            Title = dto.Title,
            Description = dto.Description,
            Mileage = dto.Mileage,
            LaborCost = dto.LaborCost,
            PartsCost = dto.PartsCost,
            TotalCost = totalCost,
            Status = dto.Status
        };

        if (dto.Status == "Completed")
        {
            workOrder.CompletedAt = DateTime.UtcNow;
        }

        _context.ServiceWorkOrders.Add(workOrder);

        if (dto.Mileage > vehicle.CurrentMileage)
        {
            vehicle.CurrentMileage = dto.Mileage;
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            workOrder.Id,
            workOrder.Title,
            workOrder.Description,
            workOrder.Mileage,
            workOrder.LaborCost,
            workOrder.PartsCost,
            workOrder.TotalCost,
            workOrder.Status,
            workOrder.CustomerVehicleId,
            VehicleName = vehicle.Brand + " " + vehicle.Model,
            Plate = vehicle.Plate,
            CustomerName = vehicle.ServiceCustomer.FullName,
            workOrder.ServiceBusinessId,
            workOrder.CreatedAt,
            workOrder.CompletedAt
        });
    }
}