import userDefault from '../../assest/images/avatar.png'
import {getMethod} from '../../services/request'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';


var size = 10
var url = '';
function TinTucDetailStudent(){
    const [blog, setBlog] = useState(null);
    useEffect(()=>{
        const getBlog = async() =>{
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if(id != null){
                var response = await getMethod('/api/blog/public/findById?id='+id);
                var result = await response.json();
                setBlog(result)
            }
        };
        getBlog();
    }, []);


    return(
        <div class="container">
        <div class="headerbaiviet">
            <h1 id="tieudect">{blog?.title}</h1>
            <div class="nguoidangtin">
                <img src={blog?.user.avatar == null ?userDefault:blog?.user.avatar} class="ctuserdangtin"/>
                <div class="dangboi">
                    Được đăng bởi <span class="userdangbl" id="userdangbl">{blog?.user.fullname}</span><br/>
                    <span>Cập nhật lần cuối vào <span id="ngaydangblog">{blog?.createdDate}</span></span>
                </div>
            </div>
        </div>
        <div class="row noidungdsbv">
            <div class="col-sm-8">
                <p class="motabvdetail" id="motabvdetail">{blog?.description}</p>
                <div id="noidungbaiviet" dangerouslySetInnerHTML={{__html:blog?.content}}>
                    
                </div>
            </div>
        </div>
    </div>
    );
}

export default TinTucDetailStudent;
