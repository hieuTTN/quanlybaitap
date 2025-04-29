import { useState, useEffect } from 'react'
import { Parser } from "html-to-react";
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import {getMethod, urlGlobal, postMethod, uploadSingleFileFormData} from '../../services/request'
import Swal from 'sweetalert2'
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';


function ChatRoom({ subject }){
    const editorRef = useRef(null);
    const [contentchat, setContentChat] = useState('');
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [client, setClient] = useState(null);
    const [itemUser, setItemUser] = useState([]);
    const [itemChat, setItemChat] = useState([]);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(()=>{

        var userlc = localStorage.getItem("user")
        var email = JSON.parse(userlc).email
        var url = urlGlobal();
        const sock = new SockJS(url+'/chat-room');
        const stompClient = new Client({
        webSocketFactory: () => sock,
        onConnect: () => {
            toast.success("Kết nối socket chat nhóm thành công!");
            
            stompClient.subscribe('/topic/room/'+subject.id, (msg) => {
                var result = JSON.parse(msg.body);
                console.log(result);
                
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
    };

    function append() {
        const newChatElement = document.createElement('p'); 
        newChatElement.className = "mychat";
        newChatElement.innerHTML = contentchat
  
        document.getElementById('listchat').appendChild(newChatElement);
        var scroll_to_bottom = document.getElementById('listchat');
        scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
        setContentChat('')
    }
  

    return(
        <div class="chatroomdiv">
            <div class="contentchatroom" id='listchat'>

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
