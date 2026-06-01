using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.VehicleNotes;

public class CreateVehicleNoteDto
{
    [Required]
    public int VehicleId { get; set; }

    [Required]
    [MaxLength(80)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(300)]
    public string Content { get; set; } = string.Empty;

    [MaxLength(20)]
    public string Priority { get; set; } = "Orta";
}