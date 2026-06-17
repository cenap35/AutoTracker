using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceBusinesses;

public class UpdateServiceBusinessDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string? Address { get; set; }
}