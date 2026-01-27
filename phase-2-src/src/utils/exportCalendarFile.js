const toICSDate = (dateString) => {
    if (!dateString) return "";
    const date = typeof dateString === "string" ? dateString : new Date(dateString).toISOString();
    return date.replace(/[-:]/g, "").split(".")[0] + "Z";
};

function generateICS(course) {
    const {
        courseName,
        instructor,
        category,
        difficulty,
        language,
        startDate,
        endDate,
    } = course;

    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//SkillShare academy//Course Calendar//EN",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `UID:${crypto.randomUUID()}@skillshare.com`,
        `DTSTAMP:${toICSDate(new Date().toISOString())}`,
        `DTSTART:${toICSDate(startDate)}`,
        `DTEND:${toICSDate(endDate)}`,
        `SUMMARY:${courseName}`,
        `DESCRIPTION:Category: ${category}\\nDifficulty: ${difficulty}\\nLanguage: ${language}\\nInstructor: ${instructor}`,
        "END:VEVENT",
        "END:VCALENDAR",
    ].join("\r\n");
}

const exportCalendarFile = (course) => {
    try {
        const icsContent = generateICS(course);
        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${course.courseName.replace(/\s+/g, "_")}.ics`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Failed to export calendar:", error);
    }
};

export default exportCalendarFile;