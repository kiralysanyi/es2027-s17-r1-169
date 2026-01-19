import { useContext, useEffect, useRef, useState } from "react";
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

    // handle search
    const [searchInput, setSearchInput] = useState("");
    const debouncedInput = useDebounce(searchInput, 300);
    const searchRef = useRef(null)
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
                    course.difficulty.toLowerCase().includes(debouncedInput.toLowerCase()) == false &&
                    course.language.toLowerCase().includes(debouncedInput.toLowerCase()) == false &&
                    course.price.toString().includes(debouncedInput.toLowerCase()) == false
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

    // handle key combinations (except scroll, that is handled in the Calendar component)
    useEffect(() => {
        const evHandler = (ev) => {
            // handle exit fullscreen
            if (ev.key == "esc") {
                ev.preventDefault();
                document.exitFullscreen();
                return;
            }

            //only do anything if ctrlKey is down
            if (ev.ctrlKey) {
                switch (ev.key) {
                    case "d":
                        ev.preventDefault();
                        searchRef.current.focus()
                        break;

                    case "+":
                        ev.preventDefault();
                        scaleUp();
                        break;

                    case "-":
                        ev.preventDefault();
                        scaleDown();
                        break;

                    case "e":
                        ev.preventDefault();
                        onExport();
                        break;

                    case "b":
                        ev.preventDefault();
                        document.body.requestFullscreen();
                        break;

                    default:
                        break;
                }
            }
        }

        window.addEventListener("keydown", evHandler)

        return () => {
            window.removeEventListener("keydown", evHandler)
        }
    }, [scale, courses])


    return <div className="flex flex-row gap-2 bg-gray-100 p-2 align-middle">
        <span className="font-bold self-center">2026. March</span>
        <input aria-label="Search courses" type="text" value={searchInput} ref={searchRef} placeholder="🔍 Search..." onChange={(ev) => { setSearchInput(ev.target.value) }} />

        <div className="input-group ml-auto">
            <label htmlFor="currency">💰</label>
            {
                selectedCurrency && currencies ? <select aria-label="Select currency" name="currency" value={selectedCurrency} id="currency" onChange={changeCurrency}>
                    {Object.keys(currencies).map(currency => <option aria-label={currency} key={currency} value={JSON.stringify({ name: currency, value: currencies[currency] })}>{currency}</option>)}
                </select> : ""
            }
        </div>
        <button aria-label="fullscreen" className="control-button" onClick={() => {
            document.body.requestFullscreen()
        }}>🔝 Full Screen</button>
        <button className="control-button" aria-label="Export courses" onClick={onExport}> 📁 Export</button>
        <button className="control-button" aria-label="Zoom Out" disabled={scale == 0.5} onClick={scaleDown}>➖</button>
        <button className="control-button" aria-label="Zoom In" disabled={scale == 5} onClick={scaleUp}>➕</button>
    </div>
}

export default Controls;