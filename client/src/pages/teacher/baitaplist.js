import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'
import ModalAddBaiTap from './modaladdbaitap'
import ModalTestCase from './modaltestcase'
import { formatDate } from '../../services/dateservice';

var size = 10;
var url = '';
function BaiTapList({ subject, onViewDetail }){
    const [items, setItems] = useState([]);
    const [baitap, setBaiTap] = useState(null);
    const [pageCount, setpageCount] = useState(0);

    
    useEffect(()=>{
        getBaiTap();
    }, []);

    const getBaiTap= async() =>{
        var response = await getMethod('/api/assignment/teacher/find-by-subject?subjectId='+subject.id);
        var result = await response.json();
        setItems(result)
        setBaiTap(null)
    };

    function isExpired(dueDate, dueTime) {
        const dueDateTime = new Date(`${dueDate}T${dueTime}`);
        const now = new Date();
        return dueDateTime < now;
    }

    function getOpenTestCase(baiTap){
        setBaiTap(baiTap)
        setTimeout(() => {
            document.getElementById("opentestcase").click();
        }, 50); // delay 50ms hoặc 100ms là đủ
    }

    return(
        <>
            <div class="teams-section">
                <div class="teams-title">Danh sách bài tập môn học - {subject.code}-{subject.name}</div>
                <div class="d-flex align-items-center">
                    <button onClick={()=>setBaiTap(null)} class="btn btn-join" data-bs-toggle="modal" data-bs-target="#modalAddBaiTap">
                    <i class="fa fa-users"></i>
                        Thêm bài tập mới
                    </button>
                </div>
            </div>
            <div class="container">
                {items.map((item) => {
                    return (
                        <div key={item.dueDate}>
                        <div className="date-header">{formatDate(item.dueDate)}</div>

                        {item.assignments.map((ass) => (
                            <div class="task-card pointer">
                                <div class="task-info" onClick={() => onViewDetail(ass)}>
                                    <div class="task-title">{ass.name}</div>
                                    <div class="task-submitted">Hạn cuối lúc {ass.duaTime}</div>
                                    <div class="task-submitted">Số testcase {ass.numTestCase}</div>
                                </div>
                                <div className='d-flex'>
                                    {isExpired(ass.dueDate, ass.duaTime) == true?<span class="badge-error">Hết hạn</span>:<span class="badge-success">Còn hạn</span>}
                                    <button onClick={()=>setBaiTap(ass)} data-bs-toggle="modal" data-bs-target="#modalAddBaiTap" className='edit-btn'><i className='fa fa-edit'></i></button>
                                    <button className='delete-btn'><i className='fa fa-remove'></i></button>
                                    <button onClick={()=>setBaiTap(ass)} data-bs-toggle="modal" data-bs-target="#modalTestcase" className='delete-btn'><i className='fa fa-clipboard'></i></button>
                                </div>
                            </div>
                        ))}
                        </div>
                    );
                })}
            </div>
            <ModalAddBaiTap
                subject={subject}
                baitap={baitap}
                refreshStudentList={getBaiTap}
            />
            <ModalTestCase
                baiTap={baitap}
            />
        </>
    );
}

export default BaiTapList;
