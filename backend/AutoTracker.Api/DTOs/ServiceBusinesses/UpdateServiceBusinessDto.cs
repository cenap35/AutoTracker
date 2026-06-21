using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceBusinesses;

public class UpdateServiceBusinessDto
{
    [Required(ErrorMessage = "Servis adı zorunludur.")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Servis adı 3 ile 100 karakter arasında olmalıdır.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Telefon zorunludur.")]
    [StringLength(20, MinimumLength = 10, ErrorMessage = "Telefon 10 ile 20 karakter arasında olmalıdır.")]
    [RegularExpression(@"^[0-9+\-\s()]+$", ErrorMessage = "Telefon sadece rakam, boşluk, +, -, ( ) karakterleri içerebilir.")]
    public string Phone { get; set; } = string.Empty;

    [Required(ErrorMessage = "Şehir zorunludur.")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Şehir 2 ile 50 karakter arasında olmalıdır.")]
    public string City { get; set; } = string.Empty;

    [Required(ErrorMessage = "Adres zorunludur.")]
    [StringLength(250, MinimumLength = 5, ErrorMessage = "Adres 5 ile 250 karakter arasında olmalıdır.")]
    public string Address { get; set; } = string.Empty;
}