interface LogoSVGProps {
  className?: string
  width?: number
  height?: number
}

export default function LogoSVG({ className, width = 300, height = 150 }: LogoSVGProps) {
  return (
    <svg viewBox="0 0 600 400" width={width} height={height} className={className} preserveAspectRatio="xMidYMid meet">
      {/* Vrstva 3 - Červená střecha */}
      <path
        d="M100,150 L300,50 L500,150"
        stroke="#a0001c"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Vrstva 2 - Černá střecha */}
      <path d="M120,150 L300,60 L480,150 Z" fill="#000000" />

      {/* Vrstva 1 - Černá stěna */}
      <path d="M120,150 L120,200 L300,200 L120,150" fill="#000000" />

      {/* Text "STRAWSTAV S.R.O." */}
      <text
        x="300"
        y="180"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="#a0001c"
        textAnchor="middle"
      >
        STRAWSTAV S.R.O.
      </text>

      {/* Text "Veškerá stavební činnost" */}
      <text
        x="300"
        y="230"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fontWeight="normal"
        fill="#a0001c"
        textAnchor="middle"
      >
        Veškerá stavební činnost
      </text>

      {/* Podtržení prvního textu */}
      <line x1="150" y1="240" x2="250" y2="240" stroke="#a0001c" strokeWidth="3" />

      {/* Text "Práce která nás baví" */}
      <text
        x="380"
        y="260"
        fontFamily="Arial, sans-serif"
        fontSize="16"
        fontStyle="italic"
        fill="#a0001c"
        textAnchor="middle"
      >
        Práce která nás baví
      </text>
    </svg>
  )
}
