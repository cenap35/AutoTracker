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
using AutoTracker.Api.Services;
using Microsoft.AspNetCore.Authorization;

namespace AutoTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly AppDbContext _context;
  private readonly EmailService _emailService;
  private readonly IConfiguration _configuration;

  public AuthController(AppDbContext context, EmailService emailService, IConfiguration configuration)
  {
    _context = context;
    _emailService = emailService;
    _configuration = configuration;
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

    var emailToken = Guid.NewGuid().ToString();

    var user = new AppUser
    {
      FullName = dto.FullName,
      Email = dto.Email,
      IsEmailConfirmed = false,
      EmailConfirmationToken = emailToken,
      EmailConfirmationTokenExpiresAt = DateTime.UtcNow.AddHours(24)
    };

    user.PasswordHash = new PasswordHasher<AppUser>()
        .HashPassword(user, dto.Password);

    _context.AppUsers.Add(user);

    await _context.SaveChangesAsync();

    var frontendBaseUrl = _configuration["Frontend:BaseUrl"];
    var confirmationLink =

        $"{frontendBaseUrl}/confirm-email?token={emailToken}";

    try
    {
      await _emailService.SendEmailAsync(
          user.Email,
          "AutoTracker Email Doğrulama",
          $@"
        <h2>AutoTracker Email Doğrulama</h2>
        <p>Merhaba {user.FullName},</p>
        <p>Hesabınızı aktifleştirmek için aşağıdaki linke tıklayın:</p>
        <a href='{confirmationLink}'>Email adresimi doğrula</a>
        "
      );
    }
    catch
    {
      _context.AppUsers.Remove(user);

      await _context.SaveChangesAsync();

      return StatusCode(
          500,
          "Kayıt oluşturulamadı. Doğrulama emaili gönderilemedi."
      );
    }

    return Ok("Kayıt başarılı. Lütfen email adresinizi doğrulayın.");
  }

  [HttpGet("confirm-email")]  //email validate
  public async Task<IActionResult> ConfirmEmail(string token)
  {
    var user = await _context.AppUsers
        .FirstOrDefaultAsync(u => u.EmailConfirmationToken == token);

    if (user == null)
    {
      return BadRequest("Geçersiz doğrulama linki.");
    }

    if (user.EmailConfirmationTokenExpiresAt < DateTime.UtcNow)
    {
      return BadRequest("Doğrulama linkinin süresi dolmuş.");
    }

    user.IsEmailConfirmed = true;
    user.EmailConfirmationToken = null;
    user.EmailConfirmationTokenExpiresAt = null;

    await _context.SaveChangesAsync();

    return Ok("Email başarıyla doğrulandı.");
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
    if (!user.IsEmailConfirmed)
    {
      return Unauthorized("Lütfen email adresinizi doğrulayın.");
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


  [HttpPost("resend-confirmation-email")]
  public async Task<ActionResult> ResendConfirmationEmail(
    ResendConfirmationEmailDto dto)
  {
    var user = await _context.AppUsers
        .FirstOrDefaultAsync(u => u.Email == dto.Email);

    if (user == null)
    {
      return BadRequest("Kullanıcı bulunamadı.");
    }

    if (user.IsEmailConfirmed)
    {
      return BadRequest("Email zaten doğrulanmış.");
    }

    var newToken = Guid.NewGuid().ToString();

    user.EmailConfirmationToken = newToken;
    user.EmailConfirmationTokenExpiresAt =
        DateTime.UtcNow.AddHours(24);

    await _context.SaveChangesAsync();

    var frontendBaseUrl = _configuration["Frontend:BaseUrl"];
    var confirmationLink =
    $"{frontendBaseUrl}/confirm-email?token={newToken}";

    try
    {
      await _emailService.SendEmailAsync(
          user.Email,
          "AutoTracker Email Doğrulama",
          $@"
        <h2>AutoTracker Email Doğrulama</h2>
        <p>Merhaba {user.FullName},</p>
        <p>Yeni doğrulama linkiniz:</p>
        <a href='{confirmationLink}'>
            Email adresimi doğrula
        </a>
        "
      );
    }
    catch
    {
      return StatusCode(
          500,
          "Email gönderilemedi. Lütfen biraz sonra tekrar deneyin."
      );
    }

    return Ok("Doğrulama emaili tekrar gönderildi.");
  }

  [HttpPost("forgot-password")]
  public async Task<ActionResult> ForgotPassword(ForgotPasswordDto dto)
  {
    var user = await _context.AppUsers
        .FirstOrDefaultAsync(u => u.Email == dto.Email);

    if (user == null)
    {
      return Ok("Eğer bu email kayıtlıysa şifre sıfırlama bağlantısı gönderildi.");
    }

    var resetToken = Guid.NewGuid().ToString();

    user.PasswordResetToken = resetToken;
    user.PasswordResetTokenExpiresAt = DateTime.UtcNow.AddHours(1);

    await _context.SaveChangesAsync();

    var frontendBaseUrl = _configuration["Frontend:BaseUrl"];
    var resetLink =
    $"{frontendBaseUrl}/reset-password?token={resetToken}";

    try
    {
      await _emailService.SendEmailAsync(
          user.Email,
          "AutoTracker Şifre Sıfırlama",
          $@"
        <h2>AutoTracker Şifre Sıfırlama</h2>
        <p>Merhaba {user.FullName},</p>
        <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:</p>
        <a href='{resetLink}'>Şifremi sıfırla</a>
        "
      );
    }
    catch
    {
      return StatusCode(
          500,
          "Şifre sıfırlama emaili gönderilemedi. Lütfen biraz sonra tekrar deneyin."
      );
    }

    return Ok("Eğer bu email kayıtlıysa şifre sıfırlama bağlantısı gönderildi.");
  }


  [HttpPost("reset-password")]
  public async Task<ActionResult> ResetPassword(ResetPasswordDto dto)
  {
    var user = await _context.AppUsers
        .FirstOrDefaultAsync(u => u.PasswordResetToken == dto.Token);

    if (user == null)
    {
      return BadRequest("Geçersiz şifre sıfırlama linki.");
    }

    if (user.PasswordResetTokenExpiresAt < DateTime.UtcNow)
    {
      return BadRequest("Şifre sıfırlama linkinin süresi dolmuş.");
    }

    user.PasswordHash = new PasswordHasher<AppUser>()
        .HashPassword(user, dto.NewPassword);

    user.PasswordResetToken = null;
    user.PasswordResetTokenExpiresAt = null;

    await _context.SaveChangesAsync();

    return Ok("Şifre başarıyla güncellendi.");
  }


  [HttpPost("change-password")]
  [Authorize]
  public async Task<ActionResult> ChangePassword(ChangePasswordDto dto)
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var user = await _context.AppUsers.FindAsync(userId);

    if (user == null)
    {
      return Unauthorized("Kullanıcı bulunamadı.");
    }

    if (dto.NewPassword != dto.ConfirmNewPassword)
    {
      return BadRequest("Yeni şifreler eşleşmiyor.");
    }

    if (dto.NewPassword.Length < 6)
    {
      return BadRequest("Yeni şifre en az 6 karakter olmalıdır.");
    }

    var passwordHasher = new PasswordHasher<AppUser>();

    var result = passwordHasher.VerifyHashedPassword(
        user,
        user.PasswordHash,
        dto.CurrentPassword
    );

    if (result == PasswordVerificationResult.Failed)
    {
      return BadRequest("Mevcut şifre hatalı.");
    }

    user.PasswordHash = passwordHasher.HashPassword(user, dto.NewPassword);

    await _context.SaveChangesAsync();

    return Ok("Şifre başarıyla güncellendi.");
  }


  [HttpDelete("delete-account")]
  [Authorize]
  public async Task<ActionResult> DeleteAccount()
  {
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    var user = await _context.AppUsers.FindAsync(userId);

    if (user == null)
    {
      return Unauthorized("Kullanıcı bulunamadı.");
    }

    _context.AppUsers.Remove(user);

    await _context.SaveChangesAsync();

    return Ok("Hesap başarıyla silindi.");
  }

}