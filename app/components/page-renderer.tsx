import type { JSX } from "react"

interface SectionRendererProps {
  section: Section
}

function SectionRenderer({ section }: SectionRendererProps) {
  // Filtrování viditelných komponent
  const visibleComponents = section.components.filter((component) => component.visible)

  // Získání tříd pro sekci na základě nastavení
  const getSectionClasses = () => {
    const classes = ["section", `section-${section.type}`]

    if (section.settings?.background) {
      classes.push(`bg-${section.settings.background}`)
    }

    if (section.settings?.padding) {
      switch (section.settings.padding) {
        case "small":
          classes.push("py-4")
          break
        case "medium":
          classes.push("py-8")
          break
        case "large":
          classes.push("py-16")
          break
        default:
          classes.push("py-8")
      }
    } else {
      classes.push("py-8")
    }

    return classes.join(" ")
  }

  return (
    <section id={section.id} className={getSectionClasses()}>
      <div className="container mx-auto px-4">
        {section.title && <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>}
        {section.settings?.description && (
          <p className="text-lg text-center mb-8 max-w-3xl mx-auto">{section.settings.description}</p>
        )}

        <div
          className={`grid gap-6 ${
            section.settings?.columns
              ? `grid-cols-1 md:grid-cols-${section.settings.columns}`
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {visibleComponents.map((component) => (
            <ComponentRenderer key={component.id} component={component} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ComponentRendererProps {
  component: Component
}

function ComponentRenderer({ component }: ComponentRendererProps) {
  switch (component.type) {
    case "heading":
      return <HeadingComponent component={component} />
    case "text":
      return <TextComponent component={component} />
    case "image":
      return <ImageComponent component={component} />
    case "button":
      return <ButtonComponent component={component} />
    case "service":
      return <ServiceComponent component={component} />
    default:
      return (
        <div className="p-4 border border-dashed border-gray-300 rounded-lg">
          <p className="text-center text-gray-500">Neznámý typ komponenty: {component.type}</p>
        </div>
      )
  }
}

function HeadingComponent({ component }: { component: Component }) {
  const level = component.settings?.level || 2
  const color = component.settings?.color || "inherit"
  const size = component.settings?.size || "md"

  const getSizeClass = () => {
    switch (size) {
      case "xs":
        return "text-lg"
      case "sm":
        return "text-xl"
      case "md":
        return "text-2xl"
      case "lg":
        return "text-3xl"
      case "xl":
        return "text-4xl"
      case "2xl":
        return "text-5xl"
      case "3xl":
        return "text-6xl"
      default:
        return "text-2xl"
    }
  }

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <HeadingTag className={`font-bold ${getSizeClass()}`} style={{ color }}>
      {component.content.text || ""}
    </HeadingTag>
  )
}

function TextComponent({ component }: { component: Component }) {
  const color = component.settings?.color || "inherit"
  const size = component.settings?.size || "md"

  const getSizeClass = () => {
    switch (size) {
      case "xs":
        return "text-xs"
      case "sm":
        return "text-sm"
      case "md":
        return "text-base"
      case "lg":
        return "text-lg"
      case "xl":
        return "text-xl"
      default:
        return "text-base"
    }
  }

  return (
    <div
      className={getSizeClass()}
      style={{ color }}
      dangerouslySetInnerHTML={{ __html: component.content.text || "" }}
    />
  )
}

function ImageComponent({ component }: { component: Component }) {
  const src = component.content.src || "/placeholder.svg?height=300&width=400"
  const alt = component.settings?.alt || ""
  const caption = component.settings?.caption
  const width = component.settings?.width
  const height = component.settings?.height
  const borderRadius = component.settings?.borderRadius || "none"

  const getBorderRadiusClass = () => {
    switch (borderRadius) {
      case "sm":
        return "rounded-sm"
      case "md":
        return "rounded-md"
      case "lg":
        return "rounded-lg"
      case "full":
        return "rounded-full"
      default:
        return ""
    }
  }

  return (
    <figure className="relative">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto object-cover ${getBorderRadiusClass()}`}
      />
      {caption && <figcaption className="text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  )
}

function ButtonComponent({ component }: { component: Component }) {
  const text = component.content.text || "Tlačítko"
  const url = component.content.url || "#"
  const variant = component.settings?.variant || "default"
  const size = component.settings?.size || "default"
  const target = component.settings?.target || "_self"

  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800"
      case "ghost":
        return "bg-transparent hover:bg-gray-100 text-gray-800"
      case "link":
        return "bg-transparent underline text-blue-600 hover:text-blue-800 p-0"
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white"
    }
  }

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm px-3 py-1"
      case "lg":
        return "text-lg px-6 py-3"
      default:
        return "text-base px-4 py-2"
    }
  }

  return (
    <a
      href={url}
      target={target}
      className={`inline-block rounded-md font-medium ${getVariantClass()} ${getSizeClass()}`}
    >
      {text}
    </a>
  )
}

function ServiceComponent({ component }: { component: Component }) {
  const title = component.content.title || "Služba"
  const description = component.content.description || ""
  const icon = component.settings?.icon || "star"

  return (
    <div className="service-item text-center p-4">
      <div className="icon-wrapper mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          {icon === "home" && <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
          {icon === "building" && (
            <>
              <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
              <path d="M9 22v-4h6v4" />
              <path d="M8 6h.01" />
              <path d="M16 6h.01" />
              <path d="M12 6h.01" />
              <path d="M12 10h.01" />
              <path d="M12 14h.01" />
              <path d="M16 10h.01" />
              <path d="M16 14h.01" />
              <path d="M8 10h.01" />
              <path d="M8 14h.01" />
            </>
          )}
          {icon === "home-roof" && (
            <>
              <path d="M3 10l9-7 9 7" />
              <path d="M5 10v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
            </>
          )}
          {(icon === "star" || !icon) && (
            <>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </>
          )}
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default SectionRenderer
