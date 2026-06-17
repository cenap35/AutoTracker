import { useEffect, useState } from "react";
import { getParts, createPart } from "../services/servicePartService";

function ServicePartsPage() {
  const [parts, setParts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    purchasePrice: "",
    salePrice: "",
    stockQuantity: "",
  });

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    const data = await getParts();
    setParts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdPart = await createPart(form);

    setParts([createdPart, ...parts]);

    setForm({
      name: "",
      code: "",
      purchasePrice: "",
      salePrice: "",
      stockQuantity: "",
    });
  };

  return (
    <div>
      <h2>Parça Stokları</h2>

      <form onSubmit={handleSubmit} className="card p-3 mt-3">
        <div className="row g-2">

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Parça Adı"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Kod"
              value={form.code}
              onChange={(e) =>
                setForm({ ...form, code: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Alış"
              value={form.purchasePrice}
              onChange={(e) =>
                setForm({ ...form, purchasePrice: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Satış"
              value={form.salePrice}
              onChange={(e) =>
                setForm({ ...form, salePrice: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Stok"
              value={form.stockQuantity}
              onChange={(e) =>
                setForm({ ...form, stockQuantity: e.target.value })
              }
            />
          </div>

          <div className="col-md-1">
            <button className="btn btn-success w-100">
              Ekle
            </button>
          </div>

        </div>
      </form>

      <div className="mt-4">
        {parts.map((part) => (
          <div key={part.id} className="card mb-3">
            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>
                  <h5>{part.name}</h5>
                  <small>{part.code}</small>
                </div>

                <div>
                  {part.stockQuantity <= 3 ? (
                    <span className="badge bg-danger">
                      Kritik Stok ({part.stockQuantity})
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      Stok: {part.stockQuantity}
                    </span>
                  )}
                </div>

              </div>

              <hr />

              <p>Alış: {part.purchasePrice} ₺</p>
              <p>Satış: {part.salePrice} ₺</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicePartsPage;