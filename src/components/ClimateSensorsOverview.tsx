import React from 'react'
import { Thermometer, Droplets, Wind, Sun } from 'lucide-react'

interface SensorData {
  temperature: number
  humidity: number
  windSpeed: number
  uvIndex: number
}

interface ProjectData {
  id: string
  name: string
  client: string
  sensorData: SensorData
  maintenanceScore: number
}

const mockProjects: ProjectData[] = [
  {
    id: '1',
    name: 'Cruise Ship Deck A',
    client: 'Royal Caribbean',
    sensorData: { temperature: 28, humidity: 65, windSpeed: 15, uvIndex: 8 },
    maintenanceScore: 85,
  },
  {
    id: '2',
    name: 'Marina Boardwalk',
    client: 'Miami Beach Marina',
    sensorData: { temperature: 32, humidity: 70, windSpeed: 10, uvIndex: 9 },
    maintenanceScore: 72,
  },
  {
    id: '3',
    name: 'Yacht Club Pier',
    client: 'San Diego Yacht Club',
    sensorData: { temperature: 24, humidity: 55, windSpeed: 20, uvIndex: 7 },
    maintenanceScore: 90,
  },
]

const ClimateSensorsOverview: React.FC = () => {
  const getMaintenanceScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-200 text-green-800'
    if (score >= 75) return 'bg-yellow-200 text-yellow-800'
    return 'bg-red-200 text-red-800'
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Climate Sensors Data Overview</h3>
      <div className="grid gap-4">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">{project.name}</h4>
              <span className="text-sm text-gray-600">{project.client}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-red-500" />
                <span>{project.sensorData.temperature}°C</span>
              </div>
              <div className="flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-blue-500" />
                <span>{project.sensorData.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Wind className="w-5 h-5 mr-2 text-gray-500" />
                <span>{project.sensorData.windSpeed} km/h</span>
              </div>
              <div className="flex items-center">
                <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                <span>UV {project.sensorData.uvIndex}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Maintenance Score:</span>
              <span className={`px-2 py-1 rounded ${getMaintenanceScoreColor(project.maintenanceScore)}`}>
                {project.maintenanceScore}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClimateSensorsOverview