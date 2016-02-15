//var assn_box = require("./home_content.jsx");
var React = require('react');
var ReactDOM = require('react-dom');
var rd3 = require('react-d3');

var BarChart = rd3.BarChart;

var BarChart_Lines_Code = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Class A",
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
        return <div className="BarChart_Lines_Code">
                <center>
                  <h3>
                  Lines of Code
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

var BarChart_Time_Complexity = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Class A",
          "values":[
            {"x": 'A', "y": 2345},
            {"x": 'B', "y": 5463},
            {"x": 'C', "y": 10293},
            {"x": 'D', "y": 5643},
            {"x": 'E', "y": 3657},
            {"x": 'F', "y": 7854},
            {"x": 'G', "y": 6845},
            {"x": 'H', "y": 2435},
            {"x": 'I', "y": 1243},
            {"x": 'J', "y": 5544},
            {"x": 'K', "y": 7869},
            {"x": 'L', "y": 3343},
            {"x": 'M', "y": 4433},
            {"x": 'N', "y": 3354},
            {"x": 'O', "y": 3654},
            {"x": 'P', "y": 7887},
            {"x": 'Q', "y": 6657},
            {"x": 'R', "y": 6587},
            {"x": 'S', "y": 6645},
            {"x": 'T', "y": 2343},
            {"x": 'U', "y": 4565},
            {"x": 'V', "y": 6645},
            {"x": 'W', "y": 9786},
            {"x": 'X', "y": 2302},
            {"x": 'Y', "y": 4345},
            {"x": 'Z', "y": 5675}
          ]}
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="BarChart_Time_Complexity">
                <center>
                  <h3>
                  Time Complexity (ms)
                  </h3>
                </center>
                <BarChart
                  data={this.state.barData}
                  width={700}
                  height={330}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
               </div>;
    }
});

var BarChart_Comment_Percent = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Class A",
          "values":[
            {"x": 'A', "y": 23},
            {"x": 'B', "y": 14},
            {"x": 'C', "y": 0},
            {"x": 'D', "y": 14},
            {"x": 'E', "y": 5},
            {"x": 'F', "y": 13},
            {"x": 'G', "y": 5},
            {"x": 'H', "y": 6},
            {"x": 'I', "y": 23},
            {"x": 'J', "y": 25},
            {"x": 'K', "y": 32},
            {"x": 'L', "y": 12},
            {"x": 'M', "y": 43},
            {"x": 'N', "y": 24},
            {"x": 'O', "y": 16},
            {"x": 'P', "y": 14},
            {"x": 'Q', "y": 25},
            {"x": 'R', "y": 27},
            {"x": 'S', "y": 45},
            {"x": 'T', "y": 12},
            {"x": 'U', "y": 13},
            {"x": 'V', "y": 5},
            {"x": 'W', "y": 23},
            {"x": 'X', "y": 45},
            {"x": 'Y', "y": 21},
            {"x": 'Z', "y": 22}
          ]}
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="BarChart_Comment_Percent">
                <center>
                  <h3>
                  Comments Percentage 
                  </h3>
                </center>
                <BarChart
                  data={this.state.barData}
                  width={700}
                  height={330}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
               </div>;
    }
});

var BarChart_Attempt_Count = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Class A",
          "values":[
            {"x": 'A', "y": 1},
            {"x": 'B', "y": 2},
            {"x": 'C', "y": 1},
            {"x": 'D', "y": 0},
            {"x": 'E', "y": 3},
            {"x": 'F', "y": 5},
            {"x": 'G', "y": 7},
            {"x": 'H', "y": 3},
            {"x": 'I', "y": 2},
            {"x": 'J', "y": 4},
            {"x": 'K', "y": 4},
            {"x": 'L', "y": 1},
            {"x": 'M', "y": 1},
            {"x": 'N', "y": 4},
            {"x": 'O', "y": 6},
            {"x": 'P', "y": 2},
            {"x": 'Q', "y": 1},
            {"x": 'R', "y": 2},
            {"x": 'S', "y": 2},
            {"x": 'T', "y": 5},
            {"x": 'U', "y": 4},
            {"x": 'V', "y": 3},
            {"x": 'W', "y": 5},
            {"x": 'X', "y": 2},
            {"x": 'Y', "y": 1},
            {"x": 'Z', "y": 1}
          ]}
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="BarChart_Attempt_Count">
                <center>
                  <h3>
		    Number of Attempts 
                  </h3>
                </center>
                <BarChart
                  data={this.state.barData}
                  width={700}
                  height={330}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
               </div>;
    }
});

