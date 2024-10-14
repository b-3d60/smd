import React, { useState, useEffect } from 'react'
import { Package, TrendingUp, AlertTriangle, Wrench, Barcode, Recycle, Leaf, List, FileText, Globe, Truck, Repeat, Search } from 'lucide-react'
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from 'reactflow'
import 'reactflow/dist/style.css'
import QRCode from 'qrcode.react'

interface BOMItem {
  id: string;
  name: string;
  qty: number;
  x: string;
  y: string;
  z: string;
  supplier: string;
}

const bomData: BOMItem[] = [
  { id: "11", name: "Deck Panel", qty: 10, x: "1370 mm", y: "60 mm", z: "25 mm", supplier: "EcoMarine Solutions" },
  { id: "12", name: "Support Beam", qty: 8, x: "1120 mm", y: "60 mm", z: "25 mm", supplier: "SteelPro Inc." },
  { id: "18", name: "Corner Joint", qty: 6, x: "109.81 mm", y: "60 mm", z: "25 mm", supplier: "JointTech" },
  { id: "19", name: "Railing Post", qty: 6, x: "489.62 mm", y: "60 mm", z: "25 mm", supplier: "SafeGuard Systems" },
  { id: "04", name: "Base Plate", qty: 4, x: "160 mm", y: "160 mm", z: "25 mm", supplier: "MetalCraft Co." },
  // Add more items as needed
]

interface DigitalPassport {
  productId: string;
  name: string;
  materials: string[];
  carbonFootprint: number;
  recycledContent: number;
  manufacturingDate: string;
  expectedLifespan: string;
  repairability: number;
  certifications: string[];
  maintenanceSchedule: string[];
}

const samplePassport: DigitalPassport = {
  productId: "SMD-2023-001",
  name: "Smart Marine Deck Panel A1",
  materials: ["Recycled Plastic", "Sustainable Hardwood", "Stainless Steel"],
  carbonFootprint: 25.5, // kg CO2e
  recycledContent: 60, // percentage
  manufacturingDate: "2023-07-15",
  expectedLifespan: "20 years",
  repairability: 8, // out of 10
  certifications: ["ISO 14001", "FSC Certified", "Cradle to Cradle"],
  maintenanceSchedule: [
    "Every 6 months: Inspect for wear and tear",
    "Annually: Deep clean and apply protective coating",
    "Every 5 years: Professional assessment and potential part replacement"
  ]
}

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Raw Materials' } },
  { id: '2', position: { x: 200, y: 0 }, data: { label: 'Cutting' } },
  { id: '3', position: { x: 400, y: 0 }, data: { label: 'Assembly' } },
  { id: '4', position: { x: 600, y: 0 }, data: { label: 'Quality Check' } },
  { id: '5', position: { x: 800, y: 0 }, data: { label: 'Packaging' } },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
]

const Production: React.FC = () => {
  const [bomPage, setBomPage] = useState(1)
  const [showPassport, setShowPassport] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalProduction, setTotalProduction] = useState(1234)
  const [efficiency, setEfficiency] = useState(95)
  const [qualityIssues, setQualityIssues] = useState(0.5)
  const itemsPerPage = 5

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProduction(prev => prev + Math.floor(Math.random() * 10))
      setEfficiency(prev => Math.min(100, Math.max(90, prev + (Math.random() - 0.5) * 2)))
      setQualityIssues(prev => Math.max(0, Math.min(2, prev + (Math.random() - 0.5) * 0.1)))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredBomData = bomData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.includes(searchTerm) ||
    item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredBomData.length / itemsPerPage)
  const paginatedBomData = filteredBomData.slice((bomPage - 1) * itemsPerPage, bomPage * itemsPerPage)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Production</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center">
          <Package className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="font-semibold">Total Production</h3>
            <p className="text-2xl font-bold">{totalProduction.toLocaleString()} units</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center">
          <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
          <div>
            <h3 className="font-semibold">Efficiency</h3>
            <p className="text-2xl font-bold">{efficiency.toFixed(1)}%</p>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex items-center">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-semibold">Quality Issues</h3>
            <p className="text-2xl font-bold">{qualityIssues.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <List className="w-6 h-6 mr-2" />
          Bill of Materials (BOM)
        </h3>
        <div className="mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search BOM..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Item ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Quantity</th>
                <th className="text-left p-2">Dimensions</th>
                <th className="text-left p-2">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBomData.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.qty}</td>
                  <td className="p-2">{item.x} x {item.y} x {item.z}</td>
                  <td className="p-2">{item.supplier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setBomPage(prev => Math.max(prev - 1, 1))}
            disabled={bomPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>Page {bomPage} of {totalPages}</span>
          <button
            onClick={() => setBomPage(prev => Math.min(prev + 1, totalPages))}
            disabled={bomPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Production Process</h3>
        <div style={{ height: '400px' }}>
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          Digital Product Passport
        </h3>
        <button
          onClick={() => setShowPassport(!showPassport)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          {showPassport ? 'Hide Passport' : 'View Passport'}
        </button>
        {showPassport && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <div>
                <h4 className="font-bold text-lg mb-2">{samplePassport.name}</h4>
                <p className="text-sm text-gray-600 mb-2">Product ID: {samplePassport.productId}</p>
              </div>
              <QRCode value={`https://smartmarinedecks.com/passport/${samplePassport.productId}`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h5 className="font-semibold mb-1">Materials:</h5>
                <ul className="list-disc list-inside">
                  {samplePassport.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
                <h5 className="font-semibold mt-2 mb-1">Certifications:</h5>
                <ul className="list-disc list-inside">
                  {samplePassport.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1">
                  <Globe className="w-4 h-4 inline-block mr-2" />
                  Carbon Footprint: {samplePassport.carbonFootprint} kg CO2e
                </p>
                <p className="mb-1">
                  <Recycle className="w-4 h-4 inline-block mr-2" />
                  Recycled Content: {samplePassport.recycledContent}%
                </p>
                <p className="mb-1">
                  <Package className="w-4 h-4 inline-block mr-2" />
                  Manufacturing Date: {samplePassport.manufacturingDate}
                </p>
                <p className="mb-1">
                  <Repeat className="w-4 h-4 inline-block mr-2" />
                  Expected Lifespan: {samplePassport.expectedLifespan}
                </p>
                <p className="mb-1">
                  <Wrench className="w-4 h-4 inline-block mr-2" />
                  Repairability Score: {samplePassport.repairability}/10
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold mb-1">Maintenance Schedule:</h5>
              <ul className="list-disc list-inside">
                {samplePassport.maintenanceSchedule.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Production