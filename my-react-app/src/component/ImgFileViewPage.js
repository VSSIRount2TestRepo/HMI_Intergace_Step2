import { FileRenderContext } from '../context/FileRenderContext';
import '../stylesheet/pages.css';
import axios from 'axios';
import {useContext, useEffect, useState} from "react";

function ImgFileViewPage() {
    const { files } = useContext(FileRenderContext);

    let [fileList, setFiles] = useState([]);

    useEffect(() => {
        readFiles().then(response => {
            console.log(response);
        });
    }, [files]);

    //utilize use effect
    async function readFiles() {
        //Ask API for file list - GET files
        try {
            let response = await axios.get('http://localhost:3000/getImgFiles');
            console.log(response.data);
            setFiles(response.data); // Update the state with the data retrieved
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="main-panel">
            {fileList.map((file, index) => (
                <div className="file-name-component" key={index}>
                    {file}
                </div>
            ))}
        </div>
    );
}

export default ImgFileViewPage;