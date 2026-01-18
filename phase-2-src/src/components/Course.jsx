/**
 * Course card to use in calendar
 * @param {Object} props - Component props
 * @param {Object} props.course - Course object
 * @returns {React.JSX.Element} Component
 */
const Course = ({course}) => {
    const startDate = new Date(course["startDate"]);
    const endDate = new Date(course["endDate"]);

    return <div style={{ gridRow: course.row, gridColumnStart: startDate.getDate(), gridColumnEnd: endDate.getMonth() == 2 ? endDate.getDate() : 31}} className={`bg-pink-500`}>
        <h1>Kecske</h1>
    </div>
}

export default Course;