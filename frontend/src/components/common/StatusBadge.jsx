import React from "react";

const StatusBadge = ({ status }) => {
  const getBadgeClass = () => {
    switch (status) {
      case "Active":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Inactive":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <span className={`badge ${getBadgeClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;