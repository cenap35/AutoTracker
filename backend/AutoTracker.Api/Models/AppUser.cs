namespace AutoTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Email), IsUnique = true)] // unique constraint for the email column
public class AppUser
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = "User";

    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsEmailConfirmed { get; set; } = false;

    public string? EmailConfirmationToken { get; set; }

    public DateTime? EmailConfirmationTokenExpiresAt { get; set; }
    public string? PasswordResetToken { get; set; }

    public DateTime? PasswordResetTokenExpiresAt { get; set; }

    public List<Vehicle> Vehicles { get; set; } = new();

}