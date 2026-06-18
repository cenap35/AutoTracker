using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.ServiceNotes;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServiceNotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public ServiceNotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetNotes()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var notes = await _context.ServiceNotes
            .Where(n => n.ServiceBusinessId == serviceBusiness.Id)
            .OrderByDescending(n => n.IsImportant)
            .ThenBy(n => n.IsCompleted)
            .ThenByDescending(n => n.CreatedAt)
            .Select(n => new
            {
                n.Id,
                n.Title,
                n.Content,
                n.IsImportant,
                n.IsCompleted,
                n.CreatedAt,
                n.ServiceBusinessId
            })
            .ToListAsync();

        return Ok(notes);
    }

    [HttpPost]
    public async Task<IActionResult> CreateNote(CreateServiceNoteDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var note = new ServiceNote
        {
            Title = dto.Title,
            Content = dto.Content,
            IsImportant = dto.IsImportant,
            IsCompleted = false,
            ServiceBusinessId = serviceBusiness.Id
        };

        _context.ServiceNotes.Add(note);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            note.Id,
            note.Title,
            note.Content,
            note.IsImportant,
            note.IsCompleted,
            note.CreatedAt,
            note.ServiceBusinessId
        });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNote(int id, UpdateServiceNoteDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var note = await _context.ServiceNotes
            .FirstOrDefaultAsync(n =>
                n.Id == id &&
                n.ServiceBusinessId == serviceBusiness.Id);

        if (note == null)
            return NotFound("Not bulunamadı.");

        note.Title = dto.Title;
        note.Content = dto.Content;
        note.IsImportant = dto.IsImportant;
        note.IsCompleted = dto.IsCompleted;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            note.Id,
            note.Title,
            note.Content,
            note.IsImportant,
            note.IsCompleted,
            note.CreatedAt,
            note.ServiceBusinessId
        });
    }

    [HttpPut("{id}/toggle")]
    public async Task<IActionResult> ToggleCompleted(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var note = await _context.ServiceNotes
            .FirstOrDefaultAsync(n =>
                n.Id == id &&
                n.ServiceBusinessId == serviceBusiness.Id);

        if (note == null)
            return NotFound("Not bulunamadı.");

        note.IsCompleted = !note.IsCompleted;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            note.Id,
            note.IsCompleted
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var serviceBusiness = await _context.ServiceBusinesses
            .FirstOrDefaultAsync(s => s.OwnerUserId == userId);

        if (serviceBusiness == null)
            return NotFound("Servis hesabı bulunamadı.");

        var note = await _context.ServiceNotes
            .FirstOrDefaultAsync(n =>
                n.Id == id &&
                n.ServiceBusinessId == serviceBusiness.Id);

        if (note == null)
            return NotFound("Not bulunamadı.");

        _context.ServiceNotes.Remove(note);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}