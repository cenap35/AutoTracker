import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomerVehicleById } from "../services/customerVehicleService";

function ServiceVehicleDetailPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    loadVehicle();
  }, []);

  const loadVehicle = async () => {
    const data = await getCustomerVehicleById(id);
    setVehicle(data);
  };

  if (!vehicle) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>
        {vehicle.brand} {vehicle.model}
      </h2>

      <div className="card p-3 mb-4">
        <p><strong>Plaka:</strong> {vehicle.plate}</p>
        <p><strong>Yıl:</strong> {vehicle.year}</p>
        <p><strong>KM:</strong> {vehicle.currentMileage}</p>
        <p><strong>Şasi No:</strong> {vehicle.chassisNumber}</p>
        <p><strong>Müşteri:</strong> {vehicle.customer.fullName}</p>

        <h5>Toplam Harcama</h5>
        <div className="fs-3 text-success">{vehicle.totalSpent} ₺</div>
      </div>

      <h4>İş Emirleri</h4>

      {vehicle.workOrders.map((order) => (
        <div key={order.id} className="card mb-2">
          <div className="card-body">
            <strong>{order.title}</strong>
            <br />
            Durum: {order.status}
            <br />
            Tutar: {order.totalCost} ₺
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServiceVehicleDetailPage;