"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Slider } from "@/app/components/ui/slider"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"

type LayerType = "strecha" | "podkrovi" | "obrysdomu" | "text" | "cara"

interface LayerPosition {
  x: number
  y: number
  scale: number
  width: number
  height: number
}

interface LayerPositions {
  strecha: LayerPosition
  podkrovi: LayerPosition
  obrysdomu: LayerPosition
  text: LayerPosition
  cara: LayerPosition
}

export default function LogoEditor() {
  const [selectedLayer, setSelectedLayer] = useState<LayerType>("strecha")
  const [positions, setPositions] = useState<LayerPositions>({
    strecha: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
    podkrovi: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
    obrysdomu: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
    text: { x: 0, y: 0, scale: 1, width: 300, height: 150 },
    cara: { x: 0, y: 20, scale: 1, width: 150, height: 10 },
  })

  const [code, setCode] = useState("")

  // Generování kódu pro aktuální nastavení
  useEffect(() => {
    const generateCode = () => {
      const layerCode = (layer: LayerType, pos: LayerPosition) => {
        return `{/* ${getLayerName(layer)} */}
<div className="absolute inset-0 flex items-center justify-center" 
     style={{ transform: \`translate(\${${pos.x}}px, \${${pos.y}}px) scale(\${${pos.scale}})\` }}>
  <Image
    src="/${layer}.png"
    alt="${getLayerName(layer)}"
    width={${pos.width}}
    height={${pos.height}}
    className="w-auto h-auto"
  />
</div>`
      }

      const layers = ["strecha", "podkrovi", "obrysdomu", "text", "cara"] as LayerType[]
      const layersCode = layers.map((layer) => layerCode(layer, positions[layer])).join("\n\n")

      return `<div className="relative w-full h-full">
${layersCode}
</div>`
    }

    setCode(generateCode())
  }, [positions])

  const getLayerName = (layer: LayerType): string => {
    const names: Record<LayerType, string> = {
      strecha: "Červená střecha",
      podkrovi: "Černé podkroví",
      obrysdomu: "Obrys domu",
      text: "Text",
      cara: "Čára",
    }
    return names[layer]
  }

  const handlePositionChange = (axis: keyof LayerPosition, value: number) => {
    setPositions((prev) => ({
      ...prev,
      [selectedLayer]: {
        ...prev[selectedLayer],
        [axis]: value,
      },
    }))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    alert("Kód byl zkopírován do schránky!")
  }

  const resetLayer = () => {
    const defaultPositions = {
      strecha: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
      podkrovi: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
      obrysdomu: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
      text: { x: 0, y: 0, scale: 1, width: 300, height: 150 },
      cara: { x: 0, y: 20, scale: 1, width: 150, height: 10 },
    }

    setPositions((prev) => ({
      ...prev,
      [selectedLayer]: defaultPositions[selectedLayer],
    }))
  }

  const resetAll = () => {
    setPositions({
      strecha: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
      podkrovi: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
      obrysdomu: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
      text: { x: 0, y: 0, scale: 1, width: 300, height: 150 },
      cara: { x: 0, y: 20, scale: 1, width: 150, height: 10 },
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Editor loga STRAWSTAV</CardTitle>
          <CardDescription>
            Upravte pozice jednotlivých vrstev loga pomocí posuvníků a vygenerujte kód pro použití v aplikaci.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Náhled loga */}
            <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center">
              <div className="relative w-[300px] h-[200px] border border-dashed border-gray-300">
                {/* Červená střecha */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate(${positions.strecha.x}px, ${positions.strecha.y}px) scale(${positions.strecha.scale})`,
                  }}
                >
                  <Image
                    src="/strecha.png"
                    alt="Červená střecha"
                    width={positions.strecha.width}
                    height={positions.strecha.height}
                    className="w-auto h-auto"
                  />
                </div>

                {/* Černé podkroví */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate(${positions.podkrovi.x}px, ${positions.podkrovi.y}px) scale(${positions.podkrovi.scale})`,
                  }}
                >
                  <Image
                    src="/podkrovi.png"
                    alt="Černé podkroví"
                    width={positions.podkrovi.width}
                    height={positions.podkrovi.height}
                    className="w-auto h-auto"
                  />
                </div>

                {/* Obrys domu */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate(${positions.obrysdomu.x}px, ${positions.obrysdomu.y}px) scale(${positions.obrysdomu.scale})`,
                  }}
                >
                  <Image
                    src="/obrysdomu.png"
                    alt="Obrys domu"
                    width={positions.obrysdomu.width}
                    height={positions.obrysdomu.height}
                    className="w-auto h-auto"
                  />
                </div>

                {/* Text */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate(${positions.text.x}px, ${positions.text.y}px) scale(${positions.text.scale})`,
                  }}
                >
                  <Image
                    src="/text.png"
                    alt="Text loga"
                    width={positions.text.width}
                    height={positions.text.height}
                    className="w-auto h-auto"
                  />
                </div>

                {/* Čára */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `translate(${positions.cara.x}px, ${positions.cara.y}px) scale(${positions.cara.scale})`,
                  }}
                >
                  <Image
                    src="/cara.png"
                    alt="Podtržení"
                    width={positions.cara.width}
                    height={positions.cara.height}
                    className="w-auto h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Ovládací prvky */}
            <div>
              <div className="mb-6">
                <Label htmlFor="layer-select" className="mb-2 block">
                  Vyberte vrstvu
                </Label>
                <Select value={selectedLayer} onValueChange={(value) => setSelectedLayer(value as LayerType)}>
                  <SelectTrigger id="layer-select">
                    <SelectValue placeholder="Vyberte vrstvu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strecha">Červená střecha</SelectItem>
                    <SelectItem value="podkrovi">Černé podkroví</SelectItem>
                    <SelectItem value="obrysdomu">Obrys domu</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="cara">Čára</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="position" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="position">Pozice</TabsTrigger>
                  <TabsTrigger value="size">Velikost</TabsTrigger>
                  <TabsTrigger value="scale">Měřítko</TabsTrigger>
                </TabsList>

                <TabsContent value="position" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="x-position" className="mb-2 block">
                        Horizontální pozice (X): {positions[selectedLayer].x}px
                      </Label>
                      <Slider
                        id="x-position"
                        min={-100}
                        max={100}
                        step={1}
                        value={[positions[selectedLayer].x]}
                        onValueChange={(value) => handlePositionChange("x", value[0])}
                      />
                    </div>

                    <div>
                      <Label htmlFor="y-position" className="mb-2 block">
                        Vertikální pozice (Y): {positions[selectedLayer].y}px
                      </Label>
                      <Slider
                        id="y-position"
                        min={-100}
                        max={100}
                        step={1}
                        value={[positions[selectedLayer].y]}
                        onValueChange={(value) => handlePositionChange("y", value[0])}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="size" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="width" className="mb-2 block">
                        Šířka: {positions[selectedLayer].width}px
                      </Label>
                      <Slider
                        id="width"
                        min={50}
                        max={500}
                        step={1}
                        value={[positions[selectedLayer].width]}
                        onValueChange={(value) => handlePositionChange("width", value[0])}
                      />
                    </div>

                    <div>
                      <Label htmlFor="height" className="mb-2 block">
                        Výška: {positions[selectedLayer].height}px
                      </Label>
                      <Slider
                        id="height"
                        min={10}
                        max={300}
                        step={1}
                        value={[positions[selectedLayer].height]}
                        onValueChange={(value) => handlePositionChange("height", value[0])}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="scale" className="space-y-4">
                  <div>
                    <Label htmlFor="scale" className="mb-2 block">
                      Měřítko: {positions[selectedLayer].scale.toFixed(2)}x
                    </Label>
                    <Slider
                      id="scale"
                      min={0.5}
                      max={1.5}
                      step={0.01}
                      value={[positions[selectedLayer].scale]}
                      onValueChange={(value) => handlePositionChange("scale", value[0])}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex space-x-2">
                <Button variant="outline" onClick={resetLayer}>
                  Resetovat vrstvu
                </Button>
                <Button variant="outline" onClick={resetAll}>
                  Resetovat vše
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <Label>Vygenerovaný kód</Label>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                Kopírovat
              </Button>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
              <pre className="text-sm">{code}</pre>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">
            Upravte pozice vrstev a zkopírujte vygenerovaný kód do souborů preloader.tsx a animated-logo.tsx.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
