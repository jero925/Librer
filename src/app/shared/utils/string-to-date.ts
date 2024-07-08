function convertStringToDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Los meses en JavaScript son de 0 (enero) a 11 (diciembre)
}

export { convertStringToDate }