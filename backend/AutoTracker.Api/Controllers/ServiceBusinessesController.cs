using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.ServiceBusinesses;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceBusinessesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServiceBusinessesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateServiceBusiness(CreateServiceBusinessDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var existingBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (existingBusiness != null)
        {
            return BadRequest("Bu kullanıcı için zaten bir servis hesabı mevcut.");
        }

        var user = await _context.AppUsers.FindAsync(userId);

        if (user == null)
        {
            return Unauthorized("Kullanıcı bulunamadı.");
        }

        var serviceBusiness = new ServiceBusiness
        {
            Name = dto.Name,
            Phone = dto.Phone,
            City = dto.City,
            Address = dto.Address,
            OwnerUserId = userId
        };

        user.Role = "ServiceOwner";

        _context.ServiceBusinesses.Add(serviceBusiness);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Servis hesabı başarıyla oluşturuldu.",
            serviceBusiness = new
            {
                serviceBusiness.Id,
                serviceBusiness.Name,
                serviceBusiness.Phone,
                serviceBusiness.City,
                serviceBusiness.Address,
                serviceBusiness.OwnerUserId,
                serviceBusiness.CreatedAt
            },
            role = user.Role
        });
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMyServiceBusiness()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .Where(s => s.OwnerUserId == userId)
            .Select(s => new
            {
                s.Id,
                s.Name,
                s.Phone,
                s.City,
                s.Address,
                s.OwnerUserId,
                s.CreatedAt
            })
            .FirstOrDefaultAsync();

        if (serviceBusiness == null)
        {
            return NotFound("Servis hesabı bulunamadı.");
        }

        return Ok(serviceBusiness);
    }
}