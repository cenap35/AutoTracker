import { useNavigate } from "react-router-dom";

function ServiceUpgradePage() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg p-5">
            <div className="text-center mb-4">
              <div style={{ fontSize: "60px" }}>🔧</div>

              <h1
                className="mt-3"
                style={{ color: "#18265a", fontWeight: 800 }}
              >
                AutoTracker Service
              </h1>

              <p className="text-muted">
                Servisinizdeki müşteri, araç, iş emri ve cari hesap süreçlerini
                tek panelden yönetin.
              </p>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                  👥 Müşteri Yönetimi
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                  🚗 Araç Takibi
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                  🛠️ İş Emirleri
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                  💳 Cari Hesap Yönetimi
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                  📦 Stok ve Parça Takibi
                </div>
              </div>

              <div className="col-md-6">
                <div className="border rounded p-3 h-100">
                  📊 Servis Dashboardu
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg w-100"
              onClick={() => navigate("/service/setup")}
            >
              Servis Hesabı Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceUpgradePage;