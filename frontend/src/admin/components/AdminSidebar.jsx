import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  Image,
  DollarSign,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import './AdminSidebar.css';

const LINKS = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/bookings', icon: ClipboardList, label: 'Help Requests' },
  { to: '/admin/services', icon: Wrench, label: 'Services' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/donations', icon: DollarSign, label: 'Donations' },
  { to: '/admin/messages', icon: Mail, label: 'Messages' },
  { to: '/admin/settings', icon: Settings, label: 'Website Content' },
];

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      <button className="admin-sidebar__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`admin-sidebar ${open ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand">
          <span>Star Ranch</span>
          <small>Admin Panel</small>
        </div>

        <nav className="admin-sidebar__nav">
          {LINKS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `admin-sidebar__link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {open && <div className="admin-sidebar__overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default AdminSidebar;
