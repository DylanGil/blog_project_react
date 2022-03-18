import React from "react"
import Link from "next/link"

const Header = () => {
  return (
    <header className="bg-gray-300 flex justify-between items-center p-2 mb-10">
      <h1 className="text-4xl font-bold">BLOG PROJECT</h1>
      <div className="flex items-center">
        <Link href="SignUp">
          <a className="text-2xl font-bold mr-2">Sign Up</a>
        </Link>
        <Link href="SignIn">
          <a className="text-2xl">Sign In</a>
        </Link>
      </div>
    </header>
  )
}

export default Header
