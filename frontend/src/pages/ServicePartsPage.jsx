import { useEffect, useState } from "react";
import {
  getParts,
  createPart,
  updatePart,
  deletePart,
} from "../services/servicePartService";

function ServicePartsPage() {
  const [parts, setParts] = useState([]);
  const [editingPartId, setEditingPartId] = useState(null);

  const [newPartForm, setNewPartForm] = useState({
    name: "",
    code: "",
    purchasePrice: "",
    salePrice: "",
    stockQuantity: "",
  });

  const [editForm, setEditForm] = useState({
    name: "",
    code: "",
    purchasePrice: "",
    salePrice: "",
    stockQuantity: "",
  });

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    const data = await getParts();
    setParts(data);
  };

  const resetNewPartForm = () => {
    setNewPartForm({
      name: "",
      code: "",
      purchasePrice: "",
      salePrice: "",
      stockQuantity: "",
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...newPartForm,
      purchasePrice: Number(newPartForm.purchasePrice),
      salePrice: Number(newPartForm.salePrice),
      stockQuantity: Number(newPartForm.stockQuantity),
    };

    const createdPart = await createPart(payload);

    setParts([createdPart, ...parts]);
    resetNewPartForm();
  };

  const startEdit = (part) => {
    setEditingPartId(part.id);

    setEditForm({
      name: part.name,
      code: part.code || "",
      purchasePrice: part.purchasePrice,
      salePrice: part.salePrice,
      stockQuantity: part.stockQuantity,
    });
  };

  const cancelEdit = () => {
    setEditingPartId(null);

    setEditForm({
      name: "",
      code: "",
      purchasePrice: "",
      salePrice: "",
      stockQuantity: "",
    });
  };

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();

    const payload = {
      ...editForm,
      purchasePrice: Number(editForm.purchasePrice),
      salePrice: Number(editForm.salePrice),
      stockQuantity: Number(editForm.stockQuantity),
    };

    const updatedPart = await updatePart(id, payload);

    setParts(
      parts.map((part) =>
        part.id === id ? { ...part, ...updatedPart } : part
      )
    );

    cancelEdit();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu parçayı silmek istiyor musun?");

    if (!confirmed) return;

    await deletePart(id);

    setParts(parts.filter((part) => part.id !== id));
  };

  const getStockBadge = (stockQuantity) => {
    if (stockQuantity <= 3) {
      return (
        <span className="badge bg-danger">
          Kritik Stok ({stockQuantity})
        </span>
      );
    }

    if (stockQuantity <= 10) {
      return (
        <span className="badge bg-warning text-dark">
          Az Stok ({stockQuantity})
        </span>
      );
    }

    return (
      <span className="badge bg-success">
        Stok: {stockQuantity}
      </span>
    );
  };

  return (
    <div>
      <h2>Parça Stokları</h2>

      <form onSubmit={handleCreateSubmit} className="card p-3 mt-3">
        <h5>Yeni Parça Ekle</h5>

        <div className="row g-2 mt-1">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Parça Adı"
              value={newPartForm.name}
              onChange={(e) =>
                setNewPartForm({ ...newPartForm, name: e.target.value })
              }
              required
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Kod"
              value={newPartForm.code}
              onChange={(e) =>
                setNewPartForm({ ...newPartForm, code: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Alış"
              value={newPartForm.purchasePrice}
              onChange={(e) =>
                setNewPartForm({
                  ...newPartForm,
                  purchasePrice: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Satış"
              value={newPartForm.salePrice}
              onChange={(e) =>
                setNewPartForm({
                  ...newPartForm,
                  salePrice: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Stok"
              value={newPartForm.stockQuantity}
              onChange={(e) =>
                setNewPartForm({
                  ...newPartForm,
                  stockQuantity: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="col-md-1">
            <button className="btn btn-success w-100">Ekle</button>
          </div>
        </div>
      </form>

      <div className="mt-4">
        {parts.map((part) => (
          <div key={part.id} className="card mb-3">
            <div className="card-body">
              {editingPartId === part.id ? (
                <form onSubmit={(e) => handleUpdateSubmit(e, part.id)}>
                  <div className="row g-2">
                    <div className="col-md-3">
                      <input
                        className="form-control"
                        placeholder="Parça Adı"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        className="form-control"
                        placeholder="Kod"
                        value={editForm.code}
                        onChange={(e) =>
                          setEditForm({ ...editForm, code: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Alış"
                        value={editForm.purchasePrice}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            purchasePrice: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Satış"
                        value={editForm.salePrice}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            salePrice: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Stok"
                        value={editForm.stockQuantity}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            stockQuantity: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-md-1">
                      <button className="btn btn-primary w-100">
                        Kaydet
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm mt-3"
                    onClick={cancelEdit}
                  >
                    İptal
                  </button>
                </form>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5>{part.name}</h5>
                      <small className="text-muted">
                        Kod: {part.code || "-"}
                      </small>
                    </div>

                    <div>{getStockBadge(part.stockQuantity)}</div>
                  </div>

                  <hr />

                  <p className="mb-1">Alış: {part.purchasePrice} ₺</p>
                  <p className="mb-3">Satış: {part.salePrice} ₺</p>

                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => startEdit(part)}
                  >
                    Düzenle
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(part.id)}
                  >
                    Sil
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {parts.length === 0 && (
          <p className="text-muted">Henüz parça kaydı yok.</p>
        )}
      </div>
    </div>
  );
}

export default ServicePartsPage;