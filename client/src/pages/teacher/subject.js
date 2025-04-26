import userDefault from '../../assest/images/avatar.png'
import { getMethod ,uploadSingleFile, postMethodPayload, postMethod} from '../../services/request';
import { useState, useEffect } from 'react'
import userimg from '../../assest/images/user.webp';
import Swal from 'sweetalert2';
import {toast } from 'react-toastify';
import ModalAddMember from './modaladdstudent';

var linkbanner = '';
async function saveSubject(event) {
    event.preventDefault();
    document.getElementById("loading").style.display = 'block'
    var ims = await uploadSingleFile(document.getElementById("chonfile"))
    if(ims != null){
        linkbanner = ims
    }
    var subject = {
        "id": event.target.elements.id.value,
        "name": event.target.elements.subjectname.value,
        "code": event.target.elements.code.value,
        "image": linkbanner,
        "locked": event.target.elements.locked.checked,
    }
    const response = await postMethodPayload('/api/subject/teacher/create-update', subject)
    var result = await response.json();
    console.log(result)
    if (response.status < 300) {
        Swal.fire({
            title: "Thông báo",
            text: "Thêm/cập nhật thành công!",
            preConfirm: () => {
                window.location.reload();
            }
        });
    } else {
        toast.error("Thất bại");
        document.getElementById("loading").style.display = 'none'
    }
}

function SubjectTeacher(){
    const [items, setItems] = useState([]);
    const [students, setStudent] = useState([]);
    const [subject, setSubject] = useState(null);
    const [checkedLock, setcheckedLock] = useState(false);
    useEffect(()=>{
        getSubject();
    }, []);

    const getSubject= async() =>{
        var response = await getMethod('/api/subject/teacher/my-subject');
        var result = await response.json();
        setItems(result)
    };

    function preViewImage(){
        const [file] = document.getElementById("chonfile").files
        if (file) {
            document.getElementById("imagepreview").src = URL.createObjectURL(file)
        }
    }

    async function lockOrUnlock(id) {
        var con = window.confirm("Xác nhận hành động?");
        if (con == false) {
            return;
        }
        const response = await postMethod('/api/subject/teacher/lock-unlock?id=' + id)
        if (response.status < 300) {
            toast.success("Thành công");
            getSubject();
        } else {
            toast.error("Thất bại");
        }
    }

    function setSubjectAc(subject){
        if(subject != null){
            setSubject(subject)
            linkbanner = subject.image;
            setcheckedLock(subject.locked)
        }
        else{
            setSubject(null)
            linkbanner = '';
            setcheckedLock(false)
        }
    }

    return(
        <div>
            <div class="teams-section">
                    <div class="teams-title">Môn học của bạn</div>
                    <div class="d-flex align-items-center">
                      <button onClick={()=>setSubjectAc(null)} class="btn btn-join" data-bs-toggle="modal" data-bs-target="#modalAdd">
                        <i class="fa fa-users"></i>
                        Tạo một nhóm môn học
                      </button>
                    </div>
                </div>
                <div class="row">
                {items.map((item=>{
                    return <div class="col-md-3">
                        <div class="course-card border">
                          <a href={"/teacher/subject-detail?id="+item.id} class="course-header">
                            <img src={item.image} class="course-icon" alt="Java"/>
                            <span class="card-title">{item.code}<br/>{item.name}</span>
                            <span class="ellipsis">⋮</span>
                          </a>
                          <div class="course-actions d-flex justify-content-start px-2">
                            <i onClick={()=>setSubject(item)} class="fa fa-user-plus" data-bs-toggle="modal" data-bs-target="#modalAddMember"></i>
                            <i onClick={()=>lockOrUnlock(item.id)} className={item.locked==false?'fa fa-unlock success':'fa fa-lock error'}></i>
                            <i onClick={()=>setSubjectAc(item)} class="fa fa-edit" data-bs-toggle="modal" data-bs-target="#modalAdd"></i>
                            <i class="fa fa-trash"></i>
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
                          <h5 class="modal-title">Thêm môn học của bạn</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={saveSubject} method='post' id="formadd">
                                <input type='hidden' name='id' defaultValue={subject?.id}/>
                                <label class="label-content">Mã gia nhập(sinh viên dùng để tham gia lớp)</label>
                                <input class="form-control" name="code" defaultValue={subject?.code}/>
                                <label class="label-content">Tên môn học</label>
                                <input class="form-control" name="subjectname" defaultValue={subject?.name}/>
                                <div class="row">
                                    <div class="col-sm-7">
                                        <label class="label-content">Chọn ảnh</label>
                                        <input onChange={preViewImage} type="file" id="chonfile"/>
                                    </div>
                                    <div class="col-sm-5">
                                        <img id="imagepreview" src={subject?.image} class="imgpresubject"/>
                                    </div>
                                </div><br/>
                                <label class="checkbox-custom">Khóa tham gia
                                    <input id="primaryadd" defaultChecked={subject?.locked} name='locked' type="checkbox"/>
                                    <span class="checkmark-checkbox"></span>
                                </label>
                            </form>
                            <div id="loading">
                                <div class="bar1 bar"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                          <button form="formadd" type="submit" class="btn btn-primary">Lưu môn học</button>
                        </div>
                      </div>
                    </div>
                </div>

                <ModalAddMember
                subject={subject}
                />
        </div>
    );
}

export default SubjectTeacher;
