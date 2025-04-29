import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, urlGlobal, postMethod, uploadSingleFileFormData} from '../../services/request'
import {formatTimestamp} from '../../services/dateservice'
import Swal from 'sweetalert2'
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


function ChatRoom({ subject }){
    const editorRef = useRef(null);
    const [contentchat, setContentChat] = useState('');
    const [message, setMessage] = useState([]);
    const [client, setClient] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const getUser= async() =>{
            var response = await postMethod('/api/user/all/user-logged');
            var result = await response.json();
            setUser(result)
        };
        getUser();
        getMessage();
        const listchat = document.getElementById('listchat');
        if (listchat) {
            requestAnimationFrame(() => {
                listchat.scrollTop = listchat.scrollHeight;
            });
        }
        var userlc = localStorage.getItem("user")
        var email = JSON.parse(userlc).email
        var url = urlGlobal();
        const sock = new SockJS(url+'/chat-room');
        const stompClient = new Client({
        webSocketFactory: () => sock,
        onConnect: () => {
            stompClient.subscribe('/topic/room/'+subject.id, (msg) => {
                var result = JSON.parse(msg.body);
                // if(result.sender.id != user.id){
                    appendMess(result)
                // }
            });
        },
        connectHeaders: {
            username: email 
        }
        });
        stompClient.activate();
        setClient(stompClient);
        return () => {
            stompClient.deactivate();
        };    
    }, []);

    const getMessage= async() =>{
        var response = await getMethod(`/api/chat-room/all/chat-by-subject-page?size=10&subjectId=${subject.id}&page=${currentPage}`);
        var result = await response.json();
        setMessage(result.content)
        setTotalPage(result.totalPages)
        setCurrentPage(currentPage + 1);
    };

    function handleEditorChange(content, editor) {
        setContentChat(content);
    }

    const sendMessage = () => {
        if(contentchat == ''){
            toast.error("Hãy nhập nội dung");
            return;
        }
        client.publish({
            destination: '/app/room/'+subject.id,
            body: contentchat,
        });
        append();
        if (editorRef.current) {
            editorRef.current.setContent('');
        }
    };

    function append() {
        var scroll_to_bottom = document.getElementById('listchat');
        scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
        setContentChat('')
    }

    function appendMess(mess){
        const listchat = document.getElementById('listchat');
        const isAtBottom = listchat.scrollHeight - listchat.scrollTop === listchat.clientHeight;     
        // if (isAtBottom == false && mess.sender.id != user.id) {
        //     toast.info("Có tin nhắn mới")
        // }
        setMessage(prev => [...prev, mess]);
    }
    
    const handleScroll = (e) => {
        const listchat = e.target;
        const isAtTop = listchat.scrollTop === 0; // Kiểm tra nếu cuộn ở trên cùng
        if (isAtTop && currentPage < totalPage - 1) {
            loadMoreMess();
        }
    };

    const loadMoreMess= async() =>{
        var response = await getMethod(`/api/chat-room/all/chat-by-subject-page?size=10&subjectId=${subject.id}&page=${currentPage}`);
        var result = await response.json();
        setMessage((prevMessages) => [...result.content, ...prevMessages]);
        setTotalPage(result.totalPages)
        setCurrentPage(currentPage + 1);
    };

    return(
        <div class="chatroomdiv">
            <div onScroll={handleScroll} class="contentchatroom" id='listchat'>
                {message.map((item, index)=>{
                    if(item.sender.id == user.id){
                        return <div class="chat-message my-message">
                            <div>
                                <div class="chat-bubble">
                                    <span class="timestamp">{formatTimestamp(item.createdDate)}</span><span class="name"> Bạn - {item.id}</span>
                                    <div dangerouslySetInnerHTML={{__html:item.content}} className='contentmymess'></div>
                                </div>
                            </div><div class="avatar"><img src={item.sender.avatar} class="avatarmess"/></div>
                        </div>
                    }
                    else{
                        return <div class="chat-message other-message">
                            <div class="avatar"><img src={item.sender.avatar} class="avatarmess"/></div>
                            <div><div class="chat-bubble">
                                <span class="name">{item.sender.fullname}</span> <span class="timestamp">{formatTimestamp(item.createdDate)}</span>
                                <div dangerouslySetInnerHTML={{__html:item.content}}></div>
                            </div></div>
                        </div>
                    }
                })}

            </div>
            <div class="chatboxroom">
                 <Editor name='editor' tinymceScriptSrc={'https://cdn.tiny.cloud/1/xqhz0tu1vx2a47ob4qdhwpyz39c09mrs2mfilfeahlm42vwa/tinymce/5/tinymce.min.js'}
                    onInit={(evt, editor) => editorRef.current = editor} 
                    onEditorChange={handleEditorChange}
                    init={{
                        height: 160, // Chiều cao tính theo px
                        menubar: false,
                        automatic_uploads: true,
                        images_upload_handler: async (blobInfo, success, failure) => {
                          try {
                            const formData = new FormData();
                            formData.append('file', blobInfo.blob(), blobInfo.filename());
                            const data = await uploadSingleFileFormData(formData);
                            console.log(data);
                            
                            success(data);
                          } catch (error) {
                            failure('Upload failed: ' + error.message);
                            toast.error('Upload failed: ' + error.message);
                          }
                        },
                        plugins: [
                          'advlist autolink lists link image charmap preview anchor',
                          'searchreplace visualblocks code fullscreen','image paste', 'image',
                          'insertdatetime media table code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                                 'bold italic backcolor | alignleft aligncenter ' +
                                 'alignright alignjustify | bullist numlist outdent indent | image | ' +
                                 'removeformat | help'
                      }}
                />
                <button onClick={()=>sendMessage()} className="btn btn-primary"><i class="fa fa-paper-plane"></i> Gửi nội dung</button>
            </div>
        </div>
    );
}

export default ChatRoom;
