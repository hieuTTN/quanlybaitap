import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'
import { formatDate } from '../../services/dateservice';

function DanhSachFile({ subject, onViewDetail }){
    const [items, setItems] = useState([]);
    const [baitap, setBaiTap] = useState(null);

    
    useEffect(()=>{
        getBaiTap();
    }, []);

    const getBaiTap= async() =>{
        var response = await getMethod('/api/assignment/teacher-student/find-file?subjectId='+subject.id);
        var result = await response.json();
        console.log(result);
        
        setItems(result)
        setBaiTap(null)
    };

    return(
        <>
            <div class="teams-section">
                <div class="teams-title">Danh sách file môn học - {subject.code}-{subject.name}</div>
            </div>
            <div class="container">
                {items.map((item) => {
                    return (
                        <div key={item.dueDate}>
                        <div className="date-header">Ngày đăng: {formatDate(item.dueDate)}</div>

                        {item.assignments.map((ass) => (
                            <div class="file-item mt-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888879.png" class="file-icon" alt="file" />
                                <a download={true} href={ass.file} class="file-name">Click để tải xuống file - {ass.file.split("/").pop()}</a>
                                <span>{ass.name}</span>
                            </div>
                        ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default DanhSachFile;
