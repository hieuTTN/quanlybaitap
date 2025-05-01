import userDefault from '../../assest/images/avatar.png'
import {getMethod} from '../../services/request'
import { useState, useEffect } from 'react'
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

function ViewSource(){
    const [submission, setSubmission] = useState(null);
    const [submissionFile, setSubmissionFile] = useState(null);
    const [treeData, setTreeData] = useState([]);
    const [fileMap, setFileMap] = useState({});
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
  

    useEffect(()=>{
        var uls = new URL(document.URL)
        var submission = uls.searchParams.get("submission");
        var submissionfile = uls.searchParams.get("submissionfile");
        const getSubmission= async() =>{
            var response = await getMethod('/api/submission/teacher/find-by-id?id='+submission);
            var result = await response.json();
            setSubmission(result)
            for(var i=0; i< result.submissionFiles.length; i++){
                if(result.submissionFiles[i].id == submissionfile){
                    setSubmissionFile(result.submissionFiles[i]);
                }
            }
            const file = result.submissionFiles.find(f => f.id == submissionfile);
            setSubmissionFile(file);
            if (file) {
              loadAndExtractZip(file.link);
            }
        };
        getSubmission();
    }, []);


    const loadAndExtractZip = async (url) => {
        JSZipUtils.getBinaryContent(url, async (err, data) => {
          if (err) {
            console.error('Failed to load ZIP:', err);
            return;
          }
          const zip = await JSZip.loadAsync(data);
          const fileMapTemp = {};
          const tree = [];
    
          zip.forEach((relativePath, file) => {
            const parts = relativePath.split('/');
            insertToTree(tree, parts, file, fileMapTemp);
          });
    
          setTreeData(tree);
          setFileMap(fileMapTemp);
        });
    };

    const insertToTree = (nodes, parts, file, fileMapTemp, parentKey = '') => {
        const name = parts[0];
        const key = parentKey ? `${parentKey}/${name}` : name;
      
        let node = nodes.find(n => n.key === key);
      
        if (!node) {
          node = {
            title: name,
            key: key,
            children: [],
            isLeaf: parts.length === 1 && !file.dir,
          };
          nodes.push(node);
      
          // 🔄 Sắp xếp lại sau khi thêm
          nodes.sort((a, b) => {
            // Thư mục lên trước
            if ((a.isLeaf ? 1 : 0) !== (b.isLeaf ? 1 : 0)) {
              return (a.isLeaf ? 1 : 0) - (b.isLeaf ? 1 : 0);
            }
            // Cùng loại: so sánh theo tên
            return a.title.localeCompare(b.title);
          });
        }
      
        if (parts.length > 1) {
          insertToTree(node.children, parts.slice(1), file, fileMapTemp, key);
        } else if (!file.dir) {
          fileMapTemp[key] = file;
        }
    };
      
    
    const onSelect = async (selectedKeys) => {
    const key = selectedKeys[0];
    if (fileMap[key]) {
        const file = fileMap[key];
        const content = await file.async('string');
        setSelectedFileContent(content);
        setSelectedFileName(key);
    }
    };
    

    return(
        <div class='row'>
            <div className='col-sm-4'>
                <h5><b>Cấu trúc thư mục:</b></h5>
                <Tree treeData={treeData} onSelect={onSelect} defaultExpandAll/>
            </div>
            <div className='col-sm-8'>
                <h5><b>{selectedFileName}</b></h5>
                <pre>
                    <code dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(selectedFileContent).value }}/>
                </pre>
            </div>
        </div>
    );
}

export default ViewSource;
