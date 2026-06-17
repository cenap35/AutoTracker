import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerById } from "../services/serviceCustomerService";

function ServiceCustomerDetailPage() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    const data = await getCustomerById(id);
    setCustomer(data);
  };

  if (!customer) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>{customer.fullName}</h2>

      <div className="card p-3 mb-4">
        <p>
          <strong>Telefon:</strong> {customer.phone}
        </p>

        <p>
          <strong>Not:</strong> {customer.note}
        </p>

        <h5>Toplam Harcama</h5>

        <div className="fs-3 text-success">
          {customer.totalSpent} ₺
        </div>
      </div>

      <h4>Araçlar</h4>

      {customer.vehicles.map((vehicle) => (
        <div key={vehicle.id} className="card mb-2">
          <div className="card-body">
            {vehicle.brand} {vehicle.model} - {vehicle.plate}
          </div>
        </div>
      ))}

      <h4 className="mt-4">İş Emirleri</h4>

      {customer.workOrders.map((order) => (
        <div key={order.id} className="card mb-2">
          <div className="card-body">
            <strong>{order.title}</strong>

            <br />

            {order.vehicleName}

            <br />

            {order.totalCost} ₺
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceCustomerDetailPage;