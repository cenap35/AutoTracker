using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceWorkOrders;

public class CreateServiceWorkOrderDto
{
    [Required(ErrorMessage = "Araç seçimi zorunludur.")]
    public int CustomerVehicleId { get; set; }

    [Required(ErrorMessage = "İş emri başlığı zorunludur.")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Başlık 3 ile 100 karakter arasında olmalıdır.")]
    public string Title { get; set; } = string.Empty;

    [StringLength(500, ErrorMessage = "Açıklama en fazla 500 karakter olabilir.")]
    public string? Description { get; set; }

    [Range(0, 2000000, ErrorMessage = "Kilometre 0 ile 2.000.000 arasında olmalıdır.")]
    public int Mileage { get; set; }

    [Range(0, 1000000, ErrorMessage = "İşçilik 0 ile 1.000.000 arasında olmalıdır.")]
    public decimal LaborCost { get; set; }

    [Range(0, 1000000, ErrorMessage = "Parça tutarı 0 ile 1.000.000 arasında olmalıdır.")]
    public decimal PartsCost { get; set; }

    [Required(ErrorMessage = "Durum zorunludur.")]
    [RegularExpression("^(Pending|InProgress|Completed)$", ErrorMessage = "Geçerli bir durum seçiniz.")]
    public string Status { get; set; } = "Pending";
}