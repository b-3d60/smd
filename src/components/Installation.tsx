import React, { useState, useEffect } from 'react'
import { Hammer, Clock, CheckCircle, Play, Square, FileText } from 'lucide-react'

interface Project {
  id: string;
  name: string;
}

interface TimeEntry {
  id: string;
  projectId: string;
  startTime: Date;
  endTime: Date | null;
}

const projects: Project[] = [
  { id: '1', name: 'Cruise Ship Deck Upgrade' },
  { id: '2', name: 'Yacht Club Renovation' },
  { id: '3', name: 'Marina Boardwalk Installation' },
]

const Installation: React.FC = () => {
  const [activeProjects, setActiveProjects] = useState<number>(5)
  const [avgInstallationTime, setAvgInstallationTime] = useState<number>(14)
  const [completedThisMonth, setCompletedThisMonth] = useState<number>(8)

  const [selectedProject, setSelectedProject] = useState<string>('')
  const [isTracking, setIsTracking] = useState<boolean>(false)
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])

  useEffect(() => {
    // Load time entries from localStorage
    const savedEntries = localStorage.getItem('timeEntries')
    if (savedEntries) {
      setTimeEntries(JSON.parse(savedEntries))
    }
  }, [])

  useEffect(() => {
    // Save time entries to localStorage whenever they change
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries))
  }, [timeEntries])

  const handleStartTracking = () => {
    if (selectedProject) {
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        projectId: selectedProject,
        startTime: new Date(),
        endTime: null,
      }
      setCurrentEntry(newEntry)
      setIsTracking(true)
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
      setIsTracking(false)
    }
  }

  const generateDailyReport = () => {
    const today = new Date()
    const todayEntries = timeEntries.filter(entry => {
      const entryDate = new Date(entry.startTime)
      return entryDate.toDateString() === today.toDateString()
    })

    let reportContent = `Daily Time Tracking Report - ${today.toDateString()}\n\n`

    projects.forEach(project => {
      const projectEntries = todayEntries.filter(entry => entry.projectId === project.id)
      if (projectEntries.length > 0) {
        let totalTime = 0
        projectEntries.forEach(entry => {
          const endTime = entry.endTime ? new Date(entry.endTime) : new Date()
          totalTime += endTime.getTime() - new Date(entry.startTime).getTime()
        })
        const hours = Math.floor(totalTime / (1000 * 60 * 60))
        const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60))
        reportContent += `${project.name}: ${hours}h ${minutes}m\n`
      }
    })

    reportContent += '\nApproved by Site Manager: ____________________'

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily_report_${today.toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Installation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-orange-100 p-4 rounded-lg flex items-center">
          <Hammer className="w-8 h-8 text-orange-600 mr-3" />
          <div>
            <h3 className="font-semibold">Active Installations</h3>
            <p className="text-2xl font-bold">{activeProjects}</p>
          </div>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <Clock className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold">Avg. Installation Time</h3>
            <p className="text-2xl font-bold">{avgInstallationTime} days</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold">Completed This Month</h3>
            <p className="text-2xl font-bold">{completedThisMonth}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Time Tracking</h3>
        <div className="flex items-center space-x-4 mb-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border rounded px-2 py-1"
            disabled={isTracking}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          {isTracking ? (
            <button
              onClick={handleStopTracking}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop
            </button>
          ) : (
            <button
              onClick={handleStartTracking}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              disabled={!selectedProject}
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </button>
          )}
        </div>
        {isTracking && (
          <p className="text-sm text-gray-600">
            Currently tracking time for: {projects.find(p => p.id === selectedProject)?.name}
          </p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Today's Time Entries</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Start Time</th>
              <th className="text-left p-2">End Time</th>
              <th className="text-left p-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.filter(entry => {
              const entryDate = new Date(entry.startTime)
              return entryDate.toDateString() === new Date().toDateString()
            }).map((entry) => {
              const project = projects.find(p => p.id === entry.projectId)
              const startTime = new Date(entry.startTime)
              const endTime = entry.endTime ? new Date(entry.endTime) : new Date()
              const duration = endTime.getTime() - startTime.getTime()
              const hours = Math.floor(duration / (1000 * 60 * 60))
              const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
              return (
                <tr key={entry.id}>
                  <td className="p-2">{project?.name}</td>
                  <td className="p-2">{startTime.toLocaleTimeString()}</td>
                  <td className="p-2">{entry.endTime ? endTime.toLocaleTimeString() : 'Ongoing'}</td>
                  <td className="p-2">{`${hours}h ${minutes}m`}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        <button
          onClick={generateDailyReport}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Daily Report
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Current Installations</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Location</th>
              <th className="text-left p-2">Progress</th>
              <th className="text-left p-2">Estimated Completion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Cruise Ship Deck Upgrade</td>
              <td className="p-2">Miami Shipyard</td>
              <td className="p-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '70%'}}></div>
                </div>
              </td>
              <td className="p-2">2023-07-25</td>
            </tr>
            <tr>
              <td className="p-2">Yacht Club Renovation</td>
              <td className="p-2">San Diego Marina</td>
              <td className="p-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '30%'}}></div>
                </div>
              </td>
              <td className="p-2">2023-08-15</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Installation