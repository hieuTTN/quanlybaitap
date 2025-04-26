// ModalAddMember.js
import React, { useState } from 'react';
import { getMethod, postMethod } from '../../services/request';
import { toast } from 'react-toastify';
import userimg from '../../assest/images/user.webp';

function ModalAddMember({ subject, refreshStudentList  }) {
  const [students, setStudents] = useState([]);

  const searchStudent = async (e) => {
    const response = await getMethod('/api/subject-student/teacher/student-not-join?param=' + e.value + '&subjectId=' + subject.id);
    const result = await response.json();
    setStudents(result);
  };

  const addStudent = async (e, userId) => {
    const confirm = window.confirm("Xác nhận thêm sinh viên vào môn học này?");
    if (!confirm) return;

    const response = await postMethod('/api/subject-student/teacher/add-student?subjectId=' + subject.id + '&userId=' + userId);
    if (response.status < 300) {
      toast.success("Thành công");
      e.style.display = 'none';
      if (typeof refreshStudentList === 'function') {
        refreshStudentList();  
      }
    } else {
      toast.error("Thất bại");
    }
  };

  return (
    <div className="modal fade" id="modalAddMember" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thêm sinh viên vào môn học - {subject?.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <label className='label-content'>Bắt đầu nhập mã sinh viên hoặc email</label>
            <input onKeyUp={(e) => searchStudent(e.target)} className="form-control" placeholder="Nhập mã hoặc email" />
            <div className="liststudent-add">
              {students.map((item) => (
                <table className="tablestudent" key={item.id}>
                  <tbody>
                    <tr>
                      <td className="tdimgsearch">
                        <img src={item.avatar == null ? userimg : item.avatar} className="imgstudent-search" alt="avatar" />
                      </td>
                      <td className="tdinforsearch">
                        <span className="hotensinhvien">{item.code} - {item.fullname}</span>
                        <span className="emailsinhvien">{item.email}</span>
                      </td>
                      <td className="tdthemsinhvien">
                        <button onClick={(e) => addStudent(e.target, item.id)} className="btn-primary">
                          <i className="fa fa-plus"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
              {students.length === 0 && (
                <div className="text-center mt-3" style={{ color: '#888' }}>
                  Không có sinh viên nào
                </div>
              )}
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

export default ModalAddMember;
