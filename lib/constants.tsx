export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    image: '/images/rsac.png',
    title: 'RSA Conference 2026',
    slug: 'rsa-conference-2026',
    location: 'San Francisco, USA',
    date: 'May 18–22, 2026',
    time: '09:00 AM – 05:00 PM',
  },
  {
    image: '/images/black_hat_usa.png',
    title: 'Black Hat USA 2026',
    slug: 'black-hat-usa-2026',
    location: 'Las Vegas, USA',
    date: 'August 3–8, 2026',
    time: '08:30 AM – 06:00 PM',
  },
  {
    image: '/images/defcon.png',
    title: 'DEF CON 34',
    slug: 'def-con-34',
    location: 'Las Vegas, USA',
    date: 'August 7–10, 2026',
    time: '10:00 AM – 07:00 PM',
  },
  {
    image: '/images/gartner.png',
    title: 'Gartner Security & Risk Summit',
    slug: 'gartner-security-risk-summit',
    location: 'National Harbor, USA',
    date: 'June 9–11, 2026',
    time: '09:00 AM – 04:30 PM',
  },
  {
    image: '/images/infosec-Europe.png',
    title: 'Infosecurity Europe 2026',
    slug: 'infosecurity-europe-2026',
    location: 'London, UK',
    date: 'June 2–4, 2026',
    time: '09:30 AM – 05:00 PM',
  },
  {
    image: '/images/billington.png',
    title: 'Billington Cybersecurity Summit',
    slug: 'billington-cybersecurity-summit',
    location: 'Washington, DC, USA',
    date: 'September 16–18, 2026',
    time: '08:00 AM – 05:00 PM',
  },
  {
    image: '/images/event7.png',
    title: 'CloudSec Summit 2026',
    slug: 'cloudsec-summit-2026',
    location: 'Austin, USA',
    date: 'October 12–13, 2026',
    time: '09:00 AM – 04:00 PM',
  },
  {
    image: '/images/event8.png',
    title: 'Zero-Day Forum',
    slug: 'zero-day-forum-2026',
    location: 'Berlin, Germany',
    date: 'November 4–5, 2026',
    time: '10:00 AM – 06:00 PM',
  },
  {
    image: '/images/event9.png',
    title: 'AppSec Live',
    slug: 'appsec-live-2026',
    location: 'Singapore',
    date: 'November 18–20, 2026',
    time: '09:30 AM – 05:30 PM',
  },
]
