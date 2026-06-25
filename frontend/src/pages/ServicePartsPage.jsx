import { useEffect, useMemo, useState } from "react";
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
  const [submitted, setSubmitted] = useState(false);
  const [editSubmitted, setEditSubmitted] = useState(false);

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

  const validatePart = (data) => {
    return {
      name: !data.name.trim()
        ? "Parça adı zorunludur."
        : data.name.trim().length < 2
          ? "Parça adı en az 2 karakter olmalı."
          : data.name.trim().length > 100
            ? "Parça adı en fazla 100 karakter olabilir."
            : "",

      code:
        data.code.trim().length > 50
          ? "Kod en fazla 50 karakter olabilir."
          : "",

      purchasePrice:
        data.purchasePrice === ""
          ? "Alış fiyatı zorunludur."
          : Number(data.purchasePrice) < 0 ||
              Number(data.purchasePrice) > 1000000
            ? "Alış fiyatı 0 ile 1.000.000 arasında olmalı."
            : "",

      salePrice:
        data.salePrice === ""
          ? "Satış fiyatı zorunludur."
          : Number(data.salePrice) < 0 || Number(data.salePrice) > 1000000
            ? "Satış fiyatı 0 ile 1.000.000 arasında olmalı."
            : "",

      stockQuantity:
        data.stockQuantity === ""
          ? "Stok miktarı zorunludur."
          : Number(data.stockQuantity) < 0 ||
              Number(data.stockQuantity) > 100000
            ? "Stok miktarı 0 ile 100.000 arasında olmalı."
            : !Number.isInteger(Number(data.stockQuantity))
              ? "Stok miktarı tam sayı olmalı."
              : "",
    };
  };

  const newPartErrors = useMemo(() => validatePart(newPartForm), [newPartForm]);
  const editErrors = useMemo(() => validatePart(editForm), [editForm]);

  const isNewPartFormValid = Object.values(newPartErrors).every((err) => !err);
  const isEditFormValid = Object.values(editErrors).every((err) => !err);

  const shouldShowNewError = (field) => submitted && newPartErrors[field];
  const shouldShowEditError = (field) => editSubmitted && editErrors[field];

  const getNewInputClass = (field) =>
    `form-control ${shouldShowNewError(field) ? "is-invalid" : ""}`;

  const getEditInputClass = (field) =>
    `form-control ${shouldShowEditError(field) ? "is-invalid" : ""}`;

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
    setSubmitted(false);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isNewPartFormValid) {
      toast.warning("Lütfen parça bilgilerini kontrol et.");
      return;
    }

    try {
      const payload = {
        name: newPartForm.name.trim(),
        code: newPartForm.code.trim().toUpperCase(),
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
    setEditSubmitted(false);
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
    setEditSubmitted(false);
  };

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    setEditSubmitted(true);

    if (!isEditFormValid) {
      toast.warning("Lütfen parça bilgilerini kontrol et.");
      return;
    }

    try {
      const payload = {
        name: editForm.name.trim(),
        code: editForm.code.trim().toUpperCase(),
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
          noValidate
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
                className={getNewInputClass("name")}
                placeholder="Parça Adı"
                value={newPartForm.name}
                maxLength={100}
                onChange={(e) =>
                  setNewPartForm({ ...newPartForm, name: e.target.value })
                }
              />

              {shouldShowNewError("name") && (
                <div className="invalid-feedback d-block">
                  {newPartErrors.name}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                className={getNewInputClass("code")}
                placeholder="Kod"
                value={newPartForm.code}
                maxLength={50}
                onChange={(e) =>
                  setNewPartForm({
                    ...newPartForm,
                    code: e.target.value.toUpperCase(),
                  })
                }
              />

              {shouldShowNewError("code") && (
                <div className="invalid-feedback d-block">
                  {newPartErrors.code}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className={getNewInputClass("purchasePrice")}
                placeholder="Alış"
                value={newPartForm.purchasePrice}
                min="0"
                max="1000000"
                step="0.01"
                onChange={(e) =>
                  setNewPartForm({
                    ...newPartForm,
                    purchasePrice: e.target.value,
                  })
                }
              />

              {shouldShowNewError("purchasePrice") && (
                <div className="invalid-feedback d-block">
                  {newPartErrors.purchasePrice}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className={getNewInputClass("salePrice")}
                placeholder="Satış"
                value={newPartForm.salePrice}
                min="0"
                max="1000000"
                step="0.01"
                onChange={(e) =>
                  setNewPartForm({
                    ...newPartForm,
                    salePrice: e.target.value,
                  })
                }
              />

              {shouldShowNewError("salePrice") && (
                <div className="invalid-feedback d-block">
                  {newPartErrors.salePrice}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className={getNewInputClass("stockQuantity")}
                placeholder="Stok"
                value={newPartForm.stockQuantity}
                min="0"
                max="100000"
                step="1"
                onChange={(e) =>
                  setNewPartForm({
                    ...newPartForm,
                    stockQuantity: e.target.value,
                  })
                }
              />

              {shouldShowNewError("stockQuantity") && (
                <div className="invalid-feedback d-block">
                  {newPartErrors.stockQuantity}
                </div>
              )}
            </div>

            <div className="col-md-1">
              <button
                className="btn btn-success w-100"
                disabled={!isNewPartFormValid}
              >
                <i className="bi bi-plus-circle" /> Ekle
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
                  <form
                    onSubmit={(e) => handleUpdateSubmit(e, part.id)}
                    noValidate
                  >
                    <div className="row g-2">
                      <div className="col-md-3">
                        <input
                          className={getEditInputClass("name")}
                          placeholder="Parça Adı"
                          value={editForm.name}
                          maxLength={100}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                        />

                        {shouldShowEditError("name") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.name}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          className={getEditInputClass("code")}
                          placeholder="Kod"
                          value={editForm.code}
                          maxLength={50}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              code: e.target.value.toUpperCase(),
                            })
                          }
                        />

                        {shouldShowEditError("code") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.code}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          type="number"
                          className={getEditInputClass("purchasePrice")}
                          placeholder="Alış"
                          value={editForm.purchasePrice}
                          min="0"
                          max="1000000"
                          step="0.01"
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              purchasePrice: e.target.value,
                            })
                          }
                        />

                        {shouldShowEditError("purchasePrice") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.purchasePrice}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          type="number"
                          className={getEditInputClass("salePrice")}
                          placeholder="Satış"
                          value={editForm.salePrice}
                          min="0"
                          max="1000000"
                          step="0.01"
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              salePrice: e.target.value,
                            })
                          }
                        />

                        {shouldShowEditError("salePrice") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.salePrice}
                          </div>
                        )}
                      </div>

                      <div className="col-md-2">
                        <input
                          type="number"
                          className={getEditInputClass("stockQuantity")}
                          placeholder="Stok"
                          value={editForm.stockQuantity}
                          min="0"
                          max="100000"
                          step="1"
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              stockQuantity: e.target.value,
                            })
                          }
                        />

                        {shouldShowEditError("stockQuantity") && (
                          <div className="invalid-feedback d-block">
                            {editErrors.stockQuantity}
                          </div>
                        )}
                      </div>

                      <div className="col-md-1">
                        <button
                          className="btn btn-primary w-100"
                          disabled={!isEditFormValid}
                        >
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

          .btn:disabled {
          opacity: .45;
          cursor: not-allowed;
         }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServicePartsPage;
