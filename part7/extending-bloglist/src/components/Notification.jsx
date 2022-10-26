import { useSelector } from 'react-redux'


const Notification = () => {

  const message= useSelector( state => state.message)

  const { content, isSuccess } = { ...message }

  if (content === null) {
    return null
  }
  if (isSuccess) {
    return <div className="msjSuccess">{content}</div>
  }
  return <div className="msjNoSuccess">{content}</div>
}

export default Notification