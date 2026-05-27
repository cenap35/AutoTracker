namespace AutoTracker.Api.DTOs.VehicleReminders;

public class VehicleReminderDto
{
    public int Id { get; set; }

    public int VehicleId { get; set; }

    public string VehicleName { get; set; } = string.Empty;

    public string PlateNumber { get; set; } = string.Empty;

    public string Type { get; set; } = string.Empty;

    public DateTime DueDate { get; set; }

    public decimal? Amount { get; set; }

    public string? Description { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; }
}