using AutoTracker.Api.Data;
using AutoTracker.Api.DTOs.Auth;
using AutoTracker.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

    var token = CreateToken(user);

    return Ok(new
    {
      message = "Login başarılı",
      token = token,
      userId = user.Id,
      fullName = user.FullName,
      email = user.Email
    });
  }
  private string CreateToken(AppUser user)  // creating the token for the user jwt
  {
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.FullName),
        new Claim(ClaimTypes.Email, user.Email)
    };

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(
            HttpContext.RequestServices
                .GetRequiredService<IConfiguration>()["Jwt:Key"]!
        )
    );

    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: HttpContext.RequestServices.GetRequiredService<IConfiguration>()["Jwt:Issuer"],
        audience: HttpContext.RequestServices.GetRequiredService<IConfiguration>()["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }
}