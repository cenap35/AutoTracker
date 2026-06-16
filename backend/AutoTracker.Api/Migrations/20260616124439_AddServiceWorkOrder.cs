using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AutoTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddServiceWorkOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceWorkOrders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Mileage = table.Column<int>(type: "integer", nullable: false),
                    LaborCost = table.Column<decimal>(type: "numeric", nullable: false),
                    PartsCost = table.Column<decimal>(type: "numeric", nullable: false),
                    TotalCost = table.Column<decimal>(type: "numeric", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CustomerVehicleId = table.Column<int>(type: "integer", nullable: false),
                    ServiceBusinessId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceWorkOrders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceWorkOrders_CustomerVehicles_CustomerVehicleId",
                        column: x => x.CustomerVehicleId,
                        principalTable: "CustomerVehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceWorkOrders_ServiceBusinesses_ServiceBusinessId",
                        column: x => x.ServiceBusinessId,
                        principalTable: "ServiceBusinesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceWorkOrders_CustomerVehicleId",
                table: "ServiceWorkOrders",
                column: "CustomerVehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceWorkOrders_ServiceBusinessId",
                table: "ServiceWorkOrders",
                column: "ServiceBusinessId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceWorkOrders");
        }
    }
}
