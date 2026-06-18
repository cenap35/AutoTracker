namespace AutoTracker.Api.Models;

public class ServicePartSale
{
    public int Id { get; set; }

    public int ServicePartId { get; set; }
    public ServicePart ServicePart { get; set; } = null!;

    public int ServiceBusinessId { get; set; }
    public ServiceBusiness ServiceBusiness { get; set; } = null!;

    public int Quantity { get; set; }

    public decimal PurchasePrice { get; set; }

    public decimal SalePrice { get; set; }

    public decimal TotalRevenue { get; set; }

    public decimal TotalProfit { get; set; }

    public DateTime SoldAt { get; set; } = DateTime.UtcNow;
}