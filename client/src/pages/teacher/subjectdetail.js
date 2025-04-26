import userDefault from '../../assest/images/avatar.png'
import {getMethod, postMethod, postMethodPayload, uploadSingleFile} from '../../services/request'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import {toast } from 'react-toastify';
import Swal from 'sweetalert2'

function SubjectDetailTeacher(){
   const [subject, setSubject] = useState(null);
   const [value, setValue] = React.useState(1);
    useEffect(()=>{
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        const getSubject= async() =>{
            const response = await getMethod('/api/subject/all/findById?id='+id);
            var result = await response.json();
            console.log(result);
            
            setSubject(result)
        };
        getSubject();
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

    return(
        <div className='container-fluid'>
        <div className='container-web'>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight:'90vh', width:'100%' }} >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', width: 200 }}>
                <Typography component="div" variant="body2" sx={{ whiteSpace: 'normal', wordWrap: 'break-word', width: '100%' }}>
                    <img src={subject?.image} className='imgsubjectdetail'/>
                    <span className='namesubjectdetail'>{subject?.code} - {subject?.name}</span>
                </Typography>
                <Tab label="Thông tin chung" {...a11yProps(0)} />
                <Tab label="Sinh viên" {...a11yProps(1)} />
                <Tab label="Bài tập" {...a11yProps(2)} />
                <Tab label="Chờ duyệt" {...a11yProps(3)} />
                <Tab label="Files" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={1} style={{width:"100%"}}>
                heheh
            </TabPanel>
            <TabPanel value={value} index={2} style={{width:"100%"}}>
            </TabPanel>
            <TabPanel value={value} index={3} style={{width:"100%"}}>
            </TabPanel>
            <TabPanel value={value} index={4} style={{width:"100%"}}>
            </TabPanel>
            <TabPanel value={value} index={5} style={{width:"100%"}}>
            </TabPanel>
        </Box>
        </div>
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
export default SubjectDetailTeacher;
