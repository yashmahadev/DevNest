import { Link, usePage } from '@inertiajs/react';
import tools from '../../data/tools.json';
import { getLucideIcon } from '../../utils/LucideIconMapper';

export default function Sidebar({ collapsed }) {
  return (
    <aside
      className={`transition-all duration-300 bg-gray-800 text-white h-screen overflow-y-auto custom-scrollbar ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      <nav className="space-y-2 p-4">
        {tools.map((tool, i) => (
          <Link
            key={i}
            href={route(tool.routeName)}
            className="flex items-center gap-3 text-sm hover:bg-gray-700 p-2 rounded"
          >
            {getLucideIcon(tool.icon)}
            {!collapsed && <span>{tool.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
