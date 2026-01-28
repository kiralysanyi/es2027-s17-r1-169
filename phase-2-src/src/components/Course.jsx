import { useContext, useEffect, useRef, useState } from "react";
import formatKlok from "../utils/formatKlok";
import { DataContext } from "../providers/DataProvider";
import { getFlagForLang } from "../utils/langUtils";
import getCategoryColor from "../utils/getCategoryColor";
import getDifficultyEmoji from "../utils/getDifficultyEmoji";
import exportCalendarFile from "../utils/exportCalendarFile";
import formatDate from "../utils/formatDate";
import { TooltipContext } from "../providers/TooltipProvider";
import priceFormatter from "../utils/priceFormatter";

/**
 * Course card to use in calendar
 * @param {Object} props - Component props
 * @param {Object} props.course - Course object
 * @returns {React.JSX.Element} Component
 */
const Course = ({ course }) => {
    const startDate = new Date(course["startDate"]);
    const endDate = new Date(course["endDate"]);
    const { selectedCurrency } = useContext(DataContext);

    const [enableScrollAnim, setEnableScrollAnim] = useState(false);


    const { showTooltip, hideTooltip } = useContext(TooltipContext)

    useEffect(() => {
        // check if css animation supported
        const isScrollAnimSupported = typeof window !== 'undefined' &&
            'ScrollTimeline' in window &&
            'ViewTimeline' in window;

        setEnableScrollAnim(isScrollAnimSupported)
    }, [])

    // basically act as a link
    const onClick = () => {
        location.href = ""
    }

    return <div
        onClick={onClick}
        className={`course-card ${enableScrollAnim ? "course-card-scroll-animation" : ""}`}
        tabIndex={0}
        onFocus={(ev) => {
            ev.target.scrollIntoView()
        }}
        aria-label={`Course: ${course.courseName} | ${course.courseNameEnglish}`}
        style={{
            gridRow: course.row + 1,
            gridColumnStart: startDate.getDate(),
            gridColumnEnd: endDate.getMonth() == 2 ? endDate.getDate() : 31,
            opacity: course.hidden == true ? 0 : 1,
            cursor: course.hidden == true ? "default" : "pointer",
            borderLeft: "0.5rem solid " + getCategoryColor(course.category)
        }}
    >
        <span
            onMouseEnter={(ev) => {
                showTooltip(`${formatDate(startDate)}  -  ${formatDate(endDate)}\nAdd to calendar`)
            }}

            onMouseLeave={hideTooltip}
            className="bg-blue-100 mr-auto p-1 px-2 rounded-full text-blue-700 truncate max-w-full border-2 border-blue-700" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                exportCalendarFile(course)
            }}>
            {formatKlok(startDate.getHours())}:{formatKlok(startDate.getMinutes())} - {formatKlok(endDate.getHours())}:{formatKlok(endDate.getMinutes())}
        </span>
        <span className="font-bold"
            onMouseEnter={(ev) => {
                showTooltip(`${getFlagForLang(course.language)} ${course.courseName}`)
            }}

            onMouseLeave={hideTooltip}
        >
            {getFlagForLang(course.language)} {course.courseName}
        </span>
        {course.courseName != course.courseNameEnglish ? <span className="text-gray-500"
            onMouseEnter={(ev) => {
                showTooltip(course.courseNameEnglish)
            }}

            onMouseLeave={hideTooltip}
        >
            {course.courseNameEnglish}
        </span> : ""}
        <div className="w-full bg-gray-400" style={{ height: "1px" }}></div>
        {
            selectedCurrency ? <span>
                {getDifficultyEmoji(course.difficulty)} <span className="text-gray-500">{course.difficulty}</span> &bull; <span className="font-bold italic"
                    onMouseEnter={(ev) => {
                        if (JSON.parse(selectedCurrency).name != "EUR") {
                            showTooltip(`${priceFormatter(course.price)} EUR`)
                        }
                    }}

                    onMouseLeave={hideTooltip}
                > {priceFormatter(Math.floor(course.price / JSON.parse(selectedCurrency).value))} {JSON.parse(selectedCurrency).name}</span>
            </span> : ""
        }

        <span
            onMouseEnter={(ev) => {
                showTooltip(`👤 ${course.instructor}`)
            }}

            onMouseLeave={hideTooltip}
        >
            👤 {course.instructor}
        </span>
    </div >
}

export default Course;