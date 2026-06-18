using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceParts;

public class SellServicePartDto
{
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}