using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class SetNullForAccountTransactionRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceAccountTransactions_CustomerVehicles_CustomerVehicle~",
                table: "ServiceAccountTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceAccountTransactions_ServiceWorkOrders_ServiceWorkOrd~",
                table: "ServiceAccountTransactions");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceAccountTransactions_CustomerVehicles_CustomerVehicle~",
                table: "ServiceAccountTransactions",
                column: "CustomerVehicleId",
                principalTable: "CustomerVehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceAccountTransactions_ServiceWorkOrders_ServiceWorkOrd~",
                table: "ServiceAccountTransactions",
                column: "ServiceWorkOrderId",
                principalTable: "ServiceWorkOrders",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ServiceAccountTransactions_CustomerVehicles_CustomerVehicle~",
                table: "ServiceAccountTransactions");

            migrationBuilder.DropForeignKey(
                name: "FK_ServiceAccountTransactions_ServiceWorkOrders_ServiceWorkOrd~",
                table: "ServiceAccountTransactions");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceAccountTransactions_CustomerVehicles_CustomerVehicle~",
                table: "ServiceAccountTransactions",
                column: "CustomerVehicleId",
                principalTable: "CustomerVehicles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ServiceAccountTransactions_ServiceWorkOrders_ServiceWorkOrd~",
                table: "ServiceAccountTransactions",
                column: "ServiceWorkOrderId",
                principalTable: "ServiceWorkOrders",
                principalColumn: "Id");
        }
    }
}
