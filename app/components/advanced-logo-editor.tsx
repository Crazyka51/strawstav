"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Slider } from "@/app/components/ui/slider"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

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

interface AnimationTiming {
  strecha: number
  podkrovi: number
  obrysdomu: number
  text: number
  cara: number
  overlap: number
  totalDuration: number
}

export default function AdvancedLogoEditor() {
  const [selectedLayer, setSelectedLayer] = useState<LayerType>("strecha")
  const [positions, setPositions] = useState<LayerPositions>({
    strecha: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
    podkrovi: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
    obrysdomu: { x: 0, y: 0, scale: 1, width: 300, height: 100 },
    text: { x: 0, y: 0, scale: 1, width: 300, height: 150 },
    cara: { x: 0, y: 20, scale: 1, width: 150, height: 10 },
  })

  const [timing, setTiming] = useState<AnimationTiming>({
    strecha: 0.6,
    podkrovi: 0.6,
    obrysdomu: 0.8,
    text: 0.5,
    cara: 0.3,
    overlap: 0.3,
    totalDuration: 3.5,
  })

  const [preloaderCode, setPreloaderCode] = useState("")
  const [animatedLogoCode, setAnimatedLogoCode] = useState("")
  const [activeTab, setActiveTab] = useState("position")
  const [activeFileTab, setActiveFileTab] = useState("preloader")

  // Generování kódu pro preloader.tsx
  useEffect(() => {
    const generatePreloaderCode = () => {
      const layerCode = (layer: LayerType, pos: LayerPosition) => {
        return `{/* ${getLayerName(layer)} */}
<div className="absolute inset-0 flex items-center justify-center" 
     style={{ transform: \`translate(\${${pos.x}}px, \${${pos.y}}px) scale(\${${pos.scale}})\` }}>
  <Image
    ref={${layer}Ref}
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

      const timingCode = `// Zajistíme, že logo container je na začátku skrytý
gsap.set(logoContainerRef.current, { opacity: 0 })

// Nastavíme animaci přesýpacích hodin
gsap.to(loaderIconRef.current, {
  rotation: 360,
  duration: 1.5,
  repeat: 1,
  ease: "power1.inOut",
  onComplete: startLogoAnimation
})

function startLogoAnimation() {
  // Skryjeme ikonu přesýpacích hodin a zobrazíme container loga
  gsap.to(loaderIconRef.current, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      if (loaderIconRef.current) {
        loaderIconRef.current.style.display = "none"
      }
      gsap.to(logoContainerRef.current, {
        opacity: 1,
        duration: 0.3
      })
    }
  })

  const tl = gsap.timeline({
    onComplete: () => {
      // Hide preloader after animation completes and a small delay
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        onComplete: () => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = "none"
          }
        },
      })
    },
  })

  // Set initial states
  gsap.set([strechaRef.current, podkroviRef.current, obrysdomuRef.current, textRef.current], {
    opacity: 0,
  })
  gsap.set(caraRef.current, {
    opacity: 0,
    scaleX: 0,
    transformOrigin: "left center",
  })

  // 1. Animate červená střecha (${timing.strecha}s)
  tl.to(strechaRef.current, {
    opacity: 1,
    duration: ${timing.strecha},
    ease: "power2.inOut",
  })

  // 2. Animate černé podkroví (${timing.podkrovi}s)
  tl.to(
    podkroviRef.current,
    {
      opacity: 1,
      duration: ${timing.podkrovi},
      ease: "power2.out",
    },
    "-=${timing.overlap}"
  )

  // 3. Animate obrys domu (${timing.obrysdomu}s)
  tl.to(
    obrysdomuRef.current,
    {
      opacity: 1,
      duration: ${timing.obrysdomu},
      ease: "power2.out",
    },
    "-=${timing.overlap}"
  )

  // 4. Animate text (${timing.text}s)
  tl.to(textRef.current, {
    opacity: 1,
    duration: ${timing.text},
    ease: "power1.out",
  })

  // 5. Animate čára (${timing.cara}s)
  tl.to(caraRef.current, {
    opacity: 1,
    scaleX: 1,
    duration: ${timing.cara},
    ease: "power1.inOut",
  })
}`

      const preloaderStructure = `<div ref={preloaderRef} className="preloader">
  {/* Ikona přesýpacích hodin */}
  <div 
    ref={loaderIconRef} 
    className="absolute flex items-center justify-center"
  >
    <Hourglass size={64} className="text-strawstav-red animate-pulse" />
  </div>

  {/* Logo container - na začátku skrytý */}
  <div ref={logoContainerRef} className="preloader-content">
    <div className="relative w-full h-full">
