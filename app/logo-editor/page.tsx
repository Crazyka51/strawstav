import AdvancedLogoEditor from "@/components/advanced-logo-editor"

export default function LogoEditorPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Pokročilý editor loga STRAWSTAV</h1>
        <AdvancedLogoEditor />
      </div>
    </div>
  )
}
