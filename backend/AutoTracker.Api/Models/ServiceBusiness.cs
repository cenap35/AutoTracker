namespace AutoTracker.Api.Models;

public class ServiceBusiness
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string? Address { get; set; }

    public int OwnerUserId { get; set; }

    public AppUser OwnerUser { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<ServiceCustomer> Customers { get; set; } = new();
    public List<CustomerVehicle> CustomerVehicles { get; set; } = new();
    public List<ServiceWorkOrder> WorkOrders { get; set; } = new();
    public List<ServicePart> Parts { get; set; } = new();
    public List<ServiceNote> Notes { get; set; } = new();
    public List<ServicePartSale> PartSales { get; set; } = new();
}