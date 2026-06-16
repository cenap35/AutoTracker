namespace AutoTracker.Api.Models;

public class ServiceCustomer
{
    public int Id { get; set; }

    public string FullName { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string? Note { get; set; }

    public int ServiceBusinessId { get; set; }

    public ServiceBusiness ServiceBusiness { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}