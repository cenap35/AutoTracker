using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.CustomerVehicles;

public class UpdateCustomerVehicleDto
{
    [Required]
    public int ServiceCustomerId { get; set; }

    [Required]
    public string Brand { get; set; } = string.Empty;

    [Required]
    public string Model { get; set; } = string.Empty;

    public int Year { get; set; }

    [Required]
    public string Plate { get; set; } = string.Empty;

    public int CurrentMileage { get; set; }

    public string? ChassisNumber { get; set; }
}