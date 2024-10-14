import React from 'react'
import { FileText, Briefcase, Settings, Package, Hammer, Wrench, Users, X } from 'lucide-react'

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const tabs = [
    { id: 'sales', label: 'Sales & Contracts', icon: FileText },
    { id: 'project', label: 'Project Management', icon: Briefcase },
    { id: 'engineering', label: 'Engineering', icon: Settings },
    { id: 'production', label: 'Production', icon: Package },
    { id: 'installation', label: 'Installation', icon: Hammer },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'admin', label: 'User Admin', icon: Users },
  ]

  return (
    <aside className={`bg-gray-800 text-white w-64 flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50`}>
      <div className="p-4">
        <div className="flex justify-between items-center lg:hidden">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={toggleSidebar} className="text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <li key={tab.id} className="mb-2">
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === tab.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id)
                      if (window.innerWidth < 1024) {
                        toggleSidebar()
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar