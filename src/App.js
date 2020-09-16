import React, { useEffect, useState } from 'react';
import './style/css/index.css';
import jobsRepositories from '../src/repositories/jobs';


class Requisites extends React.Component {
  render(){
    const langList = this.props.langList;
    const toolsList = this.props.toolsList;
    const role = this.props.role;
    const level = this.props.level;

    const languages = [];
    const tools = [];

    langList.forEach((langList) => {
        languages.push(          
            <span className="label-skills">{langList}</span>          
        );
    });

    if(toolsList != ""){
      toolsList.forEach((toolsList) => {
        tools.push(          
            <span className="label-skills">{toolsList}</span>          
        );
      });
    };

    return(
      <>
        <span className="label-skills">{role}</span> 
        <span className="label-skills">{level}</span>       
        {languages}
        {tools}
      </>
      
    );
  }
}

class ListJobRow extends React.Component {
  render (){
    const jobList = this.props.jobList;
    const logo = require(`${jobList.logo}`);

    const resultsNews = jobList.new;
    var news = "";
    var newsClass = "";

    const resultsFeat = jobList.featured;
    var feat = "";
    var featClass = "";
    var featBorder = "";

    if(resultsNews){
        news = "NEW!";
        newsClass = "jobOffer-new";
    }

    if(resultsFeat){
      feat = "FEATURED";
      featClass = "jobOffer-featured";
      featBorder = "job-border-left job-row";
    }else{
      featBorder = "job-row";
    }

    return (
      <li className={featBorder}>
          <div className="inside-job">
              <div className="logo-job">
                <img src={logo} />
              </div>
              <div className="content-job">
                  <h1>{jobList.company}</h1>
                  <span className={newsClass}>{news}</span>
                  <span className={featClass}>{feat}</span>
              </div>
              
              <div className="jobOffer-description">
                <h2>{jobList.position}</h2>
                <ul className="job-info">
                  <li className="li-default">{jobList.postedAt}</li>
                  <li>{jobList.contract}</li>
                  <li>{jobList.location}</li>
                </ul>
              </div>

              <div className="jobOffer-requisites">
                  <Requisites 
                      langList = {jobList.languages}
                      toolsList = {jobList.tools}
                      role = {jobList.role}
                      level = {jobList.level}
                  />
              </div>
          </div>
      </li>
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
      <div className="results-job">
        <ul className="job-list">
            {rows}
        </ul>
    </div>
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
