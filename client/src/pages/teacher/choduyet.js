import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload, postMethod} from '../../services/request';
import Swal from 'sweetalert2'
import ModalAddMember from './modaladdstudent';


var size = 10;
var url = '';
function ListChoDuyet({ subject }){
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(0);

    useEffect(()=>{
        getItem();
    }, []);

    const getItem= async() =>{
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var response = await getMethod('/api/subject-student/teacher/request?size='+size+'&subjectId='+id+'&sort=id,desc&page='+0);
        var result = await response.json();
        setItems(result.content)
        setpageCount(result.totalPages)
        url = '/api/subject-student/teacher/request?size='+size+'&subjectId='+id+'&sort=id,desc&page='
    };
    
    async function deleteStudent(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa sinh viên này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/subject-student/teacher/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            getItem();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

      
    async function duyetSinhVien(id){
        var con = window.confirm("Bạn chắc chắn muốn duyệt sinh viên này vào lớp?");
        if (con == false) {
            return;
        }
        var response = await postMethod('/api/subject-student/teacher/accept?id='+id)
        if (response.status < 300) {
            toast.success("Duyệt thành công!");
            getItem();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

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
                <strong class="text-left"><i className='fa fa-users'></i> Quản Lý Sinh Viên Chờ Duyệt</strong>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách sinh viên gửi yêu cầu</span>
                </div>
                <div class="divcontenttable">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Ảnh bìa</th>
                                <th>Mã sinh viên</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>Số điện thoại</th>
                                <th>Ngày vào lớp</th>
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
                                    <td>{item.user.phone}</td>
                                    <td>{item.joinDate}</td>
                                    <td class="sticky-col">
                                        <button onClick={()=>duyetSinhVien(item.id)} class="edit-btn"><i className='fa fa-check'></i></button>
                                        <button onClick={()=>deleteStudent(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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

export default ListChoDuyet;
