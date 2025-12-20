"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Search, Upload } from "lucide-react"
import Link from "next/link"

interface Document {
  id: number
  document_type: string
  title: string
  file_url: string
  file_name: string
  document_date: string
  upload_date: string
  notes: string | null
}

interface DocumentsListProps {
  initialDocuments: Document[]
}

export function DocumentsList({ initialDocuments }: DocumentsListProps) {
  const [documents] = useState<Document[]>(initialDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || doc.document_type === filterType
    return matchesSearch && matchesType
  })

  const documentTypeColors: Record<string, string> = {
    prescription: "bg-blue-100 text-blue-800",
    lab_result: "bg-green-100 text-green-800",
    medical_report: "bg-purple-100 text-purple-800",
    sick_leave: "bg-amber-100 text-amber-800",
    imaging: "bg-pink-100 text-pink-800",
    vaccination: "bg-cyan-100 text-cyan-800",
    other: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="lab_result">Lab Result</SelectItem>
                <SelectItem value="medical_report">Medical Report</SelectItem>
                <SelectItem value="sick_leave">Sick Leave</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild>
              <Link href="/dashboard/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterType !== "all"
                  ? "Try adjusting your search or filters"
                  : "Start by uploading your first medical document"}
              </p>
              <Button asChild>
                <Link href="/dashboard/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <Badge className={documentTypeColors[doc.document_type] || documentTypeColors.other}>
                    {doc.document_type.replace("_", " ")}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Document Date:</span>{" "}
                      {new Date(doc.document_date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Uploaded:</span> {new Date(doc.upload_date).toLocaleDateString()}
                    </p>
                  </div>
                  {doc.notes && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      <span className="font-medium">Notes:</span> {doc.notes}
                    </p>
                  )}
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      View Document
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary */}
      <Card>
        <CardContent className="py-4">
          <p className="text-sm text-gray-600 text-center">
            Showing {filteredDocuments.length} of {documents.length} documents
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
