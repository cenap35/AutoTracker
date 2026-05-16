import { useEffect, useState } from "react";
import {
  getVehicles,
  createVehicle,
  deleteVehicle,
} from "../services/vehicleService";

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await getVehicles();
        setVehicles(data);
      } catch (err) {
        setError("Araçlar yüklenemedi");
        console.error(err);
      }
    };

    fetchVehicles();
  }, []);

  const handleCreateVehicle = async (e) => {
    e.preventDefault();

    try {
      const newVehicle = await createVehicle({
        brand,
        model,
        year: Number(year),
        plateNumber,
        currentMileage: Number(currentMileage),
      });

      setVehicles([...vehicles, newVehicle]);

      setBrand("");
      setModel("");
      setYear("");
      setPlateNumber("");
      setCurrentMileage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await deleteVehicle(id);

      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Vehicles Page</h1>

      <form onSubmit={handleCreateVehicle}>
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          placeholder="Plate Number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
        <input
          placeholder="Current Mileage"
          value={currentMileage}
          onChange={(e) => setCurrentMileage(e.target.value)}
        />

        <button type="submit">Add Vehicle</button>
      </form>

      {error && <p>{error}</p>}

      {vehicles.map((vehicle) => (
        <div key={vehicle.id}>
          <h3>
            {vehicle.brand} {vehicle.model}
          </h3>
          <p>Yıl: {vehicle.year}</p>
          <p>Plaka: {vehicle.plateNumber}</p>
          <p>KM: {vehicle.currentMileage}</p>

          <button onClick={() => handleDeleteVehicle(vehicle.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default VehiclesPage;
