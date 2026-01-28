import { createContext, useEffect, useRef, useState } from "react";

const TooltipContext = createContext();

const TooltipProvider = ({ children }) => {
    const [content, setContent] = useState("");

    const toolTipRef = useRef();

    // get mouse position
    useEffect(() => {
        window.addEventListener("mousemove", (ev) => {
            let x = ev.clientX + 15;
            let y = ev.clientY;
            let width = toolTipRef.current.offsetWidth;
            if (window.innerWidth < x + width) {
                x = x - width - 15;
            }

            if (toolTipRef.current) {
                toolTipRef.current.style.top = `${y}px`
                toolTipRef.current.style.left = `${x}px`
            }
        })
    }, [])

    // show tooltip
    const showTooltip = (content) => {
        setContent(content)
        toolTipRef.current.style.display = "block"
    };

    const hideTooltip = () => { toolTipRef.current.style.display = "none" };

    return <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
        {children}
        <div ref={toolTipRef} className="tooltip">
            <pre>
                {content}
            </pre>
        </div>
    </TooltipContext.Provider>
}

export { TooltipContext, TooltipProvider }