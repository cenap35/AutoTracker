namespace AutoTracker.Api.DTOs.VehicleNotes;

public class VehicleNoteDto
{
    public int Id { get; set; }

    public int VehicleId { get; set; }

    public string VehicleName { get; set; } = string.Empty;
    public string PlateNumber { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;

    public string Priority { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; }
}