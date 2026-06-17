import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getServiceWorkOrderById,
  updateWorkOrderStatus,
} from "../services/serviceWorkOrderService";

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

  const handleStatusChange = async (status) => {
    const result = await updateWorkOrderStatus(workOrder.id, status);
  
    setWorkOrder({
      ...workOrder,
      status: result.status,
      completedAt: result.completedAt,
    });
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

  if (!workOrder) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{workOrder.title}</h2>

        <span className={`badge fs-6 ${getStatusClass(workOrder.status)}`}>
          {getStatusText(workOrder.status)}
        </span>
      </div>

      <div className="card p-3 mb-4">
        <p>
          <strong>Müşteri:</strong> {workOrder.customer.fullName}
        </p>

        <p>
          <strong>Telefon:</strong> {workOrder.customer.phone}
        </p>

        <p>
          <strong>Araç:</strong> {workOrder.vehicle.brand}{" "}
          {workOrder.vehicle.model} - {workOrder.vehicle.plate}
        </p>

        <p>
          <strong>Açıklama:</strong> {workOrder.description}
        </p>

        <p>
          <strong>KM:</strong> {workOrder.mileage}
        </p>

        <p>
          <strong>Durum:</strong> {getStatusText(workOrder.status)}
        </p>

        <div className="mt-3">
          <button
            className="btn btn-warning me-2"
            onClick={() => handleStatusChange("Pending")}
          >
            Bekliyor
          </button>

          <button
            className="btn btn-primary me-2"
            onClick={() => handleStatusChange("InProgress")}
          >
            İşlemde
          </button>

          <button
            className="btn btn-success"
            onClick={() => handleStatusChange("Completed")}
          >
            Tamamlandı
          </button>
        </div>
      </div>

      <div className="card p-3">
        <h4>Ücret Bilgisi</h4>

        <p>
          <strong>İşçilik:</strong> {workOrder.laborCost} ₺
        </p>

        <p>
          <strong>Parça:</strong> {workOrder.partsCost} ₺
        </p>

        <h3>Toplam: {workOrder.totalCost} ₺</h3>
      </div>
    </div>
  );
}

export default ServiceWorkOrderDetailPage;