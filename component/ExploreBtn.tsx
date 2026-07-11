'use client'

const ExploreBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => console.log('CLICKED')}>
        <a href="#events">
            Explore Events
            <img src="/icons/arrow-down.svg" alt="arrow-down" width={25} height={24} className="h-auto w-auto" />
        </a>
    </button>
  )
}

export default ExploreBtn
