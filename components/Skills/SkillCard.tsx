import { StarIcon } from '@/utils/icons'
import Image from 'next/image'

interface ServiceCardTypes {
  icon: string
  title: string
  shortDescription: string,
  stars: number
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon, stars }) => {
  return (
    <div className="bg-secondary border-border flex flex-col items-center rounded-[14px] border p-5">
      <Image src={icon} alt={title} className="my-1 size-14" />
      <h5 className="text-accent mt-2 mb-5 text-center text-base font-semibold">{title}</h5>
      <div className="bg-primary rounded-2xl p-4">
        <p className="text-primary-content text-center text-sm font-normal">{shortDescription}</p>
      </div>
      <div className=" mt-2  flex items-center gap-1.5 ">
          {Array.from({ length: 5 }, (_, idx) => (
            <StarIcon key={idx} className={idx < stars ? 'text-neutral' : 'text-transparent'} />
          ))}
        </div>
    </div>
  )
}

export default ServiceCard
