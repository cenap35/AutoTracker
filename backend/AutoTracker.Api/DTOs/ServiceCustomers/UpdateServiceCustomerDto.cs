using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceCustomers;

public class UpdateServiceCustomerDto
{
    [Required(ErrorMessage = "Ad soyad zorunludur.")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Ad soyad 3 ile 100 karakter arasında olmalıdır.")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Telefon zorunludur.")]
    [StringLength(20, MinimumLength = 10, ErrorMessage = "Telefon 10 ile 20 karakter arasında olmalıdır.")]
    [RegularExpression(@"^[0-9+\-\s()]+$", ErrorMessage = "Telefon sadece rakam, boşluk, +, -, ( ) karakterleri içerebilir.")]
    public string Phone { get; set; } = string.Empty;

    [StringLength(250, ErrorMessage = "Not en fazla 250 karakter olabilir.")]
    public string? Note { get; set; }
}