/**
 * Export course data to csv
 * @param {Array<Object>} courseData - Course data
 */
const exportCsv = (courseData) => {
    let exported = "startDate;endDate;language;category;courseName;courseNameEnglish;difficulty;instructor;price\n";
    courseData.sort((a, b) => new Date(a["startDate"]) - new Date(b["startDate"]))

    for (let i in courseData) {
        let dataLine = [];
        let filteredKeys = Object.keys(courseData[i]).filter(key => key != "hidden" && key != "row")
        filteredKeys.forEach((key) => {
            dataLine.push(courseData[i][key]);
        })

        exported += dataLine.join(";") + "\n";
    }

    console.log(exported)

    let blob = new Blob(["\ufeff", exported], { type: "text/csv;charset=utf-8;" })
    const blobURL = URL.createObjectURL(blob)
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "courses.csv";
    link.click();
    URL.revokeObjectURL(fileUrl);
}

export default exportCsv