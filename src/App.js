import React, { useEffect, useState } from 'react';
import './style/css/index.css';


import jobsRepositories from '../src/repositories/jobs';

class ListJobRow extends React.Component {
  render (){
    const jobList = this.props.jobList;
    const logo = jobList.logo;
    console.log("logo: " + logo)
    return (
      <tr className="jobRow">
        <tr className="logo">
            <div>
                <img src={logo} alt="Logo" width="55" height="55" />
            </div>
        </tr>
        <tr className="company">
                  <td className="name">{jobList.company}</td>
                  <td className="status"> {/* Verificar se new ou featured é true */}
                    <span className="new">New!</span>
                    <span className="featured">Featured</span>
                    
                  </td>
                  
                </tr>
                <tr className="position">{jobList.position}</tr>
                <tr className="infos">
                  <td>{jobList.postedAt}</td>
                  <div></div>
                  <td>{jobList.contract}</td>
                  <div></div>
                  <td>{jobList.location}</td>
                </tr>
                <tr className="line"><span></span></tr>
                <tr className="filters"> {/* deve listar todas as linguagens, role, level e tools */}
                  <td>Languages</td>
                  <td>Tools</td>
                  <td>Role</td>
                  <td>Level</td>
                </tr>
      </tr>
    );
  }
}

class JobListTable extends React.Component {
  render(){
    const rows = [];
    this.props.jobList.forEach((jobList) => {
      rows.push(
        <ListJobRow 
          jobList = {jobList}
          key={jobList.id}
        />
      )
    });

    return (
      <table>
        <tbody>
          {rows}
        </tbody>
    </table>
    )
  }
}

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
      jobsRepositories.getAll().then((jobList) => {
          setJobs(jobList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <body className="App-body">
        <div className="filterTable">
          <JobListTable 
              jobList = {jobs}
          />

        </div>

      </body>
    </div>
  );
}

export default App;
