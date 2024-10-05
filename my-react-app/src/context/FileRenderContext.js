import React, { createContext, useContext, useState } from 'react';

// Create Context
export const FileRenderContext = createContext();

// Create Context Provider
export const FilesProvider = ({ children }) => {
    const [files, setFiles] = useState([]); // Initialize with an empty array or existing files.

    return (
        <FileRenderContext.Provider value={{ files, setFiles }}>
            {children}
        </FileRenderContext.Provider>
    );
}