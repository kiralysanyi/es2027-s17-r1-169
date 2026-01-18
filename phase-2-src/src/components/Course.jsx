import formatKlok from "../utils/formatKlok";

/**
 * Course card to use in calendar
 * @param {Object} props - Component props
 * @param {Object} props.course - Course object
 * @returns {React.JSX.Element} Component
 */
const Course = ({ course }) => {
    const startDate = new Date(course["startDate"]);
    const endDate = new Date(course["endDate"]);

    return <div style={{ gridRow: course.row + 1, gridColumnStart: startDate.getDate(), gridColumnEnd: endDate.getMonth() == 2 ? endDate.getDate() : 31 }} className={`bg-white border-2 border-gray-100 flex flex-col`}>
        <span>
            {formatKlok(startDate.getHours())}:{formatKlok(startDate.getMinutes())} - {formatKlok(endDate.getHours())}:{formatKlok(endDate.getMinutes())}
        </span>
        <span>
            {course.courseName}
        </span>
        {course.courseName != course.courseNameEnglish ? <span>
            {course.courseNameEnglish}
        </span> : ""}
        <span>
            {course.difficulty} - {course.price}
        </span>

        <span>
            {course.instructor}
        </span>
    </div>
}

export default Course;