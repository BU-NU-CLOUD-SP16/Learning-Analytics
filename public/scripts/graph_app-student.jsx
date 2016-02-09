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
      <div id="assignment_dir" className="panel panel-default">
        <div className="panel-heading">
          <h5 className="panel-title">Graphs</h5>
        </div>
        <div className="panel-body">
          <form>
            <GraphList/>
          </form>
        </div>
      </div>


    );
  }
});

var MasterGraphContainer = React.createClass({
  render:function(){

    return (
      <div className="masterGraphContainer">
        <div className="col-md-2">
          <div className="property-container">
              <AssignmentBox url="/assignments" pollInterval={2000} />
              <GraphForm/>
          </div>
        </div>
        <div className="col-md-10">
          <div className="content-container">
            <div className="all-graph">
              <div className="graph-container col-md-4"></div>
              <div className="graph-container col-md-4"></div>
              <div className="graph-container col-md-4"></div>
              <div className="graph-container col-md-4"></div>
              <div className="graph-container col-md-4"></div>
              <div className="graph-container col-md-4"></div>
              <div className="graph-container col-md-4"></div>
              <div className="graph-container col-md-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<MasterGraphContainer/>, document.getElementById('content')); //url="/assignments" pollInterval={2000}