${layersCode}
    </div>
  </div>
</div>`

      return {
        structure: preloaderStructure,
        timing: timingCode,
      }
    }

    const code = generatePreloaderCode()
    setPreloaderCode(`// Kód pro preloader.tsx

// 1. Přidejte import pro ikonu přesýpacích hodin:
import { Hourglass } from 'lucide-react'

// 2. Přidejte reference pro loader a container:
// const loaderIconRef = useRef<HTMLDivElement>(null)
// const logoContainerRef = useRef<HTMLDivElement>(null)

// 3. Nahraďte strukturu preloaderu tímto kódem:
${code.structure}

// 4. Nahraďte část s animací tímto kódem:
${code.timing}`)
  }, [positions, timing])

  // Generování kódu pro animated-logo.tsx
  useEffect(() => {
    const generateAnimatedLogoCode = () => {
      const layerCode = (layer: LayerType, pos: LayerPosition) => {
        return `{/* ${getLayerName(layer)} */}
<div className="absolute inset-0 flex items-center justify-center" 
     style={{ transform: \`translate(\${${pos.x}}px, \${${pos.y}}px) scale(\${${pos.scale}})\` }}>
  <Image
    ref={${layer}Ref}
    src="/${layer}.png"
    alt="${getLayerName(layer)}"
    width={width * ${pos.width / 300}}
    height={${layer === "text" ? `height * ${pos.height / 150}` : layer === "cara" ? `height * ${pos.height / 10} / 15` : `height * ${pos.height / 100} / 3`}}
    className="w-auto h-auto"
  />
</div>`
      }

      const layers = ["strecha", "podkrovi", "obrysdomu", "text", "cara"] as LayerType[]
      const layersCode = layers.map((layer) => layerCode(layer, positions[layer])).join("\n\n")

      const timingCode = `// Vytvoření timeline pro animaci
const tl = gsap.timeline({ paused: !autoPlay })

// Animace jednotlivých částí
tl.to(strechaRef.current, { opacity: 1, duration: ${timing.strecha}, ease: "power2.inOut" })
  .to(podkroviRef.current, { opacity: 1, duration: ${timing.podkrovi}, ease: "power2.out" }, "-=${timing.overlap}")
  .to(obrysdomuRef.current, { opacity: 1, duration: ${timing.obrysdomu}, ease: "power2.out" }, "-=${timing.overlap}")
  .to(textRef.current, { opacity: 1, duration: ${timing.text}, ease: "power1.out" })
  .to(caraRef.current, { opacity: 1, scaleX: 1, duration: ${timing.cara}, ease: "power1.inOut" })`

      return {
        layers: `<div ref={containerRef} className={\`relative \${className}\`} style={{ width, height }}>
${layersCode}
</div>`,
        timing: timingCode,
      }
    }

    const code = generateAnimatedLogoCode()
    setAnimatedLogoCode(`// Kód pro animated-logo.tsx

// 1. Nahraďte část s vrstvami loga tímto kódem:
${code.layers}

// 2. Nahraďte část s animací tímto kódem:
${code.timing}`)
  }, [positions, timing])

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

  const handleTimingChange = (key: keyof AnimationTiming, value: number) => {
    setTiming((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const copyToClipboard = (code: string) => {
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

    setTiming({
      strecha: 0.6,
      podkrovi: 0.6,
      obrysdomu: 0.8,
      text: 0.5,
      cara: 0.3,
      overlap: 0.3,
      totalDuration: 3.5,
    })
  }

  const saveToLocalStorage = () => {
    const data = {
      positions,
      timing,
    }
    localStorage.setItem("logoEditorSettings", JSON.stringify(data))
    alert("Nastavení bylo uloženo do localStorage!")
  }

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem("logoEditorSettings")
    if (data) {
      const parsed = JSON.parse(data)
      setPositions(parsed.positions)
      setTiming(parsed.timing)
      alert("Nastavení bylo načteno z localStorage!")
    } else {
      alert("Žádné uložené nastavení nebylo nalezeno!")
    }
  }

  const exportToJSON = () => {
    const data = {
      positions,
      timing,
    }
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "logo-settings.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Pokročilý editor loga STRAWSTAV</CardTitle>
            <CardDescription>
              Upravte pozice a časování animace jednotlivých vrstev loga a vygenerujte kód pro použití v aplikaci.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preloader" onValueChange={setActiveFileTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="preloader">Preloader</TabsTrigger>
                <TabsTrigger value="animated-logo">Animované Logo</TabsTrigger>
              </TabsList>

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

                  <Tabs defaultValue="position" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="position">Pozice a velikost</TabsTrigger>
                      <TabsTrigger value="timing">Časování animace</TabsTrigger>
                    </TabsList>

                    <TabsContent value="position" className="space-y-4">
                      <Accordion type="single" collapsible defaultValue="position">
                        <AccordionItem value="position">
                          <AccordionTrigger>Pozice</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <Label htmlFor="x-position" className="mb-2 block flex-1">
                                  Horizontální pozice (X): {positions[selectedLayer].x}px
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Posune vrstvu horizontálně. Kladné hodnoty posouvají doprava, záporné doleva.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="x-position"
                                min={-100}
                                max={100}
                                step={1}
                                value={[positions[selectedLayer].x]}
                                onValueChange={(value) => handlePositionChange("x", value[0])}
                              />

                              <div className="flex items-center">
                                <Label htmlFor="y-position" className="mb-2 block flex-1">
                                  Vertikální pozice (Y): {positions[selectedLayer].y}px
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Posune vrstvu vertikálně. Kladné hodnoty posouvají dolů, záporné nahoru.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="y-position"
                                min={-100}
                                max={100}
                                step={1}
                                value={[positions[selectedLayer].y]}
                                onValueChange={(value) => handlePositionChange("y", value[0])}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="size">
                          <AccordionTrigger>Velikost</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <Label htmlFor="width" className="mb-2 block flex-1">
                                  Šířka: {positions[selectedLayer].width}px
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Nastaví šířku vrstvy v pixelech.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="width"
                                min={50}
                                max={500}
                                step={1}
                                value={[positions[selectedLayer].width]}
                                onValueChange={(value) => handlePositionChange("width", value[0])}
                              />

                              <div className="flex items-center">
                                <Label htmlFor="height" className="mb-2 block flex-1">
                                  Výška: {positions[selectedLayer].height}px
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Nastaví výšku vrstvy v pixelech.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="height"
                                min={10}
                                max={300}
                                step={1}
                                value={[positions[selectedLayer].height]}
                                onValueChange={(value) => handlePositionChange("height", value[0])}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="scale">
                          <AccordionTrigger>Měřítko</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex items-center">
                              <Label htmlFor="scale" className="mb-2 block flex-1">
                                Měřítko: {positions[selectedLayer].scale.toFixed(2)}x
                              </Label>
                              <Tooltip>
                                <TooltipTrigger>
                                  <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    Změní měřítko vrstvy. Hodnota 1 je původní velikost, větší hodnoty zvětšují, menší
                                    zmenšují.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Slider
                              id="scale"
                              min={0.5}
                              max={1.5}
                              step={0.01}
                              value={[positions[selectedLayer].scale]}
                              onValueChange={(value) => handlePositionChange("scale", value[0])}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>

                    <TabsContent value="timing" className="space-y-4">
                      <Accordion type="single" collapsible defaultValue="layer-timing">
                        <AccordionItem value="layer-timing">
                          <AccordionTrigger>Časování vrstev</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <Label htmlFor="strecha-timing" className="mb-2 block flex-1">
                                  Červená střecha: {timing.strecha.toFixed(2)}s
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Doba trvání animace červené střechy v sekundách.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="strecha-timing"
                                min={0.1}
                                max={2}
                                step={0.1}
                                value={[timing.strecha]}
                                onValueChange={(value) => handleTimingChange("strecha", value[0])}
                              />

                              <div className="flex items-center">
                                <Label htmlFor="podkrovi-timing" className="mb-2 block flex-1">
                                  Černé podkroví: {timing.podkrovi.toFixed(2)}s
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Doba trvání animace černého podkroví v sekundách.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="podkrovi-timing"
                                min={0.1}
                                max={2}
                                step={0.1}
                                value={[timing.podkrovi]}
                                onValueChange={(value) => handleTimingChange("podkrovi", value[0])}
                              />

                              <div className="flex items-center">
                                <Label htmlFor="obrysdomu-timing" className="mb-2 block flex-1">
                                  Obrys domu: {timing.obrysdomu.toFixed(2)}s
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Doba trvání animace obrysu domu v sekundách.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="obrysdomu-timing"
                                min={0.1}
                                max={2}
                                step={0.1}
                                value={[timing.obrysdomu]}
                                onValueChange={(value) => handleTimingChange("obrysdomu", value[0])}
                              />

                              <div className="flex items-center">
                                <Label htmlFor="text-timing" className="mb-2 block flex-1">
                                  Text: {timing.text.toFixed(2)}s
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Doba trvání animace textu v sekundách.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="text-timing"
                                min={0.1}
                                max={2}
                                step={0.1}
                                value={[timing.text]}
                                onValueChange={(value) => handleTimingChange("text", value[0])}
                              />

                              <div className="flex items-center">
                                <Label htmlFor="cara-timing" className="mb-2 block flex-1">
                                  Čára: {timing.cara.toFixed(2)}s
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Doba trvání animace čáry v sekundách.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="cara-timing"
                                min={0.1}
                                max={2}
                                step={0.1}
                                value={[timing.cara]}
                                onValueChange={(value) => handleTimingChange("cara", value[0])}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="global-timing">
                          <AccordionTrigger>Globální nastavení</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <Label htmlFor="overlap-timing" className="mb-2 block flex-1">
                                  Překrytí animací: {timing.overlap.toFixed(2)}s
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Určuje, jak moc se animace překrývají. Vyšší hodnota znamená větší překrytí a
                                      plynulejší přechody.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="overlap-timing"
                                min={0}
                                max={1}
                                step={0.1}
                                value={[timing.overlap]}
                                onValueChange={(value) => handleTimingChange("overlap", value[0])}
                              />

                              <div className="flex items-center">
                                <Label htmlFor="total-duration" className="mb-2 block flex-1">
                                  Celková doba trvání: {timing.totalDuration.toFixed(2)}s
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Celková doba trvání animace. Ovlivňuje zpoždění v header.tsx.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <Slider
                                id="total-duration"
                                min={1}
                                max={10}
                                step={0.1}
                                value={[timing.totalDuration]}
                                onValueChange={(value) => handleTimingChange("totalDuration", value[0])}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button variant="outline" onClick={resetLayer}>
                      Resetovat vrstvu
                    </Button>
                    <Button variant="outline" onClick={resetAll}>
                      Resetovat vše
                    </Button>
                    <Button variant="outline" onClick={saveToLocalStorage}>
                      Uložit nastavení
                    </Button>
                    <Button variant="outline" onClick={loadFromLocalStorage}>
                      Načíst nastavení
                    </Button>
                    <Button variant="outline" onClick={exportToJSON}>
                      Exportovat JSON
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <Label>
                    Vygenerovaný kód pro {activeFileTab === "preloader" ? "preloader.tsx" : "animated-logo.tsx"}
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(activeFileTab === "preloader" ? preloaderCode : animatedLogoCode)}
                  >
                    Kopírovat
                  </Button>
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto max-h-[300px]">
                  <pre className="text-sm">{activeFileTab === "preloader" ? preloaderCode : animatedLogoCode}</pre>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-200">
                <h3 className="text-lg font-medium mb-2 text-blue-800">Jak použít vygenerovaný kód</h3>
                <p className="text-blue-700 mb-2">
                  Kód je generován specificky pro soubor{" "}
                  {activeFileTab === "preloader" ? "preloader.tsx" : "animated-logo.tsx"}.
                </p>
                <ol className="list-decimal list-inside text-blue-700 space-y-1">
                  <li>Otevřete soubor {activeFileTab === "preloader" ? "preloader.tsx" : "animated-logo.tsx"}</li>
                  <li>Najděte sekci s vrstvami loga a nahraďte ji první částí vygenerovaného kódu</li>
                  <li>Najděte sekci s animací a nahraďte ji druhou částí vygenerovaného kódu</li>
                  <li>
                    {activeFileTab === "preloader"
                      ? "Zachovejte všechny reference (useRef) a strukturu komponenty"
                      : "Zachovejte props, reference a strukturu komponenty"}
                  </li>
                </ol>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-gray-500">
              Pokročilý editor loga STRAWSTAV. Vytvořeno pro přesné nastavení pozic a animací loga.
            </p>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  )
}
