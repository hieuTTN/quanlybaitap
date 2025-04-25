import userDefault from '../../assest/images/avatar.png'
import {postMethod, postMethodPayload, uploadSingleFile} from '../../services/request'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import {toast } from 'react-toastify';
import Swal from 'sweetalert2'

async function handleChangePass(event) {
    event.preventDefault();
    if(event.target.elements.newpass.value != event.target.elements.renewpass.value){
        toast.error("Mật khẩu xác nhận không trùng khớp"); return;
    }
    const payload = {
        oldPass: event.target.elements.oldpass.value,
        newPass: event.target.elements.newpass.value
    };
    const res = await postMethodPayload('/api/user/all/change-password', payload);
    
    if (res.status == 417) {
        var result = await res.json()
        if (result.errorCode == 300) {
            Swal.fire({
                title: "Thông báo",
                text: "Tài khoản chưa được kích hoạt, đi tới kích hoạt tài khoản!",
                preConfirm: () => {
                    window.location.href = 'confirm?email=' + event.target.elements.username.value
                }
            });
        } else {
            toast.warning(result.defaultMessage);
        }
    }
    if(res.status < 300){
        toast.success("Đã đổi mật khẩu thành công! Hãy đăng nhập lại")
    }
};


var imageUser = '';
async function updateInfor(event) {
    event.preventDefault();
    document.getElementById("loading").style.display = 'block'
    var img = await uploadSingleFile(document.getElementById("chonfile"))
    if(img != null){
        imageUser = img;
    }

    const payload = {
        fullname: event.target.elements.fullname.value,
        phone: event.target.elements.phone.value,
        avatar: imageUser,
    };
    
    const res = await postMethodPayload('/api/user/all/update-infor', payload);
    if(res.status < 300){
        toast.success("Cập nhật thông tin tài khoản thành công")
    }
    else{
        toast.error("Cập nhật thông tin thất bại")
    }
    document.getElementById("loading").style.display = 'none'
};

function AccountStudent(){
   const [user, setUser] = useState(null);
   const [value, setValue] = React.useState(0);
    useEffect(()=>{
        const getUser= async() =>{
            var response = await postMethod('/api/user/all/user-logged');
            var result = await response.json();
            setUser(result)
            imageUser = result.avatar
        };
        getUser();
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    
    function preViewImage(){
        const [file] = document.getElementById("chonfile").files
        if (file) {
            document.getElementById("imagepreview").src = URL.createObjectURL(file)
        }
    }

    return(
        <div class='containers'>
            <Box >
            <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}>

                <Tab label="Thông tin" {...a11yProps(0)} />
                <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
                <Tab label="Thống kê" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0} style={{width:"100%"}}>
                <form onSubmit={updateInfor} method='post' className='row'>
                    <div className='col-sm-4'>
                        <label className='label-content'>Họ tên</label>
                        <input className='form-control' name="fullname" defaultValue={user?.fullname}/>
                        <label className='label-content'>Số điện thoại</label>
                        <input className='form-control' name="phone"  defaultValue={user?.phone}/>
                        <label className='label-content'>Email</label>
                        <input className='form-control' name="email" disabled={true} defaultValue={user?.email}/>
                        <label className='label-content'>Ảnh</label>
                        <input onChange={preViewImage} className='form-control' id='chonfile' type='file'/>
                        <br/>
                        <div id="loading">
                            <div class="bar1 bar"></div>
                        </div>
                        <br/>
                        <button className='btn btn-primary form-control'>Cập nhật</button>
                    </div> 
                    <div className='col-sm-2'>
                        <img id='imagepreview' src={user?.avatar} className='img-100'/>
                    </div>
                </form>
            </TabPanel>
            <TabPanel value={value} index={1} style={{width:"100%"}}>
            <div class="headeraccount">
                <span class="fontyel"></span><span class="smyl"> Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
            </div>
            <div class="col-sm-4">
                <form onSubmit={handleChangePass}>
                    <label class="label-content">Mật khẩu hiện tại *</label>
                    <input name="oldpass" type="password" class="form-control" required/>
                    <label class="label-content">Mật khẩu mới *</label>
                    <input name="newpass" type="password" class="form-control" required/>
                    <label class="label-content">Xác nhận mật khẩu mới *</label>
                    <input name="renewpass" type="password" class="form-control" required/>
                    <br/>
                    <button type="submit" class="btn btn-primary form-control">LƯU</button>
                </form>
            </div>
            </TabPanel>
            <TabPanel value={value} index={2} style={{width:"100%"}}>
            </TabPanel>
        </Box>
        </div>
    );
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.number.isRequired,
value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
export default AccountStudent;
