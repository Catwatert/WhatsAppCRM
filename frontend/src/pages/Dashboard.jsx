import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";
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

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: "bi-people-fill",
      color: "bg-success",
    },
    {
      title: "Total Chats",
      value: stats.totalChats,
      icon: "bi-chat-dots-fill",
      color: "bg-primary",
    },
    {
      title: "Campaigns",
      value: stats.campaigns,
      icon: "bi-megaphone-fill",
      color: "bg-warning",
    },
    {
      title: "Templates",
      value: stats.templates,
      icon: "bi-file-earmark-text-fill",
      color: "bg-danger",
    },
  ];

  return (
    <MainLayout>
      <div className="container-fluid">

        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold">WhatsApp CRM Dashboard</h2>
          <p className="text-muted">
            Welcome back! Here's your dashboard overview.
          </p>
        </div>

        {/* Statistics Cards */}
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

        {/* Bottom Section */}
        <div className="row mt-4">

          {/* Recent Activity */}
          <div className="col-lg-7 mb-4">
            <RecentActivity />
          </div>

          {/* Quick Overview */}
          <div className="col-lg-5">

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body">

                <h5 className="fw-bold mb-3">
                  Quick Overview
                </h5>

                <div className="d-flex justify-content-between mb-3">
                  <span>Total Contacts</span>
                  <strong>{stats.totalContacts}</strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Total Chats</span>
                  <strong>{stats.totalChats}</strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Campaigns</span>
                  <strong>{stats.campaigns}</strong>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Templates</span>
                  <strong>{stats.templates}</strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;