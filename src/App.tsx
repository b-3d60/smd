import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SalesContracts from './components/SalesContracts'
import ProjectManagement from './components/ProjectManagement'
import Engineering from './components/Engineering'
import Production from './components/Production'
import Installation from './components/Installation'
import Maintenance from './components/Maintenance'
import UserAdmin from './components/UserAdmin'
import OwnerDashboard from './components/OwnerDashboard'
import { User, LogIn } from 'lucide-react'

interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  activity: string;
  startTime: Date;
  endTime: Date | null;
}

interface Project {
  id: string;
  name: string;
}

const projects: Project[] = [
  { id: '1', name: 'Cruise Ship Deck Upgrade' },
  { id: '2', name: 'Yacht Club Renovation' },
  { id: '3', name: 'Marina Boardwalk Installation' },
]

function App() {
  const [activeTab, setActiveTab] = useState('sales')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isOwner, setIsOwner] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null)
  const [selectedProject, setSelectedProject] = useState<string>('')

  useEffect(() => {
    const savedEntries = localStorage.getItem('timeEntries')
    if (savedEntries) {
      setTimeEntries(JSON.parse(savedEntries))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries))
  }, [timeEntries])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true)
      setIsOwner(false)
    } else if (username === 'owner' && password === 'owner123') {
      setIsLoggedIn(true)
      setIsOwner(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleTabChange = (newTab: string) => {
    if (currentEntry) {
      handleStopTracking()
    }
    setActiveTab(newTab)
  }

  const handleStartTracking = () => {
    if (selectedProject) {
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        userId: username,
        projectId: selectedProject,
        activity: activeTab,
        startTime: new Date(),
        endTime: null,
      }
      setCurrentEntry(newEntry)
    }
  }

  const handleStopTracking = () => {
    if (currentEntry) {
      const completedEntry: TimeEntry = {
        ...currentEntry,
        endTime: new Date(),
      }
      setTimeEntries([...timeEntries, completedEntry])
      setCurrentEntry(null)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        toggleSidebar={toggleSidebar} 
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        isTracking={!!currentEntry}
        onStartTracking={handleStartTracking}
        onStopTracking={handleStopTracking}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main className="flex-grow p-6 overflow-y-auto">
          {isOwner ? (
            <OwnerDashboard />
          ) : (
            <>
              {activeTab === 'sales' && <SalesContracts />}
              {activeTab === 'project' && <ProjectManagement />}
              {activeTab === 'engineering' && <Engineering />}
              {activeTab === 'production' && <Production />}
              {activeTab === 'installation' && <Installation />}
              {activeTab === 'maintenance' && <Maintenance />}
              {activeTab === 'admin' && (
                <UserAdmin 
                  timeEntries={timeEntries} 
                  projects={projects}
                  currentUser={username}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default App