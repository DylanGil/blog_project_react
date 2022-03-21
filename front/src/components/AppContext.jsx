import { createContext, useCallback, useEffect, useState } from "react"
import api from "./services/api"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [session, setSession] = useState()
  const [test, setTest] = useState("")

  return (
    <AppContext.Provider
      value={{
        session,
        test,
      }}
    />
  )
}

export default AppContext
