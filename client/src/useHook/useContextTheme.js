import { createContext, useContext, useState, } from "react";

export const ThemeContexte = createContext(undefined)

export const ProviderTheme = ({children})=>{
    const date = new Date()
    const day = date.getHours() > 6 && date.getHours() < 18
    const [theme, setTheme] = useState('light')
    return (
        <ThemeContexte.Provider value={{
            theme,
            onchange: ()=>setTheme(theme === 'light' ? 'dark' : 'light'),
            automatic:()=>{day ? setTheme('light') : setTheme('dark')}
            }}>
            {children}
        </ThemeContexte.Provider>
    )
}

export const UseTheme = () => useContext(ThemeContexte)
