import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import "../styles/dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalChats: 0,
    campaigns: 0,
    templates: 0,
  });

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // UPDATED: Changed colors to Hex codes so the CSS transparency trick works perfectly.
  // Also added the "bi " prefix to icons to ensure they render correctly.
  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: "bi bi-people-fill",
      color: "#25D366", // WhatsApp Green
    },
    {
      title: "Total Chats",
      value: stats.totalChats,
      icon: "bi bi-chat-dots-fill",
      color: "#0ea5e9", // Blue
    },
    {
      title: "Campaigns",
      value: stats.campaigns,
      icon: "bi bi-megaphone-fill",
      color: "#d97706", // Orange/Yellow
    },
    {
      title: "Templates",
      value: stats.templates,
      icon: "bi bi-file-earmark-text-fill",
      color: "#ef4444", // Red
    },
  ];

  return (
    <MainLayout>
      {/* UPDATED: Removed redundant container padding, styled text, and applied new grid gap (g-4) */}
      <div>
        <h2 className="fw-bold mb-1" style={{ color: "#1e293b" }}>WhatsApp CRM Dashboard</h2>
        <p className="text-muted mb-4">Frontend is working successfully.</p>

        <div className="row g-4">
          {statCards.map((stat) => (
            <div className="col-12 col-sm-6 col-xl-3" key={stat.title}>
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;