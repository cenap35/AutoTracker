using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.Maintenance;

public class CreateMaintenanceRecordDto
{
    [Required]
    [MaxLength(80)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? Description { get; set; }

    [Range(0, 2000000)]
    public int Mileage { get; set; }

    [Range(0, 10000000)]
    public decimal Cost { get; set; }

    public DateTime MaintenanceDate { get; set; }
}