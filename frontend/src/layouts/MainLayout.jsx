import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import api from '../services/api';

const MainLayout = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api.get('/settings').then((res) => setSettings(res.data.data)).catch(() => {});
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer settings={settings} />
    </>
  );
};

export default MainLayout;
