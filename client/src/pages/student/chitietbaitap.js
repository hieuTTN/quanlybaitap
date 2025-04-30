import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload} from '../../services/request';
import Swal from 'sweetalert2'
import { formatDate } from '../../services/dateservice';

function ChiTietBaiTap({ subject, baiTap, onBack }){
    const [file, setFile] = useState(null);
    const [submittedFiles, setSubmittedFiles] = useState([]);
    useEffect(()=>{
        
    }, []);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
        //   setSubmittedFiles([...submittedFiles, file.name]);
          setFile(null);
        }
      };


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
                    <small>Có 6 commit code</small>
                </div>
                <div class="file-list-container">
                <form onSubmit={handleSubmit} className='row'>
                    <div className="col-sm-8">
                        <input type="file" className="form-control" id="fileInput" onChange={handleFileChange} required/>
                    </div>
                    <div className="col-sm-4">
                        <button type="submit" className="btn btn-primary form-control">Nộp File</button>
                    </div>
                </form><hr/>
                <div class="submission-container">
                    <div class="submission-header">
                        <div><span class="label">Thời gian nộp:</span> <span class="value">2025-04-30 10:00 AM</span></div>
                        <div><span class="label">Phiên bản:</span> <span class="value">1</span></div>
                    </div>

                    <div class="file-list">
                        <div class="file-list-title">Danh sách file</div>
                        <div class="file-item">
                        <span class="file-name">Main.java</span>
                        <button class="btn btn-outline-danger btn-sm">Xóa</button>
                        </div>
                        <div class="file-item">
                        <span class="file-name">Program.cpp</span>
                        <button class="btn btn-outline-danger btn-sm">Xóa</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default ChiTietBaiTap;
