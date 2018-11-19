import React, { Component } from 'react';
import axios from 'axios';
import { CsvToHtmlTable } from 'react-csv-to-table';
import ReactFileReader from 'react-file-reader';
import JsonTable from 'ts-react-json-table';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { CSVLink, CSVDownload } from "react-csv";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import { TablePagination } from 'react-pagination-table';

const sampleData = ``;
var result = [];
var data;

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

const options = {
      page: 1,  
      sizePerPage: 4,  
      pageStartIndex: 1, 
      //paginationSize: 3,  
      prePage: 'Prev', 
      nextPage: 'Next', 
      firstPage: 'First', 
      lastPage: 'Last', 
      paginationShowsTotal: this.renderShowsTotal, 
      paginationPosition: 'bottom'  
      //hideSizePerPage: true 
      // alwaysShowAllBtns: true 
      // withFirstAndLast: false 
    };

class Main extends Component {

  constructor(props) {
    super(props);
    this.state={
      csvData: null,
      data: []
      //this.columnsBuilder = this.columnsBuilder.bind(this)
    }
    //console.log(this.state.data);
  }

  /*columnsBuilder () { 
        if(this.props.data == 0){
           return
        }
        const props = Object.keys(this.props.data[0]); //Use Props
        const columns = props.map( (item, index) => ({
            Header : item,
            accessor : item,
        }));

        const built = [
            {
                Header : this.props.header,
                columns,
            },
        ];        
        return built;
    }*/

  handleFiles = files => {
    var reader = new FileReader();
    reader.onload = function(e) {
      var csv = reader.result;
      var lines = csv.split("\n");
      console.log(lines.length);
      var headers=lines[0].split(",");
      for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }  
      //return result; //JavaScript object
      result = JSON.stringify(result); //JSON
      console.log(result);
      localStorage.setItem('employee', result);
      // Use reader.result
      this.setState({
        csvData: reader.result,
        data: JSON.parse(localStorage.getItem('employee'))
      })
      }.bind(this);
    reader.readAsText(files[0]);
  }
  render() {
      return(
        <div className="Main">
          <h1>Upload Your CSV File</h1>
            <div>
              <ReactFileReader 
                multipleFiles={false}
                fileTypes={[".csv"]} 
                handleFiles={this.handleFiles}>
                <button className='btn'>Upload</button>
              </ReactFileReader>
              <br />
              <BootstrapTable className='table'
              data={ this.state.data } pagination={ true } options={ options }>
                <TableHeaderColumn dataField='Name' isKey>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='Department'>Department</TableHeaderColumn>
                <TableHeaderColumn dataField='Designation'>Designation</TableHeaderColumn>
                <TableHeaderColumn dataField='Salary'>Salary</TableHeaderColumn>
                <TableHeaderColumn dataField='Joining Date'>Joining Date</TableHeaderColumn>
              </BootstrapTable>
              <br />
              <CSVLink data={this.state.data}>Download CSV File</CSVLink>          
            </div>
      </div>
      );
  }

}

export default Main;
