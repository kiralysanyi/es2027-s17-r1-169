import formatKlok from "../utils/formatKlok";

/**
 * Course card to use in calendar
 * @param {Object} props - Component props
 * @param {Object} props.course - Course object
 * @param {Object} props.currency - Currency object
 * @returns {React.JSX.Element} Component
 */
const Course = ({ course, currency }) => {
    const startDate = new Date(course["startDate"]);
    const endDate = new Date(course["endDate"]);

    return <div style={{
        transition: "200ms", 
        gridRow: course.row + 1, 
        gridColumnStart: startDate.getDate(), 
        gridColumnEnd: endDate.getMonth() == 2 ? endDate.getDate() : 31, 
        opacity: course.hidden == true ? 0 : 1 }}

    className="course-card">
        <span className="bg-purple-200 mr-auto p-1 rounded-full text-purple-700 truncate max-w-full">
            {formatKlok(startDate.getHours())}:{formatKlok(startDate.getMinutes())} - {formatKlok(endDate.getHours())}:{formatKlok(endDate.getMinutes())}
        </span>
        <span>
            {course.courseName}
        </span>
        {course.courseName != course.courseNameEnglish ? <span>
            {course.courseNameEnglish}
        </span> : ""}
        <div className="w-full bg-gray-400" style={{height: "1px"}}></div>
        <span>
            {course.difficulty} - {Math.floor(course.price / currency.value)} {currency.name}
        </span>

        <span>
            {course.instructor}
        </span>
    </div>
}

export default Course;