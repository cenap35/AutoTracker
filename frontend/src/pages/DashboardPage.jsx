import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import { getVehicles } from "../services/vehicleService";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
        const vehiclesData = await getVehicles();
        setVehicles(vehiclesData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page-container">
      <h1>Dashboard</h1>

      <h2>Total Vehicles: {summary.totalVehicles}</h2>

      <h2>Total Maintenance Records: {summary.totalMaintenanceRecords}</h2>

      <h2>Total Maintenance Cost: ₺{summary.totalMaintenanceCost}</h2>

      <h2>My Vehicles</h2>

      {vehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <h3>
            {vehicle.brand} {vehicle.model}
          </h3>
          <p>Year: {vehicle.year}</p>
          <p>Plate: {vehicle.plateNumber}</p>
          <p>Mileage: {vehicle.currentMileage}</p>
          <Link to={`/vehicles/${vehicle.id}`}>Details</Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
