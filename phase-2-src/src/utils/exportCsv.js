/**
 * Export course data to csv
 * @param {Array<Object>} courseData - Course data
 */
const exportCsv = (courseData) => {
    // init data and add header line
    let exported = "startDate;endDate;language;category;courseName;courseNameEnglish;difficulty;instructor;price\n";
    // sort by start date
    courseData.sort((a, b) => new Date(a["startDate"]) - new Date(b["startDate"]))

    // cycle through the data and remove custom data added by the calendar renderer, then put it into the data for export
    for (let i in courseData) {
        let dataLine = [];
        let filteredKeys = Object.keys(courseData[i]).filter(key => key != "hidden" && key != "row")
        filteredKeys.forEach((key) => {
            dataLine.push(courseData[i][key]);
        })

        exported += dataLine.join(";") + "\n";
    }

    console.log(exported)

    // set up blob, dummy link, and export, voila
    let blob = new Blob(["\ufeff", exported], { type: "text/csv;charset=utf-8;" })
    const blobURL = URL.createObjectURL(blob)
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "courses.csv";
    link.click();
    URL.revokeObjectURL(blobURL);
}

export default exportCsv