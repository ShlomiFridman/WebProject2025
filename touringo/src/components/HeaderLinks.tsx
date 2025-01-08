import Link from "next/link";

export default function HeaderLinks({ title }: { title: string }) {
    return(

        <div className="flex justify-start gap-3">
                <Link
                  href="/"
                  className={
                    "text-green-800 font-bold hover:underline px-2 py-1 rounded " +
                    (title === "Attractions" ? "bg-white" : "")
                  }
                  style = {{ color: 'var(--header-links)' }}
                >
                  Attractions
                </Link>
                <Link
                  href="/bookings"
                  className={
                    "text-green-800 font-bold hover:underline px-2 py-1 rounded " +
                    (title === "Bookings" ? "bg-white" : "")
                  }
                  style = {{ color: 'var(--header-links)' }}
                >
                  Bookings
                </Link>
                <Link
                  href="/profile"
                  className={
                    "text-green-800 font-bold hover:underline px-2 py-1 rounded " +
                    (title === "Profile" ? "bg-white" : "")
                  }
                  style = {{ color: 'var(--header-links)' }}
                >
                  Profile
                </Link>
                <Link
                  href="/about"
                  className={
                    "text-green-800 font-bold hover:underline px-2 py-1 rounded " +
                    (title === "About" ? "bg-white" : "")
                  }
                  style = {{ color: 'var(--header-links)' }}
                >
                  About
                </Link>
              </div>
    )
}