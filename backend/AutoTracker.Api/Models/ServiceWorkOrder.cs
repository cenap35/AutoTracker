namespace AutoTracker.Api.Models;

public class ServiceWorkOrder
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int Mileage { get; set; }

    public decimal LaborCost { get; set; }

    public decimal PartsCost { get; set; }

    public decimal TotalCost { get; set; }

    public string Status { get; set; } = "Pending";

    public int CustomerVehicleId { get; set; }

    public CustomerVehicle CustomerVehicle { get; set; } = null!;

    public int ServiceBusinessId { get; set; }

    public ServiceBusiness ServiceBusiness { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? CompletedAt { get; set; }
}