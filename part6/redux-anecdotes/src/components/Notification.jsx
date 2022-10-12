import { useSelector } from "react-redux"




const Notification = () => {
  
  const notifications= useSelector( state => state.notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notifications !== null){    
    return (
      <div style={style}>
        {notifications}
      </div>
      
    )
  }

  return(
    <>
    
    </>
  )

}

export default Notification