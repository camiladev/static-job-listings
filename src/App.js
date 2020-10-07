import React, { useEffect, useState } from 'react';
import './style/css/index.css';
import jobsRepositories from '../src/repositories/jobs';


class Requisites extends React.Component {
  constructor(props){
    super(props);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  handleFilterClick(value){
      this.props.onClickFilter(value);
  }

  render(){
    const toolsList = this.props.toolsList;    
    const tools = [];
    var filterSkills = [];    

    if(toolsList.length !== 0){
      
      filterSkills = this.props.langList + ',' + this.props.toolsList +
                         ',' + this.props.role + ',' + this.props.level;
      filterSkills = filterSkills.split(',');

      filterSkills.forEach((filterSkills) => {
        tools.push(          
            <div 
              className="label-skills"
              onClick={()=>this.handleFilterClick(filterSkills)}
              >{filterSkills}</div>          
        );
      });
    }else {

      filterSkills = this.props.langList + ',' + this.props.role + ',' + this.props.level;
      filterSkills = filterSkills.split(',');

      filterSkills.forEach((filterSkills) => {
        tools.push(          
            <div 
              className="label-skills"
              onClick={()=>this.handleFilterClick(filterSkills)}
              >{filterSkills}</div>          
        );
      });
    };

    return(
      <> 
        {tools}
      </>
      
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
    const jobList = this.props.jList;;
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
      <li key={jobList.id}  className={featBorder}>
          <div key={jobList.company} className="inside-job">
              <div className="logo-job">
                <img src={logo} alt='Logo Company' />
              </div>
              <div>
                <div className="content-job">
                    <h1>{jobList.company}</h1>
                    <span className={newsClass}>{news}</span>
                    <span className={featClass}>{feat}</span>
                </div>
                
                <div className="jobOffer-description">
                  <h2>{jobList.position}</h2>
                  <ul className="job-info">
                    <li key={jobList.postedAt} className="li-default">{jobList.postedAt}</li>
                    <li key={jobList.contract}>{jobList.contract}</li>
                    <li key={jobList.location}>{jobList.location}</li>
                  </ul>
                </div>

              </div>

              <div className="jobOffer-requisites">
                  <Requisites 
                      key={jobList.level}
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
    var id = '';    
    jobList.forEach((jList) => {      
      id = jList.company;
      rows.push(
        <ListJobRow 
          key={jList.id}
          jList = {jList}
          handleFilter={this.handleFilter}
        />
      )
      
    });

    return (
      <div className="results-job">
        <ul key={id} className="job-list">
            {rows}
        </ul>
    </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterClick = this.handleFilterClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleFilterClick(e) {   
    console.log('Mudou', e);
    this.props.onFilterClick(e);
  }

  handleClear(){
    this.props.onClickClear();
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
          <div             
            className='remove' 
            onClick={()=>this.handleFilterClick(result)}>
            <span></span></div>
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
        <div 
          className='clear' 
          onClick={this.handleClear}>
          {clear}
        </div>
      </div>
    );
  }
}

function App() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);
  const [jobsBeginn, setJobsBeginn] = useState([]);

  useEffect(() => {
      jobsRepositories.getAll().then((jobList) => {
          setJobs(jobList);
          setJobsBeginn(jobList);          
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleFilter(value){
    var control = false;
    for(var v of filter){
        if(value === v){
          control = true;
        }
    }
    if(control === false){
      setFilter([
        ...filter,
        value,
      ]);
      filterListJobs(value);
    }else{
      alert("Opção já aplicada!");
    }
  };

  function deletFilter(remove){
      
      let list = filter.slice();
      let index = list.indexOf(remove);
      let newList = list.splice(index, 1);
        console.log('Removido: ', newList);
      updateListJobs(jobsBeginn);
      setFilter(list);
      filterListJobs(list);
  }

  function clearFilter(){
    updateListJobs(jobsBeginn);
    setFilter([]);
  }

  function updateListJobs(newList){
    setJobs(newList);
  }

  function filterListJobs(valueFilter){    
    var skills = [];
    var result = [];
    var filterArray = Array.isArray(valueFilter);
    var listJobs = [];
    var newResult = [];
    
    
    if(filterArray){
      listJobs = jobsBeginn;
      
      for(var listFilter of valueFilter){
        
        newResult = [];
        for(var line in listJobs){
          var stringSkill = listJobs[line].languages + ',' + listJobs[line].tools+ ',' + listJobs[line].role + ',' + listJobs[line].level;
          skills = stringSkill.split(',');
          
          for(var lineSkills of skills){
            if(lineSkills === listFilter){  
              newResult.push(listJobs[line]);
            }
    
          }
        }
        listJobs = newResult;
      }
      updateListJobs(listJobs);
    }else{
      listJobs = jobs;

      for(var l in listJobs){
        var sSkill = listJobs[l].languages + ',' + listJobs[l].tools+ ',' + listJobs[l].role + ',' + listJobs[l].level;
        skills = sSkill.split(',');
        
        for(var lSkills of skills){
          if(lSkills === valueFilter){  
            result.push(listJobs[l]);
          }  
        }
      }
      updateListJobs(result);
    }      

  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-body">
        <div className="filterTable">
          {jobs.length === 0 && (<div>Loading...</div>)}
          <SearchBar
            key={filter.length}
            filter = {filter}
            onFilterClick = {deletFilter}
            onClickClear = {clearFilter}
          />
          <JobListTable 
              key={jobs.id}
              jobList = {jobs}
              filter = {filter}
              handleFilterText = {handleFilter}
          />

        </div>

      </div>
    </div>
  );
}

export default App;
