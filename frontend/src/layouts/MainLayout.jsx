import { NavLink } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <>
      <style>{`
        .crm-nav-link {
          padding: 12px 18px;
          border-radius: 12px;
          color: #64748b;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }

        .crm-nav-link:hover:not(.active) {
          background-color: #f0fdf4;
          color: #128C7E;
          transform: translateX(4px);
        }

        .crm-nav-link.active {
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: #ffffff !important;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
        }

        .crm-nav-link i {
          font-size: 1.15rem;
        }
      `}</style>

      {/*--------------------------NAVBAR------------------------------ */}
      {/* Restored the solid WhatsApp green header with white text */}
      <nav 
        className="navbar px-4 shadow-sm sticky-top z-3" 
        style={{ background: "#128C7E", height: "64px" }}
      >
        <span className="navbar-brand mb-0 h1 fw-bold d-flex align-items-center text-white">
          <i className="bi bi-whatsapp me-2"></i>
          WhatsApp CRM
        </span>
      </nav>

      {/*--------------------------SIDEBAR------------------------------ */}
      <div className="d-flex">
        <aside
          className="sidebar bg-white border-end p-4 sticky-top d-flex flex-column"
          style={{ width: "260px", height: "calc(100vh - 64px)", overflowY: "auto" }}
        >
          <h6 className="fw-bold text-uppercase text-muted mb-4 mt-2" style={{ fontSize: "12px", letterSpacing: "1px" }}>
            Main Menu
          </h6>
          
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link crm-nav-link active" : "nav-link crm-nav-link"
                }
              >
                <i className="bi bi-house-door-fill me-3"></i>
                Dashboard
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink 
                to="/contacts" 
                className={({ isActive }) => isActive ? "nav-link crm-nav-link active" : "nav-link crm-nav-link"}
              >
                <i className="bi bi-people-fill me-3"></i>
                Contacts
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/chats" 
                className={({ isActive }) => isActive ? "nav-link crm-nav-link active" : "nav-link crm-nav-link"}
              >
                <i className="bi bi-chat-dots-fill me-3"></i>
                Chats
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/campaigns" 
                className={({ isActive }) => isActive ? "nav-link crm-nav-link active" : "nav-link crm-nav-link"}
              >
                <i className="bi bi-megaphone-fill me-3"></i>
                Campaigns
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                to="/settings" 
                className={({ isActive }) => isActive ? "nav-link crm-nav-link active" : "nav-link crm-nav-link"}
              >
                <i className="bi bi-gear-fill me-3"></i>
                Settings
              </NavLink>
            </li>
          </ul>
        </aside>
        
        {/*------------------------MAIN CONTENT-------------------------- */}
        {/* Added backgroundColor: "#f0f2f5" so the white cards stand out */}
        <main 
          className="flex-grow-1 p-4" 
          style={{ 
            backgroundColor: "#f0f2f5", 
            height: "calc(100vh - 64px)", 
            overflowY: "auto" 
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}

export default MainLayout;