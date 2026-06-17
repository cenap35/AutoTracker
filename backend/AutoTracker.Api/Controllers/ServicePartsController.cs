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


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePart(
int id,
UpdateServicePartDto dto)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

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
            part.StockQuantity
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePart(int id)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound();

        var part = await _context.ServiceParts
            .FirstOrDefaultAsync(p =>
                p.Id == id &&
                p.ServiceBusinessId == serviceBusiness.Id);

        if (part == null)
            return NotFound();

        _context.ServiceParts.Remove(part);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}