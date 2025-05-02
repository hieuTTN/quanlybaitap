// ModalAddMember.js
import { getMethod, postMethodPayload, deleteMethod } from '../../services/request';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react'

function ModalTestCase({ baiTap  }) {
    const [testcases, setTestcases] = useState([]);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [score, setScore] = useState('');
    const [idTest, setIdTest] = useState(null);

    useEffect(()=>{
        if(baiTap != null){
            getTestcase();
        }
    }, [baiTap]);

    const getTestcase= async() =>{
        var response = await getMethod('/api/testcase/teacher/find-by-assignment?assId='+baiTap.id);
        var result = await response.json();
        setTestcases(result)
    };

    async function saveTestcase(event) {
        event.preventDefault();
        var testcase = {
            "id": event.target.elements.id.value,
            "input": event.target.elements.input.value,
            "expectedOutput": event.target.elements.output.value,
            "score": event.target.elements.score.value,
            "assignment": {
                id:baiTap.id
            }
        }
        const response = await postMethodPayload('/api/testcase/teacher/create', testcase)
        var result = await response.json();
        if (response.status < 300) {
            toast.success("Thành công");
            getTestcase();
            clearData(null)
        } else {
            toast.error("Thất bại");
        }
    }

    function clearData(){
        setInput('');
        setOutput('');
        setScore('');
        setIdTest(null);
    }

    function handleEditTestcase(item) {
        setInput(item.input);
        setOutput(item.expectedOutput);
        setScore(item.score);
        setIdTest(item.id);
    }

    async function deleteTestCase(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa testcase này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/testcase/teacher/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            getTestcase();
            clearData();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    return (
        <div className="modal fade" id="modalTestcase" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Quản lý testcase</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className='addtestcasediv'>
                    <form method='post' onSubmit={saveTestcase} className='row'>
                        <input type='hidden' value={idTest} name='id'/>
                        <div className='col-sm-4'>
                            <label className='label-content'>Input</label>
                            <input id='input' value={input} onChange={(e) => setInput(e.target.value)} className='form-control' name='input'/>
                        </div>
                        <div className='col-sm-4'>
                            <label className='label-content'>Output mong muốn</label>
                            <input id='output' value={output} onChange={(e) => setOutput(e.target.value)} className='form-control' name='output'/>
                        </div>
                        <div className='col-sm-1'>
                            <label className='label-content'>Điểm</label>
                            <input id='diem' value={score} onChange={(e) => setScore(e.target.value)} className='form-control' name='score'/>
                        </div>
                        <div className='col-sm-2'>
                            <label className='label-content' dangerouslySetInnerHTML={{__html:'&ThinSpace;'}}></label>
                            {idTest == null?<button className='btn btn-primary form-control'>Thêm</button>:<button className='btn btn-primary form-control'>Cập nhật</button>}
                        </div>
                        <div className='col-sm-1'>
                            <label className='label-content' dangerouslySetInnerHTML={{__html:'&ThinSpace;'}}></label>
                            <button onClick={()=>clearData()} type='button' className='btn btn-primary'><i className='fa fa-refresh'></i></button>
                        </div>
                    </form>
                </div>

                <div className='tabledivtestcase'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Input</th>
                                <th>Output</th>
                                <th>Điêm</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                        {testcases.map((item,index)=>{
                            return <tr>
                                <td>{index + 1}</td>
                                <td>{item.input}</td>
                                <td>{item.expectedOutput}</td>
                                <td>{item.score}</td>
                                <td>
                                    <button className='edit-btn' onClick={()=>handleEditTestcase(item)}><i className='fa fa-edit'></i></button>
                                    <button onClick={()=>deleteTestCase(item.id)} className='delete-btn'><i className='fa fa-remove'></i></button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            </div>
            </div>
        </div>
        </div>
    );
}

export default ModalTestCase;
