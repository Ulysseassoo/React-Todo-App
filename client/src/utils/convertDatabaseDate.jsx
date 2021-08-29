export const convertDatabaseDate = (date) => {
	let convertedDate = date.split(/\D+/)
	let newDate = new Date(
		Date.UTC(
			convertedDate[0],
			--convertedDate[1],
			convertedDate[2],
			convertedDate[3],
			convertedDate[4],
			convertedDate[5],
			convertedDate[6]
		)
	)
	let todaysDate = new Date(Date.now())
	if (newDate === todaysDate) {
		return "Today"
	}
	return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`
}
