//var assn_box = require("./home_content.jsx");
var React = require('react');
var ReactDOM = require('react-dom');
var rd3 = require('react-d3');

var BarChart = rd3.BarChart;

var BarChartD3 = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Series A",
          "values":[
            {"x": 'A', "y": 50},
            {"x": 'B', "y": 64},
            {"x": 'C', "y": 34},
            {"x": 'D', "y": 56},
            {"x": 'E', "y": 23},
            {"x": 'F', "y": 78},
            {"x": 'G', "y": 67},
            {"x": 'H', "y": 45},
            {"x": 'I', "y": 77},
            {"x": 'J', "y": 88},
            {"x": 'K', "y": 65},
            {"x": 'L', "y": 45},
            {"x": 'M', "y": 56},
            {"x": 'N', "y": 87},
            {"x": 'O', "y": 91},
            {"x": 'P', "y": 54},
            {"x": 'Q', "y": 42},
            {"x": 'R', "y": 67},
            {"x": 'S', "y": 55},
            {"x": 'T', "y": 35},
            {"x": 'U', "y": 79},
            {"x": 'V', "y": 56},
            {"x": 'W', "y": 76},
            {"x": 'X', "y": 56},
            {"x": 'Y', "y": 48},
            {"x": 'Z', "y": 76}
          ]}
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="bar_chart">
                <center>
                  <h3>
                  Lines of Code Student
                  </h3>
                </center>
                <BarChart
                  data={this.state.barData}
                  width={700}
                  height={330}
                  fill={'#3182bd'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
               </div>;
    }
});

//ReactDOM.render(<BarChartD3 name="World" />, document.getElementById(''));

var Assignment = React.createClass({
/*rawMarkup: function(){
    // Sanitizes input from the site as a security precaution
    //  var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    // Return the sanitized string
    return { __html: rawMarkup };
  },*/
  render: function(){
    return (
    <div className="assignment">
      <h5>
        {this.props.prob_statement + ":"}
      </h5>
      <span>{this.props.description}</span>

    </div>
    );
  }
});

var AssignmentBox = React.createClass({
  loadAssignmentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      // in the case ajax succeeds
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      // in the case ajax runs into an error
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function(){
    return {data: []};
  },

  componentDidMount: function(){
    this.loadAssignmentsFromServer();
    //introduces that we will need a pollInterval for the external element
    setInterval(this.loadAssignmentsFromServer, this.props.pollInterval);
  },

  render: function(){
    return (
      <div>
        <div id="assignment_dir" className="panel panel-default">
          <div className="panel-heading">
            <h5 className="panel-title">Assignments</h5>
          </div>
          <div className="panel-body">

            <form role="form" className="search_container">
                <div className="form-group">
                  <input type="text" className="form-control" id="search" placeholder="Search..."/>
                </div>
                <button type="submit" className="btn btn-success">Go</button>
            </form>

            <div className="assignmentBox">
              <div>
                <AssignmentList data={this.state.data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var AssignmentList = React.createClass({
  render: function(){
    // commentNodes gets the values of all the json data as a mapping for each data element
    var assignmentNodes = this.props.data.map(function(assignment){
      return (
        <Assignment prob_statement={assignment.prob_statement} key={assignment.id} description={assignment.description}>
        </Assignment>
      );
    });

    return (
        <div className="assignmentList panel panel-default">
          {assignmentNodes}
        </div>
    );
  }
});

var Student = React.createClass({
  render: function(){

    return (
      <div className="student">
        <label>
          <input type="checkbox" name="student">
              {this.props.stud_name}
          </input>
        </label>
      </div>
    );
  }
});

var StudentList = React.createClass({
  render: function(){

    return (
        <div className="studentList">
          <Student stud_name="Select All"/>
          <Student stud_name="Johnny Appleseed"/>
          <Student stud_name="Mike T"/>
          <Student stud_name="Nick M"/>
          <Student stud_name="John K"/>
          <Student stud_name="Li L"/>
          <Student stud_name="Ryan O"/>
          <Student stud_name="Johnny Appleseed"/>
          <Student stud_name="Mike T"/>
          <Student stud_name="Nick M"/>
          <Student stud_name="John K"/>
          <Student stud_name="Li L"/>
          <Student stud_name="Ryan O"/>


        </div>
    );
  }
});

var StudentForm = React.createClass({
  render: function(){

    return (
      <div id="assignment_dir" className="panel panel-default">
        <div className="panel-heading">
          <h5 className="panel-title">Students</h5>
        </div>
        <div className="panel-body">
          <form>
            <StudentList/>
          </form>
        </div>
      </div>


    );
  }
});



var Graph = React.createClass({
  render: function(){

    return (
      <div className="graph">
        <label>
          <input type="checkbox" name="graph">
              {this.props.stud_name}
          </input>
        </label>
      </div>
    );
  }
});

var GraphList = React.createClass({
  render: function(){

    return (
        <div className="graphList">
          <Graph stud_name="Select All"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
          <Graph stud_name="Line Numbers"/>
        </div>
    );
  }
});

var GraphForm = React.createClass({
  render: function(){

    return (
      <div className="graphForm">
        <div id="assignment_dir">
          <div className="panel-heading">
            <h5 className="panel-title">Graphs</h5>
          </div>
          <form>
            <GraphList/>
          </form>
        </div>
      </div>
    );
  }
});


var GraphContainer = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChartD3/>
      </div>
    )
  }
});

var GraphContainerList = React.createClass({
  render: function(){
    return(
      <div className="graphContainerList">
        <GraphContainer/>
        <GraphContainer/>
        <GraphContainer/>
        <GraphContainer/>
        <GraphContainer/>
      </div>
    )
  }
});

var MasterGraphContainer = React.createClass({
  componentDidMount: function(){
  },
  render:function(){

    return (
      <div className="masterGraphContainer">

        <div className="content-toolbar">
          <GraphForm/>
        </div>
        <div className="content-body" >
          <div className="col-md-2">
            <div className="property-container">
                <AssignmentBox url="/assignments" pollInterval={2000} />
                <StudentForm/>

            </div>
          </div>
          <div className="col-md-10">
            <div className="content-container">
              <div className="all-graph">
                  <GraphContainerList/>





              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

ReactDOM.render(<MasterGraphContainer/>, document.getElementById('content')); //url="/assignments" pollInterval={2000}

/*
module.exports = AssignmentBox;
module.exports = StudentForm;
module.exports = GraphForm;*/
