import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, deleteMethod, postMethodPayload, uploadMultipleFile} from '../../services/request';
import Swal from 'sweetalert2'
import { formatDate,formatTimestamp } from '../../services/dateservice';
import ModalChamDiem from './modalchamdiem';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useRef } from 'react';

function ChiTietBaiTap({ subject, baiTap, onBack }){
    const [submission, setSubmission] = useState([]);
    const [subjectStudent, setSubjectStudent] = useState([]);
    const [student, setStudent] = useState(null);
    const [studentSet, setStudentSet] = useState(null);
    const modalRef = useRef();

    useEffect(()=>{
        getSubjectStudent();
        if (studentSet && modalRef.current) {
            const modal = new window.bootstrap.Modal(modalRef.current);
            modal.show();
        }
    }, [studentSet]);



    const getSubjectStudent= async() =>{
        var search = document.getElementById('search').value;
        var response = await getMethod('/api/subject-student/teacher/all-student-list?subjectId='+subject.id+'&search='+search);
        var result = await response.json();
        setSubjectStudent(result)
    };

    const getSubmission= async(user) =>{
        setStudent(user)
        var response = await getMethod('/api/submission/teacher/submission-student?assId='+baiTap.id+'&userId='+user.id);
        var result = await response.json();
        setSubmission(result)
    };

    function setModalChamDiem(std){
        setStudentSet(std)
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
                    <div class="d-flex justify-content-between align-items-center bg-light border">
                        <strong class="text-left"><i className='fa fa-users'></i> Danh sách sinh viên</strong>
                        <div class="search-wrapper d-flex align-items-center">
                            <input onKeyUp={()=>getSubjectStudent()} id='search' className='form-control' placeholder='Tìm kiếm sinh viên'/>
                        </div>
                    </div>
                    <ul className="student-list-ctbt p-0 m-0">
                        {subjectStudent.map((item, index) => (
                            <li key={index} className="student-item d-flex align-items-center p-2 mb shadow-sm rounded">
                                <div onClick={()=>getSubmission(item.user)} className="student-avatar me-3 pointer">
                                    <img src={item.user.avatar} alt="avatar" className="rounded-circle" />
                                </div>
                                <div onClick={()=>getSubmission(item.user)} className="student-info pointer">
                                    <div className="fw-bold">{item.user.fullname}</div>
                                    <div className="text-muted">Mã SV: {item.user.code}</div>
                                    <div className="text-muted">Email: {item.user.email}</div>
                                </div>
                                <div className="student-divdiem">
                                    <button onClick={()=>setModalChamDiem(item.user)}  className='btn btn-outline-primary'> Chấm điểm</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            <div class="col-sm-5">
                {student != null && (
                    <div class="d-flex justify-content-between align-items-center bg-light border">
                        <strong class="text-left"><i className='fa fa-users'></i> Có {submission.length} commit với sinh viên {student.fullname}</strong>
                    </div>
                )}
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
                                    {file.link.split("/").pop().split(".")[1] == 'rar' || file.link.split("/").pop().split(".")[1] == 'zip' ?
                                    <a href={`/teacher/viewsource?subjectdetail=${subject.id}&baitap=${baiTap.id}&submission=${item.id}&submissionfile=${file.id}`} target='_blank' class="downloadbtn btn btn-outline-secondary btn-sm"><i className='fa fa-eye'></i> src</a>:
                                    <a href={file.link} target='_blank' class="downloadbtn btn btn-outline-danger btn-sm"><i className='fa fa-eye'></i> view</a>}
                                </div>
                            }))}
                        </div>
                    </div>
                }))}
                </div>
                </div>
            </div>
            {studentSet != null && (
                <ModalChamDiem subject={subject} baitap={baiTap} sinhVien={studentSet} modalRef={modalRef}/>
            )}
        </div>
    );
}

export default ChiTietBaiTap;
