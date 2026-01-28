// Helper to strip the junk out of ISO strings for ICS format
function formatICSDate(rawDate) {
    if (!rawDate) return "";

    // If we got a Date object, stringify it first
    let dateStr = typeof rawDate === "string" ? rawDate : new Date(rawDate).toISOString();

    // Outlook/iCal hate the dashes, colons, and milliseconds
    // Example: 2023-10-01T12:00:00.000Z -> 20231001T120000Z
    return dateStr.replace(/[-:]/g, "").split(".")[0] + "Z";
}

function generateICS(course) {
    const stamp = formatICSDate(new Date());
    const start = formatICSDate(course.startDate);
    const end = formatICSDate(course.endDate);

    // Build the VCALENDAR string array
    // Note: \r\n is mandatory per RFC 5545 spec
    const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//SkillShare Academy//Calendar Export//EN",
        "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        `UID:${crypto.randomUUID()}@skillshare.com`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${course.courseName}`,
        `DESCRIPTION:Instructor: ${course.instructor}\\nCategory: ${course.category}\\nDifficulty: ${course.difficulty}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ];

    return lines.join("\r\n");
}

const exportCalendarFile = (course) => {
    if (!course?.courseName) {
        console.error("No course data provided for export");
        return;
    }

    try {
        const content = generateICS(course);
        const fileBlob = new Blob([content], { type: "text/calendar;charset=utf-8" });
        const downloadUrl = URL.createObjectURL(fileBlob);

        // Standard hidden anchor trick to trigger download
        const link = document.createElement("a");
        link.href = downloadUrl;
        
        // Sanitize filename: replace spaces with underscores
        const fileName = course.courseName.toLowerCase().split(' ').join('_');
        link.download = `${fileName}.ics`;
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
    } catch (err) {
        console.warn("ICS Export failed:", err);
        alert("Could not generate calendar file.");
    }
};

export default exportCalendarFile;