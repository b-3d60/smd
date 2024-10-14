import React from 'react'
import { FileText, Briefcase, Wrench, Package, Hammer, Settings, Users } from 'lucide-react'

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
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
    <nav className="flex flex-wrap space-x-2 space-y-2">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-t-lg flex items-center ${
              activeTab === tab.id ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}

export default TabNavigation