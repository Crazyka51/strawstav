import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className, width = 300, height = 150 }: LogoProps) {
  // Pro jednoduchost použijeme finální logo jako celek
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image src="/finallogo.png" alt="STRAWSTAV S.R.O." width={width} height={height} className="w-auto h-auto" />
    </div>
  )
}
