import { useState, useEffect } from "react"
import axios from "axios"

export const useField = (type) => {
	const [value, setValue] = useState("")

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange,
	}
}

export const useCountry = (name) => {
	const [country, setCountry] = useState(null)
  

	useEffect(() => {
    if(name===''){
      return 
    }		
		axios
			.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
			.then((res) => {        
				if (res.data.length === 1) {					
					setCountry(res.data)          
				}
			})
			.catch((e) => {
        console.log(e.message)
        setCountry(null)
      })
	}, [name])

	if(name===''){
    return null
  }
  
  if(country=== null){
    return null
  }
	return country[0]
}
