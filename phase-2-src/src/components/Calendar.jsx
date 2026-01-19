import { useContext, useEffect, useRef } from "react";
import calcDayNames from "../utils/calcDayNames";
import calculateRowCount from "../utils/calculateRowCount";
import positionCourses from "../utils/positionCourses";
import Course from "./Course";
import { DataContext } from "../providers/DataProvider";

/**
 * Very good calendar component
 * @component
 * @param {Object} props - The component props.
 * @param {int} props.startDay - Starting weekday
 * @param {number} props.endDay - Total number of days but i call it endDay because it sounded better
 * @param {Array} props.courses - Courses object
 * @param {Object} props.currency - Currency object
 * @param {number} props.scale - Scale of diagram
 * * @returns {React.JSX.Element} Component
 * * @example
 * <Calendar startDay="sunday" endDay={31} />
 */
const Calendar = ({ startDay, endDay }) => {
    const { courses, selectedCurrency, scale } = useContext(DataContext)
    const positionedCourses = positionCourses(courses)
    const dayMap = calcDayNames(startDay, endDay)

    const gridContainerRef = useRef(null)

    const goLeft = () => {
        gridContainerRef.current.scrollBy({ left: -100 })

    }

    const goRight = () => {
        gridContainerRef.current.scrollBy({ left: 100 })
    }

    // attach key listener
    useEffect(() => {
        const evHandler = (ev) => {

            if (ev.key == "ArrowLeft") {
                goLeft()
            }

            if (ev.key == "ArrowRight") {
                goRight()
            }

        }

        window.addEventListener("keydown", evHandler)

        return () => {
            window.removeEventListener("keydown", evHandler)

        }
    }, []);

    return <div className="w-full overflow-x-auto flex-1 h-full relative scroll-smooth" ref={gridContainerRef}>
        <button onClick={goLeft} className="control-button fixed z-10 top-2/4 left-1">⬅️</button>
        <button onClick={goRight} className="control-button fixed z-10 top-2/4 right-1">➡️</button>
        <div style={{
            transition: "200ms",
            gridTemplateColumns: `repeat(${endDay}, minmax(0, 1fr))`,
            columnGap: "0.5rem",
            rowGap: "0.5rem", width: (500 * scale) + "%",
            gridTemplateRows: `0.5fr repeat(${calculateRowCount(courses) + 1}, 1fr)`
        }} className="course-grid">
            {/* Render header */}
            {dayMap.map((day, index) => <div key={index} className={
                `flex flex-col align-middle justify-center border-b-2 border-gray-300 
                gridline grid-head ${(day == "SAT") || (day == "SUN") ? "gridline-weekend" : ""}
                ${index == 14 ? "holiday-indicator" : ""}
                `} style={{ gridColumn: index + 1, gridRow: 0 }}>
                <span className="mx-auto">{index + 1}</span>
                <span className={`mx-auto ${(day == "SAT") || (day == "SUN") ? "text-red-600" : ""}`}>{day}</span>
                {index == 14 ? <span className="text-white bg-red-600 text-center rounded-xl" style={{ marginBottom: "-1rem" }}>
                    Hungarian Revolution
                </span> : ""}
            </div>)}

            {/* Render courses */}
            {
                positionedCourses ? positionedCourses.map(course => <Course key={Math.random()} currency={selectedCurrency} course={course} />) : ""
            }
        </div>
    </div>
}

export default Calendar;