import { useContext, useEffect, useState } from "react";
import { DataContext } from "../providers/DataProvider";
import useDebounce from "../hooks/useDebounce";
import exportCsv from "../utils/exportCsv";

/**
 * Controls component, and this component sets data in the DataContext mostly
 * @param {Object} props
 * @param {Function} props.onScaleChange
 * @param {Function} props.onSearch
 * @param {Function} props.onCurrencyChange
 * @param {Object} props.currencies
 * @returns 
 */
const Controls = () => {
    const { currencies, setCurrencies, setCourses, selectedCurrency, setSelectedCurrency, scale, setScale, searchValue, setSearchValue, courses } = useContext(DataContext)

    const scaleUp = () => {
        if (scale < 5) {
            let newScale = scale + 0.25;
            setScale(newScale)
        }
    }

    const scaleDown = () => {
        if (scale > 0.5) {
            let newScale = scale - 0.25;
            setScale(newScale)
        }
    }

    const onExport = () => {
        exportCsv(courses);
    }

    const changeCurrency = (ev) => {
        localStorage.setItem("currency", JSON.parse(ev.target.value).name)
        setSelectedCurrency(ev.target.value);
    }

    // load data
    useEffect(() => {
        fetch("/phase-2/courses.json", {
            method: "GET", headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            const data = await response.json();
            console.log("Got data: ", data)
            setCourses(data)
        })

        fetch("/phase-2/currencies.json", {
            method: "GET", headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            const data = await response.json();
            console.log("Got data: ", data)
            setCurrencies(data);

            // load currency selector data
            const saved = localStorage.getItem("currency")
            console.log(saved, currencies[saved])
            if (saved != null) {
                console.log("blyat", data[saved])
                setSelectedCurrency(JSON.stringify({
                    name: saved,
                    value: data[saved]
                }))
            }
        })
    }, [])

    const [searchInput, setSearchInput] = useState("");
    const debouncedInput = useDebounce(searchInput, 300);

    useEffect(() => {
        if (courses) {
            setSearchValue(debouncedInput)


            let filtered = courses.map((course) => {
                if (debouncedInput.length == 0) {
                    course.hidden = false;
                    return course
                }

                if (course.courseName.toLowerCase().includes(debouncedInput.toLowerCase()) == false &&
                    course.courseNameEnglish.toLowerCase().includes(debouncedInput.toLowerCase()) == false &&
                    course.instructor.toLowerCase().includes(debouncedInput.toLowerCase()) == false &&
                    course.difficulty.toLowerCase().includes(debouncedInput.toLowerCase()) == false
                ) {
                    course.hidden = true;
                } else {
                    course.hidden = false;
                }

                return course
            })
            setCourses(filtered)
        }
    }, [debouncedInput])


    return <div className="flex flex-row gap-2 bg-gray-100 p-2 align-middle">
        <span className="font-bold self-center">2026. March</span>
        <input type="text" value={searchInput} placeholder="🔍 Search..." onChange={(ev) => { setSearchInput(ev.target.value) }} />

        <div className="input-group ml-auto">
            <label htmlFor="currency">💰</label>
            {
                selectedCurrency && currencies ? <select name="currency" value={selectedCurrency} id="currency" onChange={changeCurrency}>
                    {Object.keys(currencies).map(currency => <option key={currency} value={JSON.stringify({ name: currency, value: currencies[currency] })}>{currency}</option>)}
                </select> : ""
            }
        </div>
        <button className="control-button" onClick={() => {
            document.body.requestFullscreen()
        }}>🔝 Full Screen</button>
        <button className="control-button" onClick={onExport}> 📁 Export</button>
        <button className="control-button" onClick={scaleDown}>➖</button>
        <button className="control-button" onClick={scaleUp}>➕</button>
    </div>
}

export default Controls;