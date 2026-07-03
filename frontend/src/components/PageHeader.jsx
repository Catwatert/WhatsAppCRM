function PageHeader({ title, buttonText, icon, onButtonClick }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2 className="mb-0">{title}</h2>

      <button className="btn btn-success" onClick={onButtonClick}>
        <i className={`bi ${icon} me-2`}></i>
        {buttonText}
      </button>
    </div>
  );
}

export default PageHeader;