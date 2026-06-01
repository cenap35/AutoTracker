using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.VehicleReminders;

public class CreateVehicleReminderDto
{
    [Required]
    public int VehicleId { get; set; }

    [Required]
    [MaxLength(50)]
    public string Type { get; set; } = string.Empty;

    public DateTime DueDate { get; set; }

    [Range(0, 1000000)]
    public decimal? Amount { get; set; }

    [MaxLength(150)]
    public string? Description { get; set; }
}