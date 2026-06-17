using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceCustomers;

public class UpdateServiceCustomerDto
{
    [Required]
    public string FullName { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string? Note { get; set; }
}