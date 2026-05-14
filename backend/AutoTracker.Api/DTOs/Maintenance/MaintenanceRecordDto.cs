namespace AutoTracker.Api.DTOs.Maintenance;

public class MaintenanceRecordDto
{
    public int Id { get; set; }

    public int VehicleId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int Mileage { get; set; }

    public decimal Cost { get; set; }

    public DateTime MaintenanceDate { get; set; }

    public DateTime CreatedAt { get; set; }
}