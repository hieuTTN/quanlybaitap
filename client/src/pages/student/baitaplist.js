import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'
import { formatDate } from '../../services/dateservice';

var size = 10;
var url = '';
function BaiTapListStudent({ subject, onViewDetail  }){
    const [items, setItems] = useState([]);
    const [baitap, setBaiTap] = useState(null);
    
    useEffect(()=>{
        getBaiTap();
    }, []);

    const getBaiTap= async() =>{
        var response = await getMethod('/api/assignment/student/find-by-subject?subjectId='+subject.id);
        var result = await response.json();
        setItems(result)
        setBaiTap(null)
    };

    function isExpired(dueDate, dueTime) {
        const dueDateTime = new Date(`${dueDate}T${dueTime}`);
        const now = new Date();
        return dueDateTime < now;
    }

    return(
        <>
            <div class="teams-section">
                <div class="teams-title">Danh sách bài tập môn học - {subject.code}-{subject.name}</div>
                <div class="d-flex align-items-center">
                </div>
            </div>
            <div class="container">
                {items.map((item) => {
                    return (
                        <div key={item.dueDate}>
                        <div className="date-header">{formatDate(item.dueDate)}</div>

                        {item.assignments.map((ass) => (
                            <div onClick={() => onViewDetail(ass)} class="task-card pointer">
                                <div class="task-info">
                                    <div class="task-title">{ass.name}</div>
                                    <div class="task-submitted">Hạn cuối lúc {ass.duaTime}</div>
                                </div>
                                <div className='d-flex'>
                                    {isExpired(ass.dueDate, ass.duaTime) == true?<span class="badge-error">Hết hạn</span>:<span class="badge-success">Còn hạn</span>}
                                </div>
                            </div>
                        ))}
                        
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default BaiTapListStudent;
