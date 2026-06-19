namespace AutoTracker.Api.DTOs.ServiceAccountTransactions;

public class CreateServiceAccountTransactionDto
{
    public int ServiceCustomerId { get; set; }

    public int? CustomerVehicleId { get; set; }

    public int? ServiceWorkOrderId { get; set; }

    public string Type { get; set; } = "Receivable";

    public decimal Amount { get; set; }

    public decimal PaidAmount { get; set; }

    public string Description { get; set; } = string.Empty;

    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

    public DateTime? DueDate { get; set; }
}