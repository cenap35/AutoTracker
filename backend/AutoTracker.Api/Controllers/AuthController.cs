using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.Auth;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly AppDbContext _context;

  public AuthController(AppDbContext context)
  {
    _context = context;
  }

  [HttpPost("register")]
  public async Task<ActionResult<AppUser>> Register(RegisterDto dto)
  {
    var emailExists = await _context.AppUsers
    .AnyAsync(u => u.Email == dto.Email);

    if (emailExists)
    {
      return BadRequest("Bu email zaten kayıtlı.");
    }

    var user = new AppUser
    {
      FullName = dto.FullName,
      Email = dto.Email
    };

    user.PasswordHash = new PasswordHasher<AppUser>()  // hashing the password
        .HashPassword(user, dto.Password);

    _context.AppUsers.Add(user);

    await _context.SaveChangesAsync();

    return Ok(user);
  }

  [HttpPost("login")]
  public async Task<ActionResult> Login(LoginDto dto)
  {
    var user = await _context.AppUsers
        .FirstOrDefaultAsync(u => u.Email == dto.Email);

    if (user is null)
    {
      return Unauthorized("Email veya şifre hatalı.");
    }

    var result = new PasswordHasher<AppUser>()
        .VerifyHashedPassword(user, user.PasswordHash, dto.Password);

    if (result == PasswordVerificationResult.Failed)
    {
      return Unauthorized("Email veya şifre hatalı.");
    }

    return Ok(new
    {
      message = "Login başarılı",
      userId = user.Id,
      fullName = user.FullName,
      email = user.Email
    });
  }
}