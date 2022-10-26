import { useState } from 'react'

export const useField = (type, id) => {
	const [value,setValue] = useState('')

	const onChange = e => {
		setValue(e.target.value)
	}

	const name= id

	return { type, onChange, value, id, name }
}
