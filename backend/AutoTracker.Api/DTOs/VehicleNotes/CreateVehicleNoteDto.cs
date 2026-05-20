using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.VehicleNotes;

public class CreateVehicleNoteDto
{
    [Required]
    public int VehicleId { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public string Content { get; set; } = string.Empty;

    public string Priority { get; set; } = "Orta";
}