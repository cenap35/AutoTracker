import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

import {
  getParts,
  createPart,
  updatePart,
  deletePart,
  sellPart,
} from "../services/servicePartService";

import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServicePartsPage() {
  const [parts, setParts] = useState([]);
  const [editingPartId, setEditingPartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sellQuantityByPartId, setSellQuantityByPartId] = useState({});

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
    try {
      setLoading(true);
      const data = await getParts();
      setParts(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Stoklar yüklenemedi.");
      toast.error("Stoklar yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };
  const handleSellPart = async (id) => {
    const quantity = Number(sellQuantityByPartId[id] || 1);
    const selectedPart = parts.find((part) => part.id === id);

    if (!selectedPart) {
      toast.error("Parça bulunamadı.");
      return;
    }

    if (quantity <= 0) {
      toast.error("Satış adedi en az 1 olmalı.");
      return;
    }

    if (quantity > selectedPart.stockQuantity) {
      toast.error("Satış adedi stok miktarından fazla olamaz.");
      return;
    }

    try {
      const result = await sellPart(id, quantity);

      setParts(
        parts.map((part) =>
          part.id === id
            ? {
                ...part,
                stockQuantity: result.stockQuantity,
              }
            : part,
        ),
      );

      setSellQuantityByPartId({
        ...sellQuantityByPartId,
        [id]: "",
      });

      toast.success(`Satış yapıldı. Kar: ${result.sale.totalProfit} ₺`);
    } catch (err) {
      console.error(err);

      toast.error(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Satış yapılamadı.",
      );
    }
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

    try {
      const payload = {
        ...newPartForm,
        purchasePrice: Number(newPartForm.purchasePrice),
        salePrice: Number(newPartForm.salePrice),
        stockQuantity: Number(newPartForm.stockQuantity),
      };

      const createdPart = await createPart(payload);

      setParts([createdPart, ...parts]);
      resetNewPartForm();
      toast.success("Parça eklendi.");
    } catch (err) {
      console.error(err);
      toast.error("Parça eklenemedi.");
    }
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

    try {
      const payload = {
        ...editForm,
        purchasePrice: Number(editForm.purchasePrice),
        salePrice: Number(editForm.salePrice),
        stockQuantity: Number(editForm.stockQuantity),
      };

      const updatedPart = await updatePart(id, payload);

      setParts(
        parts.map((part) =>
          part.id === id ? { ...part, ...updatedPart } : part,
        ),
      );

      cancelEdit();
      toast.success("Parça güncellendi.");
    } catch (err) {
      console.error(err);
      toast.error("Parça güncellenemedi.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu parçayı silmek istiyor musun?");

    if (!confirmed) return;

    try {
      await deletePart(id);
      setParts(parts.filter((part) => part.id !== id));
      toast.success("Parça silindi.");
    } catch (err) {
      console.error(err);
      toast.error("Parça silinemedi.");
    }
  };

  const getStockBadge = (stockQuantity) => {
    if (stockQuantity <= 3) {
      return (
        <span className="badge bg-danger">Kritik Stok ({stockQuantity})</span>
      );
    }

    if (stockQuantity <= 10) {
      return (
        <span className="badge bg-warning text-dark">
          Az Stok ({stockQuantity})
        </span>
      );
    }

    return <span className="badge bg-success">Stok: {stockQuantity}</span>;
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Stoklar yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="📦"
          title="Stoklar"
          subtitle="Yedek parça ve stok yönetimi."
        />

        {error && (
          <div className="alert alert-danger shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        <form
          onSubmit={handleCreateSubmit}
          className="card border-0 shadow-sm p-3"
        >
          <div className="mb-3">
            <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 800 }}>
              Yeni Parça
            </h5>
            <small className="text-muted">
              Serviste kullanılan yedek parça ve stok bilgisini ekleyin.
            </small>
          </div>

          <div className="row g-2">
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
              <button className="btn btn-success w-100">
                <i className="bi bi-plus-circle" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              Stok Listesi
            </h5>

            <span className="badge bg-light text-dark border">
              {parts.length} kayıt
            </span>
          </div>

          {parts.map((part) => (
            <div
              key={part.id}
              className="part-card-hover card border-0 shadow-sm mb-3"
            >
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
                  <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                    <div className="d-flex gap-3 align-items-start">
                      <div
                        className="d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 16,
                          background:
                            "linear-gradient(135deg, #5f4bb6, #9b59b6)",
                          boxShadow: "0 10px 22px rgba(155, 89, 182, .22)",
                        }}
                      >
                        <i className="bi bi-box-seam" />
                      </div>

                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                          <h5
                            className="mb-0"
                            style={{ color: "#18265a", fontWeight: 800 }}
                          >
                            {part.name}
                          </h5>

                          {getStockBadge(part.stockQuantity)}
                        </div>

                        <div className="text-muted small mb-2">
                          <i className="bi bi-upc me-1" />
                          Kod: {part.code || "-"}
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-cart me-1" />
                            Alış: {part.purchasePrice} ₺
                          </span>

                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-cash-coin me-1" />
                            Satış: {part.salePrice} ₺
                          </span>
                          <span className="badge bg-dark">
                            <i className="bi bi-graph-up-arrow me-1" />
                            Birim Kazanç: {part.salePrice -
                              part.purchasePrice}{" "}
                            ₺
                          </span>

                          <span className="badge bg-light text-dark border">
                            <i className="bi bi-boxes me-1" />
                            Stok: {part.stockQuantity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap align-items-center">
                      <input
                        type="number"
                        min="1"
                        placeholder="Adet"
                        className="form-control form-control-sm"
                        style={{ width: "80px" }}
                        value={sellQuantityByPartId[part.id] || ""}
                        onChange={(e) =>
                          setSellQuantityByPartId({
                            ...sellQuantityByPartId,
                            [part.id]: e.target.value,
                          })
                        }
                      />

                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleSellPart(part.id)}
                      >
                        Sat
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {parts.length === 0 && (
            <div className="card border-0 shadow-sm p-4 text-center">
              <div style={{ fontSize: 36 }}>📦</div>
              <h5
                className="mt-2"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                Parça kaydı yok
              </h5>
              <p className="text-muted mb-0">
                Henüz stok/parça kaydı eklenmemiş.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .part-card-hover {
            transition:
              box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
              transform 0.22s cubic-bezier(.17,.67,.59,1.17),
              background 0.18s cubic-bezier(.17,.67,.59,1.17);
          }

          .part-card-hover:hover {
            box-shadow:
              0 14px 34px rgba(44, 62, 100, 0.18),
              0 2px 6px rgba(180, 206, 237, 0.16);
            background: linear-gradient(95deg, #fbf7ff 88%, #f1e9ff 100%);
            transform: translateY(-2px) scale(1.017);
          }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServicePartsPage;
