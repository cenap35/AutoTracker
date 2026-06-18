namespace AutoTracker.Api.Models;

public class ServiceNote
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Content { get; set; }

    public bool IsImportant { get; set; }

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int ServiceBusinessId { get; set; }

    public ServiceBusiness ServiceBusiness { get; set; } = null!;
}