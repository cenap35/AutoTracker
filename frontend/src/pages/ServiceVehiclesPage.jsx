import { useEffect, useState } from "react";
import { getCustomerVehicles } from "../services/customerVehicleService";

function ServiceVehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await getCustomerVehicles();
    setVehicles(data);
  };

  return (
    <div>
      <h2>Araçlar</h2>

      <div className="mt-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card mb-3">
            <div className="card-body">
              <h5>
                {vehicle.brand} {vehicle.model}
              </h5>

              <p className="mb-1">
                <strong>Plaka:</strong> {vehicle.plate}
              </p>

              <p className="mb-1">
                <strong>Müşteri:</strong> {vehicle.customerName}
              </p>

              <p className="mb-0">
                <strong>KM:</strong> {vehicle.currentMileage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceVehiclesPage;