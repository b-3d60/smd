import React, { useState } from 'react'
import { Ruler, Lightbulb, FileCheck, Box, Layers, RotateCcw, Image as ImageIcon, Upload, File } from 'lucide-react'

interface MeasurementFile {
  id: string;
  name: string;
  project: string;
  uploadDate: string;
  size: string;
}

const mockMeasurementFiles: MeasurementFile[] = [
  { id: '1', name: 'deck_measurements_001.csv', project: 'Cruise Ship Deck A-101', uploadDate: '2023-07-10', size: '2.3 MB' },
  { id: '2', name: 'railing_dimensions_002.xlsx', project: 'Custom Railing B-202', uploadDate: '2023-07-12', size: '1.8 MB' },
  { id: '3', name: 'hatch_survey_003.pdf', project: 'Hatch Cover C-303', uploadDate: '2023-07-14', size: '3.5 MB' },
]

const Engineering: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [measurementFiles, setMeasurementFiles] = useState<MeasurementFile[]>(mockMeasurementFiles)

  const mockModels = [
    { id: '1', name: 'Deck Panel A-101' },
    { id: '2', name: 'Custom Railing B-202' },
    { id: '3', name: 'Hatch Cover C-303' },
  ]

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newFile: MeasurementFile = {
        id: (measurementFiles.length + 1).toString(),
        name: file.name,
        project: 'New Project', // You might want to add a project selection dropdown in a real application
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }
      setMeasurementFiles([...measurementFiles, newFile])
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Engineering</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <Ruler className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold">Active Designs</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex items-center">
          <Lightbulb className="w-8 h-8 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-semibold">Design Iterations</h3>
            <p className="text-2xl font-bold">45</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <FileCheck className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold">Approved Designs</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Onsite Measurements</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold">Upload Measurement File</h4>
            <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left p-2">File Name</th>
                <th className="text-left p-2">Project</th>
                <th className="text-left p-2">Upload Date</th>
                <th className="text-left p-2">Size</th>
              </tr>
            </thead>
            <tbody>
              {measurementFiles.map((file) => (
                <tr key={file.id} className="border-b border-gray-100">
                  <td className="p-2 flex items-center">
                    <File className="w-4 h-4 mr-2 text-gray-500" />
                    {file.name}
                  </td>
                  <td className="p-2">{file.project}</td>
                  <td className="p-2">{file.uploadDate}</td>
                  <td className="p-2">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">CAD Model Viewer</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <h4 className="font-semibold mb-2">Select Model</h4>
            <ul className="bg-gray-100 rounded-lg p-2">
              {mockModels.map((model) => (
                <li 
                  key={model.id}
                  className={`cursor-pointer p-2 rounded ${selectedModel === model.id ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                  onClick={() => handleModelSelect(model.id)}
                >
                  {model.name}
                </li>
              ))}
            </ul>
            {selectedModel && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">CAD Controls</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                    <Box className="w-4 h-4 mr-1" /> 3D View
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded flex items-center">
                    <Layers className="w-4 h-4 mr-1" /> Layers
                  </button>
                  <button className="bg-orange-500 text-white px-3 py-1 rounded flex items-center">
                    <RotateCcw className="w-4 h-4 mr-1" /> Rotate
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3">
            {selectedModel ? (
              <img
                src="https://i.imgur.com/Yl2HHXM.png"
                alt="CAD Model Viewer"
                className="w-full h-auto rounded-lg shadow-md"
              />
            ) : (
              <div className="bg-gray-200 h-[400px] flex items-center justify-center text-gray-500 rounded-lg">
                Select a model to view
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Recent Design Changes</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Model</th>
              <th className="text-left p-2">Change</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Engineer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Deck Panel A-101</td>
              <td className="p-2">Updated material specifications</td>
              <td className="p-2">2023-07-15</td>
              <td className="p-2">John Doe</td>
            </tr>
            <tr>
              <td className="p-2">Custom Railing B-202</td>
              <td className="p-2">Modified dimensions for better fit</td>
              <td className="p-2">2023-07-14</td>
              <td className="p-2">Jane Smith</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Design Review Process</h3>
        <div className="flex flex-wrap gap-4">
          <div className="bg-blue-100 p-4 rounded-lg flex-1">
            <h4 className="font-semibold mb-2">Initial Design</h4>
            <p>Create initial CAD models based on project requirements</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg flex-1">
            <h4 className="font-semibold mb-2">Internal Review</h4>
            <p>Team review and iterative improvements</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg flex-1">
            <h4 className="font-semibold mb-2">Client Approval</h4>
            <p>Present designs to client for feedback and approval</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg flex-1">
            <h4 className="font-semibold mb-2">Final Revisions</h4>
            <p>Incorporate client feedback and finalize designs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Engineering