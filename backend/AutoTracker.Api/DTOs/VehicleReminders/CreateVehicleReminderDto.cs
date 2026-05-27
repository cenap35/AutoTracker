namespace AutoTracker.Api.DTOs.VehicleReminders;

public class CreateVehicleReminderDto
{
    public int VehicleId { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateTime DueDate { get; set; }
    public decimal? Amount { get; set; }
    public string? Description { get; set; }
}