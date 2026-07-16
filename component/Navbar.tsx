import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href='/' className="logo">
                <Image src='/icons/logo.svg' alt="logo" width={28} height={28} />
                
                <p>InfoSecEvent</p>
            </Link>

            <ul>
                <Link href='/'>Home</Link>
                <Link href='/'>Events</Link>
                <Link href='/create-event'>Create Event</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
