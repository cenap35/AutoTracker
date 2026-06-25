using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceNotes;

public class UpdateServiceNoteDto
{
    [Required(ErrorMessage = "Başlık zorunludur.")]
    [StringLength(100, MinimumLength = 3,
        ErrorMessage = "Başlık 3 ile 100 karakter arasında olmalıdır.")]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000,
        ErrorMessage = "Not içeriği en fazla 1000 karakter olabilir.")]
    public string? Content { get; set; }

    public bool IsImportant { get; set; }

    public bool IsCompleted { get; set; }
}