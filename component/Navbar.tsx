import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { connection } from "next/server";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {

    const user = await getCurrentUser();

  return (
    <header>
        <nav>
            <Link href='/' className="logo">
                <Image src='/icons/logo.svg' alt="logo" width={28} height={28} />
                
                <p>InfoSecEvent</p>
            </Link>

            <ul>
                <Link href='/'>Home</Link>
                <Link href='/create-event'>Create Event</Link>

                {!user ? (
                    <>
                        <Link href="/login">Login</Link>
                        <Link href="/signup">Signup</Link>
                    </>
                ) : (
                    <>
                        <Link href="/profile">
                            {user.name}
                        </Link>
                        <LogoutButton />
                    </>
                )}
            </ul>

            
        </nav>
    </header>
  )
}

export default Navbar
