import { useEffect, useState } from "react"
import Calendar from "./components/Calendar"
import Controls from "./components/Controls"
import Header from "./components/Header"
import { days } from "./definitions/days"

const App = () => {
    const [courses, setCourses] = useState(null)
    const [currencies, setCurrencies] = useState(null)
    const [scale, setScale] = useState(1)
    const [filteredCourses, setFilteredCourses] = useState(null)

    useEffect(() => {
        fetch("/phase-2/courses.json", {
            method: "GET", headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response) => {
            const data = await response.json();
            console.log("Got data: ", data)
            setCourses(data)
            setFilteredCourses(data)
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

    // TODO: Add debounce
    const onSearch = (query) => {
        console.log(query)


        let filtered = courses.map((course) => {
            if (query.length == 0) {
                console.log("q empty")
                course.hidden = false;
                return course
            }

            if (course.courseName.toLowerCase().includes(query.toLowerCase()) == false &&
                course.courseNameEnglish.toLowerCase().includes(query.toLowerCase()) == false &&
                course.instructor.toLowerCase().includes(query.toLowerCase()) == false &&
                course.difficulty.toLowerCase().includes(query.toLowerCase()) == false
            ) {
                course.hidden = true;
            } else {
                course.hidden = false;
            }

            return course
        })
        setFilteredCourses(filtered)
    }

    return <div className="flex flex-col h-full">
        <Header />
        <Controls onSearch={onSearch} onScaleChange={setScale} />
        {
            filteredCourses && currencies ? <Calendar scale={scale} startDay={7} endDay={31} courses={filteredCourses} /> : ""
        }
    </div>
}

export default App