var BarChart_Loop_Count = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Class A",
          "values":[
            {"x": 'A', "y": 2},
            {"x": 'B', "y": 2},
            {"x": 'C', "y": 2},
            {"x": 'D', "y": 3},
            {"x": 'E', "y": 3},
            {"x": 'F', "y": 5},
            {"x": 'G', "y": 7},
            {"x": 'H', "y": 3},
            {"x": 'I', "y": 2},
            {"x": 'J', "y": 4},
            {"x": 'K', "y": 4},
            {"x": 'L', "y": 1},
            {"x": 'M', "y": 1},
            {"x": 'N', "y": 4},
            {"x": 'O', "y": 6},
            {"x": 'P', "y": 2},
            {"x": 'Q', "y": 1},
            {"x": 'R', "y": 2},
            {"x": 'S', "y": 2},
            {"x": 'T', "y": 5},
            {"x": 'U', "y": 4},
            {"x": 'V', "y": 3},
            {"x": 'W', "y": 5},
            {"x": 'X', "y": 2},
            {"x": 'Y', "y": 1},
            {"x": 'Z', "y": 1}
          ]}
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="BarChart_Loop_Count">
                <center>
                  <h3>
                    NNested Loop Count 
                  </h3>
                </center>
                <BarChart
                  data={this.state.barData}
                  width={700}
                  height={330}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
               </div>;
    }
});

var BarChart_Space_Complexity = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Class A",
          "values":[
            {"x": 'A', "y": 100},
            {"x": 'B', "y": 200},
            {"x": 'C', "y": 300},
            {"x": 'D', "y": 200},
            {"x": 'E', "y": 100},
            {"x": 'F', "y": 100},
            {"x": 'G', "y": 100},
            {"x": 'H', "y": 200},
            {"x": 'I', "y": 300},
            {"x": 'J', "y": 200},
            {"x": 'K', "y": 200},
            {"x": 'L', "y": 200},
            {"x": 'M', "y": 200},
            {"x": 'N', "y": 200},
            {"x": 'O', "y": 100},
            {"x": 'P', "y": 200},
            {"x": 'Q', "y": 200},
            {"x": 'R', "y": 300},
            {"x": 'S', "y": 400},
            {"x": 'T', "y": 200},
            {"x": 'U', "y": 200},
            {"x": 'V', "y": 200},
            {"x": 'W', "y": 100},
            {"x": 'X', "y": 200},
            {"x": 'Y', "y": 100},
            {"x": 'Z', "y": 200}
          ]}
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="BarChart_Space_Complexity">
                <center>
                  <h3>
                    Space Complexity (Percentage of input)
                  </h3>
                </center>
                <BarChart
                  data={this.state.barData}
                  width={700}
                  height={330}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
               </div>;
    }
});

