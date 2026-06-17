import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function ServiceSetupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/servicebusinesses", form);

      localStorage.setItem("role", response.data.role);

      navigate("/service/dashboard");
    } catch (error) {
      if (error.response?.status === 400) {
        navigate("/service/dashboard");
        return;
      }

      console.error(error);
      alert("Servis oluşturulamadı.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 p-4">
            <h2>Servis Bilgileri</h2>

            <p className="text-muted">
              Servis panelinizi aktifleştirmek için bilgilerinizi girin.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                placeholder="Servis Adı"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                className="form-control mb-3"
                placeholder="Telefon"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="form-control mb-3"
                placeholder="Şehir"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <textarea
                className="form-control mb-3"
                placeholder="Adres"
                rows="3"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <button className="btn btn-success w-100">Servisi Oluştur</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceSetupPage;
