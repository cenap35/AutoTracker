using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs;

public class CreateVehicleDto
{
    [Required]
    [MinLength(2)]
    [MaxLength(50)]
    public string Brand { get; set; } = string.Empty;

    [Required]
    [MinLength(1)]
    [MaxLength(50)]
    public string Model { get; set; } = string.Empty;

    [Range(1900, 2026)]
    public int Year { get; set; }

    [Required]
    [MinLength(5)]
    [MaxLength(15)]
    public string PlateNumber { get; set; } = string.Empty;

    [Range(0, 2000000)]
    public int CurrentMileage { get; set; }

    [Required]
    public int AppUserId { get; set; }
}