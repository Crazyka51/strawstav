"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/dialog"
import { Code, Copy, Download } from "lucide-react"
import { useToast } from "@/app/hooks/use-toast"

interface JsonGeneratorProps {
  config: any
}

export function JsonGenerator({ config }: JsonGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const formattedJson = JSON.stringify(config, null, 2)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson)
    toast({
      title: "Zkopírováno do schránky",
      description: "JSON konfigurace byl zkopírován do schránky.",
    })
  }

  const downloadJson = () => {
    const blob = new Blob([formattedJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "page-config.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Code className="h-4 w-4 mr-1" />
          JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>JSON konfigurace stránky</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">{formattedJson}</pre>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-1" />
            Kopírovat
          </Button>
          <Button variant="outline" size="sm" onClick={downloadJson}>
            <Download className="h-4 w-4 mr-1" />
            Stáhnout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
