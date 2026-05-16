import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById, updateVehicle } from "../services/vehicleService";
import {
  getMaintenanceRecords,
  createMaintenanceRecord,
  deleteMaintenanceRecord,
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
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
        setBrand(data.brand);
        setModel(data.model);
        setYear(data.year);
        setPlateNumber(data.plateNumber);
        setCurrentMileage(data.currentMileage);
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
        maintenanceDate: new Date(maintenanceDate).toISOString(),
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

  const handleDeleteMaintenanceRecord = async (recordId) => {
    try {
      await deleteMaintenanceRecord(id, recordId);

      setMaintenanceRecords(
        maintenanceRecords.filter((record) => record.id !== recordId),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();

    try {
      await updateVehicle(id, {
        brand,
        model,
        year: Number(year),
        plateNumber,
        currentMileage: Number(currentMileage),
      });

      const updatedVehicle = await getVehicleById(id);
      setVehicle(updatedVehicle);
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
    <div className="page-container">
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
          <button onClick={() => handleDeleteMaintenanceRecord(record.id)}>
            Delete
          </button>

          <form onSubmit={handleUpdateVehicle}>
            <input value={brand} onChange={(e) => setBrand(e.target.value)} />
            <input value={model} onChange={(e) => setModel(e.target.value)} />
            <input value={year} onChange={(e) => setYear(e.target.value)} />
            <input
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
            <input
              value={currentMileage}
              onChange={(e) => setCurrentMileage(e.target.value)}
            />

            <button type="submit">Update Vehicle</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default VehicleDetailPage;
