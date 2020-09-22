import React, { useEffect, useState } from 'react';
import './style/css/index.css';
import jobsRepositories from '../src/repositories/jobs';


class Requisites extends React.Component {
  constructor(props){
    super(props);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  handleFilterClick(value){
      this.props.onClickFilter(value.target.value);
  }

  render(){
    const langList = this.props.langList;
    const toolsList = this.props.toolsList;
    const role = this.props.role;
    const level = this.props.level;

    const languages = [];
    const tools = [];

    langList.forEach((langList) => {
        languages.push(          
            <button 
              className="label-skills"
              type="button"
              value={langList}
              onClick={this.handleFilterClick}>{langList}</button>          
        );
    });

    if(toolsList != ""){
      toolsList.forEach((toolsList) => {
        tools.push(          
            <button 
              className="label-skills"
              type="button"
              value={toolsList}
              onClick={this.handleFilterClick}
              >{toolsList}</button>          
        );
      });
    };

    return(
      <form>
        <button  
              className="label-skills"
              type="button"
              value={role}
              onClick={this.handleFilterClick}>{role}</button> 
        <button  
              className="label-skills"
              type="button"
              value={level}
              onClick={this.handleFilterClick}>{level}</button>       
        {languages}
        {tools}
      </form>
      
    );
  }
}


class ListJobRow extends React.Component {
  constructor(props){
    super(props);
    
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  onClickFilter(value){     
    this.props.handleFilter(value);
  }

  render (){
    const jobList = this.props.jobList;
    const id = jobList.id;
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
      <li  className={featBorder}>
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
                      onClickFilter = {this.onClickFilter}
                  />
              </div>
          </div>
      </li>
    );
  }
}

class JobListTable extends React.Component {
  constructor(props){
    super(props);    
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(value){
    this.props.handleFilterText(value);
    console.log('JobListTable: ', value);
  }

  render(){    
    const jobList = this.props.jobList;   
    var rows = [];    
   
    jobList.forEach((jobList) => {      
      rows.push(
        <ListJobRow 
          jobList = {jobList}
          key={jobList.id}
          handleFilter={this.handleFilter}
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

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(e) {
    this.props.onFilterTextChange(e.target.value);
    console.log('Mudou');
  }

  render(){
    const filter = this.props.filter;
    var rowsFilter = [];
    var classFilter = "";
    var clear = "";

    if(filter.length > 0){
      classFilter="list-filter"
      clear = 'Clear'
    }

    filter.forEach((result) => {
      rowsFilter.push(
        <li>
          <div className='label-filter'>{result}</div>
          <a href='' className='remove'><span>x</span></a>
        </li>
      );

    });

    return(
      <div className={classFilter}>
        <div>
          <ul>
            {rowsFilter}
          </ul>
        </div>
        <a href='#' className='clear'>
          {clear}
        </a>
      </div>
    );
  }
}

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
      jobsRepositories.getAll().then((jobList) => {
          setJobs(jobList);          
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleFilter(value){
      setFilter([
        ...filter,
        value,
      ]);
      filterListJobs(value);
  };

  function updateListJobs(newList){
    setJobs(newList);
  }

  function filterListJobs(valueFilter){    
    var skills = [];
    var result = [];
    var endFilter = valueFilter;  

    for(var line in jobs){
      var stringSkill = jobs[line].languages + ',' + jobs[line].tools+ ',' + jobs[line].role + ',' + jobs[line].level;
      skills = stringSkill.split(',');
      
      for(var lineSkills of skills){
        if(lineSkills === endFilter){  
          result.push(jobs[line]);
        }

      }
    }
    updateListJobs(result);
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <body className="App-body">
        <div className="filterTable">
          <SearchBar
            filter = {filter}
            onFilterTextChange={handleFilter}
          />
          <JobListTable 
              jobList = {jobs}
              filter = {filter}
              handleFilterText = {handleFilter}
          />

        </div>

      </body>
    </div>
  );
}

export default App;
