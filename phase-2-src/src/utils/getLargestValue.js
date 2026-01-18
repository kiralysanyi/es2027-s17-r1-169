const getLargestValue = (array) => {
    let largest = 0;
    for (let i in array) {
        if (array[i] > largest) {
            largest = array[i]
        }
    }
}

export default getLargestValue