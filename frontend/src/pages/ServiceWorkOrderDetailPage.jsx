import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceWorkOrderById } from "../services/serviceWorkOrderService";

function ServiceWorkOrderDetailPage() {
  const { id } = useParams();
  const [workOrder, setWorkOrder] = useState(null);

  useEffect(() => {
    loadWorkOrder();
  }, []);

  const loadWorkOrder = async () => {
    const data = await getServiceWorkOrderById(id);
    setWorkOrder(data);
  };

  if (!workOrder) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>{workOrder.title}</h2>

      <div className="card p-3 mb-4">
        <p><strong>Müşteri:</strong> {workOrder.customer.fullName}</p>
        <p><strong>Telefon:</strong> {workOrder.customer.phone}</p>
        <p>
          <strong>Araç:</strong> {workOrder.vehicle.brand}{" "}
          {workOrder.vehicle.model} - {workOrder.vehicle.plate}
        </p>
        <p><strong>Açıklama:</strong> {workOrder.description}</p>
        <p><strong>KM:</strong> {workOrder.mileage}</p>
        <p><strong>Durum:</strong> {workOrder.status}</p>
      </div>

      <div className="card p-3">
        <h4>Ücret Bilgisi</h4>
        <p><strong>İşçilik:</strong> {workOrder.laborCost} ₺</p>
        <p><strong>Parça:</strong> {workOrder.partsCost} ₺</p>
        <h3>Toplam: {workOrder.totalCost} ₺</h3>
      </div>
    </div>
  );
}

export default ServiceWorkOrderDetailPage;