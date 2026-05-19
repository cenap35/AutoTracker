using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.Auth;

public class ResendConfirmationEmailDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}