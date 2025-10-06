import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className, width = 160, height = 64 }: LogoProps) {
  // Pro jednoduchost použijeme finální logo jako celek
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ maxWidth: width, maxHeight: height }}>
      <Image 
        src="/finallogo.png" 
        alt="STRAWSTAV S.R.O." 
        width={width} 
        height={height} 
        className="w-full h-full object-contain" 
        priority
      />
    </div>
  )
}
