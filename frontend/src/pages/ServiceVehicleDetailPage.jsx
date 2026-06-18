import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

import { getCustomerVehicleById } from "../services/customerVehicleService";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

function ServiceVehicleDetailPage() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadVehicle();
  }, []);

  const loadVehicle = async () => {
    try {
      setLoading(true);
      const data = await getCustomerVehicleById(id);
      setVehicle(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Araç detayları yüklenemedi.");
      toast.error("Araç detayları yüklenemedi.");
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
        <LoadingSpinner text="Araç detayları yükleniyor..." />
      </PageWrapper>
    );
  }

  if (!vehicle) {
    return (
      <PageWrapper>
        <div className="card border-0 shadow-sm p-4 text-center">
          <div style={{ fontSize: 36 }}>🚘</div>
          <h5 className="mt-2" style={{ color: "#18265a", fontWeight: 800 }}>
            Araç bulunamadı
          </h5>
          <p className="text-muted mb-0">Aradığınız araç kaydı bulunamadı.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="🚘"
          title={`${vehicle.brand} ${vehicle.model}`}
          subtitle={vehicle.plate}
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
                  Araç Bilgileri
                </h5>

                <div className="d-flex gap-3 align-items-start">
                  <div
                    className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 18,
                      background: "linear-gradient(135deg, #1a906c, #47c172)",
                      boxShadow: "0 10px 22px rgba(71, 193, 114, .22)",
                    }}
                  >
                    <i className="bi bi-car-front fs-4" />
                  </div>

                  <div>
                    <h4
                      className="mb-1"
                      style={{ color: "#18265a", fontWeight: 850 }}
                    >
                      {vehicle.brand} {vehicle.model}
                    </h4>

                    <div className="text-muted small mb-2">
                      <i className="bi bi-person me-1" />
                      {vehicle.customer?.fullName || "Müşteri yok"}
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-credit-card-2-front me-1" />
                        {vehicle.plate}
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-calendar me-1" />
                        {vehicle.year || "Yıl yok"}
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-speedometer2 me-1" />
                        {vehicle.currentMileage} KM
                      </span>

                      <span className="badge bg-light text-dark border">
                        <i className="bi bi-upc-scan me-1" />
                        {vehicle.chassisNumber || "Şasi yok"}
                      </span>
                    </div>

                    {vehicle.customer?.id && (
                      <Link
                        to={`/service/customers/${vehicle.customer.id}`}
                        className="btn btn-outline-primary btn-sm mt-3"
                      >
                        Müşteri Detayı
                      </Link>
                    )}
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
                  ₺{Number(vehicle.totalSpent || 0).toLocaleString("tr-TR")}
                </div>

                <div className="mt-3">
                  <span className="badge bg-light text-dark border">
                    <i className="bi bi-tools me-1" />
                    {vehicle.workOrders?.length || 0} iş emri
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0" style={{ color: "#18265a", fontWeight: 800 }}>
              İş Emirleri
            </h5>

            <span className="badge bg-light text-dark border">
              {vehicle.workOrders?.length || 0} kayıt
            </span>
          </div>

          {vehicle.workOrders?.length > 0 ? (
            <div className="row g-3">
              {vehicle.workOrders.map((order) => (
                <div className="col-md-6" key={order.id}>
                  <div className="vehicle-detail-card-hover card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5
                        className="mb-1"
                        style={{ color: "#18265a", fontWeight: 800 }}
                      >
                        {order.title}
                      </h5>

                      <div className="d-flex gap-2 flex-wrap mt-2">
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
                Bu araca ait iş emri kaydı bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .vehicle-detail-card-hover {
            transition:
              box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
              transform 0.22s cubic-bezier(.17,.67,.59,1.17),
              background 0.18s cubic-bezier(.17,.67,.59,1.17);
          }

          .vehicle-detail-card-hover:hover {
            box-shadow:
              0 14px 34px rgba(44, 62, 100, 0.18),
              0 2px 6px rgba(180, 206, 237, 0.16);
            background: linear-gradient(95deg, #f5fff9 88%, #e8f8ef 100%);
            transform: translateY(-2px) scale(1.017);
          }
        `}
      </style>
    </PageWrapper>
  );
}

export default ServiceVehicleDetailPage;