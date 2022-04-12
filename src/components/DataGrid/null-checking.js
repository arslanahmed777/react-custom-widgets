const isNull = (value) => {
    if (
        value === '' ||
        value === 0 ||
        value === 'Null' ||
        value === null ||
        value === undefined ||
        value === 'Please Select' ||
        value.length === 0 ||
        value === -1 ||
        value === 'Please Coverage' ||
        value === 'Please Relationship'
    ) {
        return true
    } else {
        return false
    }
}