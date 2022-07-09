
const FindCountries=({countryFilter,handleChangeFilter})=>{
    return(
        <div>
            Find Countries <input value={countryFilter} onChange={handleChangeFilter}/>
            
        </div>
    )
}


export default FindCountries