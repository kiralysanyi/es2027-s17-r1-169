import { useState } from "react";
import calcDayNames from "../utils/calcDayNames";
import calculateRowCount from "../utils/calculateRowCount";
import positionCourses from "../utils/positionCourses";
import Course from "./Course";

/**
 * Very good calendar component
 * @component
 * @param {Object} props - The component props.
 * @param {int} props.startDay - Starting weekday
 * @param {number} props.endDay - Total number of days but i call it endDay because it sounded better
 * @param {Array} props.courses - Courses object
 * @param {Object} props.currencies - Currencies object
 * @param {number} props.scale - Scale of diagram
 * * @returns {React.JSX.Element} Component
 * * @example
 * <Calendar startDay="sunday" endDay={31} />
 */
const Calendar = ({ startDay, endDay, courses, currencies, scale }) => {
    const positionedCourses = positionCourses(courses)
    const dayMap = calcDayNames(startDay, endDay)
    return <div className="w-full overflow-x-auto flex-1">
        <div style={{
            transition: "200ms",
            gridTemplateColumns: `repeat(${endDay}, 1fr)`,
            columnGap: "1rem",
            rowGap: "1rem", width: (500 * scale) + "%",
            gridTemplateRows: `repeat(${calculateRowCount(courses) + 1}, 1fr)`
        }} className="grid h-full pl-2">
            {/* Render header */}
            {dayMap.map((day, index) => <div className={
                `flex flex-col align-middle justify-center border-b-2 border-gray-300 
                gridline ${(day == "SAT") || (day == "SUN") ? "gridline-weekend" : ""}
                ${index == 14 ? "holiday-indicator" : "" }
                `} style={{ gridColumn: 0, gridRow: 0 }}>
                <span className="mx-auto">{index + 1}</span>
                <span className={`mx-auto ${(day == "SAT") || (day == "SUN") ? "text-red-600" : ""}`}>{day}</span>
                {index == 14 ? <span className="text-white bg-red-600 text-center rounded-xl">
                    Hungarian Revolution
                </span> : ""}
            </div>)}

            {/* Render courses */}
            {
                positionedCourses.map(course => <Course course={course} />)
            }
        </div>
    </div>
}

export default Calendar;