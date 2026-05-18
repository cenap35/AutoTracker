import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CostByVehicleChart({ data }) {
  const filteredData = data.filter((vehicle) => vehicle.totalCost > 0);

  return (
    <div className="card mt-5 border-0 shadow-sm" style={{ borderRadius: 14 }}>
      <div className="card-body">
        <h5 className="mb-4 fw-semibold">
          <i className="bi bi-bar-chart-fill text-primary me-2"></i>
          Araçlara Göre Bakım Masrafı
        </h5>

        {filteredData.length === 0 ? (
          <p className="text-muted">Henüz grafik için bakım masrafı yok.</p>
        ) : (
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <XAxis dataKey="vehicleName" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) =>
                    value?.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      maximumFractionDigits: 0,
                    })
                  }
                />
                <Bar dataKey="totalCost" fill="#2d7be0" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default CostByVehicleChart;