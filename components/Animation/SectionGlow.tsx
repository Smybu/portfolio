interface SectionGlowProps {
  className?: string
}

const SectionGlow: React.FC<SectionGlowProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`bg-accent/10 pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-96 sm:w-xl ${className}`}
    />
  )
}

export default SectionGlow
