import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload, uploadMultipleFile} from '../../services/request';
import Swal from 'sweetalert2'
import { formatDate,formatTimestamp } from '../../services/dateservice';

function ChiTietBaiTap({ subject, baiTap, onBack }){
    const [file, setFile] = useState(null);
    const [checkHan, setCheckHan] = useState(true);
    const [tempFiles, setTempFiles] = useState([]);
    const [submission, setSubmission] = useState([]);
    useEffect(()=>{
        setCheckHan(isExpired(baiTap.dueDate, baiTap.duaTime))
        getSubmission();
    }, []);

    const getSubmission= async() =>{
        var response = await getMethod('/api/submission/student/my-submission?assId='+baiTap.id);
        var result = await response.json();
        setSubmission(result)
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setTempFiles((prev) => [...prev, selectedFile]);
            setFile(null); // reset file nếu không cần dùng biến file riêng
        }
    };

    const handleRemoveTempFile = (index) => {
        setTempFiles((prev) => prev.filter((_, i) => i !== index));
    };

    function isExpired(dueDate, dueTime) {
        const dueDateTime = new Date(`${dueDate}T${dueTime}`);
        const now = new Date();
        return dueDateTime < now;
    }

    async function saveCommit(event) {
        event.preventDefault();
        if(tempFiles.length == 0){
            toast.error("Hãy chọn ít nhất 1 file");
            return;
        }
        document.getElementById("loading").style.display = 'block'
        var listfile = await uploadMultipleFile(tempFiles)
        var dto = {
            "commitName": event.target.elements.commitname.value,
            "assignmentId": baiTap.id,
            "files": listfile,
        }
        const response = await postMethodPayload('/api/submission/student/create', dto)
        var result = await response.json();
        if (response.status < 300) {
            toast.success("Upload thành công");
            setTempFiles([]);
        } else {
            toast.error("Upload thất bại");
        }
        document.getElementById("loading").style.display = 'none'
        getSubmission();
    }
    
    async function deleteCommit(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa commit này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/submission/student/delete?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            getSubmission();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    async function deleteFileCommit(id){
        var con = window.confirm("Bạn chắc chắn muốn xóa file commit này?");
        if (con == false) {
            return;
        }
        var response = await deleteMethod('/api/submission/student/delete-file?id='+id)
        if (response.status < 300) {
            toast.success("xóa thành công!");
            getSubmission();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }

    return(
        <div class="row">
            <div class="col-sm-7">
                <div class="assignment-container">
                    <div class="d-flex align-items-center mb-3">
                        <button class="btn btn-link text-decoration-none" onClick={onBack}>&larr; Quay lại</button>
                        <h5 class="ms-3 mb-0">Assignments</h5>
                    </div>
                    <h3>{baiTap.name}</h3>
                    <p class="text-muted">
                        Ngày tạo: {formatDate(baiTap.createdDate)} • Hạn cuối: {formatDate(baiTap.dueDate)}, {baiTap.duaTime}
                    </p>
                    <div class="mb-4">
                        <strong>Ngôn ngữ</strong>
                        <div class="text-muted">{baiTap.language}</div>
                    </div>
                    <div class="mb-4">
                        <strong>Nội dung bài tập</strong>
                        <div class="text-muted divnoidungthuchien" dangerouslySetInnerHTML={{__html:baiTap.content}}></div>
                    </div>
                    <div class="mb-4">
                        <strong>File hướng dẫn</strong>
                        {baiTap.file && baiTap.file.trim() !== '' ? (
                            <div class="file-item mt-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888879.png" class="file-icon" alt="file" />
                                <a download={true} href={baiTap.file} class="file-name">Tải xuống - {baiTap.file.split("/").pop()}</a>
                                <span class="text-secondary">⋯</span>
                            </div>
                            ) : (
                            <div class="text-muted">Không có file hướng dẫn</div>
                        )}
                    </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="text-muted head-commit-code">
                    <span>Upload file bài tập</span><br/>
                    <small>Có {submission.length} commit code</small>
                </div>
                <div class="file-list-container">
                {checkHan == false && (
                    <><form onSubmit={saveCommit} className='row'>
                    <div className='col-sm-5'>
                        <input required className='form-control' placeholder='tên commit' name="commitname" />
                    </div>
                    <div className="col-sm-4">
                        <input type="file" className="form-control" id="fileInput" onChange={handleFileChange} required style={{ display: 'none' }} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => document.getElementById('fileInput').click()}>
                            <i className="fa fa-upload"></i> Chọn file
                        </button>
                    </div>
                    <div className="col-sm-3">
                        <button type="submit" className="btn btn-primary form-control">Nộp File</button>
                    </div>
                </form>
                {/* hiện bảng file đã chọn, có tên file, loại file, kích thước file, có thể xóa được file đã chọn */}
                {tempFiles.length > 0 && (
                    <div className="mt-3">
                        <h6>Danh sách file sẽ nộp:</h6>
                        <ul className="list-group">
                            {tempFiles.map((f, idx) => (
                                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{f.name}</strong> <br/>
                                        <small>Loại: {f.type || 'Không xác định'}, Kích thước: {(f.size / 1024).toFixed(1)} KB</small>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveTempFile(idx)}>Xóa</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                 <div id="loading">
                    <div class="bar1 bar"></div>
                </div><br/>
                <hr/></>
                )}
                <div className='listsubmission'>
                {submission.map((item=>{
                    return <div class="submission-container">
                        <div class="submission-header">
                            <div><span class="label">Thời gian nộp:</span> <span class="value">{formatTimestamp(item.submitTime)}</span></div>
                            <div><span class="label">Phiên bản:</span> <span class="value">{item.commitName}</span></div>
                            <i onClick={()=>deleteCommit(item.id)} className='fa fa-trash-alt iconxoacommit'></i>
                        </div>
                        <div class="file-list">
                            <div class="file-list-title">Danh sách file</div>
                            {item.submissionFiles.map((file=>{
                                return <div class="file-item">
                                    <span class="file-name">{file.link.split("/").pop()}</span>
                                    <button onClick={()=>deleteFileCommit(file.id)} class="btn btn-outline-danger btn-sm">Xóa</button>
                                    <a download={true} href={file.link} class="downloadbtn btn btn-outline-primary btn-sm"><i className='fa fa-download'></i></a>
                                </div>
                            }))}
                        </div>
                    </div>
                }))}
                </div>
                </div>
            </div>
        </div>
    );
}

export default ChiTietBaiTap;
