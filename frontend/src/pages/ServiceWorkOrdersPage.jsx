import { useEffect, useState } from "react";
import { getServiceWorkOrders } from "../services/serviceWorkOrderService";

function ServiceWorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    loadWorkOrders();
  }, []);

  const loadWorkOrders = async () => {
    const data = await getServiceWorkOrders();
    setWorkOrders(data);
  };

  return (
    <div>
      <h2>İş Emirleri</h2>

      <div className="mt-4">
        {workOrders.map((order) => (
          <div key={order.id} className="card mb-3">
            <div className="card-body">
              <h5>{order.title}</h5>

              <p className="mb-1">
                <strong>Müşteri:</strong> {order.customerName}
              </p>

              <p className="mb-1">
                <strong>Araç:</strong> {order.vehicleName} - {order.plate}
              </p>

              <p className="mb-1">
                <strong>Durum:</strong> {order.status}
              </p>

              <p className="mb-0">
                <strong>Tutar:</strong> {order.totalCost} ₺
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceWorkOrdersPage;