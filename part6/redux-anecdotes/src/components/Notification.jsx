import { useSelector,useDispatch } from "react-redux"
import { removeMessage } from "../reducers/notificationReducer"



const Notification = () => {
  
  const notifications= useSelector( state => state.notification)
  const dispatch= useDispatch()
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notifications.show){
    setTimeout(()=>{      
      dispatch(removeMessage())
    } ,5000)
    return (
      <div style={style}>
        {notifications.message}
      </div>
      
    )
  }

  return(
    <>
    
    </>
  )

}

export default Notification