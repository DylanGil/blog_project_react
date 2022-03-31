import { useContext } from "react"
import Link from "next/link"
import AppContext from "./AppContext"

const Header = () => {
  const { session, logOut } = useContext(AppContext)
  let userId

  if (session) {
    userId = JSON.parse(session).payload.user.id
  }

  return (
    <header className="bg-gray-300 flex justify-between items-center p-2 mb-10">
      <Link href="/">
        <a className="text-4xl font-bold">BLOG PROJECT</a>
      </Link>
      {session ? (
        <div className="flex items-center">
          <Link href={`/users/${encodeURIComponent(userId)}`}>
            <a className="text-2xl font-bold mr-2">Mon Profil</a>
          </Link>
          <button onClick={logOut} className="text-2xl">
            Deconnexion
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <Link href="/sign-up">
            <a className="text-2xl font-bold mr-2">Sign Up</a>
          </Link>
          <Link href="/sign-in">
            <a className="text-2xl">Sign In</a>
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
