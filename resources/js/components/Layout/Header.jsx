import { Menu } from 'lucide-react';

export default function Header({ toggleSidebar }) {
  return (
    <header className="bg-white space-x-4 shadow p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="text-gray-600 hover:text-black">
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-semibold">{import.meta.env.VITE_APP_NAME} Tools</h1>
    </header>
  );
}
