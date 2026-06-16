using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceBusinesses;

public class CreateServiceBusinessDto
{
    [Required]
    [MinLength(2)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string City { get; set; } = string.Empty;

    public string? Address { get; set; }
}