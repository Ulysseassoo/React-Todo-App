import React from "react"
import { IoMdCloseCircleOutline } from "react-icons/io"
import { useDispatch } from "react-redux"
import { showModal } from "../../redux/modal/modalSlice"
import { convertDatabaseDate } from "../../utils/convertDatabaseDate"

const Modal = ({ todo }) => {
	const dispatch = useDispatch()
	return todo.name ? (
		<div className="modal">
			<div className="modal--header">
				<p>Title : {todo.name}</p>
				<IoMdCloseCircleOutline className="close--btn" onClick={() => dispatch(showModal(false))} />
			</div>
			<div className="modal--content">
				<p>Description : {todo.description}</p>
				<p>Done : {todo.complete ? "Completed" : "Not Completed"}</p>
				<p>Last Update: {convertDatabaseDate(todo.updatedAt)}</p>
			</div>
			<div className="modal--footer"></div>
		</div>
	) : (
		""
	)
}

export default Modal
