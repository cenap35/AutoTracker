function StatsCard({ icon, title, value, iconColor, iconBg, background }) {
  return (
    <div className="col-sm-6 col-md-4">
      <div
        className="card shadow-sm border-0 h-100 dashboard-stat"
        style={{
          background,
          borderRadius: "18px",
          transition: "box-shadow 0.2s",
        }}
      >
        <div className="card-body text-center py-4">
          <div
            className="mb-2 d-flex justify-content-center align-items-center rounded-circle shadow"
            style={{
              fontSize: 37,
              color: iconColor,
              background: iconBg,
              width: 56,
              height: 56,
              margin: "auto",
            }}
          >
            <i className={`bi ${icon}`}></i>
          </div>
          <h6
            className="card-title text-secondary mb-1"
            style={{ fontWeight: 600 }}
          >
            {title}
          </h6>
          <div className="h3 fw-bold text-dark">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
