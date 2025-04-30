import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload, uploadMultipleFile} from '../../services/request';
import Swal from 'sweetalert2'
import { formatDate,formatTimestamp } from '../../services/dateservice';

function ChiTietBaiTap({ subject, baiTap, onBack }){
    const [submission, setSubmission] = useState([]);
    useEffect(()=>{
    }, []);



    return(
        <div class="row">
            <div class="col-sm-7">
                <div class="assignment-container">
                    <div class="d-flex align-items-center mb-3">
                        <button class="btn btn-link text-decoration-none" onClick={onBack}>&larr; Quay lại</button>
                        <h5 class="ms-3 mb-0">Assignments</h5>
                    </div>
                    <h3>{baiTap.name}</h3>
                    <div class="mb-4">
                        <strong>Ngôn ngữ - <span class="text-muted">{baiTap.language}</span></strong>
                    </div>
                    <div class="mb-4">
                        {baiTap.file && baiTap.file.trim() !== '' ? (
                            <div class="file-item mt-2">
                                <img src="https://cdn-icons-png.flaticon.com/512/888/888879.png" class="file-icon" alt="file" />
                                <a download={true} href={baiTap.file} class="file-name">Tải xuống file hướng dẫn - {baiTap.file.split("/").pop()}</a>
                                <span class="text-secondary">⋯</span>
                            </div>
                            ) : (
                            <div class="text-muted">Không có file hướng dẫn</div>
                        )}
                    </div>
                    <div class="mb-4">
                        <strong>Danh sách sinh viên</strong>
                    </div>
                </div>
            </div>
            <div class="col-sm-5">
                <div class="file-list-container">
                <div className='listsubmission'>
                {submission.map((item=>{
                    return <div class="submission-container">
                        <div class="submission-header">
                            <div><span class="label">Thời gian nộp:</span> <span class="value">{formatTimestamp(item.submitTime)}</span></div>
                            <div><span class="label">Phiên bản:</span> <span class="value">{item.commitName}</span></div>
                        </div>
                        <div class="file-list">
                            <div class="file-list-title">Danh sách file</div>
                            {item.submissionFiles.map((file=>{
                                return <div class="file-item">
                                    <span class="file-name">{file.link.split("/").pop()}</span>
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
