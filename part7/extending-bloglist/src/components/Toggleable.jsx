import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


const Toggleable = forwardRef((props, refs) => {

  const { buttonLabel }= props

  const [visible, setVisible] = useState(false)

  const changeVisible= () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return { changeVisible }
  })

  return(
    <>
      <div style={hideWhenVisible}>
        <button onClick={changeVisible}> {buttonLabel} </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={changeVisible}> Cancel </button>
      </div>

    </>
  )
})

Toggleable.propTypes={
  buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName= 'Toggleable'

export default Toggleable