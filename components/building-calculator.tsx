"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Home, Building2, Warehouse, Calculator } from "lucide-react"

interface BuildingType {
  id: string
  name: string
  icon: React.ReactNode
  pricePerMeter: number
  description: string
}

interface MaterialType {
  id: string
  name: string
  priceMultiplier: number
  description: string
}

interface CalculatorProps {
  types?: BuildingType[]
  materials?: MaterialType[]
  sizesRange?: [number, number]
}

export default function BuildingCalculator({
  types = [
    {
      id: "house",
      name: "Rodinný dům",
      icon: <Home size={24} />,
      pricePerMeter: 35000,
      description: "Klasický rodinný dům s jedním nebo dvěma podlažími.",
    },
    {
      id: "apartment",
      name: "Bytový dům",
      icon: <Building2 size={24} />,
      pricePerMeter: 30000,
      description: "Vícepodlažní bytový dům s více bytovými jednotkami.",
    },
    {
      id: "commercial",
      name: "Komerční objekt",
      icon: <Warehouse size={24} />,
      pricePerMeter: 25000,
      description: "Komerční prostory jako kanceláře, obchody nebo sklady.",
    },
  ],
  materials = [
    {
      id: "brick",
      name: "Cihla",
      priceMultiplier: 1,
      description: "Tradiční cihlové zdivo s dobrou tepelnou izolací.",
    },
    {
      id: "wood",
      name: "Dřevostavba",
      priceMultiplier: 0.85,
      description: "Ekologická varianta s rychlejší výstavbou a nižšími náklady.",
    },
    {
      id: "concrete",
      name: "Železobeton",
      priceMultiplier: 1.15,
      description: "Odolná konstrukce vhodná pro větší stavby.",
    },
  ],
  sizesRange = [50, 500],
}: CalculatorProps) {
  const [buildingType, setBuildingType] = useState(types[0].id)
  const [materialType, setMaterialType] = useState(materials[0].id)
  const [size, setSize] = useState(150)
  const [floors, setFloors] = useState(1)
  const [hasBasement, setHasBasement] = useState(false)
  const [hasGarage, setHasGarage] = useState(false)
  const [energyStandard, setEnergyStandard] = useState("standard")
  const [totalPrice, setTotalPrice] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Výpočet ceny
  useEffect(() => {
    const selectedType = types.find((type) => type.id === buildingType)
    const selectedMaterial = materials.find((material) => material.id === materialType)

    if (!selectedType || !selectedMaterial) return

    let price = selectedType.pricePerMeter * size * selectedMaterial.priceMultiplier

    // Úprava ceny podle počtu podlaží
    price = price * (1 + (floors - 1) * 0.2)

    // Úprava ceny podle dalších parametrů
    if (hasBasement) price += size * 10000
    if (hasGarage) price += 300000

    // Úprava ceny podle energetického standardu
    if (energyStandard === "lowEnergy") price *= 1.1
    if (energyStandard === "passive") price *= 1.25

    setTotalPrice(Math.round(price))
  }, [buildingType, materialType, size, floors, hasBasement, hasGarage, energyStandard, types, materials])

  // Odeslání formuláře
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulace odeslání formuláře
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset formuláře po 3 sekundách
      setTimeout(() => {
        setSubmitSuccess(false)
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
      }, 3000)
    }, 1500)
  }

  // Formátování ceny
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 }).format(
      price,
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Kalkulačka orientační ceny stavby</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Pomocí naší kalkulačky si můžete rychle spočítat orientační cenu vaší stavby. Jedná se pouze o hrubý odhad,
          pro přesnou kalkulaci nás kontaktujte.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 text-strawstav-red" /> Kalkulačka stavby
                </CardTitle>
                <CardDescription>Zadejte parametry vaší stavby pro výpočet orientační ceny</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="type" className="mb-8">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="type">Typ stavby</TabsTrigger>
                    <TabsTrigger value="parameters">Parametry</TabsTrigger>
                    <TabsTrigger value="extras">Doplňky</TabsTrigger>
                  </TabsList>

                  <TabsContent value="type" className="space-y-6">
                    <div className="space-y-4">
                      <Label>Vyberte typ stavby</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {types.map((type) => (
                          <Card
                            key={type.id}
                            className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                              buildingType === type.id ? "ring-2 ring-strawstav-red" : ""
                            }`}
                            onClick={() => setBuildingType(type.id)}
                          >
                            <CardContent className="p-6 flex flex-col items-center text-center">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                                  buildingType === type.id ? "bg-strawstav-red text-white" : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {type.icon}
                              </div>
                              <h3 className="font-medium mb-2">{type.name}</h3>
                              <p className="text-sm text-gray-500">{type.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Vyberte materiál</Label>
                      <RadioGroup
                        value={materialType}
                        onValueChange={setMaterialType}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        {materials.map((material) => (
                          <div key={material.id} className="flex items-start space-x-2">
                            <RadioGroupItem value={material.id} id={material.id} className="mt-1" />
                            <Label htmlFor={material.id} className="font-normal cursor-pointer">
                              <span className="font-medium block">{material.name}</span>
                              <span className="text-sm text-gray-500">{material.description}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </TabsContent>

                  <TabsContent value="parameters" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="size">Užitná plocha: {size} m²</Label>
                          <span className="text-sm text-gray-500">
                            {sizesRange[0]} m² - {sizesRange[1]} m²
                          </span>
                        </div>
                        <Slider
                          id="size"
                          min={sizesRange[0]}
                          max={sizesRange[1]}
                          step={10}
                          value={[size]}
                          onValueChange={(value) => setSize(value[0])}
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="floors">Počet podlaží: {floors}</Label>
                          <span className="text-sm text-gray-500">1 - 4</span>
                        </div>
                        <Slider
                          id="floors"
                          min={1}
                          max={4}
                          step={1}
                          value={[floors]}
                          onValueChange={(value) => setFloors(value[0])}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Energetický standard</Label>
                      <RadioGroup
                        value={energyStandard}
                        onValueChange={setEnergyStandard}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="standard" id="standard" className="mt-1" />
                          <Label htmlFor="standard" className="font-normal cursor-pointer">
                            <span className="font-medium block">Standardní</span>
                            <span className="text-sm text-gray-500">Běžný energetický standard</span>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="lowEnergy" id="lowEnergy" className="mt-1" />
                          <Label htmlFor="lowEnergy" className="font-normal cursor-pointer">
                            <span className="font-medium block">Nízkoenergetický</span>
                            <span className="text-sm text-gray-500">Nižší spotřeba energie</span>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2">
                          <RadioGroupItem value="passive" id="passive" className="mt-1" />
                          <Label htmlFor="passive" className="font-normal cursor-pointer">
                            <span className="font-medium block">Pasivní</span>
                            <span className="text-sm text-gray-500">Minimální spotřeba energie</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>

                  <TabsContent value="extras" className="space-y-6">
                    <div className="space-y-4">
                      <Label>Doplňkové prvky</Label>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="basement"
                            checked={hasBasement}
                            onCheckedChange={(checked) => setHasBasement(checked as boolean)}
                          />
                          <Label htmlFor="basement" className="font-normal cursor-pointer">
                            <span className="font-medium block">Sklep / suterén</span>
                            <span className="text-sm text-gray-500">
                              Podzemní podlaží pro skladování nebo technické zázemí
                            </span>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="garage"
                            checked={hasGarage}
                            onCheckedChange={(checked) => setHasGarage(checked as boolean)}
                          />
                          <Label htmlFor="garage" className="font-normal cursor-pointer">
                            <span className="font-medium block">Garáž</span>
                            <span className="text-sm text-gray-500">Prostor pro parkování vozidel</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="bg-strawstav-red text-white rounded-t-lg">
                <CardTitle className="text-center">Orientační cena</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{formatPrice(totalPrice)}</div>
                  <p className="text-sm text-gray-500 mb-6">
                    Cena je pouze orientační a může se lišit podle konkrétních požadavků
                  </p>

                  <div className="space-y-4 text-left">
                    <div className="flex justify-between">
                      <span>Typ stavby:</span>
                      <span className="font-medium">{types.find((t) => t.id === buildingType)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Materiál:</span>
                      <span className="font-medium">{materials.find((m) => m.id === materialType)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Užitná plocha:</span>
                      <span className="font-medium">{size} m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Počet podlaží:</span>
                      <span className="font-medium">{floors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Energetický standard:</span>
                      <span className="font-medium">
                        {energyStandard === "standard"
                          ? "Standardní"
                          : energyStandard === "lowEnergy"
                            ? "Nízkoenergetický"
                            : "Pasivní"}
                      </span>
                    </div>
                    {hasBasement && (
                      <div className="flex justify-between">
                        <span>Sklep:</span>
                        <span className="font-medium">Ano</span>
                      </div>
                    )}
                    {hasGarage && (
                      <div className="flex justify-between">
                        <span>Garáž:</span>
                        <span className="font-medium">Ano</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full bg-strawstav-red hover:bg-red-700 text-white">Nezávazná konzultace</Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Kontaktujte nás pro přesnou kalkulaci a konzultaci vašeho projektu
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Kontaktní formulář */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Máte zájem o nezávaznou konzultaci?</CardTitle>
              <CardDescription>
                Vyplňte formulář a my vás budeme kontaktovat s přesnější kalkulací a možnostmi realizace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Jméno a příjmení</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Zadejte vaše jméno"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vas@email.cz"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+420 123 456 789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Zpráva</Label>
                  <textarea
                    id="message"
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-strawstav-red"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Popište váš projekt a požadavky..."
                  ></textarea>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="font-normal">
                    Souhlasím se zpracováním osobních údajů pro účely nezávazné konzultace
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-strawstav-red hover:bg-red-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Odesílání..." : "Odeslat poptávku"}
                </Button>
                {submitSuccess && (
                  <div className="bg-green-50 text-green-800 p-4 rounded-md">
                    Děkujeme za váš zájem! Budeme vás kontaktovat co nejdříve.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
