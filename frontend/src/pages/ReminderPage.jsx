import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getVehicles } from "../services/vehicleService";
import {
  getVehicleReminders,
  createVehicleReminder,
  updateVehicleReminder,
  deleteVehicleReminder,
} from "../services/vehicleReminderService";
import ReminderForm from "../components/ReminderForm";
import ReminderCard from "../components/ReminderCard";

function ReminderPage() {
  const [vehicles, setVehicles] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState("");

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

  const handleCreateReminder = async (reminderData) => {
    try {
      const newReminder = await createVehicleReminder(reminderData);

      setReminders([newReminder, ...reminders]);
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
            : item,
        ),
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

        {/*Ekleme formu */}
        <div className="mb-4">
          <ReminderForm vehicles={vehicles} onCreate={handleCreateReminder} />
        </div>

        <div className="row g-3">
          {reminders.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                Henüz takip kaydı yok.
              </div>
            </div>
          ) : (
            [...reminders]
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map((reminder) => (
                <div className="col-md-6 col-lg-4" key={reminder.id}>
                  <ReminderCard
                    reminder={reminder}
                    onToggleComplete={handleToggleCompleted}
                    onDelete={handleDeleteReminder}
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

export default ReminderPage;
