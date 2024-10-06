import {useNavigate} from "react-router-dom";
import { FileRenderContext } from '../context/FileRenderContext';
import axios from 'axios';

// Application Specific Imports

import '../stylesheet/SidePanel.css';
import {useContext, useRef, useState} from "react";

function SidePanel(props) {
    let navigate = useNavigate();
    const fileInputCSV = useRef();
    const fileInputImage = useRef();

    const { setFiles } = useContext(FileRenderContext);

    const FILE_TYPE = {
        IMG: 'IMG',
        DOC: 'DOC',
    }

    const handleCSVClick = () => {
        navigate("/docUpload");
        fileInputCSV.current.click();
    };

    const handleImageClick = () => {
        navigate("/imgUpload");
        fileInputImage.current.click();
    };

    const handleCSVFileUpload = async (event) => {
        if (event.target.files.length > 0) {
            console.log(event.target.files[0].name);
            const selectedFile = event.target.files[0];
            await upload(FILE_TYPE.DOC, selectedFile);
        }
    }

    const handleImgFileUpload = async (event) => {
        if (event.target.files.length > 0) {
            console.log(event.target.files[0].name);
            const selectedFile = event.target.files[0];
            await upload(FILE_TYPE.IMG, selectedFile);
        }
    }

    async function upload (fileType, file) {
        let url = (fileType === FILE_TYPE.IMG)
            ? 'http://localhost:3000/uploadImg'
            : 'http://localhost:3000/uploadDoc';

        const formData = new FormData();

        formData.append('myFile', file);

        // Make the POST request to upload the file
        await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log('File uploaded successfully');
                setFiles(response.data.files);
            })
            .catch(error => {
                console.error('Error uploading file', error);
            }).finally(() => {

            });

        //trigger rerender
    }

    return (
        <div id="side-bar">
            <input
                type="file"
                style={{display: 'none'}}
                ref={fileInputCSV}
                onClick={()=> navigate("/docUpload")}
                onChange={handleCSVFileUpload}
            />
            <button className={"view-btn"} onClick={handleCSVClick}>CSV 파일 등록</button>
            <input
                type="file"
                style={{display: 'none'}}
                ref={fileInputImage}
                onClick={()=> navigate("/imgUpload")}
                onChange={handleImgFileUpload}
            />
            <button className={"view-btn"} onClick={handleImageClick}>이미지 등록</button>
        </div>

    );
}

export default SidePanel;