import React from "react"
import Layout from "../src/components/Layout"

const NotFoundPage = () => {
  return (
    <Layout pagename="404">
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="flex items-center justify-center">
          <span className="flex items-center font-bold text-3xl border-r-2 border-gray-400 pr-5 mr-5 h-16">
            404
          </span>
          <span className="text-2xl flex items-center">YA PAS WESH !!</span>
          <span className="text-8xl flex items-center">💻😭</span>
        </p>
      </div>
    </Layout>
  )
}

export default NotFoundPage
