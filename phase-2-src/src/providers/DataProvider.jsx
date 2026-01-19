// Context for all data used in the application (yes, even the ones loaded from the json files)

import { createContext, useState } from "react";

const DataContext = createContext()

const DataProvider = ({ children }) => {
    const [currencies, setCurrencies] = useState({});
    const [courses, setCourses] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(`{ "name": "EUR", "value": 1 }`)
    const [scale, setScale] = useState(1)
    const [searchValue, setSearchValue] = useState("")


    return (<DataContext.Provider value={{ currencies, setCurrencies, courses, setCourses, selectedCurrency, setSelectedCurrency, scale, setScale, searchValue, setSearchValue }}>
        {children}
    </DataContext.Provider>)
}

export { DataContext, DataProvider }