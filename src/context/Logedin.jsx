import { createContext, useState } from "react";

export const LogedinContext = createContext()

export function LogedinProvider({ children }) {
    const [logedin, setLogedin] = useState(false)
    return (
        <LogedinContext.Provider value={{logedin,setLogedin}}>
            {children}
        </LogedinContext.Provider>
    )
}
