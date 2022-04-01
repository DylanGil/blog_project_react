import Head from "next/head"
import Header from "./Header"

const Layout = (props) => {
  const { children, ...otherProps } = props

  return (
    <div {...otherProps}>
      <Head>
        <title>{props.pagename} | Dylan Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Dylan blog in React/Node" />
      </Head>

      <Header />
      <main className="w-2/3 mx-auto">{children}</main>
    </div>
  )
}

export default Layout
