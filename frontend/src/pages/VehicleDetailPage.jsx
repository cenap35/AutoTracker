import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion, AnimatePresence } from "framer-motion";
import { getVehicleById, updateVehicle } from "../services/vehicleService";
import PageWrapper from "../components/PageWrapper";
import vehicleData from "../constants/vehicleData";
import {
  getMaintenanceRecords,
  createMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
} from "../services/maintenanceService";
import AddMaintenanceForm from "../components/AddMaintenanceForm";
import MaintenanceCard from "../components/MaintenanceCard";
import {
  getVehicleNotes,
  createVehicleNote,
  updateVehicleNote,
  deleteVehicleNote,
} from "../services/vehicleNoteService";
import VehicleNotesSection from "../components/VehicleNotesSection";
import ReminderForm from "../components/ReminderForm";
import {
  getVehicleReminders,
  createVehicleReminder,
  updateVehicleReminder,
  deleteVehicleReminder,
} from "../services/vehicleReminderService";
import ReminderCard from "../components/ReminderCard";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { toast } from "react-toastify";

function VehicleDetailPage() {
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [maintenanceRecords, setMaintenanceRecords] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [currentMileage, setCurrentMileage] = useState("");

  const [vehicleNotes, setVehicleNotes] = useState([]);

  const [vehicleReminders, setVehicleReminders] = useState([]);

  const [selectedMaintenanceIds, setSelectedMaintenanceIds] = useState([]);

  const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [isReminderFormOpen, setIsReminderFormOpen] = useState(false);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getVehicleById(id);
        setVehicle(data);
        setBrand(data.brand);
        setModel(data.model);
        setYear(data.year);
        setPlateNumber(data.plateNumber);
        setCurrentMileage(data.currentMileage);
        const records = await getMaintenanceRecords(id);
        setMaintenanceRecords(records);
        const notes = await getVehicleNotes();
        const filteredNotes = notes.filter(
          (note) => note.vehicleId === Number(id),
        );
        setVehicleNotes(filteredNotes);
        const reminders = await getVehicleReminders();
        const filteredReminders = reminders.filter(
          (reminder) => reminder.vehicleId === Number(id),
        );
        setVehicleReminders(filteredReminders);
      } catch (err) {
        setError("Araç detayı yüklenemedi");
        console.error(err);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleToggleVehicleNote = async (note) => {
    try {
      await updateVehicleNote(note.id, {
        title: note.title,
        content: note.content,
        priority: note.priority,
        isCompleted: !note.isCompleted,
      });

      setVehicleNotes(
        vehicleNotes.map((item) =>
          item.id === note.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      );

      toast.success(
        note.isCompleted
          ? "Not tekrar bekleyen olarak işaretlendi."
          : "Not tamamlandı.",
      );
    } catch (err) {
      toast.error("Not güncellenemedi.");
      console.error(err);
    }
  };

  const handleCreateVehicleNote = async (noteData) => {
    try {
      const newNote = await createVehicleNote(noteData);

      setVehicleNotes([...vehicleNotes, newNote]);
      toast.success("Not başarıyla eklendi.");
    } catch (err) {
      toast.error("Not eklenemedi.");
      console.error(err);
    }
  };

  const handleDeleteVehicleNote = async (noteId) => {
    try {
      await deleteVehicleNote(noteId);

      setVehicleNotes(vehicleNotes.filter((note) => note.id !== noteId));
      toast.success("Not başarıyla silindi.");
    } catch (err) {
      toast.error("Not silinemedi.");
      console.error(err);
    }
  };

  const handleUpdateVehicleNote = async (noteId, updatedData) => {
    try {
      await updateVehicleNote(noteId, updatedData);

      setVehicleNotes(
        vehicleNotes.map((note) =>
          note.id === noteId ? { ...note, ...updatedData } : note,
        ),
      );

      toast.success("Not başarıyla güncellendi.");
    } catch (err) {
      toast.error("Not güncellenemedi.");
      console.error(err);
    }
  };

  const handleCreateMaintenanceRecord = async (recordData) => {
    try {
      const newRecord = await createMaintenanceRecord(id, recordData);

      setMaintenanceRecords([...maintenanceRecords, newRecord]);
      toast.success("Bakım kaydı başarıyla eklendi.");
    } catch (err) {
      toast.error("Bakım kaydı eklenemedi.");
      console.error(err);
    }
  };

  const handleDeleteMaintenanceRecord = async (recordId) => {
    try {
      await deleteMaintenanceRecord(id, recordId);

      setMaintenanceRecords(
        maintenanceRecords.filter((record) => record.id !== recordId),
      );

      toast.success("Bakım kaydı başarıyla silindi.");
    } catch (err) {
      toast.error("Bakım kaydı silinemedi.");
      console.error(err);
    }
  };

  const handleUpdateMaintenanceRecord = async (recordId, recordData) => {
    try {
      await updateMaintenanceRecord(id, recordId, recordData);

      setMaintenanceRecords(
        maintenanceRecords.map((record) =>
          record.id === recordId ? { ...record, ...recordData } : record,
        ),
      );

      toast.success("Bakım kaydı başarıyla güncellendi.");
    } catch (err) {
      toast.error("Bakım kaydı güncellenemedi.");
      console.error(err);
    }
  };

  const handleToggleMaintenanceSelection = (recordId) => {
    setSelectedMaintenanceIds((prev) =>
      prev.includes(recordId)
        ? prev.filter((id) => id !== recordId)
        : [...prev, recordId],
    );
  };

  const handleUpdateVehicle = async (e) => {
    e.preventDefault();

    try {
      await updateVehicle(id, {
        brand,
        model,
        year: Number(year),
        plateNumber,
        currentMileage: Number(currentMileage),
      });

      const updatedVehicle = await getVehicleById(id);
      setVehicle(updatedVehicle);

      toast.success("Araç bilgileri başarıyla güncellendi.");
    } catch (err) {
      toast.error("Araç bilgileri güncellenemedi.");
      console.error(err);
    }
  };

  const handleCreateVehicleReminder = async (reminderData) => {
    try {
      const newReminder = await createVehicleReminder(reminderData);

      setVehicleReminders([newReminder, ...vehicleReminders]);
      setError("");
      toast.success("Takip başarıyla eklendi.");
    } catch (err) {
      setError("Takip eklenemedi.");
      toast.error("Takip eklenemedi.");
      console.error(err);
    }
  };

  const handleToggleVehicleReminder = async (reminder) => {
    try {
      await updateVehicleReminder(reminder.id, {
        type: reminder.type,
        dueDate: reminder.dueDate,
        amount: reminder.amount,
        description: reminder.description,
        isCompleted: !reminder.isCompleted,
      });

      setVehicleReminders(
        vehicleReminders.map((item) =>
          item.id === reminder.id
            ? { ...item, isCompleted: !item.isCompleted }
            : item,
        ),
      );

      toast.success(
        reminder.isCompleted
          ? "Takip tekrar bekleyen olarak işaretlendi."
          : "Takip tamamlandı.",
      );
    } catch (err) {
      setError("Takip güncellenemedi.");
      toast.error("Takip güncellenemedi.");
      console.error(err);
    }
  };

  const handleDeleteVehicleReminder = async (id) => {
    try {
      await deleteVehicleReminder(id);

      setVehicleReminders(
        vehicleReminders.filter((reminder) => reminder.id !== id),
      );

      toast.success("Takip başarıyla silindi.");
    } catch (err) {
      setError("Takip silinemedi.");
      toast.error("Takip silinemedi.");
      console.error(err);
    }
  };

  {
    /*General PDF REPORT */
  }
  const handleDownloadVehicleReport = () => {
    const doc = new jsPDF();
    const reportDate = new Date().toLocaleDateString("tr-TR");

    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFillColor(40, 65, 133);
    doc.rect(0, 0, pageWidth, 34, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("AutoTracker", 14, 14);

    doc.setFontSize(11);
    doc.text("Araç Durum ve Bakım Raporu", 14, 23);

    doc.setFontSize(9);
    doc.text(`Rapor Tarihi: ${reportDate}`, pageWidth - 14, 14, {
      align: "right",
    });

    doc.setTextColor(40, 65, 133);
    doc.setFontSize(14);
    doc.text("Araç Bilgileri", 14, 48);

    autoTable(doc, {
      startY: 54,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        0: { fontStyle: "bold", textColor: [40, 65, 133], cellWidth: 45 },
        1: { textColor: [70, 85, 105] },
      },
      body: [
        ["Marka", vehicle.brand],
        ["Model", vehicle.model],
        ["Plaka", vehicle.plateNumber],
        ["Yıl", vehicle.year],
        [
          "Güncel KM",
          `${vehicle.currentMileage?.toLocaleString("tr-TR") || 0} km`,
        ],
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 8,
      head: [["Bakım Kaydı", "Toplam Masraf", "Ortalama Masraf", "Son Bakım"]],
      body: [
        [
          maintenanceRecords.length,
          `TL ${totalMaintenanceCost.toLocaleString("tr-TR")}`,
          `TL ${averageMaintenanceCost.toLocaleString("tr-TR", {
            maximumFractionDigits: 0,
          })}`,
          latestMaintenanceDate
            ? latestMaintenanceDate.toLocaleDateString("tr-TR")
            : "-",
        ],
      ],
      styles: {
        fontSize: 9,
        halign: "center",
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [59, 96, 197],
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [40, 65, 133],
        fontStyle: "bold",
      },
    });

    doc.setTextColor(40, 65, 133);
    doc.setFontSize(13);
    doc.text("Bakım Geçmişi", 14, doc.lastAutoTable.finalY + 14);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["İşlem", "Tarih", "KM", "Tutar"]],
      body:
        maintenanceRecords.length > 0
          ? [...maintenanceRecords]
              .sort(
                (a, b) =>
                  new Date(b.maintenanceDate) - new Date(a.maintenanceDate),
              )
              .map((record) => [
                record.title || "-",
                record.maintenanceDate
                  ? new Date(record.maintenanceDate).toLocaleDateString("tr-TR")
                  : "-",
                `${Number(record.mileage || 0).toLocaleString("tr-TR")} km`,
                `TL ${Number(record.cost || 0).toLocaleString("tr-TR")}`,
              ])
          : [["Bakım kaydı bulunmuyor", "-", "-", "-"]],
      headStyles: {
        fillColor: [40, 65, 133],
        textColor: 255,
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    });

    doc.setTextColor(40, 65, 133);
    doc.setFontSize(13);
    doc.text("Araç Takipleri", 14, doc.lastAutoTable.finalY + 14);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Takip", "Tarih", "Tutar", "Durum"]],
      body:
        vehicleReminders.length > 0
          ? [...vehicleReminders]
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map((reminder) => [
                reminder.type || "-",
                reminder.dueDate
                  ? new Date(reminder.dueDate).toLocaleDateString("tr-TR")
                  : "-",
                reminder.amount
                  ? `TL ${Number(reminder.amount).toLocaleString("tr-TR")}`
                  : "-",
                reminder.isCompleted ? "Tamamlandı" : "Bekliyor",
              ])
          : [["Takip kaydı bulunmuyor", "-", "-", "-"]],
      headStyles: {
        fillColor: [40, 65, 133],
        textColor: 255,
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    });

    doc.setTextColor(40, 65, 133);
    doc.setFontSize(13);
    doc.text("Araç Notları", 14, doc.lastAutoTable.finalY + 14);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Not", "Öncelik", "Durum"]],
      body:
        vehicleNotes.length > 0
          ? vehicleNotes.map((note) => [
              note.title || "-",
              note.priority || "-",
              note.isCompleted ? "Tamamlandı" : "Bekliyor",
            ])
          : [["Not bulunmuyor", "-", "-"]],
      headStyles: {
        fillColor: [40, 65, 133],
        textColor: 255,
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    });

    const finalY = doc.lastAutoTable.finalY + 14;

    doc.setTextColor(120, 130, 150);
    doc.setFontSize(8);
    doc.text(
      "Bu rapor AutoTracker tarafından otomatik olarak oluşturulmuştur.",
      14,
      finalY,
    );

    doc.save(`AutoTracker-${vehicle.plateNumber}-Arac-Raporu.pdf`);
  };

  {
    /*Maintanence Report */
  }

  const generateMaintenanceInvoicePdf = (records, fileSuffix) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const invoiceDate = new Date().toLocaleDateString("tr-TR");

    const invoiceTotal = records.reduce(
      (sum, record) => sum + Number(record.cost || 0),
      0,
    );

    doc.setFillColor(40, 65, 133);
    doc.rect(0, 0, pageWidth, 34, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("AutoTracker", 14, 14);

    doc.setFontSize(11);
    doc.text("Bakim Faturasi / Servis Özeti", 14, 23);

    doc.setFontSize(9);
    doc.text(`Tarih: ${invoiceDate}`, pageWidth - 14, 14, {
      align: "right",
    });

    doc.setTextColor(40, 65, 133);
    doc.setFontSize(13);
    doc.text("Araç Bilgileri", 14, 48);

    autoTable(doc, {
      startY: 54,
      theme: "plain",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      columnStyles: {
        0: { fontStyle: "bold", textColor: [40, 65, 133], cellWidth: 45 },
        1: { textColor: [70, 85, 105] },
      },
      body: [
        ["Araç", `${vehicle.brand} ${vehicle.model}`],
        ["Plaka", vehicle.plateNumber],
        ["Yil", vehicle.year],
        [
          "Güncel KM",
          `${vehicle.currentMileage?.toLocaleString("tr-TR") || 0} km`,
        ],
      ],
    });

    doc.setTextColor(40, 65, 133);
    doc.setFontSize(13);
    doc.text("Bakim Kalemleri", 14, doc.lastAutoTable.finalY + 14);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Islem", "Tarih", "KM", "Tutar"]],
      body:
        records.length > 0
          ? [...records]
              .sort(
                (a, b) =>
                  new Date(b.maintenanceDate) - new Date(a.maintenanceDate),
              )
              .map((record) => [
                record.title || "-",
                record.maintenanceDate
                  ? new Date(record.maintenanceDate).toLocaleDateString("tr-TR")
                  : "-",
                `${Number(record.mileage || 0).toLocaleString("tr-TR")} km`,
                `TL ${Number(record.cost || 0).toLocaleString("tr-TR")}`,
              ])
          : [["Bakim kaydi bulunmuyor", "-", "-", "-"]],
      headStyles: {
        fillColor: [40, 65, 133],
        textColor: 255,
      },
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      theme: "plain",
      styles: {
        fontSize: 11,
        cellPadding: 3,
      },
      columnStyles: {
        0: { fontStyle: "bold", halign: "right", textColor: [40, 65, 133] },
        1: { fontStyle: "bold", halign: "right", textColor: [220, 53, 69] },
      },
      body: [["Genel Toplam", `TL ${invoiceTotal.toLocaleString("tr-TR")}`]],
    });

    const finalY = doc.lastAutoTable.finalY + 18;

    doc.setTextColor(120, 130, 150);
    doc.setFontSize(8);
    doc.text(
      "Bu belge AutoTracker tarafindan bakim faturasi / servis özeti olarak olusturulmustur.",
      14,
      finalY,
    );

    doc.setTextColor(40, 65, 133);
    doc.setFontSize(10);
    doc.text("Servis / Yetkili imza", pageWidth - 14, finalY + 18, {
      align: "right",
    });

    doc.line(pageWidth - 70, finalY + 28, pageWidth - 14, finalY + 28);

    doc.save(`AutoTracker-${vehicle.plateNumber}-${fileSuffix}.pdf`);
  };

  const handleDownloadMaintenanceInvoice = () => {
    generateMaintenanceInvoicePdf(maintenanceRecords, "Bakim-Faturasi");
  };

  const handleDownloadSelectedMaintenanceInvoice = () => {
    const selectedRecords = maintenanceRecords.filter((record) =>
      selectedMaintenanceIds.includes(record.id),
    );

    if (selectedRecords.length === 0) {
      toast.warning("Fatura oluşturmak için bakım seçmelisiniz.");
      return;
    }

    generateMaintenanceInvoicePdf(selectedRecords, "Secili-Bakim-Faturasi");
    setSelectedMaintenanceIds([]);
  };

  if (error) {
    return (
      <PageWrapper>
        <div className="container py-5">
          <div className="alert alert-danger text-center shadow-sm rounded-3">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!vehicle) {
    return (
      <PageWrapper>
        <LoadingSpinner text="Araç detayı yükleniyor..." />
      </PageWrapper>
    );
  }

  const totalMaintenanceCost = maintenanceRecords.reduce(
    (sum, record) => sum + Number(record.cost || 0),
    0,
  );

  const averageMaintenanceCost =
    maintenanceRecords.length > 0
      ? totalMaintenanceCost / maintenanceRecords.length
      : 0;

  const latestMaintenanceDate =
    maintenanceRecords.length > 0
      ? maintenanceRecords
          .map((record) => new Date(record.maintenanceDate))
          .sort((a, b) => b - a)[0]
      : null;

  return (
    <PageWrapper>
      <div
        className="py-4"
        style={{
          minHeight: "100vh",
          background: "#f7fafd",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            {/* Araç Bilgisi */}
            <div
              className="card border-0 shadow-sm mb-3"
              style={{
                borderRadius: 14,
                background: "#fff",
              }}
            >
              <div className="card-body d-flex flex-column flex-md-row gap-3 align-items-md-center py-3 px-4">
                <div>
                  <h3 className="fw-semibold mb-2" style={{ color: "#2563eb" }}>
                    <i className="bi bi-car-front-fill me-2"></i>
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <div className="mb-2 d-flex flex-wrap gap-2">
                    <span
                      className="badge bg-primary text-white"
                      style={{ fontSize: 16 }}
                    >
                      {vehicle.plateNumber}
                    </span>
                    <span
                      className="badge bg-light text-dark border"
                      style={{ fontSize: 15 }}
                    >
                      Yıl: {vehicle.year}
                    </span>
                    <span
                      className="badge bg-light text-dark border"
                      style={{ fontSize: 15 }}
                    >
                      Km: {vehicle.currentMileage?.toLocaleString("tr-TR") || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm fw-semibold"
                      onClick={handleDownloadVehicleReport}
                      style={{ borderRadius: 10 }}
                    >
                      <i className="bi bi-file-earmark-pdf me-2"></i>
                      Araç Genel Raporu PDF
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm fw-semibold"
                      onClick={handleDownloadMaintenanceInvoice}
                      style={{ borderRadius: 10 }}
                    >
                      <i className="bi bi-receipt me-2"></i>
                      Tüm Bakımları Faturala
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="mb-3">
              <div className="row g-2">
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      Bakım Kaydı
                    </div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      {maintenanceRecords.length}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      Toplam Masraf
                    </div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      ₺{totalMaintenanceCost.toLocaleString("tr-TR")}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      Ortalama Masraf
                    </div>
                    <div className="fw-bold" style={{ fontSize: 22 }}>
                      ₺
                      {averageMaintenanceCost.toLocaleString("tr-TR", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center p-3 bg-white border rounded-3 h-100">
                    <div className="text-muted" style={{ fontSize: 13 }}>
                      Son Bakım
                    </div>
                    <div className="fw-bold" style={{ fontSize: 18 }}>
                      {latestMaintenanceDate
                        ? latestMaintenanceDate.toLocaleDateString("tr-TR")
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Araç Güncelleme Formu */}
            <div
              className="card border-0 shadow-sm mb-3"
              style={{
                borderRadius: 10,
                background: "#fff",
              }}
            >
              <div className="card-body p-4">
                <div
                  className="mb-3 text-secondary fw-normal"
                  style={{ fontSize: 17 }}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Araç Bilgisini Güncelle
                </div>
                <form className="row g-2 mb-1" onSubmit={handleUpdateVehicle}>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={brand}
                      required
                      onChange={(e) => {
                        setBrand(e.target.value);
                        setModel("");
                      }}
                    >
                      <option value="">Marka Seç</option>
                      {Object.keys(vehicleData).map((brandName) => (
                        <option key={brandName} value={brandName}>
                          {brandName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={model}
                      required
                      onChange={(e) => setModel(e.target.value)}
                      disabled={!brand}
                    >
                      <option value="">Model Seç</option>
                      {brand &&
                        vehicleData[brand].map((modelName) => (
                          <option key={modelName} value={modelName}>
                            {modelName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    >
                      <option value="">Yıl seç</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 1980 + 2 },
                        (_, index) => new Date().getFullYear() + 1 - index,
                      ).map((yearValue) => (
                        <option key={yearValue} value={yearValue}>
                          {yearValue}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <input
                      className="form-control"
                      placeholder="Plaka"
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Güncel Km"
                      value={currentMileage}
                      onChange={(e) => setCurrentMileage(e.target.value)}
                      min={0}
                      required
                    />
                  </div>
                  <div className="col-md-8 d-flex align-items-end mt-2 justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 fw-bold"
                      style={{ borderRadius: 8, fontSize: 16 }}
                    >
                      <i className="bi bi-save me-2"></i>Güncelle
                    </button>
                  </div>
                </form>
              </div>
            </div>

            

   {/* Bakım Kayıtları */}
<div
  className="card border-0 shadow-sm mb-3"
  style={{
    borderRadius: 10,
    background: "#fff",
  }}
>
  <div className="card-body px-4 py-3">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
      <div className="text-primary fw-bold" style={{ fontSize: 18 }}>
        <i className="bi bi-tools me-2"></i>
        Bakım Kayıtları
      </div>

      <div className="d-flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm fw-semibold"
          onClick={() => setIsMaintenanceFormOpen((prev) => !prev)}
          style={{ borderRadius: 10 }}
        >
          <i
            className={`bi ${
              isMaintenanceFormOpen ? "bi-chevron-up" : "bi-plus-circle"
            } me-1`}
          ></i>
          {isMaintenanceFormOpen ? "Formu Kapat" : "Bakım Ekle"}
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm fw-semibold"
          onClick={handleDownloadSelectedMaintenanceInvoice}
          disabled={selectedMaintenanceIds.length === 0}
          style={{ borderRadius: 10 }}
        >
          <i className="bi bi-receipt me-2"></i>
          Seçilenlerden Fatura Oluştur ({selectedMaintenanceIds.length})
        </button>
      </div>
    </div>

    <AnimatePresence initial={false}>
      {isMaintenanceFormOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          style={{ overflow: "hidden" }}
        >
          <div
            className="rounded-4 border p-3 mb-3"
            style={{
              borderColor: "#e3eafb",
              background: "#f8fbff",
            }}
          >
            <AddMaintenanceForm onCreate={handleCreateMaintenanceRecord} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {maintenanceRecords.length === 0 ? (
      <div className="alert alert-info text-center rounded-3 my-3 py-3 fs-6">
        Henüz bakım kaydı yok.
      </div>
    ) : (
      <div className="row g-2">
        {[...maintenanceRecords]
          .sort(
            (a, b) =>
              new Date(b.maintenanceDate) - new Date(a.maintenanceDate),
          )
          .map((record) => (
            <div key={record.id} className="col-md-6 col-lg-4">
              <div className="position-relative h-100">
                <div
                  className="form-check position-absolute z-1"
                  style={{
                    top: 12,
                    left: 14,
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: 10,
                    padding: "6px 10px 6px 30px",
                    border: "1px solid #e3eafb",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedMaintenanceIds.includes(record.id)}
                    onChange={() => handleToggleMaintenanceSelection(record.id)}
                    id={`maintenance-${record.id}`}
                  />
                  <label
                    className="form-check-label small fw-semibold"
                    htmlFor={`maintenance-${record.id}`}
                    style={{ color: "#284185" }}
                  >
                    Faturaya ekle
                  </label>
                </div>

                <div style={{ paddingTop: 42 }}>
                  <MaintenanceCard
                    record={record}
                    onUpdate={handleUpdateMaintenanceRecord}
                    onDelete={handleDeleteMaintenanceRecord}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    )}
  </div>
</div>
            

            <VehicleNotesSection
              notes={vehicleNotes}
              vehicle={vehicle}
              selectedVehicleId={id}
              onCreate={handleCreateVehicleNote}
              onUpdate={handleUpdateVehicleNote}
              onToggleComplete={handleToggleVehicleNote}
              onDelete={handleDeleteVehicleNote}
              isFormOpen={isNoteFormOpen}
              onToggleForm={() => setIsNoteFormOpen((prev) => !prev)}
            />

            {/* Takip Formu */}
            <div
              className="card border-0 shadow-sm mb-3"
              style={{ borderRadius: 12 }}
            >
              <div className="card-body px-4 py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="fw-bold text-primary"
                    style={{ fontSize: 18 }}
                  >
                    <i className="bi bi-calendar-plus me-2"></i>
                    Takip Kaydı Ekle
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm fw-semibold"
                    onClick={() => setIsReminderFormOpen((prev) => !prev)}
                    style={{ borderRadius: 10 }}
                  >
                    <i
                      className={`bi ${
                        isReminderFormOpen ? "bi-chevron-up" : "bi-plus-circle"
                      } me-1`}
                    ></i>
                    {isReminderFormOpen ? "Formu Kapat" : "Takip Ekle"}
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isReminderFormOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="mt-3">
                        <ReminderForm
                          selectedVehicleId={id}
                          onCreate={handleCreateVehicleReminder}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Araç Takipleri */}
            <div
              className="card border-0 shadow-sm mb-2"
              style={{ borderRadius: 10 }}
            >
              <div className="card-body px-4 py-3">
                <div
                  className="text-primary mb-2 fw-bold"
                  style={{ fontSize: 18 }}
                >
                  <i className="bi bi-calendar-check me-2"></i>
                  Araç Takipleri
                </div>
                {vehicleReminders.length === 0 ? (
                  <div className="alert alert-info text-center rounded-3">
                    Bu araca ait takip kaydı bulunmuyor.
                  </div>
                ) : (
                  <div className="row g-2">
                    {[...vehicleReminders]
                      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                      .map((reminder) => (
                        <div className="col-md-6 col-lg-4" key={reminder.id}>
                          <ReminderCard
                            reminder={reminder}
                            onToggleComplete={handleToggleVehicleReminder}
                            onDelete={handleDeleteVehicleReminder}
                          />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default VehicleDetailPage;
