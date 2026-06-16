import { useEffect, useState } from "react";
import { getCustomers } from "../services/serviceCustomerService";

function ServiceCustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  return (
    <div>
      <h2>Müşteriler</h2>

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