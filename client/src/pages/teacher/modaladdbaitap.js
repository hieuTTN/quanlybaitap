import { useState, useEffect } from 'react'
import { uploadSingleFile, postMethodPayload } from '../../services/request';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';


var linkbanner = '';
var description = '';

function ModalAddBaiTap({ subject, baitap , refreshStudentList  }) {
    const editorRef = useRef(null);

    useEffect(()=>{
        if(baitap != null){
            description = baitap.content
            linkbanner = baitap.file
        }
        else{
            description = '';
            linkbanner = '';
        }
    }, []);
    
    function handleEditorChange(content, editor) {
        description = content;
    }


    async function saveBaiTap(event) {
        event.preventDefault();
        document.getElementById("loading").style.display = 'block'
        var ims = await uploadSingleFile(document.getElementById("chonfile"))
        if(ims != null){
            linkbanner = ims
        }
        var bt = {
            "id": event.target.elements.id.value,
            "name": event.target.elements.namebt.value,
            "dueDate": event.target.elements.duadate.value,
            "duaTime": event.target.elements.duatime.value,
            "language": event.target.elements.language.value,
            "content": description,
            "file": linkbanner,
            "subject": {
                id:subject.id
            },
        }
        console.log(bt);
        
        if(bt.id != null){
            var time = event.target.elements.duatime.value.split(":");
            bt.duaTime = time[0]+":"+time[1]
        }
        const response = await postMethodPayload('/api/assignment/teacher/create-update', bt)
        var result = await response.json();
        console.log(result)
        if (response.status < 300) {
            toast.success("Thành công");
            if (typeof refreshStudentList === 'function') {
                refreshStudentList();
                document.getElementById("loading").style.display = 'none'  
            }
        } else {
            toast.error("Thêm/ sửa bài viết thất bại");
            document.getElementById("loading").style.display = 'none'
        }
    }
  return (
    <div className="modal fade" id="modalAddBaiTap" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bài tập môn - {subject?.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form method='post' onSubmit={saveBaiTap} id='formadd' className='row'>
                <div class="col-sm-5">
                    <input type='hidden' name='id' defaultValue={baitap?.id}/>
                    <label className='label-content'>Tên bài tập</label>
                    <input defaultValue={baitap?.name} className='form-control' name="namebt"/>
                    <label className='label-content'>Ngày hết hạn</label>
                    <input defaultValue={baitap?.dueDate} className='form-control' name="duadate" type='date' />
                    <label className='label-content'>Giờ hết hạn</label>
                    <input defaultValue={baitap?.duaTime} className='form-control' name="duatime" type="time" />
                    <label className='label-content'>Ngôn ngữ</label>
                    <select className='form-control' name="language">
                        <option selected={baitap?.language == 'JAVA'} value={'JAVA'}>JAVA</option>
                        <option selected={baitap?.language == 'C'} value={'C'}>C</option>
                        <option selected={baitap?.language == 'CPP'} value={'CPP'}>CPP</option>
                    </select>
                    <label className='label-content'>Chọn file(nếu có)</label>
                    <input className='form-control' id="chonfile" type="file" /><br/>
                    <div id="loading">
                        <div class="bar1 bar"></div>
                    </div><br/>
                </div>
                <div className='col-sm-7'>
                    <label class="label-content">Nội dung thực hiện</label>
                    <Editor name='editor' tinymceScriptSrc={'https://cdn.tiny.cloud/1/1917njslxco0qbbug5ekgcd7krerg51fc9mf4em3slufjgw1/tinymce/6/tinymce.min.js'}
                            onInit={(evt, editor) => editorRef.current = editor} 
                            initialValue={baitap==null?'':baitap.content}
                            onEditorChange={handleEditorChange}/>
                </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button form='formadd' className="btn btn-primary">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddBaiTap;
