import { useState, useEffect } from 'react'
import { getMethod, postMethodPayload, deleteMethod } from '../../services/request';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';


function ModalChamDiem({ subject, baitap, sinhVien, modalRef  }) {
    const [testResult, setTestResult] = useState([]);
    const [testCase, setTestCase] = useState([]);
    const [tongDiem, setTongDiem] = useState(0);
    const [diemSinhVien, setDiemSinhVien] = useState(0);

    useEffect(()=>{
        getData(); 
    }, [sinhVien]);

    const getData= async() =>{
        var response = await getMethod('/api/testresult/teacher/get-result-student?userId='+sinhVien?.id+'&assignmentId='+baitap?.id);
        var result = await response.json();
        console.log(result);
        setTestCase(result.testCases)
        setTestResult(result.testResults)
        var tongTestCase = 0;
        var tongSinhVien = 0;
        for(var i=0; i< result.testCases.length; i++){
            tongTestCase += result.testCases[i].score
        }
        for(var i=0; i< result.testResults.length; i++){
            tongTestCase += result.testResults[i].testCase.score
            tongSinhVien += result.testResults[i].earnedScore
        }
        setTongDiem(tongTestCase)
        setDiemSinhVien(tongSinhVien)
    };
    
    async function saveResult(event) {
        event.preventDefault();
        if(event.target.elements.maxdiem.value < event.target.elements.diem.value){
            toast.error("Điểm tối đa là "+ event.target.elements.maxdiem.value);return;
        }
        const payload = {
            id: event.target.elements.idresult.value,
            actualOutput: event.target.elements.actualOutput.value,
            earnedScore: event.target.elements.diem.value,
            testCase: {
                id:event.target.elements.testcase.value
            },
            user: {
                id:sinhVien.id
            },
        };
        const res = await postMethodPayload('/api/testresult/teacher/create', payload);
        if(res.status < 300){
            toast.success("Ghi điểm thành công");
            getData();
        }
    }

    async function deleteDiem(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa kết quả này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/testresult/teacher/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            getData();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

  return (
    <div className="modal fade" id="modalChamDiem" tabIndex="-1" 
    aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef} >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chấm điểm sinh viên - {sinhVien?.fullname}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body contentresultestcase">
            <span className='tongdiemsinhvien'>Điểm {diemSinhVien} / {tongDiem}</span>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Input</th>
                        <th>Output</th>
                        <th>Điểm tối đa</th>
                        <th>Kết quả</th>
                    </tr>
                </thead>
                <tbody id='listketqua'>
                    {testCase.map((item, index) => (
                        <tr key={index}>
                            <td>{item.input}</td>
                            <td>{item.expectedOutput}</td>
                            <td>{item.score}</td>
                            <td>
                                <form method='post' onSubmit={saveResult}>
                                    <input name='idresult' type="hidden"/>
                                    <input name='testcase' type="hidden" value={item.id}/>
                                    <input name='maxdiem' type="hidden" value={item.score}/>
                                    <textarea name='actualOutput' placeholder='Ghi chú kết quả' className='form-control ghichudiemtest'/>
                                    <div className='divchamdiem'>
                                        <input name='diem' placeholder='Điểm' className='inputeditdiem'/>
                                        <button className='edit-btn'><i className='fa fa-edit'></i> Lưu</button>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    ))}
                    {testResult.map((item, index) => (
                        <tr key={index}>
                            <td>{item.testCase.input}</td>
                            <td>{item.testCase.expectedOutput}</td>
                            <td>{item.testCase.score}</td>
                            <td>
                                <form method='post' onSubmit={saveResult}>
                                    <input name='idresult' type="hidden" value={item.id}/>
                                    <input name='testcase' type="hidden" value={item.testCase.id}/>
                                    <input name='maxdiem' type="hidden" value={item.testCase.score}/>
                                    <textarea name='actualOutput' defaultValue={item.actualOutput} placeholder='Ghi chú kết quả' className='form-control ghichudiemtest'/>
                                    <div className='divchamdiem'>
                                        <input name='diem' placeholder='Điểm' defaultValue={item.earnedScore} className='inputeditdiem'/>
                                        <button className='edit-btn'><i className='fa fa-edit'></i> Lưu</button>
                                        <button onClick={()=>deleteDiem(item.id)} className='delete-btn' type="button"><i className='fa fa-trash-alt'></i></button>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalChamDiem;
