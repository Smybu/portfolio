'use client'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const MarqueeWrapper = dynamic(() => import('./MarqueeWrapper'), { ssr: false })

type LanguagesProps = {
  languages: { name: string; icon: string }[]
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  return (
    <MarqueeWrapper
      speed={30}
      className="border-border bg-secondary/30 border-y"
    >
      {languages.map(({ name, icon }, index) => (
        <span
          key={index}
          className="group font-inter text-primary-content bg-secondary/60 border-border hover:border-accent/60 hover:bg-secondary hover:shadow-accent/10 hover:text-neutral flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:text-base"
        >
          <Image
            src={icon}
            alt=""
            className="size-9 opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 lg:size-11"
          />
          <span className="font-medium">{name}</span>
        </span>
      ))}
    </MarqueeWrapper>
  )
}

export default Languages
