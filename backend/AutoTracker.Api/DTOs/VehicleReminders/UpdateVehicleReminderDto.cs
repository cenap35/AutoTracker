namespace AutoTracker.Api.DTOs.VehicleReminders;

public class UpdateVehicleReminderDto
{
    public string Type { get; set; } = string.Empty;
    public DateTime DueDate { get; set; }
    public decimal? Amount { get; set; }
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
}