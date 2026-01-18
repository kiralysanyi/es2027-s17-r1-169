import calculateRowCount from "../utils/calculateRowCount";
import positionCourses from "../utils/positionCourses";
import Course from "./Course";

/**
 * Very good calendar component
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.startDay - Starting day: monday, tuesday, wednesday, thursday, friday, saturday, sunday
 * @param {number} props.endDay - Total number of days but i call it endDay because it sounded better
 * @param {Array} props.courses - Courses object
 * @param {Object} props.currencies - Currencies object
 * * @returns {React.JSX.Element} Component
 * * @example
 * <Calendar startDay="sunday" endDay={31} />
 */
const Calendar = ({ startDay, endDay, courses, currencies }) => {
    const positionedCourses = positionCourses(courses)
    return <div className="w-full overflow-x-auto flex-1">
        <div style={{ gridTemplateColumns: `repeat(${endDay}, 1fr)`, columnGap: "1rem", rowGap: "1rem", width: "500%", gridTemplateRows: `repeat(${calculateRowCount(courses) + 1}, 1fr)` }} className="grid h-full">
            {/* Render header */}

            {/* Render courses */}
            {
                positionedCourses.map(course => <Course course={course} />)
            }
        </div>
    </div>
}

export default Calendar;