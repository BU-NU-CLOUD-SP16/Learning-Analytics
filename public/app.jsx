var React = require('react');
var ReactDOM = require('react-dom');

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
      <h3>
        {this.props.prob_statement}
      </h3>
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
      <div className="col-md-4 " >
        <div id="assignment_dir" className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Assignment Library</h3>
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
        <script type="text/babel" src="scripts/example.jsx"></script>
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

ReactDOM.render(<AssignmentBox url="/assignments" pollInterval={2000} />, document.getElementById('content'));

var UserContainer = React.createClass({
  render: function(){
    return (
      <div className="col-md-4">
        <div className="userContainer">
          <div className="text-container">
              <ul className="col-center">
                <li><h1>Are you a</h1></li>
                <li>
                    <a href="/pages/teacher.html">
                      <button type="button" className="btn btn-lg btn-primary">Teacher</button>
                    </a>
                </li>
                <li><h3>or a</h3></li>
                <li>
                  <a href="/pages/student.html">
                    <button type="button" className="btn btn-lg btn-primary">Student?</button>
                  </a>
                </li>
              </ul>
          </div>
        </div>
      </div>
    );
  }

});



ReactDOM.render(<UserContainer/>,document.getElementById('user-select'));
//module.exports = AssignmentBox;
/*

var Comment = React.createClass({
  // sanitize comments from database √
  rawMarkup: function() {
    // Sanitizes input from the site as a security precaution
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    // Return the sanitized string
    return { __html: rawMarkup };
  },

  // Render the Author's name and his or her respective comment
  render: function() {
    return (
      <div className="comment">
        <h2>
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
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
},/*
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },*//*
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />

      </div>
    );
  }
});

  // ^^ Normally after CommentList  <CommentForm onCommentSubmit={this.handleCommentSubmit} />

var CommentList = React.createClass({
  // render up the list of authors and their respective comments
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });


    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});



/*
var CommentForm = React.createClass({
  // Initially the input fields are empty strings, later to be updated
  getInitialState: function() {
    return {author: '', text: ''};
  },
  // event occurs when the "author" field is altered
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  // event occurs when the "comment/text" field is altered
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  // Triggers when the submit button is clicked
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    // return as long as neither are empty strings
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />&nbsp;
        <input
          type="text"
          placeholder="Password"
          value={this.state.text}
          onChange={this.handleTextChange}
        />&nbsp;
        <input type="submit" value="Submit" />
      </form>
    );
  }
});*//*

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />, document.getElementById('content')
);*/
