import logo from '../../assest/images/logo.png';
import userimg from '../../assest/images/user.webp';
import { useState, useEffect } from 'react'
import React, { createContext, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getMethod, postMethod, urlGlobal } from '../../services/request';
import { toast } from 'react-toastify';

export const HeaderContext = createContext();


function DefaultLayout ({children}){
    const location = useLocation();
    const isActive = (pathname) => {
        for(var i=0; i<pathname.length; i++){
           if(location.pathname === pathname[i]){
               return 'text-teacher-left active-text-left';
           }
        }
        return 'text-teacher-left';
    };
    
    const [user, setUser] = useState(null);
    const [isCssLoaded, setCssLoaded] = useState(false);
    const [client, setClient] = useState(null);

    useEffect(()=>{
        import('../teacher-student/style.css').then(() => setCssLoaded(true));
        const getUser= async() =>{
            var response = await postMethod('/api/user/all/user-logged');
            var result = await response.json();
            setUser(result)
        };
        getUser();


        var userlc = localStorage.getItem("user")
        var email = JSON.parse(userlc).email
        var uls = urlGlobal();
        const sock = new SockJS(uls+'/notification-admin');
        const stompClient = new Client({
        webSocketFactory: () => sock,
        onConnect: () => {
            console.log("WebSocket connected successfully!");
            stompClient.subscribe('/users/queue/notification', (msg) => {
                var title = msg.headers.title
                var content = msg.headers.content
                var link = msg.headers.link
                toast.info(content, {
                    autoClose: false,
                });
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
    if (!isCssLoaded) {
        return <></>
    }

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.replace('/login')
    }
    return(
        <div class="row">
        <div class="col-12 head-page-teacher">
            <div class="row">
                <div class="col-1">
                    <a class="logo-teacher-left" href=""><img src={logo} class="img-head-logo"/></a>
                </div>
                <div class="col-2"></div>
                <div class="col-5">
                    <div class="div-search-head">
                        <i class="fa fa-search"></i>
                        <input placeholder="Tìm kiếm môn học"/>
                    </div>
                </div>
                <div class="col-4">
                    <div class="user-logged-head-teacher">
                        <div class="in-user-logged">
                            <li class="nav-item dropdown drop-user-nav">
                                <a class="nav-link dropdown-toggle toggle-head" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={user?.avatar == null?userimg:user.avatar} class="avatar-head"/> 
                                    <span>Xin chào: {user?.fullname}</span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Tài khoản</a></li>
                                    <li><a class="dropdown-item" href="#">Đổi mật khẩu</a></li>
                                    <li><a class="dropdown-item" onClick={logout} href="#">Đăng xuất</a></li>
                                </ul>
                            </li>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-1 nav-left-teacher">
            <a className={isActive(["/teacher/blog","/teacher/blog-detail"])} href="/teacher/blog"><i class="fa fa-bell"></i><br/><span>Thông báo</span></a>
            <a className={isActive(["/teacher/subject","/teacher/subject-detail"])} href="/teacher/subject"><i class="fa fa-book"></i><br/><span>Môn học</span></a>
            <a className={isActive(["/teacher/chat"])} href="/teacher/chat"><i class="fa fa-comment"></i><br/><span>Tin nhắn</span></a>
            <a className={isActive(["/teacher/baitap"])} href=""><i class="fa fa-file"></i><br/><span>Bài tập</span></a>
            <a className={isActive(["/teacher/account"])} href="/teacher/account"><i class="fa fa-user"></i><br/><span>Tài khoản</span></a>
            <a class="text-teacher-left" href="#" onClick={logout}><i class="fa fa-sign-out"></i><br/><span>Đăng xuất</span></a>
        </div>
        <div class="col-11">
            <div class="content-page-teacher">
                {children}
            </div>
        </div>
    </div>
    );

    
}

export default DefaultLayout;