namespace AutoTracker.Api.Models;

public class VehicleReminder
{
    public int Id { get; set; }

    public int VehicleId { get; set; }
    public Vehicle Vehicle { get; set; } = null!;

    public string Type { get; set; } = string.Empty; 
    // Sigorta, Kasko, MTV, Muayene

    public DateTime DueDate { get; set; }

    public decimal? Amount { get; set; }

    public string? Description { get; set; }

    public bool IsCompleted { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}