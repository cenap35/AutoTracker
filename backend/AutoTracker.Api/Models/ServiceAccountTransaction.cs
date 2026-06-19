namespace AutoTracker.Api.Models;

public class ServiceAccountTransaction
{
    public int Id { get; set; }

    public int ServiceBusinessId { get; set; }
    public ServiceBusiness ServiceBusiness { get; set; } = null!;

    public int ServiceCustomerId { get; set; }
    public ServiceCustomer ServiceCustomer { get; set; } = null!;

    public int? CustomerVehicleId { get; set; }
    public CustomerVehicle? CustomerVehicle { get; set; }

    public int? ServiceWorkOrderId { get; set; }
    public ServiceWorkOrder? ServiceWorkOrder { get; set; }

    public string Type { get; set; } = "Receivable"; 
    // Receivable = Alacak
    // Payable = Verecek

    public decimal Amount { get; set; }
    public decimal PaidAmount { get; set; }

    public decimal RemainingAmount => Amount - PaidAmount;

    public string Description { get; set; } = string.Empty;

    public bool IsPaid { get; set; }

    public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
    public DateTime? DueDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}