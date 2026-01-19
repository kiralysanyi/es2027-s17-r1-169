/**
 * Export course data to csv
 * @param {Array<Object>} courseData - Course data
 */
const exportCsv = (courseData) => {
    let exported = "startDate;endData;language;category;courseName;courseNameEnglish;difficulty;instructor;price\n";

    for (let i in courseData) {
        let dataLine = [];
        let filteredKeys = Object.keys(courseData[i]).filter(key => key != "hidden" && key != "row")
        filteredKeys.forEach((key) => {
            dataLine.push(courseData[i][key]);
        })

        exported += dataLine.join(";") + "\n";
    }

    console.log(exported)

    let blob = new Blob([exported], { type: "text/csv" })
    const blobURL = URL.createObjectURL(blob)
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "courses.csv";
    link.click();
    URL.revokeObjectURL(fileUrl);
}

export default exportCsv