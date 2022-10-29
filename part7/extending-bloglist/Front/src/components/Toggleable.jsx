import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'


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
		<div>
			<div style={hideWhenVisible}>
				<Button variant='primary' onClick={changeVisible}> {buttonLabel} </Button>
			</div>

			<div style={showWhenVisible}>
				{props.children}
				<Button variant='warning' onClick={changeVisible}> Cancel </Button>
			</div>

		</div>
	)
})

Toggleable.propTypes={
	buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName= 'Toggleable'

export default Toggleable