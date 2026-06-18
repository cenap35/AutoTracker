using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.ServiceParts;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServicePartsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServicePartsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetParts()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var parts = await _context.ServiceParts
            .Where(p => p.ServiceBusinessId == serviceBusiness.Id)
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Code,
                p.PurchasePrice,
                p.SalePrice,
                p.StockQuantity,
                p.ServiceBusinessId,
                p.CreatedAt
            })
            .ToListAsync();

        return Ok(parts);
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetPartStats()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var parts = await _context.ServiceParts
            .Where(p => p.ServiceBusinessId == serviceBusiness.Id)
            .ToListAsync();

        var sales = await _context.ServicePartSales
            .Where(s => s.ServiceBusinessId == serviceBusiness.Id)
            .ToListAsync();

        var totalStockCost = parts.Sum(p => p.PurchasePrice * p.StockQuantity);
        var totalPotentialRevenue = parts.Sum(p => p.SalePrice * p.StockQuantity);
        var totalPotentialProfit = parts.Sum(p =>
            (p.SalePrice - p.PurchasePrice) * p.StockQuantity);

        var totalSalesRevenue = sales.Sum(s => s.TotalRevenue);
        var totalRealizedProfit = sales.Sum(s => s.TotalProfit);
        var totalSoldQuantity = sales.Sum(s => s.Quantity);

        var criticalStockCount = parts.Count(p => p.StockQuantity <= 3);

        return Ok(new
        {
            TotalStockCost = totalStockCost,
            TotalPotentialRevenue = totalPotentialRevenue,
            TotalPotentialProfit = totalPotentialProfit,
            TotalSalesRevenue = totalSalesRevenue,
            TotalRealizedProfit = totalRealizedProfit,
            TotalSoldQuantity = totalSoldQuantity,
            CriticalStockCount = criticalStockCount
        });
    }

    [HttpGet("monthly-stats")]
    public async Task<IActionResult> GetMonthlyPartStats()
    {
        try
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var serviceBusiness = await _context.ServiceBusinesses
                .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

            if (serviceBusiness == null)
                return NotFound("Servis hesabı bulunamadı.");

            var startDate = DateTime.UtcNow.AddMonths(-11);
            startDate = new DateTime(
                startDate.Year,
                startDate.Month,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            );

            var sales = await _context.ServicePartSales
                .Where(s =>
                    s.ServiceBusinessId == serviceBusiness.Id &&
                    s.SoldAt >= startDate)
                .ToListAsync();

            var groupedSales = sales
                .GroupBy(s => new
                {
                    s.SoldAt.Year,
                    s.SoldAt.Month
                })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    TotalRevenue = g.Sum(x => x.TotalRevenue),
                    TotalProfit = g.Sum(x => x.TotalProfit),
                    TotalQuantity = g.Sum(x => x.Quantity)
                })
                .ToList();

            var result = Enumerable.Range(0, 12)
                .Select(i =>
                {
                    var date = startDate.AddMonths(i);

                    var item = groupedSales.FirstOrDefault(s =>
                        s.Year == date.Year &&
                        s.Month == date.Month);

                    return new
                    {
                        Year = date.Year,
                        Month = date.Month,
                        TotalRevenue = item?.TotalRevenue ?? 0,
                        TotalProfit = item?.TotalProfit ?? 0,
                        TotalQuantity = item?.TotalQuantity ?? 0
                    };
                })
                .ToList();

            return Ok(result);
        }
        catch
        {
            return StatusCode(500, "Aylık stok satış istatistikleri alınamadı.");
        }
    }


    [HttpPost]
    public async Task<IActionResult> CreatePart(CreateServicePartDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var part = new ServicePart
        {
            Name = dto.Name,
            Code = dto.Code,
            PurchasePrice = dto.PurchasePrice,
            SalePrice = dto.SalePrice,
            StockQuantity = dto.StockQuantity,
            ServiceBusinessId = serviceBusiness.Id
        };

        _context.ServiceParts.Add(part);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            part.Id,
            part.Name,
            part.Code,
            part.PurchasePrice,
            part.SalePrice,
            part.StockQuantity,
            part.ServiceBusinessId,
            part.CreatedAt
        });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdatePart(int id, UpdateServicePartDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var part = await _context.ServiceParts
            .FirstOrDefaultAsync(p =>
                p.Id == id &&
                p.ServiceBusinessId == serviceBusiness.Id);

        if (part == null)
            return NotFound("Parça bulunamadı.");

        part.Name = dto.Name;
        part.Code = dto.Code;
        part.PurchasePrice = dto.PurchasePrice;
        part.SalePrice = dto.SalePrice;
        part.StockQuantity = dto.StockQuantity;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            part.Id,
            part.Name,
            part.Code,
            part.PurchasePrice,
            part.SalePrice,
            part.StockQuantity,
            part.ServiceBusinessId,
            part.CreatedAt
        });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletePart(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var part = await _context.ServiceParts
            .FirstOrDefaultAsync(p =>
                p.Id == id &&
                p.ServiceBusinessId == serviceBusiness.Id);

        if (part == null)
            return NotFound("Parça bulunamadı.");

        _context.ServiceParts.Remove(part);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost("{id:int}/sell")]
    public async Task<IActionResult> SellPart(int id, SellServicePartDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var part = await _context.ServiceParts
            .FirstOrDefaultAsync(p =>
                p.Id == id &&
                p.ServiceBusinessId == serviceBusiness.Id);

        if (part == null)
            return NotFound("Parça bulunamadı.");

        if (dto.Quantity <= 0)
            return BadRequest("Satış adedi en az 1 olmalı.");

        if (part.StockQuantity < dto.Quantity)
            return BadRequest("Yeterli stok yok.");

        var totalRevenue = part.SalePrice * dto.Quantity;
        var totalProfit = (part.SalePrice - part.PurchasePrice) * dto.Quantity;

        part.StockQuantity -= dto.Quantity;

        var sale = new ServicePartSale
        {
            ServicePartId = part.Id,
            ServiceBusinessId = serviceBusiness.Id,
            Quantity = dto.Quantity,
            PurchasePrice = part.PurchasePrice,
            SalePrice = part.SalePrice,
            TotalRevenue = totalRevenue,
            TotalProfit = totalProfit
        };

        _context.ServicePartSales.Add(sale);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            part.Id,
            part.Name,
            part.Code,
            part.PurchasePrice,
            part.SalePrice,
            part.StockQuantity,
            part.ServiceBusinessId,
            part.CreatedAt,
            Sale = new
            {
                sale.Id,
                sale.Quantity,
                sale.TotalRevenue,
                sale.TotalProfit,
                sale.SoldAt
            }
        });
    }
}