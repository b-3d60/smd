import React from 'react'
import { Ship, Menu, Play, Square } from 'lucide-react'

interface Project {
  id: string;
  name: string;
}

interface HeaderProps {
  toggleSidebar: () => void;
  projects: Project[];
  selectedProject: string;
  setSelectedProject: (projectId: string) => void;
  isTracking: boolean;
  onStartTracking: () => void;
  onStopTracking: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  projects, 
  selectedProject, 
  setSelectedProject, 
  isTracking, 
  onStartTracking, 
  onStopTracking 
}) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <Ship className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold">Smart Marine Decks</h1>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border rounded px-2 py-1 text-black"
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
              onClick={onStopTracking}
              className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop
            </button>
          ) : (
            <button
              onClick={onStartTracking}
              className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              disabled={!selectedProject}
            >
              <Play className="w-4 h-4 mr-2" />
              Start
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header