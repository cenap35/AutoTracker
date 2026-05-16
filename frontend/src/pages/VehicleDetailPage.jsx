import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../services/vehicleService";
import {
  getMaintenanceRecords,
  createMaintenanceRecord,
} from "../services/maintenanceService";

function VehicleDetailPage() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
        const records = await getMaintenanceRecords(id);
        setMaintenanceRecords(records);
      } catch (err) {
        setError("Araç detayı yüklenemedi");
        console.error(err);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleCreateMaintenanceRecord = async (e) => {
    e.preventDefault();

    try {
      const newRecord = await createMaintenanceRecord(id, {
        title,
        description,
        mileage: Number(mileage),
        cost: Number(cost),
        maintenanceDate:new Date(maintenanceDate).toISOString(),
      });

      setMaintenanceRecords([...maintenanceRecords, newRecord]);

      setTitle("");
      setDescription("");
      setMileage("");
      setCost("");
      setMaintenanceDate("");
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!vehicle) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>
        {vehicle.brand} {vehicle.model}
      </h1>

      <p>Year: {vehicle.year}</p>
      <p>Plate: {vehicle.plateNumber}</p>
      <p>Mileage: {vehicle.currentMileage}</p>

      <h2>Maintenance Records</h2>
      <form onSubmit={handleCreateMaintenanceRecord}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
        />
        <input
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <input
          type="datetime-local"
          value={maintenanceDate}
          onChange={(e) => setMaintenanceDate(e.target.value)}
        />

        <button type="submit">Add Maintenance Record</button>
      </form>

      {maintenanceRecords.length === 0 && <p>No maintenance records yet.</p>}

      {maintenanceRecords.map((record) => (
        <div key={record.id}>
          <h3>{record.title}</h3>
          <p>{record.description}</p>
          <p>Mileage: {record.mileage}</p>
          <p>Cost: {record.cost}</p>
          <p>Date: {record.maintenanceDate}</p>
        </div>
      ))}
    </div>
  );
}

export default VehicleDetailPage;
