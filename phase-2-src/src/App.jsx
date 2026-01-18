import { useEffect, useState } from "react"
import Calendar from "./components/Calendar"
import Controls from "./components/Controls"
import Header from "./components/Header"

const App = () => {
    const [courses, setCourses] = useState(null)
    const [currencies, setCurrencies] = useState(null)

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
            setCurrencies(data)
        })
    }, [])

    return <div className="flex flex-col h-full">
        <Header />
        <Controls />
        {
            courses && currencies ? <Calendar startDay="sunday" endDay={31} courses={courses} /> : ""
        }
    </div>
}

export default App