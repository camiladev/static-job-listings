import React from 'react';
import logo from './images/photosnap.svg';
import './style/css/index.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        
      </header>
      <body className="App-body">
        <div className="filterTable">
          <table>
            <tbody>
                <tr className="logo">
                  <img src={logo} alt="Logo" width="55" height="55" />
                </tr>
                <tr className="company">
                  <td className="name">Photosnap</td>
                  <td className="status">
                    <span className="new">New!</span>
                    <span className="featured">Featured</span>
                    
                  </td>
                  
                </tr>
                <tr className="position">Senior Frontend Developer</tr>
                <tr className="infos">
                  <td>1d ago</td>
                  <div></div>
                  <td>Full Time</td>
                  <div></div>
                  <td>USA Only</td>
                </tr>
                <tr className="line"><span></span></tr>
                <tr className="filters">
                  <td>Languages</td>
                  <td>Tools</td>
                  <td>Role</td>
                  <td>Level</td>
                </tr>
            </tbody>
          </table>

        </div>

      </body>
    </div>
  );
}

export default App;