var BarChart_Loop_Percent = React.createClass({
    getInitialState : function() {
        var barData = [{
          "name":"Class A",
          "values":[
            {"x": 'A', "y": 100},
            {"x": 'B', "y": 100},
            {"x": 'C', "y": 340},
            {"x": 'D', "y": 220},
            {"x": 'E', "y": 150},
            {"x": 'F', "y": 220},
            {"x": 'G', "y": 150},
            {"x": 'H', "y": 300},
            {"x": 'I', "y": 400},
            {"x": 'J', "y": 300},
            {"x": 'K', "y": 300},
            {"x": 'L', "y": 300},
            {"x": 'M', "y": 300},
            {"x": 'N', "y": 150},
            {"x": 'O', "y": 220},
            {"x": 'P', "y": 260},
            {"x": 'Q', "y": 300},
            {"x": 'R', "y": 400},
            {"x": 'S', "y": 430},
            {"x": 'T', "y": 210},
            {"x": 'U', "y": 300},
            {"x": 'V', "y": 200},
            {"x": 'W', "y": 150},
            {"x": 'X', "y": 300},
            {"x": 'Y', "y": 200},
            {"x": 'Z', "y": 200}
          ]}
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="BarChart_Loop_Percent">
                <center>
                  <h3>
                    Loop Count (Percentage of input) 
                  </h3>
                </center>
                <BarChart
                  data={this.state.barData}
                  width={700}
                  height={330}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
               </div>;
    }
});

var BarChart_DataStruct_Percent = React.createClass({
    getInitialState : function() {
        var barData = [
          {
          "name":"Array",
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
           ]
          }, 
          {
          "name":"Tree",
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
           ]
          },
          {
          "name":"Hashmap",
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
           ]
          }
        ];
        return {barData: barData};
    },
    render: function() {
        return <div className="BarChart_DataStruct_Percent">
                <center>
                  <h3>
                  Data Structures Used 
                  </h3>
                </center>
                <BarChart
	          legend={true}
                  data={this.state.barData}
                  width={675}
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
              <i className={"fa fa-" + this.props.icon_type}>&nbsp;</i>{this.props.stud_name}
          </input>

        </label>
      </div>
    );
  }
});

var GraphList = React.createClass({
  render: function(){

    var test = (
        <div className="graphList">
          <Graph stud_name="Select All" icon_type="check-square"/>
          <Graph stud_name="Space Complexity" icon_type="database"/>
          <Graph stud_name="Time Complexity" icon_type="clock-o"/>
          <Graph stud_name="Line Numbers" icon_type="align-justify"/>
          <Graph stud_name="Class Rank" icon_type="bar-chart"/>
          <Graph stud_name="Loop Counter" icon_type="circle-o-notch"/>
          <Graph stud_name="Attempt Count" icon_type="repeat"/>
          <Graph stud_name="Comment Count" icon_type="commenting-o"/>
          <Graph stud_name="Data Structures" icon_type="sitemap"/>

          <Graph stud_name="Nested Loop Count" icon_type="align-left"/>
          <Graph stud_name="Comment-Code Ratio" icon_type="percent"/>
          <Graph stud_name="Clusters" icon_type="dot-circle-o"/>
          <Graph stud_name="Popular Functions" icon_type="sign-in"/>
          <Graph stud_name="Statistics" icon_type="pie-chart"/>
          <Graph stud_name="Total Submissions" icon_type="th-large"/>
        </div>
    );

    return test;

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


var GraphContainer_Lines_Code = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChart_Lines_Code/>
      </div>
    )
  }
});

var GraphContainer_Time_Complexity = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChart_Time_Complexity/>
      </div>
    )
  }
});

var GraphContainer_Comment_Percent = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChart_Comment_Percent/>
      </div>
    )
  }
});

var GraphContainer_Attempt_Count = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChart_Attempt_Count/>
      </div>
    )
  }
});

var GraphContainer_Space_Complexity = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChart_Space_Complexity/>
      </div>
    )
  }
});

var GraphContainer_Loop_Percent = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChart_Loop_Percent/>
      </div>
    )
  }
});

var GraphContainer_DataStruct_Percent = React.createClass({
  render: function(){
    return (
      <div className="graph-container col-md-4">
          <BarChart_DataStruct_Percent/>
      </div>
    )
  }
});


var GraphContainerList = React.createClass({
  render: function(){
    return(
      <div className="graphContainerList">
        <GraphContainer_Lines_Code/>
        <GraphContainer_Time_Complexity/>
        <GraphContainer_Comment_Percent/>
        <GraphContainer_Attempt_Count/>
        <GraphContainer_Space_Complexity/>
        <GraphContainer_Loop_Percent/>
        <GraphContainer_DataStruct_Percent/>
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
