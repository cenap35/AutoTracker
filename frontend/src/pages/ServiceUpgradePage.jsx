import { useNavigate } from "react-router-dom";

function ServiceUpgradePage() {
  const navigate = useNavigate();

  const handleFakePayment = () => {
    navigate("/service/setup");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4">
            <h2>Servis Yönetim Paneli</h2>

            <p className="text-muted">
              Müşteri, araç, iş emri ve servis gelirlerinizi tek panelden
              yönetin.
            </p>

            <div className="border rounded p-3 my-4">
              <h4>AutoTracker Service</h4>
              <h2>299 TL / ay</h2>

              <ul>
                <li>Müşteri yönetimi</li>
                <li>Araç geçmişi</li>
                <li>İş emri takibi</li>
                <li>Dashboard ve gelir takibi</li>
              </ul>
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleFakePayment}
            >
              Demo Ödeme Yap ve Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceUpgradePage;