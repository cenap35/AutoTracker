using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AutoTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddServiceAccountTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ServiceAccountTransactions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ServiceBusinessId = table.Column<int>(type: "integer", nullable: false),
                    ServiceCustomerId = table.Column<int>(type: "integer", nullable: false),
                    CustomerVehicleId = table.Column<int>(type: "integer", nullable: true),
                    ServiceWorkOrderId = table.Column<int>(type: "integer", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    PaidAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IsPaid = table.Column<bool>(type: "boolean", nullable: false),
                    TransactionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceAccountTransactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceAccountTransactions_CustomerVehicles_CustomerVehicle~",
                        column: x => x.CustomerVehicleId,
                        principalTable: "CustomerVehicles",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ServiceAccountTransactions_ServiceBusinesses_ServiceBusines~",
                        column: x => x.ServiceBusinessId,
                        principalTable: "ServiceBusinesses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceAccountTransactions_ServiceCustomers_ServiceCustomer~",
                        column: x => x.ServiceCustomerId,
                        principalTable: "ServiceCustomers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServiceAccountTransactions_ServiceWorkOrders_ServiceWorkOrd~",
                        column: x => x.ServiceWorkOrderId,
                        principalTable: "ServiceWorkOrders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceAccountTransactions_CustomerVehicleId",
                table: "ServiceAccountTransactions",
                column: "CustomerVehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceAccountTransactions_ServiceBusinessId",
                table: "ServiceAccountTransactions",
                column: "ServiceBusinessId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceAccountTransactions_ServiceCustomerId",
                table: "ServiceAccountTransactions",
                column: "ServiceCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceAccountTransactions_ServiceWorkOrderId",
                table: "ServiceAccountTransactions",
                column: "ServiceWorkOrderId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceAccountTransactions");
        }
    }
}
