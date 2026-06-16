namespace AutoTracker.Api.Models;

public class CustomerVehicle
{
    public int Id { get; set; }

    public string Brand { get; set; } = string.Empty;

    public string Model { get; set; } = string.Empty;

    public int Year { get; set; }

    public string Plate { get; set; } = string.Empty;

    public int CurrentMileage { get; set; }

    public string? ChassisNumber { get; set; }

    public int ServiceCustomerId { get; set; }

    public ServiceCustomer ServiceCustomer { get; set; } = null!;

    public int ServiceBusinessId { get; set; }

    public ServiceBusiness ServiceBusiness { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}