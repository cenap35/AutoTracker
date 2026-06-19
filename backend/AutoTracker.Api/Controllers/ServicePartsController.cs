using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.ServiceParts;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

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
    public async Task<IActionResult> GetPartStats(
      [FromQuery] int? year,
      [FromQuery] int? month)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        DateTime? startDate = null;
        DateTime? endDate = null;
        string periodLabel = "Tüm Zamanlar";

        if (year.HasValue && month.HasValue)
        {
            startDate = new DateTime(
                year.Value,
                month.Value,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            );

            endDate = startDate.Value.AddMonths(1);
            periodLabel = $"{month.Value:00}/{year.Value}";
        }
        else if (year.HasValue)
        {
            startDate = new DateTime(
                year.Value,
                1,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            );

            endDate = startDate.Value.AddYears(1);
            periodLabel = year.Value.ToString();
        }

        var parts = await _context.ServiceParts
            .Where(p => p.ServiceBusinessId == serviceBusiness.Id)
            .ToListAsync();

        var salesQuery = _context.ServicePartSales
            .Where(s => s.ServiceBusinessId == serviceBusiness.Id);

        if (startDate.HasValue && endDate.HasValue)
        {
            salesQuery = salesQuery.Where(s =>
                s.SoldAt >= startDate.Value &&
                s.SoldAt < endDate.Value);
        }

        var sales = await salesQuery.ToListAsync();

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
            PeriodLabel = periodLabel,

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


    [HttpGet("top-sales")]
    public async Task<IActionResult> GetTopPartSales(
    [FromQuery] int? year,
    [FromQuery] int? month)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        DateTime? startDate = null;
        DateTime? endDate = null;

        if (year.HasValue && month.HasValue)
        {
            startDate = new DateTime(year.Value, month.Value, 1, 0, 0, 0, DateTimeKind.Utc);
            endDate = startDate.Value.AddMonths(1);
        }
        else if (year.HasValue)
        {
            startDate = new DateTime(year.Value, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            endDate = startDate.Value.AddYears(1);
        }

        var salesQuery = _context.ServicePartSales
            .Where(s => s.ServiceBusinessId == serviceBusiness.Id);

        if (startDate.HasValue && endDate.HasValue)
        {
            salesQuery = salesQuery.Where(s =>
                s.SoldAt >= startDate.Value &&
                s.SoldAt < endDate.Value);
        }

        var sales = await salesQuery
            .Include(s => s.ServicePart)
            .ToListAsync();

        var grouped = sales
            .GroupBy(s => new
            {
                s.ServicePartId,
                s.ServicePart.Name,
                s.ServicePart.Code
            })
            .Select(g => new
            {
                ServicePartId = g.Key.ServicePartId,
                PartName = g.Key.Name,
                PartCode = g.Key.Code,
                TotalQuantity = g.Sum(x => x.Quantity),
                TotalRevenue = g.Sum(x => x.TotalRevenue),
                TotalProfit = g.Sum(x => x.TotalProfit)
            })
            .ToList();

        var bestSellingPart = grouped
            .OrderByDescending(x => x.TotalQuantity)
            .FirstOrDefault();

        var mostProfitablePart = grouped
            .OrderByDescending(x => x.TotalProfit)
            .FirstOrDefault();

        return Ok(new
        {
            BestSellingPart = bestSellingPart,
            MostProfitablePart = mostProfitablePart,
            TopParts = grouped
                .OrderByDescending(x => x.TotalQuantity)
                .Take(5)
                .ToList()
        });
    }

    [HttpGet("sales")]
    public async Task<IActionResult> GetPartSales(
        [FromQuery] int? year,
        [FromQuery] int? month)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        DateTime? startDate = null;
        DateTime? endDate = null;

        if (year.HasValue && month.HasValue)
        {
            startDate = new DateTime(year.Value, month.Value, 1, 0, 0, 0, DateTimeKind.Utc);
            endDate = startDate.Value.AddMonths(1);
        }
        else if (year.HasValue)
        {
            startDate = new DateTime(year.Value, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            endDate = startDate.Value.AddYears(1);
        }

        var salesQuery = _context.ServicePartSales
            .Where(s => s.ServiceBusinessId == serviceBusiness.Id);

        if (startDate.HasValue && endDate.HasValue)
        {
            salesQuery = salesQuery.Where(s =>
                s.SoldAt >= startDate.Value &&
                s.SoldAt < endDate.Value);
        }

        var sales = await salesQuery
            .Include(s => s.ServicePart)
            .OrderByDescending(s => s.SoldAt)
            .Select(s => new
            {
                s.Id,
                s.ServicePartId,
                PartName = s.ServicePart.Name,
                PartCode = s.ServicePart.Code,
                s.Quantity,
                s.PurchasePrice,
                s.SalePrice,
                s.TotalRevenue,
                s.TotalProfit,
                s.SoldAt
            })
            .ToListAsync();

        return Ok(sales);
    }


    [HttpGet("report-pdf")]
    public async Task<IActionResult> GetPartSalesReportPdf(
      [FromQuery] int? year,
      [FromQuery] int? month)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        DateTime? startDate = null;
        DateTime? endDate = null;
        string reportPeriod = "Tüm Zamanlar";

        if (year.HasValue && month.HasValue)
        {
            startDate = new DateTime(
                year.Value,
                month.Value,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            );

            endDate = startDate.Value.AddMonths(1);
            reportPeriod = $"{month.Value:00}/{year.Value}";
        }
        else if (year.HasValue)
        {
            startDate = new DateTime(
                year.Value,
                1,
                1,
                0,
                0,
                0,
                DateTimeKind.Utc
            );

            endDate = startDate.Value.AddYears(1);
            reportPeriod = year.Value.ToString();
        }

        var parts = await _context.ServiceParts
            .Where(p => p.ServiceBusinessId == serviceBusiness.Id)
            .ToListAsync();

        var salesQuery = _context.ServicePartSales
            .Where(s => s.ServiceBusinessId == serviceBusiness.Id);

        if (startDate.HasValue && endDate.HasValue)
        {
            salesQuery = salesQuery.Where(s =>
                s.SoldAt >= startDate.Value &&
                s.SoldAt < endDate.Value);
        }

        var sales = await salesQuery
            .Include(s => s.ServicePart)
            .OrderByDescending(s => s.SoldAt)
            .ToListAsync();

        var totalStockCost = parts.Sum(p => p.PurchasePrice * p.StockQuantity);
        var totalPotentialRevenue = parts.Sum(p => p.SalePrice * p.StockQuantity);
        var totalPotentialProfit = parts.Sum(p =>
            (p.SalePrice - p.PurchasePrice) * p.StockQuantity);

        var totalSalesRevenue = sales.Sum(s => s.TotalRevenue);
        var totalRealizedProfit = sales.Sum(s => s.TotalProfit);
        var totalSoldQuantity = sales.Sum(s => s.Quantity);

        var bestSellingPart = sales
            .GroupBy(s => s.ServicePart.Name)
            .Select(g => new
            {
                Name = g.Key,
                Quantity = g.Sum(x => x.Quantity),
                Profit = g.Sum(x => x.TotalProfit)
            })
            .OrderByDescending(x => x.Quantity)
            .FirstOrDefault();

        var mostProfitablePart = sales
            .GroupBy(s => s.ServicePart.Name)
            .Select(g => new
            {
                Name = g.Key,
                Quantity = g.Sum(x => x.Quantity),
                Profit = g.Sum(x => x.TotalProfit)
            })
            .OrderByDescending(x => x.Profit)
            .FirstOrDefault();

        var pdfBytes = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(35);

                page.Header().Column(col =>
                {
                    col.Item().Text("AutoTracker Service").FontSize(22).Bold();
                    col.Item().Text("Stok Finans Raporu").FontSize(16);
                    col.Item().Text($"Rapor Dönemi: {reportPeriod}");
                    col.Item().Text($"{serviceBusiness.Name} - {DateTime.Now:dd.MM.yyyy HH:mm}");
                });

                page.Content().PaddingVertical(20).Column(col =>
                {
                    col.Spacing(12);

                    col.Item().Text("Özet Bilgiler").FontSize(16).Bold();

                    col.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        void Row(string label, string value)
                        {
                            table.Cell().Text(label).SemiBold();
                            table.Cell().Text(value);
                        }

                        Row("Rapor Dönemi", reportPeriod);
                        Row("Stoktaki Sermaye", $"{totalStockCost:N0} TL");
                        Row("Stok Satılırsa Ciro", $"{totalPotentialRevenue:N0} TL");
                        Row("Stok Satılırsa Kar", $"{totalPotentialProfit:N0} TL");
                        Row("Gerçekleşen Ciro", $"{totalSalesRevenue:N0} TL");
                        Row("Gerçekleşen Kar", $"{totalRealizedProfit:N0} TL");
                        Row("Satılan Adet", totalSoldQuantity.ToString());
                        Row("En Çok Satan Parça", bestSellingPart?.Name ?? "-");
                        Row("En Karlı Parça", mostProfitablePart?.Name ?? "-");
                    });

                    col.Item().PaddingTop(15).Text("Son Satışlar").FontSize(16).Bold();

                    col.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn(2);
                            columns.RelativeColumn(3);
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                            columns.RelativeColumn();
                        });

                        table.Header(header =>
                        {
                            header.Cell().Text("Tarih").Bold();
                            header.Cell().Text("Parça").Bold();
                            header.Cell().Text("Adet").Bold();
                            header.Cell().Text("Ciro").Bold();
                            header.Cell().Text("Kar").Bold();
                        });

                        foreach (var sale in sales.Take(20))
                        {
                            table.Cell().Text(sale.SoldAt.ToString("dd.MM.yyyy"));
                            table.Cell().Text(sale.ServicePart.Name);
                            table.Cell().Text(sale.Quantity.ToString());
                            table.Cell().Text($"{sale.TotalRevenue:N0}");
                            table.Cell().Text($"{sale.TotalProfit:N0}");
                        }
                    });
                });

                page.Footer()
                    .AlignCenter()
                    .Text("AutoTracker Service tarafından oluşturuldu.");
            });
        }).GeneratePdf();

        var fileName = year.HasValue
            ? month.HasValue
                ? $"stok-finans-raporu-{year}-{month.Value:00}.pdf"
                : $"stok-finans-raporu-{year}.pdf"
            : "stok-finans-raporu-tum-zamanlar.pdf";

        return File(pdfBytes, "application/pdf", fileName);
    }
}