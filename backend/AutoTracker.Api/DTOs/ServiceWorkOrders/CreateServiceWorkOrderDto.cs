using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceWorkOrders;

public class CreateServiceWorkOrderDto
{
    [Required]
    public int CustomerVehicleId { get; set; }

    [Required]
    [MinLength(2)]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int Mileage { get; set; }

    public decimal LaborCost { get; set; }

    public decimal PartsCost { get; set; }

    public string Status { get; set; } = "Pending";
}