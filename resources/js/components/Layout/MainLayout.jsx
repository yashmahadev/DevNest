import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function MainLayout({ children, title }) {
  const [collapsed, setCollapsed] = useState(false);
  useDocumentTitle(title);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
