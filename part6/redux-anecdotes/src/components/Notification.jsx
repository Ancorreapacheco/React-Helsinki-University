import { connect } from "react-redux"


const Notification = (props) => {
  
  const notification= props.notification
  
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notification !== null){    
    return (
      <div style={style}>
        {notification}
      </div>
      
    )
  }

  return(
    <>
    
    </>
  )

}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotification= connect(mapStateToProps)(Notification)

export default connectedNotification