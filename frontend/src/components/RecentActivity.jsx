function RecentActivity() {
  const activities = [
    {
      title: "New Contact Added",
      description: "Rahul added a new contact.",
      time: "2 min ago",
      icon: "bi-person-plus-fill",
      color: "text-success",
    },
    {
      title: "Campaign Created",
      description: "Summer Campaign was created.",
      time: "10 min ago",
      icon: "bi-megaphone-fill",
      color: "text-warning",
    },
    {
      title: "Message Sent",
      description: "Bulk WhatsApp messages delivered.",
      time: "30 min ago",
      icon: "bi-chat-dots-fill",
      color: "text-primary",
    },
    {
      title: "Template Updated",
      description: "Greeting template updated.",
      time: "1 hour ago",
      icon: "bi-file-earmark-text-fill",
      color: "text-danger",
    },
  ];

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body">
        <h5 className="fw-bold mb-4">Recent Activity</h5>

        {activities.map((activity, index) => (
          <div
            key={index}
            className="d-flex align-items-start mb-4 border-bottom pb-3"
          >
            <div className={`me-3 ${activity.color}`}>
              <i className={`bi ${activity.icon} fs-4`}></i>
            </div>

            <div className="flex-grow-1">
              <h6 className="mb-1 fw-semibold">
                {activity.title}
              </h6>

              <small className="text-muted">
                {activity.description}
              </small>
            </div>

            <small className="text-muted">
              {activity.time}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;