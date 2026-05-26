import VehicleNoteForm from "./VehicleNoteForm";
import VehicleNoteCard from "./VehicleNoteCard";

function VehicleNotesSection({
  notes,
  vehicles = [],
  vehicle,
  selectedVehicleId,
  onCreate,
  onUpdate,
  onToggleComplete,
  onDelete,
}) {
  return (
    <div className="card border-0 shadow-sm mb-4 mt-4" style={{ borderRadius: 14 }}>
      <div className="card-body px-4 py-4">
        <h5 className="text-primary mb-3 fw-bold">
          <i className="bi bi-clipboard-check me-2"></i>
          Araç Notları
        </h5>

        <VehicleNoteForm
          vehicles={vehicles}
          selectedVehicleId={selectedVehicleId}
          onCreate={onCreate}
        />

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