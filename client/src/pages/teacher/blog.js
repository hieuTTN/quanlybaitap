import userDefault from '../../assest/images/avatar.png'
import {getMethod} from '../../services/request'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';


var size = 10
var url = '';
function TinTuc(){
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);
    useEffect(()=>{
        const getBlog= async() =>{
            var response = await getMethod('/api/blog/public/findAll?size='+size+'&sort=id,desc&page='+0);
            var result = await response.json();
            setItems(result.content)
            setpageCount(result.totalPages)
            url = '/api/blog/public/findAll?size='+size+'&sort=id,desc&page='
        };
        getBlog();
    }, []);

    
    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }
    

    return(
        <div class='container'>
            <div class="row">
            {items.map((item=>{
                return <div class="col-lg-20 col-sm-3">
                    <a href={'blog-detail?id='+item.id} class="single-blog">
                        <img src={item.image} class="img-blog-index"/>
                        <span class="title-blog-index">{item.title}</span>
                        <span class="des-blog-index">{item.description}</span>
                        <div className='divnguoidang'>
                            <span class="time-blog">{item.createdTime}, {item.createdDate}</span>
                            <span class="user-blog">{item.user.fullname}</span>
                        </div>
                    </a>
                </div>
            }))}
            </div>
            <ReactPaginate 
                marginPagesDisplayed={2} 
                pageCount={pageCount} 
                onPageChange={handlePageClick}
                containerClassName={'pagination'} 
                pageClassName={'page-item'} 
                pageLinkClassName={'page-link'}
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link' 
                previousLabel='Trang trước'
                nextLabel='Trang sau'
                activeClassName='active'/>
        </div>
    );
}

export default TinTuc;
