using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceParts;

public class CreateServicePartDto
{
    [Required(ErrorMessage = "Parça adı zorunludur.")]
    [StringLength(100, MinimumLength = 2,
        ErrorMessage = "Parça adı 2 ile 100 karakter arasında olmalıdır.")]
    public string Name { get; set; } = string.Empty;

    [StringLength(50,
        ErrorMessage = "Parça kodu en fazla 50 karakter olabilir.")]
    public string? Code { get; set; }

    [Range(0, 1000000,
        ErrorMessage = "Alış fiyatı 0 ile 1.000.000 arasında olmalıdır.")]
    public decimal PurchasePrice { get; set; }

    [Range(0, 1000000,
        ErrorMessage = "Satış fiyatı 0 ile 1.000.000 arasında olmalıdır.")]
    public decimal SalePrice { get; set; }

    [Range(0, 100000,
        ErrorMessage = "Stok miktarı 0 ile 100.000 arasında olmalıdır.")]
    public int StockQuantity { get; set; }
}