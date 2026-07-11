import Link from "next/link";
import Image from "next/image";

interface Props {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ( {image, title, slug, location, date, time}: Props ) => {
  return (
    <Link href='/events' id="event-card">
        <Image src={image} alt={title} width={410} height={300} className="poster" priority loading="eager" />
    
        <div className="flex flex-row gap-2">
            <img src='/icons/pin.svg' alt="location" width={14} height={14} className="h-4 w-4" />
            {location}
        </div>

        <p className="title">{title}</p>

        <div className="datetime">
            <div>
                <img src='/icons/calendar.svg' alt="date" width={14} height={14} className="h-4 w-4" />
                <p>{date}</p>
            </div>
            <div>
                <img src='/icons/clock.svg' alt="time" width={14} height={14} className="h-4 w-4" />
                <p>{time}</p>
            </div>
        </div>
    </Link>
  )
}

export default EventCard
