import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getVehicles } from "../services/vehicleService";
import {
  getVehicleReminders,
  createVehicleReminder,
  updateVehicleReminder,
  deleteVehicleReminder,
} from "../services/vehicleReminderService";

function ReminderPage() {
  const [vehicles, setVehicles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

  const [vehicleId, setVehicleId] = useState("");
  const [type, setType] = useState("Sigorta");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehiclesData = await getVehicles();
        const remindersData = await getVehicleReminders();

        setVehicles(vehiclesData);
        setReminders(remindersData);
      } catch (err) {
        setError("Takipler yüklenemedi.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleCreateReminder = async (e) => {
    e.preventDefault();

    try {
      const newReminder = await createVehicleReminder({
        vehicleId: Number(vehicleId),
        type,
        dueDate: new Date(dueDate).toISOString(),
        amount: amount ? Number(amount) : null,
        description,
      });

      setReminders([newReminder, ...reminders]);
      setVehicleId("");
      setType("Sigorta");
      setDueDate("");
      setAmount("");
      setDescription("");
      setError("");
    } catch (err) {
      setError("Takip eklenemedi.");
      console.error(err);
    }
  };

  const handleToggleCompleted = async (reminder) => {
    const updatedData = {
      type: reminder.type,
      dueDate: reminder.dueDate,
      amount: reminder.amount,
      description: reminder.description,
      isCompleted: !reminder.isCompleted,
    };

    try {
      await updateVehicleReminder(reminder.id, updatedData);

      setReminders(
        reminders.map((item) =>
          item.id === reminder.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        )
      );
    } catch (err) {
      setError("Takip güncellenemedi.");
      console.error(err);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteVehicleReminder(id);
      setReminders(reminders.filter((reminder) => reminder.id !== id));
    } catch (err) {
      setError("Takip silinemedi.");
      console.error(err);
    }
  };

  return (
    <PageWrapper>
      <div className="container py-5">
        <h1 className="fw-bold mb-2" style={{ color: "#314286" }}>
          <i className="bi bi-calendar-check me-2"></i>
          Takipler
        </h1>

        <p className="text-muted mb-4">
          Sigorta, kasko, MTV ve muayene tarihlerini araç bazlı takip edin.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: 16 }}>
          <div className="card-body">
            <h5 className="fw-bold mb-3">Yeni Takip Ekle</h5>

            <form onSubmit={handleCreateReminder}>
              <div className="row g-2">
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    required
                  >
                    <option value="">Araç seç...</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} - {vehicle.plateNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2">
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Sigorta">Sigorta</option>
                    <option value="Kasko">Kasko</option>
                    <option value="MTV">MTV</option>
                    <option value="Muayene">Muayene</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Tutar"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="col-md-3">
                  <input
                    className="form-control"
                    placeholder="Açıklama"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="col-12 text-end mt-3">
                  <button className="btn btn-primary fw-bold" type="submit">
                    <i className="bi bi-plus-circle me-1"></i>
                    Ekle
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row g-3">
          {reminders.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                Henüz takip kaydı yok.
              </div>
            </div>
          ) : (
            reminders.map((reminder) => (
              <div className="col-md-6 col-lg-4" key={reminder.id}>
                <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 16 }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold mb-0">{reminder.type}</h5>
                      <span
                        className={`badge ${
                          reminder.isCompleted ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {reminder.isCompleted ? "Tamamlandı" : "Bekliyor"}
                      </span>
                    </div>

                    <div className="text-muted small mb-2">
                      <i className="bi bi-car-front me-1"></i>
                      {reminder.vehicleName} - {reminder.plateNumber}
                    </div>

                    <p className="mb-1">
                      <strong>Son tarih:</strong>{" "}
                      {new Date(reminder.dueDate).toLocaleDateString("tr-TR")}
                    </p>

                    {reminder.amount && (
                      <p className="mb-1">
                        <strong>Tutar:</strong> ₺
                        {Number(reminder.amount).toLocaleString("tr-TR")}
                      </p>
                    )}

                    {reminder.description && (
                      <p className="text-muted small">{reminder.description}</p>
                    )}

                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleToggleCompleted(reminder)}
                      >
                        {reminder.isCompleted ? "Geri Al" : "Tamamla"}
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteReminder(reminder.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default ReminderPage;