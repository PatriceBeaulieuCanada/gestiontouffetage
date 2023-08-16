import {SidebarComponent,SidebarType} from '@syncfusion/ej2-react-navigations';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {useRef} from 'react';
import Main from './Views/Main';
import ObjectifView from './Views/ObjectifView';
import StandardView from './Views/StandardView';
import CommentView from './Views/CommentView';
import TSAView from './Views/TSAView';
import OperatorsView from './Views/OperatorsView';
import './App.css';

export default function App() {

  const dockBar:any=useRef() ;
    let type: SidebarType = "Auto";
    const toggleClickMenu=(event:any)=>{
     //console.log(event)
     dockBar.current.toggle()         
    }
      const toggleClickPrincipale=()=>{
        window.location.pathname = "/"
      }

      const toggleClickObjectif=()=>{
        window.location.pathname = "/objectifview"    
      }
      
      const toggleClickTSA=()=>{
        window.location.pathname = "/tsaview"    
      }

      const toggleClickComment=()=>{
        window.location.pathname = "/commentview"    
      }
      
      const toggleClickStandard=()=>{
        window.location.pathname = "/standardview"    
      }

      const toggleClickOperator=()=>{
        window.location.pathname = "/operatorsview"
      }

  return (
    <div className='app'>
      <SidebarComponent id="dockSidebar" ref={dockBar} enableDock={true} dockSize="60px" width="220px" position='Left' type={type}>
                         <div className="dock">
                            <ul>
                                <li className="sidebar-item" id="toggle" onClick={toggleClickMenu}>
                                    <span className="e-icons expand"/>
                                    <span className="e-text" title="menu">Menu</span>
                                </li>
                                <li className="sidebar-item" onClick={toggleClickPrincipale}>
                                    <span className="e-icons product"/>
                                    <span className="e-text" title="principale">Principale</span>
                                </li>
                                <li className="sidebar-item" onClick={toggleClickObjectif}>
                                    <span className="e-icons info"/>
                                    <span className="e-text" title="info">Objectif</span>
                                </li>
                                <li className="sidebar-item" onClick={toggleClickTSA}>
                                    <span className="e-icons oee"/>
                                    <span className="e-text" title="info">TSA</span>
                                </li>
                                <li className="sidebar-item" onClick={toggleClickStandard}>
                                    <span className="e-icons standard"/>
                                    <span className="e-text" title="standard">Standard</span>
                                </li>
                                <li className="sidebar-item" onClick={toggleClickOperator}>
                                    <span className="e-icons operators"/>
                                    <span className="e-text" title="operator">Opérateurs</span>
                                </li>                                       
                            </ul>
                        </div>
                    </SidebarComponent>
        
        <Router>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/objectifview" element={<ObjectifView/>}/>
            <Route path="/standardview" element={<StandardView/>}/>
            <Route path="/tsaview" element={<TSAView/>}/>
            <Route path="/commentview" element={<CommentView/>}/>
            <Route path="/operatorsview" element={<OperatorsView/>}/>
          </Routes>      
        </Router>                    
    </div>
  );
}


