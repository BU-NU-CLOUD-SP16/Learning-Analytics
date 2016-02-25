var React = require('react');
var ReactDOM = require('react-dom');

//style={{border: "red solid 1px"}}


var UserContainer = React.createClass({
  render: function(){
    return (
      <div>
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <div className="userContainer panel panel-primary">
          <div className="panel-heading">
            <h4>Which are you?</h4>
          </div>
          <div className="text-container" >
              <ul className="col-center center panel-body">
                <li>
                    <a href="/pages/teacher.html">
                      <button type="button" className="btn btn-lg btn-primary">Teacher</button>
                    </a>
                </li>
                <li>
                  <a href="/pages/student.html">
                    <button type="button" className="btn btn-lg btn-primary">Student</button>
                  </a>
                </li>
              </ul>
          </div>

        </div>
      </div>
      <div className="col-md-4"></div>
      </div>
    );
  }

});

ReactDOM.render(<UserContainer/>,document.getElementById('user-select'));
