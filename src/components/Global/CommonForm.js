
export const CommonForm = (props) => {
        
    return(
    <div>
        <form onSubmit={(e) => props.onSubmitHandler(e)}>
            <div>
            <h1>{props.headerName}</h1>
            </div> 
            {props.children} 
            <div className="btnWrapper">
                <button type="submit">Ok</button>
                <button onClick={props.closeModal}>Cancel</button>
            </div>
            
        </form>  
    </div>
    
    
    )
}