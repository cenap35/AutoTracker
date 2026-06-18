import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

import { getCustomerById } from "../services/serviceCustomerService";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceCustomerDetailPage() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      setLoading(true);
      const data = await getCustomerById(id);
      setCustomer(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Müşteri detayları yüklenemedi.");
      toast.error("Müşteri detayları yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    if (status === "Pending") return "Bekliyor";
    if (status === "InProgress") return "İşlemde";
    if (status === "Completed") return "Tamamlandı";
    return status;
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "bg-warning text-dark";
    if (status === "InProgress") return "bg-primary";
    if (status === "Completed") return "bg-success";
    return "bg-secondary";
  };

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Müşteri detayları yükleniyor..." />
      </PageWrapper>
    );
  }

  if (!customer) {
    return (
      <PageWrapper>
        <div className="card border-0 shadow-sm p-4 text-center">
          <div style={{ fontSize: 36 }}>👤</div>
          <h5 className="mt-2" style={{ color: "#18265a", fontWeight: 800 }}>
            Müşteri bulunamadı
          </h5>
          <p className="text-muted mb-0">
            Aradığınız müşteri kaydı bulunamadı.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="👤"
          title={customer.fullName}
          subtitle="Müşteri detayları ve geçmiş kayıtlar."
        />

        {error && (
          <div className="alert alert-danger shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5
                  className="mb-3"
                  style={{ color: "#18265a", fontWeight: 800 }}
                >
                  Müşteri Bilgileri
                </h5>

                <div className="d-flex gap-3 align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: "linear-gradient(135deg, #18265a, #3b60c5)",
                      boxShadow: "0 10px 22px rgba(59, 96, 197, .22)",
                    }}
                  >
                    {customer.fullName?.charAt(0)?.toUpperCase() || "M"}
                  </div>

                  <div>
                    <h4
                      className="mb-1"
                      style={{ color: "#18265a", fontWeight: 850 }}
                    >
                      {customer.fullName}
                    </h4>

                    <div className="text-muted small mb-2">
                      <i className="bi bi-telephone me-1" />
                      {customer.phone || "Telefon yok"}
                    </div>

                    <span className="badge bg-light text-dark border">
                      <i className="bi bi-chat-left-text me-1" />
                      {customer.note || "Not eklenmemiş"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                background:
                  "linear-gradient(110deg, #eaf9ef 65%, #f8fff9 100%)",
              }}
            >
              <div className="card-body">
                <div className="text-muted small">Toplam Harcama</div>
                <div
                  className="h3 fw-bold mb-0"
                  style={{ color: "#1a906c" }}
                >
                  ₺{Number(customer.totalSpent || 0).toLocaleString("tr-TR")}
                </div>

                <div className="mt-3 d-flex gap-2 flex-wrap">
                  <span className="badge bg-light text-dark border">
                    <i className="bi bi-car-front me-1" />
                    {customer.vehicles?.length || 0} araç
                  </span>

                  <span className="badge bg-light text-dark border">
                    <i className="bi bi-tools me-1" />
                    {customer.workOrders?.length || 0} iş emri
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              Araçlar
            </h5>

            <span className="badge bg-light text-dark border">
              {customer.vehicles?.length || 0} kayıt
            </span>
          </div>

          {customer.vehicles?.length > 0 ? (
            <div className="row g-3">
              {customer.vehicles.map((vehicle) => (
                <div className="col-md-6" key={vehicle.id}>
                  <div className="customer-detail-card-hover card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex gap-3 align-items-start">
                        <div
                          className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{
                            width: 46,
                            height: 46,
                            borderRadius: 15,
                            background:
                              "linear-gradient(135deg, #1a906c, #47c172)",
                          }}
                        >
                          <i className="bi bi-car-front" />
                        </div>

                        <div>
                          <h5
                            className="mb-1"
                            style={{ color: "#18265a", fontWeight: 800 }}
                          >
                            {vehicle.brand} {vehicle.model}
                          </h5>

                          <div className="d-flex gap-2 flex-wrap">
                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-credit-card-2-front me-1" />
                              {vehicle.plate}
                            </span>

                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-speedometer2 me-1" />
                              {vehicle.currentMileage} KM
                            </span>
                          </div>

                          <Link
                            to={`/service/vehicles/${vehicle.id}`}
                            className="btn btn-outline-primary btn-sm mt-3"
                          >
                            Araç Detayı
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card border-0 shadow-sm p-4 text-center">
              <div style={{ fontSize: 32 }}>🚗</div>
              <h5
                className="mt-2"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                Araç kaydı yok
              </h5>
              <p className="text-muted mb-0">
                Bu müşteriye ait araç kaydı bulunmuyor.
              </p>
            </div>
          )}
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              İş Emirleri
            </h5>

            <span className="badge bg-light text-dark border">
              {customer.workOrders?.length || 0} kayıt
            </span>
          </div>

          {customer.workOrders?.length > 0 ? (
            <div className="row g-3">
              {customer.workOrders.map((order) => (
                <div className="col-md-6" key={order.id}>
                  <div className="customer-detail-card-hover card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between gap-3">
                        <div>
                          <h5
                            className="mb-1"
                            style={{ color: "#18265a", fontWeight: 800 }}
                          >
                            {order.title}
                          </h5>

                          <div className="text-muted small mb-2">
                            <i className="bi bi-car-front me-1" />
                            {order.vehicleName} - {order.plate}
                          </div>

                          <div className="d-flex gap-2 flex-wrap">
                            <span className={`badge ${getStatusClass(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>

                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-cash-coin me-1" />
                              {order.totalCost} ₺
                            </span>
                          </div>

                          <Link
                            to={`/service/work-orders/${order.id}`}
                            className="btn btn-outline-primary btn-sm mt-3"
                          >
                            İş Emri Detayı
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card border-0 shadow-sm p-4 text-center">
              <div style={{ fontSize: 32 }}>🔧</div>
              <h5
                className="mt-2"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                İş emri yok
              </h5>
              <p className="text-muted mb-0">
                Bu müşteriye ait iş emri kaydı bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .customer-detail-card-hover {
            transition:
              box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
              transform 0.22s cubic-bezier(.17,.67,.59,1.17),
              background 0.18s cubic-bezier(.17,.67,.59,1.17);
          }

          .customer-detail-card-hover:hover {
            box-shadow:
              0 14px 34px rgba(44, 62, 100, 0.18),
              0 2px 6px rgba(180, 206, 237, 0.16);
            background: linear-gradient(95deg, #f5f9ff 88%, #e8f1fd 100%);
            transform: translateY(-2px) scale(1.017);
          }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServiceCustomerDetailPage;