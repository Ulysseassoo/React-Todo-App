import React from "react"
import { useDate } from "../../utils/useDate"

const DateContainer = ({ username }) => {
	return (
		<div className="date--container">
			<p>{useDate().date}</p>
			<p>{useDate().time}</p>
			<p>
				{useDate().phrase} <span>{username}</span> !
			</p>
		</div>
	)
}

export default DateContainer
