using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceNotes;

public class CreateServiceNoteDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    public string? Content { get; set; }

    public bool IsImportant { get; set; }
}