import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";
import ServicePageHeader from "../components/ServiceComponents/ServicePageHeader";

import {
  getPartStats,
  getMonthlyPartStats,
  getTopPartSales,
  getPartSales,
  downloadPartReportPdf,
} from "../services/servicePartService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function ServicePartSalesPage() {
  const [stats, setStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topSales, setTopSales] = useState(null);
  const [sales, setSales] = useState([]);
  const [reportYear, setReportYear] = useState(new Date().getFullYear());
  const [reportMonth, setReportMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    loadPageData();
  }, [selectedYear, selectedMonth]);

  const loadPageData = async () => {
    try {
      setLoading(true);

      const [statsData, monthlyData, topSalesData, salesData] =
        await Promise.all([
          getPartStats(selectedYear, selectedMonth),
          getMonthlyPartStats(),
          getTopPartSales(selectedYear, selectedMonth),
          getPartSales(selectedYear, selectedMonth),
        ]);

      setStats(statsData);
      setMonthlyStats(monthlyData);
      setTopSales(topSalesData);
      setSales(salesData);
    } catch (err) {
      console.error(err);
      toast.error("Stok finans verileri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const blob = await downloadPartReportPdf({
        year: reportYear,
        month: reportMonth || undefined,
      });

      const fileName = reportMonth
        ? `stok-finans-raporu-${reportYear}-${String(reportMonth).padStart(2, "0")}.pdf`
        : `stok-finans-raporu-${reportYear}.pdf`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("PDF indirilemedi.");
    }
  };

  const formatCurrency = (value) =>
    Number(value || 0).toLocaleString("tr-TR", {
      maximumFractionDigits: 0,
    });

  const chartData = monthlyStats.map((item) => ({
    month: `${item.month}/${item.year}`,
    revenue: item.totalRevenue,
    profit: item.totalProfit,
    quantity: item.totalQuantity,
  }));

  if (loading) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Stok finans raporu yükleniyor..." />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div>
        <ServicePageHeader
          icon="💸"
          title="Stok Finans Raporu"
          subtitle="Stok sermayesi, dönemsel kar/ciro, satış trendleri ve PDF raporları."
        />

        <div className="finance-report-panel card border-0 shadow-sm p-3 p-md-4 mb-4">
          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap mb-3">
            <div>
              <h5
                className="mb-1"
                style={{ color: "#18265a", fontWeight: 850 }}
              >
                Rapor ve Ekran Dönemi
              </h5>
              <small className="text-muted">
                Ekrandaki dönem performansını inceleyin veya seçtiğiniz dönem
                için PDF raporu indirin.
              </small>
            </div>

            <span className="badge bg-primary-subtle text-primary border px-3 py-2">
              Ekran: {stats?.periodLabel || "-"}
            </span>
          </div>

          <div className="row g-3">
            <div className="col-lg-6">
              <div
                className="p-3 rounded-4 h-100"
                style={{ background: "#f7faff", border: "1px solid #e5ecfb" }}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span style={{ fontSize: 22 }}>📊</span>
                  <div>
                    <h6
                      className="mb-0"
                      style={{ color: "#18265a", fontWeight: 800 }}
                    >
                      Ekran Dönemi
                    </h6>
                    <small className="text-muted">
                      Kartlar, en iyi parçalar ve satış geçmişi
                    </small>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                      {[2024, 2025, 2026, 2027].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-select"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="">Tüm yıl</option>
                      <option value="1">Ocak</option>
                      <option value="2">Şubat</option>
                      <option value="3">Mart</option>
                      <option value="4">Nisan</option>
                      <option value="5">Mayıs</option>
                      <option value="6">Haziran</option>
                      <option value="7">Temmuz</option>
                      <option value="8">Ağustos</option>
                      <option value="9">Eylül</option>
                      <option value="10">Ekim</option>
                      <option value="11">Kasım</option>
                      <option value="12">Aralık</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="p-3 rounded-4 h-100"
                style={{ background: "#fff8f8", border: "1px solid #ffe0e0" }}
              >
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span style={{ fontSize: 22 }}>📄</span>
                  <div>
                    <h6
                      className="mb-0"
                      style={{ color: "#18265a", fontWeight: 800 }}
                    >
                      PDF Rapor
                    </h6>
                    <small className="text-muted">
                      Aylık veya yıllık stok finans çıktısı
                    </small>
                  </div>
                </div>

                <div className="row g-2">
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={reportYear}
                      onChange={(e) => setReportYear(Number(e.target.value))}
                    >
                      {[2024, 2025, 2026, 2027].map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={reportMonth}
                      onChange={(e) => setReportMonth(e.target.value)}
                    >
                      <option value="">Tüm yıl</option>
                      <option value="1">Ocak</option>
                      <option value="2">Şubat</option>
                      <option value="3">Mart</option>
                      <option value="4">Nisan</option>
                      <option value="5">Mayıs</option>
                      <option value="6">Haziran</option>
                      <option value="7">Temmuz</option>
                      <option value="8">Ağustos</option>
                      <option value="9">Eylül</option>
                      <option value="10">Ekim</option>
                      <option value="11">Kasım</option>
                      <option value="12">Aralık</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleDownloadPdf}
                    >
                      <i className="bi bi-file-earmark-pdf me-2" />
                      PDF İndir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionTitle
          icon="🏦"
          title="Anlık Stok Durumu"
          text="Depoda şu anda bulunan parçaların sermaye ve potansiyel gelir özeti."
        />

        <div className="row g-3 mb-4">
          <StatCard
            icon="🏦"
            title="Stoktaki Sermaye"
            value={`₺${formatCurrency(stats?.totalStockCost)}`}
            tone="#3b60c5"
          />
          <StatCard
            icon="🧾"
            title="Stok Satılırsa Ciro"
            value={`₺${formatCurrency(stats?.totalPotentialRevenue)}`}
            tone="#9b59b6"
          />
          <StatCard
            icon="📈"
            title="Stok Satılırsa Kar"
            value={`₺${formatCurrency(stats?.totalPotentialProfit)}`}
            tone="#1a906c"
          />
          <StatCard
            icon="⚠️"
            title="Kritik Stok"
            value={stats?.criticalStockCount || 0}
            tone="#dc3545"
          />
        </div>

        <SectionTitle
          icon="✅"
          title="Seçili Dönem Performansı"
          text={`${stats?.periodLabel || "Seçili dönem"} için gerçekleşen satış, ciro ve kar bilgileri.`}
        />

        <div className="row g-3 mb-4">
          <StatCard
            icon="✅"
            title={`${stats?.periodLabel || "Dönem"} Karı`}
            value={`₺${formatCurrency(stats?.totalRealizedProfit)}`}
            tone="#1a906c"
          />
          <StatCard
            icon="💰"
            title={`${stats?.periodLabel || "Dönem"} Cirosu`}
            value={`₺${formatCurrency(stats?.totalSalesRevenue)}`}
            tone="#b78b16"
          />
          <StatCard
            icon="📦"
            title={`${stats?.periodLabel || "Dönem"} Satılan Adet`}
            value={stats?.totalSoldQuantity || 0}
            tone="#5f4bb6"
          />
        </div>

        <div className="row g-3">
          <div className="col-lg-8">
            <div className="finance-card-hover card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <div>
                    <h5
                      className="mb-1"
                      style={{ color: "#18265a", fontWeight: 850 }}
                    >
                      Son 12 Ay Ciro / Kar
                    </h5>
                    <small className="text-muted">
                      Aylık satış ve kar trendi
                    </small>
                  </div>

                  <span className="badge bg-light text-dark border">
                    12 aylık görünüm
                  </span>
                </div>

                <div style={{ height: 330 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#edf2fb" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => `${formatCurrency(value)} ₺`}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Ciro"
                        stroke="#3b60c5"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        name="Kar"
                        stroke="#1a906c"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="finance-card-hover card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <div>
                    <h5
                      className="mb-1"
                      style={{ color: "#18265a", fontWeight: 850 }}
                    >
                      Satılan Adet
                    </h5>
                    <small className="text-muted">Son 12 ay parça adedi</small>
                  </div>

                  <span className="badge bg-light text-dark border">Adet</span>
                </div>

                <div style={{ height: 330 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#edf2fb" />
                      <XAxis dataKey="month" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar
                        dataKey="quantity"
                        name="Adet"
                        fill="#9b59b6"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mt-4">
          <div className="col-lg-6">
            <HighlightCard
              icon="🏆"
              title="En Çok Satan Parça"
              main={topSales?.bestSellingPart?.partName || "Veri yok"}
              sub={
                topSales?.bestSellingPart
                  ? `${topSales.bestSellingPart.totalQuantity} adet / ₺${formatCurrency(topSales.bestSellingPart.totalRevenue)} ciro`
                  : "Seçili dönemde satış yok"
              }
              tone="#b78b16"
            />
          </div>

          <div className="col-lg-6">
            <HighlightCard
              icon="💎"
              title="En Karlı Parça"
              main={topSales?.mostProfitablePart?.partName || "Veri yok"}
              sub={
                topSales?.mostProfitablePart
                  ? `₺${formatCurrency(topSales.mostProfitablePart.totalProfit)} toplam kar`
                  : "Seçili dönemde satış yok"
              }
              tone="#1a906c"
            />
          </div>
        </div>

        <div className="row g-3 mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm finance-card-hover">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                  <div>
                    <h5
                      className="mb-1"
                      style={{ color: "#18265a", fontWeight: 850 }}
                    >
                      Satış Geçmişi
                    </h5>
                    <small className="text-muted">
                      {stats?.periodLabel || "Seçili dönem"} satış hareketleri
                    </small>
                  </div>

                  <span className="badge bg-light text-dark border">
                    {sales.length} satış
                  </span>
                </div>

                {sales.length === 0 ? (
                  <div className="text-center p-4">
                    <div style={{ fontSize: 36 }}>💸</div>
                    <h6 className="mt-2 fw-bold">Seçili dönemde satış yok</h6>
                    <p className="text-muted mb-0">
                      Stok sayfasından satış yaptığınızda burada listelenir.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle">
                      <thead>
                        <tr>
                          <th>Tarih</th>
                          <th>Parça</th>
                          <th>Kod</th>
                          <th>Adet</th>
                          <th>Ciro</th>
                          <th>Kar</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sales.map((sale) => (
                          <tr key={sale.id}>
                            <td>
                              {new Date(sale.soldAt).toLocaleString("tr-TR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>

                            <td className="fw-semibold">{sale.partName}</td>
                            <td>{sale.partCode || "-"}</td>
                            <td>{sale.quantity}</td>
                            <td>₺{formatCurrency(sale.totalRevenue)}</td>
                            <td className="text-success fw-bold">
                              ₺{formatCurrency(sale.totalProfit)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            .finance-report-panel {
              border-radius: 22px;
              background:
                radial-gradient(circle at top right, rgba(59,96,197,.10), transparent 34%),
                rgba(255,255,255,.96);
            }
  
            .finance-card-hover {
              border-radius: 18px;
              transition:
                box-shadow 0.23s cubic-bezier(.17,.67,.59,1.17),
                transform 0.22s cubic-bezier(.17,.67,.59,1.17),
                background 0.18s ease;
            }
  
            .finance-card-hover:hover {
              box-shadow:
                0 14px 34px rgba(44, 62, 100, 0.18),
                0 2px 6px rgba(180, 206, 237, 0.16) !important;
              transform: translateY(-2px) scale(1.01);
            }
  
            .finance-section-title {
              margin-bottom: 14px;
            }
  
            .finance-section-title h5 {
              color: #18265a;
              font-weight: 850;
            }
          `}
        </style>
      </div>
    </PageWrapper>
  );
}

function SectionTitle({ icon, title, text }) {
  return (
    <div className="finance-section-title d-flex align-items-start gap-2 mt-2">
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div>
        <h5 className="mb-1">{title}</h5>
        <p className="text-muted small mb-0">{text}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, tone = "#3b60c5" }) {
  return (
    <div className="col-md-6 col-xl-3">
      <div className="finance-card-hover card border-0 shadow-sm h-100">
        <div className="card-body p-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: `${tone}18`,
              color: tone,
              fontSize: 24,
            }}
          >
            {icon}
          </div>

          <div className="text-muted small">{title}</div>

          <div className="h4 fw-bold mb-0 mt-1" style={{ color: "#18265a" }}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightCard({ icon, title, main, sub, tone = "#3b60c5" }) {
  return (
    <div className="finance-card-hover card border-0 shadow-sm h-100">
      <div className="card-body p-4 d-flex gap-3 align-items-start">
        <div
          className="d-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            width: 54,
            height: 54,
            borderRadius: 18,
            background: `${tone}18`,
            color: tone,
            fontSize: 28,
          }}
        >
          {icon}
        </div>

        <div>
          <div className="text-muted small">{title}</div>

          <h5
            className="mt-1 mb-2"
            style={{ color: "#18265a", fontWeight: 850 }}
          >
            {main}
          </h5>

          <p className="text-muted mb-0">{sub}</p>
        </div>
      </div>
    </div>
  );
}

export default ServicePartSalesPage;
