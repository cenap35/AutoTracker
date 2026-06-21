using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.CustomerVehicles;

public class CreateCustomerVehicleDto
{
    [Required(ErrorMessage = "Müşteri seçimi zorunludur.")]
    public int ServiceCustomerId { get; set; }

    [Required(ErrorMessage = "Marka zorunludur.")]
    [StringLength(50, MinimumLength = 2,
        ErrorMessage = "Marka 2 ile 50 karakter arasında olmalıdır.")]
    public string Brand { get; set; } = string.Empty;

    [Required(ErrorMessage = "Model zorunludur.")]
    [StringLength(50,
        ErrorMessage = "Model en fazla 50 karakter olabilir.")]
    public string Model { get; set; } = string.Empty;

    [Range(1900, 2100,
        ErrorMessage = "Yıl 1900 ile 2100 arasında olmalıdır.")]
    public int? Year { get; set; }

    [Required(ErrorMessage = "Plaka zorunludur.")]
    [StringLength(20, MinimumLength = 5,
        ErrorMessage = "Plaka 5 ile 20 karakter arasında olmalıdır.")]
    public string Plate { get; set; } = string.Empty;

    [Range(0, 2000000,
        ErrorMessage = "Kilometre 0 ile 2.000.000 arasında olmalıdır.")]
    public int? CurrentMileage { get; set; }

    [StringLength(50,
        ErrorMessage = "Şasi no en fazla 50 karakter olabilir.")]
    public string? ChassisNumber { get; set; }
}