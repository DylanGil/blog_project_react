import Header from "./Header"

const Page = (props) => {
  const { children, ...otherProps } = props

  return (
    <div {...otherProps}>
      <Header />
      <main className="w-2/3 mx-auto">{children}</main>
    </div>
  )
}

export default Page
