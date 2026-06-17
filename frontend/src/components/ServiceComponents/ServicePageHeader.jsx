function ServicePageHeader({ icon, title, subtitle, action }) {
  return (
    <div className="service-page-header mb-4">
      <div>
        <h2>
          <span>{icon}</span> {title}
        </h2>
        <p>{subtitle}</p>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default ServicePageHeader;