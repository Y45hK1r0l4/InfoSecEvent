import EventCard from '@/component/EventCard'
import ExploreBtn from '@/component/ExploreBtn'
import { IEvent } from '@/database';
import { events } from '@/lib/constants'
import { cacheLife } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const page = async () => {
  'use cache';
  cacheLife('minutes')
  const response = await fetch(`${BASE_URL}/api/events`);
  const {events} = await response.json();

  return (
    <div>
      <h1 className='text-center mt-10'>Find the Next Big <br /> Cybersecurity Event</h1>
      <p className='text-center mt-5'>Explore top conferences, hands-on meetups, and expert-led security events in one place</p>
   
      <ExploreBtn />

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>

        <ul className='events' id='events'>
          {events && events.length > 0 && events.map((event: IEvent) => (
            <ul key={event.title}>
              <EventCard {...event} />
            </ul>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default page
