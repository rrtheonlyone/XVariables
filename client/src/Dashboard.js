import React, { Component } from 'react';  
import tableau from 'tableau-api';  
  
  
class Dashboard extends Component {  
  componentDidMount() {  
    this.initViz()  
  }  
  
  
  initViz() {  
    const vizUrl = 'https://public.tableau.com/views/XInsightDashboard/Individual?:embed=y&:display_count=yes&publish=yes';  
    const vizContainer = this.vizContainer;  
    let viz = new window.tableau.Viz(vizContainer, vizUrl)  
  }  
  
  
  render() {  
    return (  
      <div ref={(div) => { this.vizContainer = div }}>  
      </div>  
    )  
  }  
}  
  
  
export default Dashboard; 