

export const OrderSelect = props => {
    
    return(
        <select onChange={(e) => props.handleChange(e.target.value)}>
            <option value='desc'>desc</option>
            <option value='asc'>asc</option>
            
        </select>
    )
}