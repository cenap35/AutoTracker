using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceParts;

public class UpdateServicePartDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Code { get; set; }

    public decimal PurchasePrice { get; set; }

    public decimal SalePrice { get; set; }

    public int StockQuantity { get; set; }
}