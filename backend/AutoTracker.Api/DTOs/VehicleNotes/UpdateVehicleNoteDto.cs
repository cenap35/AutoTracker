using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.VehicleNotes;

public class UpdateVehicleNoteDto
{
    [Required]
    [MaxLength(80)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(300)]
    public string Content { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Priority { get; set; } = "Orta";

    public bool IsCompleted { get; set; }
}