namespace AutoTracker.Api.Models;

public class ServicePart
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Code { get; set; }

    public decimal PurchasePrice { get; set; }

    public decimal SalePrice { get; set; }

    public int StockQuantity { get; set; }

    public int ServiceBusinessId { get; set; }

    public ServiceBusiness ServiceBusiness { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}