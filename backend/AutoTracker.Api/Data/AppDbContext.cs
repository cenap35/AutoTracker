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
}