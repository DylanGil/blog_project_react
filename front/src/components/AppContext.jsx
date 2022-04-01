import { createContext, useCallback, useEffect, useState } from "react"
import api from "./services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const { pageComponent: Page, router, ...otherProps } = props
  const [session, setSession] = useState()

  const initSession = useCallback((jwt) => {
    if (!jwt) {
      setSession(null)

      return
    }

    const [, payload] = jwt.split(".")
    const session = atob(payload)

    setSession(session)
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")

    initSession(jwt)
  }, [initSession])

  const signIn = useCallback(
    async (emailOrDisplayName, password) => {
      try {
        const {
          data: { jwt },
        } = await api.post("/sign-in", { emailOrDisplayName, password })

        localStorage.setItem("jwt", jwt)

        initSession(jwt)
      } catch (err) {
        alert(err.response.data.error)
      }
    },
    [initSession]
  )

  const signUp = useCallback(
    async (email, displayName, password) => {
      try {
        await api.post("/sign-up", { email, displayName, password })
        router.push("/sign-in")
      } catch (err) {
        alert("User already exist")
        //alert(err)
      }
    },
    [router]
  )

  const logOut = () => {
    localStorage.clear()
    setSession(null)
    router.push("/")
  }

  if (Page.logged && session) {
    router.push("/")

    return null
  }

  if (Page.private && !session) {
    router.push("/")

    return null
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        router,
        session,
        signIn,
        signUp,
        logOut,
      }}
    />
  )
}

export default AppContext
