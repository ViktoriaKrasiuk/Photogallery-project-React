
export const OrderBySelect = props => {
    
    return(
        <select onChange={(e) => props.handleChange(e.target.value)}>
            <option value='created_at'>By date</option>
            <option value='title'>By title</option>
            <option value='id'>By id</option>
            
        </select>
    )
}