using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AutoTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomerVehicle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CustomerVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Brand = table.Column<string>(type: "text", nullable: false),
                    Model = table.Column<string>(type: "text", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Plate = table.Column<string>(type: "text", nullable: false),
                    CurrentMileage = table.Column<int>(type: "integer", nullable: false),
                    ChassisNumber = table.Column<string>(type: "text", nullable: true),
                    ServiceCustomerId = table.Column<int>(type: "integer", nullable: false),
                    ServiceBusinessId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerVehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerVehicles_ServiceBusinesses_ServiceBusinessId",
                        column: x => x.ServiceBusinessId,
                        principalTable: "ServiceBusinesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomerVehicles_ServiceCustomers_ServiceCustomerId",
                        column: x => x.ServiceCustomerId,
                        principalTable: "ServiceCustomers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerVehicles_ServiceBusinessId",
                table: "CustomerVehicles",
                column: "ServiceBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerVehicles_ServiceCustomerId",
                table: "CustomerVehicles",
                column: "ServiceCustomerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerVehicles");
        }
    }
}
