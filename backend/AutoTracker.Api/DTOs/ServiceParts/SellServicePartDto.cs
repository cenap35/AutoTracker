using System.ComponentModel.DataAnnotations;

namespace AutoTracker.Api.DTOs.ServiceParts;

public class SellServicePartDto
{
    [Range(1, int.MaxValue,
        ErrorMessage = "Satış adedi en az 1 olmalıdır.")]
    public int Quantity { get; set; }
}