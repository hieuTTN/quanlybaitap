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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function BaiTapList({ subject, onViewDetail }){
    const [items, setItems] = useState([]);
    const [baitap, setBaiTap] = useState(null);
    
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

    async function deleteBaiTap(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa bài tập này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/assignment/teacher/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            getBaiTap();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    async function exportDiem(assId, assName, subjectName) {
        const response = await getMethod('/api/testresult/teacher/get-all-score?assignmentId=' + assId);
        const result = await response.json();

        const currentDate = new Date().toLocaleDateString('vi-VN');

        const data = [];

        data.push([`Ngày xuất: ${currentDate}`]);

        data.push([`Bài tập: ${assName} - Môn học: ${subjectName}`]);

        data.push([]);

        data.push(['Mã sinh viên', 'Tên sinh viên', 'Tổng điểm']);

        result.forEach(item => {
            data.push([item.code, item.fullname, item.tongDiem ?? 0]);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(data);

        worksheet['!cols'] = [
            { wch: 20 }, // Mã sinh viên
            { wch: 30 }, // Tên sinh viên
            { wch: 15 }  // Tổng điểm
        ];

        // 👉 Bôi đen dòng tiêu đề (dòng 4 => index 3) và dòng 2 => index 1
        const boldRows = [1, 3]; // chỉ số dòng bắt đầu từ 0

        boldRows.forEach(rowIndex => {
            const row = data[rowIndex];
            if (!row) return;
            row.forEach((_, colIndex) => {
                const cellAddress = XLSX.utils.encode_cell({ c: colIndex, r: rowIndex });
                const cell = worksheet[cellAddress];
                if (cell) {
                    cell.s = {
                        font: { bold: true }
                    };
                }
            });
        });

        // Tạo workbook và ghi file
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách điểm');

        // Ghi buffer và lưu file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellStyles: true });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `DanhSachDiem_${assName.replace(/\s+/g, '_')}.xlsx`);
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
                                    <div class="task-submitted">Mã bài tập {ass.id}</div>
                                    <div class="task-submitted">Hạn cuối lúc {ass.duaTime}</div>
                                    <div class="task-submitted">Số testcase {ass.numTestCase}</div>
                                </div>
                                <div className='d-flex'>
                                    {isExpired(ass.dueDate, ass.duaTime) == true?<span class="badge-error">Hết hạn</span>:<span class="badge-success">Còn hạn</span>}
                                    <button title='sửa bài tập' onClick={()=>setBaiTap(ass)} data-bs-toggle="modal" data-bs-target="#modalAddBaiTap" className='edit-btn'><i className='fa fa-edit'></i></button>
                                    <button onClick={()=>deleteBaiTap(ass.id)} title='xóa' className='delete-btn'><i className='fa fa-remove'></i></button>
                                    <button title='Testcase' onClick={()=>setBaiTap(ass)} data-bs-toggle="modal" data-bs-target="#modalTestcase" className='delete-btn'><i className='fa fa-clipboard'></i></button>
                                    <button onClick={()=>exportDiem(ass.id, ass.name, ass.subject.name)} className='edit-btn' title="Xuất Excel"><i className='fa fa-file-excel'></i></button>
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
