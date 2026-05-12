namespace AutoTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

[Index(nameof(Email), IsUnique = true)] // unique constraint for the email column
public class AppUser
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<Vehicle> Vehicles { get; set; } = new();
}