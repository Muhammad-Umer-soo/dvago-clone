"use client"
import { createContext, useState } from "react";
const OffCanvasContext = createContext()
function OffCanvasProvider({ children }) {
    const [isOpenCanvas, setOpenCanvas] = useState(false)
    return (
        <OffCanvasContext.Provider value={{ isOpenCanvas, setOpenCanvas }}>
            {children}
        </OffCanvasContext.Provider>
    )
} 

export {OffCanvasContext, OffCanvasProvider}