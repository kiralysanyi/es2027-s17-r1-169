import { useContext } from "react";
import formatKlok from "../utils/formatKlok";
import { DataContext } from "../providers/DataProvider";
import { getFlagForLang } from "../utils/langUtils";
import getCategoryColor from "../utils/getCategoryColor";
import getDifficultyEmoji from "../utils/getDifficultyEmoji";

/**
 * Course card to use in calendar
 * @param {Object} props - Component props
 * @param {Object} props.course - Course object
 * @param {Object} props.currency - Currency object
 * @returns {React.JSX.Element} Component
 */
const Course = ({ course }) => {
    const startDate = new Date(course["startDate"]);
    const endDate = new Date(course["endDate"]);
    const { selectedCurrency } = useContext(DataContext)
    return <div
    className="course-card"
    style={{
        transition: "200ms",
        gridRow: course.row + 1,
        gridColumnStart: startDate.getDate(),
        gridColumnEnd: endDate.getMonth() == 2 ? endDate.getDate() : 31,
        opacity: course.hidden == true ? 0 : 1,
        cursor: course.hidden == true ? "default" : "pointer",
        borderLeft: "0.5rem solid " + getCategoryColor(course.category)
    }}
        >
        <span className="bg-purple-200 mr-auto p-1 rounded-full text-purple-700 truncate max-w-full">
            {formatKlok(startDate.getHours())}:{formatKlok(startDate.getMinutes())} - {formatKlok(endDate.getHours())}:{formatKlok(endDate.getMinutes())}
        </span>
        <span>
            {getFlagForLang(course.language)} {course.courseName}
        </span>
        {course.courseName != course.courseNameEnglish ? <span>
            {course.courseNameEnglish}
        </span> : ""}
        <div className="w-full bg-gray-400" style={{ height: "1px" }}></div>
        {
            selectedCurrency ? <span>
                {getDifficultyEmoji(course.difficulty)} {course.difficulty} - {Math.floor(course.price / JSON.parse(selectedCurrency).value)} {JSON.parse(selectedCurrency).name}
            </span> : ""
        }

        <span>
            {course.instructor}
        </span>
    </div>
}

export default Course;