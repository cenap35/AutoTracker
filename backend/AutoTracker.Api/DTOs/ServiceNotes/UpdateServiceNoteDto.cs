using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceNotes;

public class UpdateServiceNoteDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    public string? Content { get; set; }

    public bool IsImportant { get; set; }

    public bool IsCompleted { get; set; }
}