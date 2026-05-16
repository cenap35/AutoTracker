import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";

function DashboardPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
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
    <div>
    <h1>Dashboard</h1>
  
    <h2>Total Vehicles: {summary.totalVehicles}</h2>
  
    <h2>
      Total Maintenance Records: {summary.totalMaintenanceRecords}
    </h2>
  
    <h2>
      Total Maintenance Cost: ₺{summary.totalMaintenanceCost}
    </h2>
  </div>
  );
}

export default DashboardPage;
