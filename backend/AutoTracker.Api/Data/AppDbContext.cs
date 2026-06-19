using AutoTracker.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoTracker.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Vehicle> Vehicles { get; set; } = null!;
    public DbSet<AppUser> AppUsers { get; set; } = null!;
    public DbSet<MaintenanceRecord> MaintenanceRecords { get; set; } = null!;
    public DbSet<VehicleNote> VehicleNotes { get; set; }  = null!;
    public DbSet<VehicleReminder> VehicleReminders { get; set; }
    public DbSet<ServiceBusiness> ServiceBusinesses { get; set; }
    public DbSet<ServiceCustomer> ServiceCustomers { get; set; }
    public DbSet<CustomerVehicle> CustomerVehicles { get; set; }
    public DbSet<ServiceWorkOrder> ServiceWorkOrders { get; set; }
    public DbSet<ServicePart> ServiceParts { get; set; }
    public DbSet<ServiceNote> ServiceNotes { get; set; }
    public DbSet<ServicePartSale> ServicePartSales { get; set; }
    public DbSet<ServiceAccountTransaction> ServiceAccountTransactions { get; set; }
}