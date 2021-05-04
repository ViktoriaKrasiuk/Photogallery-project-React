
export const PaginationSelect = props => {
    return(
        <select onChange={(e) => props.handleChange(e.target.value)}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
        </select>
    )
}



