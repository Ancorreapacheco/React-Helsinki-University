import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'


const Notification = () => {

	const message= useSelector( state => state.message)

	const { content, isSuccess } = { ...message }

	if (content === null) {
		return null
	}
	if (isSuccess) {
		return <Alert variant='success'>{content}</Alert>
	}
	return <Alert variant='danger'>{content}</Alert>
}

export default Notification