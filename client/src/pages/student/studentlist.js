import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'


var size = 10;
var url = '';
function StudentList({ subject }){
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    useEffect(()=>{
        getItem();
    }, []);

    const getItem= async() =>{
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var search = document.getElementById('search').value;
        var response = await getMethod('/api/subject-student/student/all-student?size='+size+'&subjectId='+id+'&search='+search+'&sort=id,desc&page='+0);
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/subject-student/student/all-student?size='+size+'&subjectId='+id+'&search='+search+'&sort=id,desc&page='
    };
    
    const handlePageClick = async (data)=>{
        var currentPage = data.selected
        var response = await getMethod(url+currentPage)
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
    }

    return(
        <>
             <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Danh sách Sinh Viên</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <input onKeyUp={()=>getItem()} id='search' className='form-control' placeholder='Tìm kiếm sinh viên'/>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách sinh viên</span>
                </div>
                <div class="divcontenttable">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Ảnh bìa</th>
                                <th>Mã sinh viên</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th class="sticky-col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                    return  <tr>
                                    <td><img src={item.user.avatar} className='imagestudentlist'/></td>
                                    <td>{item.user.code}</td>
                                    <td>{item.user.email}</td>
                                    <td>{item.user.fullname}</td>
                                    <td class="sticky-col">
                                        <a class='edit-btn' href={'/teacher/chat?user='+item.user.id+'&email='+item.user.email} target='_blank'><i class="fa fa-comment"></i></a>
                                    </td>
                                </tr>
                            }))}
                        </tbody>
                    </table>
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
            </div>

        </>
    );
}

export default StudentList;
