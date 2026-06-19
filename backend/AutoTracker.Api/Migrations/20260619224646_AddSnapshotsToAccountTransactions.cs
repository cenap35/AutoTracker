using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AutoTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSnapshotsToAccountTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomerNameSnapshot",
                table: "ServiceAccountTransactions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PlateSnapshot",
                table: "ServiceAccountTransactions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceTitle",
                table: "ServiceAccountTransactions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VehicleSnapshot",
                table: "ServiceAccountTransactions",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerNameSnapshot",
                table: "ServiceAccountTransactions");

            migrationBuilder.DropColumn(
                name: "PlateSnapshot",
                table: "ServiceAccountTransactions");

            migrationBuilder.DropColumn(
                name: "SourceTitle",
                table: "ServiceAccountTransactions");

            migrationBuilder.DropColumn(
                name: "VehicleSnapshot",
                table: "ServiceAccountTransactions");
        }
    }
}
