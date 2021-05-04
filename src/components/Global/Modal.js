import './Modal.css'

export const Modal = (props) => {
        
    return(
        <div className='modalWrapper'>
            <div className="modalBody">
                {props.children}
            </div>
        </div>
    )
}
