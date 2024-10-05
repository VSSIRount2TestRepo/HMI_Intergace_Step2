import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import { FilesProvider } from '../context/FileRenderContext';
import DocFileViewPage from "./DocFileViewPage";
import ImgFileViewPage from "./ImgFileViewPage";
import NavBar from "./NavBar";

import '../stylesheet/App.css';
import SidePanel from "./SidePanel";
import {useState} from "react";

function App() {

  const [renderStatus, setRenderStatus] = useState(false);
  const triggerRender = () => {
    setRenderStatus(prevStatus => !prevStatus); // Invert the current status
  };
  return (
    <div className="App">
      <header className="App-header">
        <FilesProvider>
        <Router>
          <NavBar/>
          <div className={"wrapper-panel"}>
            <SidePanel
                triggerRender={triggerRender}
            />
            <Routes>
              <Route path="*" element={ <DocFileViewPage
                  renderStatus={renderStatus} triggerRender={triggerRender}
              /> } />
              <Route path="/docUpload" element={ <DocFileViewPage
                  renderStatus={renderStatus} triggerRender={triggerRender}
              /> } />
              <Route path="/imgUpload" element={ <ImgFileViewPage
                  renderStatus={renderStatus} triggerRender={triggerRender}
              /> }/>
            </Routes>
          </div>
        </Router>
        </FilesProvider>
      </header>
    </div>
  );
}

export default App;
