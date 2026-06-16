using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceCustomers;

public class CreateServiceCustomerDto
{
    [Required]
    [MinLength(2)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    public string? Note { get; set; }
}