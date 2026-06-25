using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceAccountTransactions;

public class CreateServiceAccountTransactionDto
{
    [Required]
    public int ServiceCustomerId { get; set; }

    public int? CustomerVehicleId { get; set; }

    public int? ServiceWorkOrderId { get; set; }

    [Required]
    [RegularExpression("^(Receivable|Payable)$",
        ErrorMessage = "Geçerli bir cari tipi seçiniz.")]
    public string Type { get; set; } = "Receivable";

    [Range(typeof(decimal), "0.01", "1000000")]
    public decimal Amount { get; set; }

    [Range(typeof(decimal), "0", "1000000")]
    public decimal PaidAmount { get; set; }

    [StringLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

    public DateTime? DueDate { get; set; }
}