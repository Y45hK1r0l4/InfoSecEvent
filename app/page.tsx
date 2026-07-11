import EventCard from '@/component/EventCard'
import ExploreBtn from '@/component/ExploreBtn'
import { events } from '@/lib/constants' 

const page = () => {

  return (
    <div>
      <h1 className='text-center mt-10'>Find the Next Big <br /> Cybersecurity Event</h1>
      <p className='text-center mt-5'>Explore top conferences, hands-on meetups, and expert-led security events in one place</p>
   
      <ExploreBtn />

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>

        <ul className='events' id='events'>
          {events.map((event) => (
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
