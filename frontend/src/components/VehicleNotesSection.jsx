import VehicleNoteForm from "./VehicleNoteForm";
import VehicleNoteCard from "./VehicleNoteCard";
import { motion, AnimatePresence } from "framer-motion";

function VehicleNotesSection({
  notes,
  vehicles = [],
  vehicle,
  selectedVehicleId,
  onCreate,
  onUpdate,
  onToggleComplete,
  onDelete,
  isFormOpen,
  onToggleForm,
}) {
  return (
    <div
      className="card border-0 shadow-sm mb-4 mt-4"
      style={{ borderRadius: 14 }}
    >
      <div className="card-body px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-primary mb-0 fw-bold">
            <i className="bi bi-clipboard-check me-2"></i>
            Araç Notları
          </h5>

          <button
            type="button"
            className="btn btn-outline-primary btn-sm fw-semibold"
            onClick={onToggleForm}
            style={{ borderRadius: 10 }}
          >
            <i
              className={`bi ${
                isFormOpen ? "bi-chevron-up" : "bi-plus-circle"
              } me-1`}
            ></i>
            {isFormOpen ? "Formu Kapat" : "Not Ekle"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isFormOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              style={{ overflow: "hidden" }}
            >
              <div className="mb-3">
                <VehicleNoteForm
                  vehicles={vehicles}
                  selectedVehicleId={selectedVehicleId}
                  onCreate={onCreate}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {notes.length === 0 ? (
          <div className="alert alert-info text-center rounded-3">
            Bu araca ait not bulunmuyor.
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {notes.map((note) => {
              const noteVehicle =
                vehicle || vehicles.find((v) => v.id === note.vehicleId);

              return (
                <VehicleNoteCard
                  key={note.id}
                  note={note}
                  vehicle={noteVehicle}
                  onUpdate={onUpdate}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default VehicleNotesSection;
