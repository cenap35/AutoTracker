import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
} from "../services/serviceCustomerService";

function ServiceCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const createdCustomer = await createCustomer(form);
  
    setCustomers([createdCustomer, ...customers]);
  
    setForm({
      fullName: "",
      phone: "",
      note: "",
    });
  };

  return (
    <div>
      <h2>Müşteriler</h2>

      <form onSubmit={handleSubmit} className="card p-3 mt-3">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Ad Soyad"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Telefon"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Not"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">Ekle</button>
          </div>
        </div>
      </form>

      <div className="mt-4">
        {customers.map((customer) => (
          <div key={customer.id} className="card mb-3">
            <div className="card-body">
              <h5>{customer.fullName}</h5>
              <p>{customer.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCustomersPage;
