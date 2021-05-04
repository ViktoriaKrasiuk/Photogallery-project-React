import './PaginationComponent.css'
import '../Global/Icons/icons.css'

export const PaginationComponent = props => {

    return (
        <div className='paginationComponent'>
            <div className='paginationNavigation prevIcon icon pointer' onClick={() => props.goToPriviousPage()}></div>
            <div className='paginationNumber'>{props.pageNumber}</div>
            <div  className='paginationNavigation nextIcon icon pointer' onClick={() => props.goToNextPage()}></div>
        </div>
    )
}