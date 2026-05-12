using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.Models;

public class Vehicle
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Brand { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Model { get; set; } = string.Empty;

    [Required]
    [Range(1900, 2026)]
    public int Year { get; set; }

    [Required]
    [MaxLength(10)]
    public string PlateNumber { get; set; } = string.Empty;
    
    [Required]
    [Range(0, 2000000)]
    public int CurrentMileage { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}