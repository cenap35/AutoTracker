import { useEffect, useMemo, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";
import { toast } from "react-toastify";

import {
  getAccountTransactions,
  getAccountTransactionStats,
  createAccountTransaction,
  deleteAccountTransaction,
  markAccountTransactionPaid,
} from "../services/serviceAccountTransactionService";

import { getCustomers } from "../services/serviceCustomerService";
import { getCustomerVehicles } from "../services/customerVehicleService";

function ServiceAccountTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    serviceCustomerId: "",
    type: "Receivable",
    amount: "",
    paidAmount: "0",
    description: "",
    transactionDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    customerVehicleId: "",
  });

  const validateTransaction = (data) => {
    const amount = Number(data.amount);
    const paidAmount = Number(data.paidAmount || 0);

    return {
      serviceCustomerId: !data.serviceCustomerId
        ? "Müşteri seçimi zorunludur."
        : "",

      type: !["Receivable", "Payable"].includes(data.type)
        ? "Geçerli bir cari tipi seçiniz."
        : "",

      amount:
        data.amount === ""
          ? "Tutar zorunludur."
          : amount <= 0 || amount > 1000000
            ? "Tutar 0.01 ile 1.000.000 arasında olmalı."
            : "",

      paidAmount:
        data.paidAmount === ""
          ? "Ödenen tutar zorunludur."
          : paidAmount < 0 || paidAmount > 1000000
            ? "Ödenen tutar 0 ile 1.000.000 arasında olmalı."
            : paidAmount > amount
              ? "Ödenen tutar toplam tutardan büyük olamaz."
              : "",

      description:
        data.description.trim().length > 500
          ? "Açıklama en fazla 500 karakter olabilir."
          : "",

      transactionDate: !data.transactionDate ? "İşlem tarihi zorunludur." : "",

      dueDate:
        data.dueDate &&
        data.transactionDate &&
        new Date(data.dueDate) < new Date(data.transactionDate)
          ? "Vade tarihi işlem tarihinden önce olamaz."
          : "",
    };
  };

  const formErrors = useMemo(() => validateTransaction(form), [form]);

  const isFormValid = Object.values(formErrors).every((err) => !err);

  const shouldShowError = (field) => submitted && formErrors[field];

  const getInputClass = (field) =>
    `form-control ${shouldShowError(field) ? "is-invalid" : ""}`;

  const getSelectClass = (field) =>
    `form-select ${shouldShowError(field) ? "is-invalid" : ""}`;

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    try {
      setLoading(true);

      const [transactionsData, statsData, customersData, vehiclesData] =
        await Promise.all([
          getAccountTransactions(),
          getAccountTransactionStats(),
          getCustomers(),
          getCustomerVehicles(),
        ]);

      setVehicles(vehiclesData);
      setTransactions(transactionsData);
      setStats(statsData);
      setCustomers(customersData);
    } catch (err) {
      console.error(err);
      toast.error("Cari takip verileri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("tr-TR", {
      maximumFractionDigits: 0,
    });

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      Number(vehicle.serviceCustomerId) === Number(form.serviceCustomerId),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      toast.warning("Lütfen cari kayıt bilgilerini kontrol et.");

      return;
    }

    try {
      const payload = {
        serviceCustomerId: Number(form.serviceCustomerId),
        customerVehicleId: form.customerVehicleId
          ? Number(form.customerVehicleId)
          : null,
        serviceWorkOrderId: null,
        type: form.type,
        amount: Number(form.amount),
        paidAmount: Number(form.paidAmount || 0),
        description: form.description.trim(),
        transactionDate: new Date(form.transactionDate).toISOString(),
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      };

      await createAccountTransaction(payload);

      setForm({
        serviceCustomerId: "",
        type: "Receivable",
        amount: "",
        paidAmount: "0",
        description: "",
        transactionDate: new Date().toISOString().split("T")[0],
        dueDate: "",
        customerVehicleId: "",
      });
      setSubmitted(false);

      toast.success("Cari kayıt oluşturuldu.");
      loadPageData();
    } catch (err) {
      console.error(err);
      toast.error("Cari kayıt oluşturulamadı.");
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      await markAccountTransactionPaid(id);
      toast.success("Kayıt ödendi olarak işaretlendi.");
      loadPageData();
    } catch (err) {
      console.error(err);
      toast.error("Kayıt güncellenemedi.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bu cari kaydı silmek istiyor musun?");
    if (!confirmed) return;

    try {
      await deleteAccountTransaction(id);
      toast.success("Cari kayıt silindi.");
      loadPageData();
    } catch (err) {
      console.error(err);
      toast.error("Cari kayıt silinemedi.");
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Cari takip yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="💳"
          title="Cari Takip"
          subtitle="Müşteri alacakları, servis borçları ve ödeme durumlarını yönetin."
        />

        <div className="row g-3 mb-4">
          <StatCard
            icon="📥"
            title="Toplam Alacak"
            value={`₺${formatCurrency(stats?.totalReceivable)}`}
            tone="#1a906c"
          />

          <StatCard
            icon="📤"
            title="Toplam Verecek"
            value={`₺${formatCurrency(stats?.totalPayable)}`}
            tone="#dc3545"
          />

          <StatCard
            icon="⚖️"
            title="Net Durum"
            value={`₺${formatCurrency(stats?.netBalance)}`}
            tone="#3b60c5"
          />

          <StatCard
            icon="⏳"
            title="Bekleyen Kayıt"
            value={stats?.waitingCount || 0}
            tone="#b78b16"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="card border-0 shadow-sm p-3 p-md-4 mb-4 cari-panel"
        >
          <div className="mb-3">
            <h5 className="mb-1" style={{ color: "#18265a", fontWeight: 850 }}>
              Yeni Cari Kayıt
            </h5>
            <small className="text-muted">
              Müşteri alacağı veya servis vereceği oluşturun.
            </small>
          </div>

          <div className="row g-2">
            <div className="col-md-3">
              <select
                className={getSelectClass("serviceCustomerId")}
                value={form.serviceCustomerId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    serviceCustomerId: e.target.value,
                    customerVehicleId: "",
                  })
                }
              >
                <option value="">Müşteri seç</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.fullName}
                  </option>
                ))}
              </select>

              {shouldShowError("serviceCustomerId") && (
                <div className="invalid-feedback d-block">
                  {formErrors.serviceCustomerId}
                </div>
              )}
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={form.customerVehicleId}
                onChange={(e) =>
                  setForm({ ...form, customerVehicleId: e.target.value })
                }
                disabled={!form.serviceCustomerId}
              >
                <option value="">Araç seç opsiyonel</option>

                {filteredVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.brand} {vehicle.model} - {vehicle.plate}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <select
                className={getSelectClass("type")}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="Receivable">Alacak</option>
                <option value="Payable">Verecek</option>
              </select>

              {shouldShowError("type") && (
                <div className="invalid-feedback d-block">
                  {formErrors.type}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className={getInputClass("amount")}
                placeholder="Tutar"
                value={form.amount}
                min="0.01"
                max="1000000"
                step="0.01"
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
              />

              <div className="mt-1">
                <small className="text-muted">Tutar</small>
              </div>

              {shouldShowError("amount") && (
                <div className="invalid-feedback d-block">
                  {formErrors.amount}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className={getInputClass("paidAmount")}
                placeholder="Ödenen"
                value={form.paidAmount}
                min="0"
                max="1000000"
                step="0.01"
                onChange={(e) =>
                  setForm({ ...form, paidAmount: e.target.value })
                }
              />

              <div className="mt-1">
                <small className="text-muted">Ödenen tutarı giriniz</small>
              </div>

              {shouldShowError("paidAmount") && (
                <div className="invalid-feedback d-block">
                  {formErrors.paidAmount}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <input
                className={getInputClass("description")}
                placeholder="Açıklama"
                value={form.description}
                maxLength={500}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <div className="d-flex justify-content-between mt-1">
                <div>
                  {shouldShowError("description") && (
                    <div className="invalid-feedback d-block">
                      {formErrors.description}
                    </div>
                  )}
                </div>

                <small className="text-muted">
                  {form.description.length}/500
                </small>
              </div>
            </div>

            <div className="col-md-3">
              <input
                type="date"
                className={getInputClass("transactionDate")}
                value={form.transactionDate}
                onChange={(e) =>
                  setForm({ ...form, transactionDate: e.target.value })
                }
              />

              <div className="mt-1">
                <small className="text-muted">İşlem Tarihi</small>
              </div>

              {shouldShowError("transactionDate") && (
                <div className="invalid-feedback d-block">
                  {formErrors.transactionDate}
                </div>
              )}
            </div>

            <div className="col-md-3">
              <input
                type="date"
                className={getInputClass("dueDate")}
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              />

              <div className="mt-1">
                <small className="text-muted">Vade</small>
              </div>

              {shouldShowError("dueDate") && (
                <div className="invalid-feedback d-block">
                  {formErrors.dueDate}
                </div>
              )}
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100" disabled={!isFormValid}>
                <i className="bi bi-plus-circle me-2" />
                Ekle
              </button>
            </div>
          </div>
        </form>

        <div className="card border-0 shadow-sm cari-panel">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="mb-0"
                style={{ color: "#18265a", fontWeight: 850 }}
              >
                Cari Kayıtlar
              </h5>

              <span className="badge bg-light text-dark border">
                {transactions.length} kayıt
              </span>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center p-5">
                <div style={{ fontSize: 40 }}>💳</div>
                <h6 className="mt-3 fw-bold">Henüz cari kayıt yok</h6>
                <p className="text-muted mb-0">
                  Yeni alacak veya verecek kaydı ekleyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Tarih</th>
                      <th>Müşteri</th>
                      <th>Araç</th>
                      <th>Kaynak</th>
                      <th>Tip</th>
                      <th>Tutar</th>
                      <th>Ödenen</th>
                      <th>Kalan</th>
                      <th>Durum</th>
                      <th>Açıklama</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions.map((item) => (
                      <tr key={item.id}>
                        <td className="text-muted small">
                          {item.transactionDate
                            ? new Date(item.transactionDate).toLocaleDateString(
                                "tr-TR",
                              )
                            : "-"}
                        </td>

                        <td className="fw-semibold">
                          {item.customerName || "-"}
                        </td>

                        <td>
                          {item.vehicle ? (
                            <div>
                              <div className="fw-semibold">{item.vehicle}</div>
                              <small className="text-muted">
                                {item.plate || "-"}
                              </small>
                            </div>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>

                        <td className="text-muted">
                          {item.sourceTitle || "-"}
                        </td>

                        <td>
                          <span
                            className={
                              item.type === "Receivable"
                                ? "badge bg-success"
                                : "badge bg-danger"
                            }
                          >
                            {item.type === "Receivable" ? "Alacak" : "Verecek"}
                          </span>
                        </td>

                        <td>₺{formatCurrency(item.amount)}</td>
                        <td>₺{formatCurrency(item.paidAmount)}</td>

                        <td className="fw-bold">
                          ₺{formatCurrency(item.remainingAmount)}
                        </td>

                        <td>
                          {item.isPaid ? (
                            <div>
                              <span className="badge bg-success">Ödendi</span>
                              {item.paidAt && (
                                <div className="text-muted small mt-1">
                                  {new Date(item.paidAt).toLocaleDateString(
                                    "tr-TR",
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              Bekliyor
                            </span>
                          )}
                        </td>

                        <td className="text-muted">
                          {item.description || "-"}
                        </td>

                        <td>
                          <div className="d-flex gap-2 justify-content-end">
                            {!item.isPaid && (
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={() => handleMarkPaid(item.id)}
                              >
                                Ödendi
                              </button>
                            )}

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <style>
          {`
            .cari-panel {
              border-radius: 20px;
            }
            .btn:disabled {
            opacity: .45;
            cursor: not-allowed;
            }
          `}
        </style>
      </div>
    </PageWrapper>
  );
}

function StatCard({ icon, title, value, tone }) {
  return (
    <div className="col-sm-6 col-xl-3">
      <div className="card border-0 shadow-sm h-100 cari-panel">
        <div className="card-body p-3 d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0"
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: `${tone}18`,
              color: tone,
              fontSize: 24,
            }}
          >
            {icon}
          </div>

          <div>
            <div className="text-muted small">{title}</div>
            <div className="h4 fw-bold mb-0" style={{ color: "#18265a" }}>
              {value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceAccountTransactionsPage;
