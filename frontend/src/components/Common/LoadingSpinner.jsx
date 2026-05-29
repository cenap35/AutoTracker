function LoadingSpinner({ text = "Yükleniyor..." }) {
  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center py-5"
      style={{ minHeight: "70vh" }}
    >
      <div
        className="spinner-border mb-3"
        style={{ color: "#3b60c5", width: "2.5rem", height: "2.5rem" }}
        role="status"
      />
      <p className="text-muted mb-0">{text}</p>
    </div>
  );
}

export default LoadingSpinner;