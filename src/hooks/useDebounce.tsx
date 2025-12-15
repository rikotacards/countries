import React from "react";

export const useDebounce = (value: string) => {
    const [res, setRes] = React.useState('');

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setRes(value)
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [value])

    
    return res

}