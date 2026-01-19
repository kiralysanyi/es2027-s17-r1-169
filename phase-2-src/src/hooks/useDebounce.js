import { useEffect, useState } from "react"

const useDebounce = (value, delay) => {
    const [dVal, setdVal] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setdVal(value)
        }, delay);

        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])

    return dVal;
}

export default useDebounce