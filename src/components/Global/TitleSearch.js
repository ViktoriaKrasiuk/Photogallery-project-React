import './TitleSearch.css';

export const TitleSearch = props => {
    return(
        <div className='titleSearch'>
            <input type='search'  value={props.inputValue} onChange={(e) => props.handleInputChange(e.target.value)}/>
            <button onClick={() => props.handleSearch()}>Search</button>
        </div>
    )
}