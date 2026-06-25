using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceAccountTransactions;

public class UpdateServiceAccountTransactionDto
{
    [Required]
    public int ServiceCustomerId { get; set; }

    public int? CustomerVehicleId { get; set; }

    public int? ServiceWorkOrderId { get; set; }

    [Required]
    [RegularExpression("Receivable|Payable",
        ErrorMessage = "Geçersiz cari işlem tipi.")]
    public string Type { get; set; } = "Receivable";

    [Range(typeof(decimal), "0.01", "1000000")]
    public decimal Amount { get; set; }

    [Range(typeof(decimal), "0", "1000000")]
    public decimal PaidAmount { get; set; }

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    public bool IsPaid { get; set; }

    [Required]
    public DateTime TransactionDate { get; set; }

    public DateTime? DueDate { get; set; }
}