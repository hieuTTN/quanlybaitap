import userDefault from '../../assest/images/avatar.png'
import { getMethod ,uploadSingleFile, postMethodPayload, postMethod} from '../../services/request';
import { useState, useEffect } from 'react'
import userimg from '../../assest/images/user.webp';
import Swal from 'sweetalert2';
import {toast } from 'react-toastify';

function SubjectStudent(){
    const [items, setItems] = useState([]);
    const [subjectSearch, setSubjectSearch] = useState([]);
    const [subjectStudent, setsubjectStudent] = useState([]);
    useEffect(()=>{
        getSubject();
    }, []);

    const getSubject= async() =>{
        var response = await getMethod('/api/subject/student/my-subject');
        var result = await response.json();
        setItems(result)
    };

    const getSubjectStudent= async() =>{
        var response = await getMethod('/api/subject-student/student/my-request');
        var result = await response.json();
        setsubjectStudent(result)
    };

    const searchSubject= async() =>{
        var param = document.getElementById("searchmonhoc").value
        var response = await getMethod('/api/subject/student/subject-not-join?param='+param);
        var result = await response.json();
        setSubjectSearch(result)
    };

    async function sendRequest(id) {
        var con = window.confirm("Xác nhận gửi yêu cầu tham gia?");
        if (con == false) {
            return;
        }
        const response = await postMethod('/api/subject-student/student/send-request?subjectId=' + id)
        if (response.status < 300) {
            toast.success("Thành công");
        } else {
            if(response.status == 417){
                var result = await response.json();
                toast.warning(result.defaultMessage);return;
            }
            toast.error("Thất bại");
        }
    }

    async function cancelRequest(item) {
        var con = window.confirm("Xác nhận hủy yêu cầu tham gia môn "+item.subject.name);
        if (con == false) {
            return;
        }
        const response = await postMethod('/api/subject-student/student/cancel-request?id=' + item.id)
        if (response.status < 300) {
            toast.success("Thành công");
            getSubjectStudent();
        } else {
            toast.error("Thất bại");
        }
    }

    return(
        <div>
            <div class="teams-section">
                    <div class="teams-title">Môn học của bạn</div>
                    <div class="d-flex align-items-center">
                      <button onClick={()=>getSubjectStudent()} class="btn btn-join btnjoinleft" data-bs-toggle="modal" data-bs-target="#modalRequest">
                        <i class="fa fa-paper-plane"></i>
                        Yêu cầu đã gửi
                      </button>
                      <button onClick={()=>setSubjectSearch([])} class="btn btn-join" data-bs-toggle="modal" data-bs-target="#modalAdd">
                        <i class="fa fa-users"></i>
                        Tham gia vào một nhóm môn học
                      </button>
                    </div>
                </div>
                <div class="row">
                {items.map((item=>{
                    return <div class="col-md-3">
                        <div class="course-card border">
                          <a href={"/student/subject-detail?id="+item.id} class="course-header">
                            <img src={item.image} class="course-icon" alt="Java"/>
                            <span class="card-title">{item.code}<br/>{item.name}</span>
                            <span class="ellipsis">⋮</span>
                          </a>
                          <div class="course-actions d-flex justify-content-start px-2">
                            <i class="fa fa-sign-out"></i>
                            <span className='updatedatesubject'>{item.updatedDate == null?'':item.updatedDate}</span>
                          </div>
                        </div>
                    </div>
                }))}
                </div>

                <div class="modal fade" id="modalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Tìm kiếm môn học của bạn</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label className='label-content'>Bắt đầu nhập mã môn học</label>
                            <div className='row'>
                                <div className='col-sm-10'><input id='searchmonhoc' class="form-control" placeholder='Nhập mã tham gia'/></div>
                                <div className='col-sm-2'><button onClick={()=>searchSubject()} class="btn btn-primary"><i class="fa fa-search"></i></button></div>
                            </div>
                            <div class="liststudent-add">
                            {subjectSearch.map((item=>{
                                return <table className='tablestudent'>
                                    <tr>
                                        <td className='tdimgsearch'><img src={item.image} className='imgstudent-search'/></td>
                                        <td className='tdinforsearch'>
                                            <span className='hotensinhvien'>Môn học: {item.code} - {item.name}</span>
                                            <span className='emailsinhvien'><i class="fa fa-user"></i>Giáo viên: {item.teacher.fullname}</span>
                                        </td>
                                        <td className='tdthemsinhvien'>
                                            <button onClick={()=>sendRequest(item.id)} class="btn-primary"><i class="fa fa-user-plus"></i></button>
                                        </td>
                                    </tr>
                                </table>
                            }))}
                            {subjectSearch.length === 0 && (
                                <div className="text-center mt-3" style={{ color: '#888' }}>
                                    Không có môn học nào
                                </div>
                            )}
                            </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                      </div>
                    </div>
                </div>


                <div class="modal fade" id="modalRequest" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Yêu cầu đã gửi</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="liststudent-add">
                            {subjectStudent.map((item=>{
                                return <table className='tablestudent'>
                                    <tr>
                                        <td className='tdimgsearch'><img src={item.subject.image} className='imgstudent-search'/></td>
                                        <td className='tdinforsearch'>
                                            <span className='hotensinhvien'>Môn học: {item.subject.code} - {item.subject.name}</span>
                                            <span className='emailsinhvien'><i class="fa fa-user"></i>Giáo viên: {item.subject.teacher.fullname}</span>
                                        </td>
                                        <td className='tdthemsinhvien'>
                                            <button onClick={()=>cancelRequest(item)} class="btn-danger"><i class="fa fa-window-close"></i></button>
                                        </td>
                                    </tr>
                                </table>
                            }))}
                            {subjectStudent.length === 0 && (
                                <div className="text-center mt-3" style={{ color: '#888' }}>
                                    Không có yêu cầu nào
                                </div>
                            )}
                            </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        </div>
                      </div>
                    </div>
                </div>
        </div>
    );
}

export default SubjectStudent;
