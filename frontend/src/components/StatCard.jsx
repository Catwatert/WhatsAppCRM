import "./statcard.css";

function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className={`stat-card-icon ${color}`}>
          <i className={`bi ${icon}`}></i>
        </div>

        <span>{title}</span>
      </div>

      <h2 className="stat-card-value">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;