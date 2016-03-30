//var assn_box = require("./home_content.jsx");
var React = require('react');
var ReactDOM = require('react-dom');
var rd3 = require('react-d3');
var Tooltip = require('react-d3-tooltip');
var BarTooltip = Tooltip.BarTooltip;
var BarChart = rd3.BarChart;
var PieChart = rd3.PieChart;
var PieTooltip = Tooltip.PieTooltip;
var SimpleTooltipStyle = require('react-d3-tooltip').SimpleTooltip;

/* nvtaveras implemented this Trie Tree Implementation & this implementation is from his github */
var Node = function(value, ends){
  return {
    v : value,
    e : ends,
    childs : {
    }
  };
};

var Trie = function(){
  this.cnt = 0;
  this.rootObj = {
    childs : {
    }
  };
};

Trie.prototype.add = function(str){
  var cur = this.rootObj;
  for(var i = 0; i < str.length; ++i){
    var c = str[i];
    if(cur.childs.hasOwnProperty(c)){
      cur = cur.childs[c];
    }else{
      cur = cur.childs[c] = new Node(c, (i == str.length - 1));
    }
  }
  this.cnt++;
  return true;
};

Trie.prototype.find = function(str){
  var cur = this.rootObj;
  var exists = true;
  for(var i = 0; i < str.length && exists; ++i){
    var c = str[i];
    if(!cur.childs.hasOwnProperty(c)){
      exists = false;
    }
    cur = cur.childs[c];
  }
  if(!exists) cur = null;
  return cur;
};


Trie.prototype.explore = function(cur, str, arr){
  var keys = Object.keys(cur.childs);
  for(var i = 0; i < keys.length; ++i){
    var k = keys[i];
    var next = cur.childs[k];
    var nstr = str + k;
    if(next.e) arr.push(nstr);
    arr.concat(this.explore(next, nstr, arr));
  }
  return arr;
};

Trie.prototype.suggestions = function(str){
  var cur = this.find(str);
  if(!cur) return [];
  return this.explore(cur, str, []);
};

Trie.prototype.count = function(){
  return this.cnt;
};

/**** End of Trie Implementation ****/

// var db_url = "http://52.33.14.62:3000";
var new_title = "Placeholder!";
var new_descrpt = "wow, this description";

all_graphs = [".pieChart_Incorrect_Correct",".barChart_Space_Complexity",".barChart_Time_Complexity",".barChart_Lines_Code",".barChart_Loop_Percent",".pieChart_Attempt_Count",".barChart_Comment_Percent",".barChart_DataStruct_Percent",".barChart_Comment_Percent",".barChart_Size_Metric"];

init_graph = ".pieChart_Incorrect_Correct";

// Should set these to default values
var active_graph = init_graph;
var graph_tag = init_graph;
var active_assignment = "556";
var graph_widths = 1000;
var graph_heights = 490;

// test functionality for couting
var yell = function(){
  window.alert("YELLING");
}

// function for hiding current graph
var hide = function(){
  $(active_graph).fadeOut(); // this needs to be changed to hide the current graph no matter which it is
}

var show = function(){
  if(active_graph != graph_tag){
    hide();
  }

  $(graph_tag).fadeIn(); // this needs to be changed to hide the current graph no matter which it is
  //window.alert($(graph_tag).offset().top);
  active_graph = graph_tag;
}



/****************** Chart Implementations Begin ******************/

var BarChart_Lines_Code = React.createClass({
    getInitialState : function() {
    	var chartSeries = [
    	      {
    	        field: 'y',
    	        name: 'Submissions.Lines of Code'
    	      }
    	    ];

    	var x = function(d) {
    	      return d.x;
    	    };

      var temp = {
                color: 'black',
                fontWeight: 'bold',
                marginBottom: '5px'
              };

    	var xScale = 'ordinal';
    	var yTicks = [10, "c"];

      var barData = [
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
      ];
      return {barData: barData,
              series: chartSeries,
              x: x,
              xScale: xScale,
              yTicks: yTicks};
    },loadLineCountMetricFromServer: function(){
      $.ajax({
        url: "/problem/470/metrics/linecount", //"/problem/" + selected_id + "/linecount",    //selected_id = 470;
        dataType: 'json',
        cache: false,
        success: function(data) {
      	  var loaded_barData = data;
          this.setState({barData: loaded_barData});
          //window.alert(barData);
        }.bind(this),
        // in the case ajax runs into an error
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentDidMount: function(){
      this.loadLineCountMetricFromServer();
      //introduces that we will need a pollInterval for the external element
    //  setInterval(this.loadSizeMetricFromServer);
    },
    render: function() {
        return (
          <div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Lines_Code">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                        Lines of Code
                        </h3>
                        <div className="graph-x" onClick={hide}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                  		<BarTooltip
                        data={this.state.barData}
                  		  legend={false}
                        width={graph_widths}
                        height={graph_heights}
                        fill={'#3182bd'}
                        title=''
                  		  chartSeries = {this.state.series}
                        x= {this.state.x}
            	          xScale= {this.state.xScale}
                        yTicks= {this.state.yTicks}
                        margins={{top: 20, right: 30, bottom: 30, left: 40}}>
                    		<SimpleTooltipStyle tooltip_title={this.state.temp}/>
                    	</BarTooltip>
                    </div>
                   </div>
                 </div>
               </div>);
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
        return (<div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Time_Complexity">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                        Time Complexity (ms)
                        </h3>
                        <div className="graph-x" onClick={hide}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                    <BarChart
                      data={this.state.barData}
                      width={graph_widths}
                      height={graph_heights}
                      fill={'#8a5715'}
                      title=''
                      margins={{top: 20, right: 30, bottom: 30, left: 40}}
                    />
                    </div>
                   </div>
                 </div>
               </div>);
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
        return (<div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Comment_Percent">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                        Comments Percentage
                        </h3>
                        <div className="graph-x" onClick={hide}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                      <BarChart
                        data={this.state.barData}
                        width={graph_widths}
                        height={graph_heights}
                        fill={'#8a5715'}
                        title=''
                        margins={{top: 20, right: 30, bottom: 30, left: 40}}
                      />
                    </div>
                   </div>
                  </div>
                </div>);
    }
});

var PieChart_Incorrect_Correct = React.createClass({
    getInitialState : function() {
    var pieData = [
      {label: 'Correct', value: 55.0},
      {label: 'Incorrect', value: 45.0}
    ];

    var colorFunction = function(d) {
      if (d == 0) {
        return "rgb(137, 203, 124)";
      } else {
        return "rgb(217, 90, 90)";
      }
    };

    return {pieData: pieData, colorFunction: colorFunction, last_assign:"556"};
    },
    loadSubmissionDataFromServer: function(){
      $.ajax({
        url: "/problem/" + this.props.act_assign + "/metrics/submissions",
        dataType: 'json',
        cache: false,
        success: function(data) {
          var loaded_pieData = data;
          this.setState({pieData: loaded_pieData});
        }.bind(this),
        // in the case ajax runs into an error
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      
    },
    componentDidMount: function(){
      this.loadSubmissionDataFromServer();
      //introduces that we will need a pollInterval for the external element
      setInterval(300);
    },
    render: function() {
      // if the current assignment is not the previous assignment, load the new info
      if(this.state.last_ass != this.props.act_assign){
        this.loadSubmissionDataFromServer();
      }


        return (<div className="graph-container col-md-4">
                  <div className="graphContainerList">
                    <div className="pieChart_Incorrect_Correct">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3>
                            Correct-Incorrect
                          </h3>
                          <div className="graph-x" onClick={hide}>
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                  			<PieChart
                  			  data={this.state.pieData}
                  			  width={graph_widths}
                  			  height={graph_heights}
                  			  radius={200}
                  			  colors={this.state.colorFunction}
                  			  innerRadius={60}
                  			  sectorBorderColor="white"
                  			  //title="Pie Chart"
                  			/>
                        </div>
                       </div>
                     </div>
                   </div>);
  }
});


var PieChart_Attempt_Count = React.createClass({
    getInitialState : function() {
      /*  var pieData = [
          {label: 'Correct', value: 55.0},
          {label: 'Incorrect', value: 45.0}
        ];

        var colorFunction = function(d) {
          if (d == 0) {
            return "rgb(137, 203, 124)";
          } else {
            return "rgb(217, 90, 90)";
          }
        };

        return {pieData: pieData,
                colorFunction: colorFunction};*/
        return null;
    },
    loadSubmissionDataFromServer: function(){
      /*    $.ajax({
            url: "/problem/470/metrics/submissions",
            dataType: 'json',
            cache: false,
            success: function(data) {
              var loaded_pieData = data;
              this.setState({pieData: loaded_pieData});
            }.bind(this),
            // in the case ajax runs into an error
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });*/
    },
    componentDidMount: function(){
      this.loadSubmissionDataFromServer();
      //introduces that we will need a pollInterval for the external element
    //  setInterval(300);
    },

    render: function() {

        return null;/*(<div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="pieChart_Attempt_Count">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                          Submissions
                        </h3>
                        <div className="graph-x" onClick={hide}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                			<PieChart
                			  data={this.state.pieData}
                			  width={graph_widths}
                			  height={graph_heights}
                			  radius={200}
                			  colors={this.state.colorFunction}
                			  innerRadius={60}
                			  sectorBorderColor="white"
                			  //title="Pie Chart"
                			/>
                    </div>
                   </div>
                 </div>
               </div>);*/
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
        return (<div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Loop_Count">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                          Nested Loop Count
                        </h3>
                        <div className="graph-x" onClick={hide}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                      <BarChart
                        data={this.state.barData}
                        width={graph_widths}
                        height={graph_heights}
                        fill={'#8a5715'}
                        title=''
                        margins={{top: 20, right: 30, bottom: 30, left: 40}}
                      />
                    </div>
                   </div>
                 </div>
               </div>);
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
        return (<div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Space_Complexity">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                          Space Complexity (Percentage of input)
                        </h3>
                        <div className="graph-x" onClick={hide}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                      <BarChart
                        data={this.state.barData}
                        width={graph_widths}
                        height={graph_heights}
                        fill={'#8a5715'}
                        title=''
                        margins={{top: 20, right: 30, bottom: 30, left: 40}}
                      />
                    </div>
                  </div>
                </div>
              </div>);
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
        return (<div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Loop_Percent">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                          Loop Count (Percentage of input)
                        </h3>
                        <div className="graph-x" onClick={hide}>
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                    <BarChart
                      data={this.state.barData}
                      width={graph_widths}
                      height={graph_heights}
                      fill={'#8a5715'}
                      title=''
                      margins={{top: 20, right: 30, bottom: 30, left: 40}}
                    />
                    </div>
                   </div>
                 </div>
               </div>);
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
        return (<div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_DataStruct_Percent">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                      <h3>
                      Data Structures Used
                      </h3>
                      <div className="graph-x" onClick={hide}>
                        <i className="fa fa-times"></i>
                      </div>
                    </div>
                    <BarChart
          	          legend={true}
                      data={this.state.barData}
                      width={graph_widths}
                      height={graph_heights}
                      fill={'#3182bd'}
                      title=''
                      margins={{top: 20, right: 100, bottom: 30, left: 40}}
                    />
                    </div>
                  </div>
                </div>
              </div>);
    }
});

var BarChart_Size_Metric = React.createClass({
    loadSizeMetricFromServer: function(){
      /*$.ajax({
        url: "",//"/student/metric/bins",
        dataType: 'json',
        cache: false,
        success: function(data) {
      	  var barData = data;
          this.setState({data: barData});
        }.bind(this),
        // in the case ajax runs into an error
        error: function(xhr, status, err) {
          //console.error(this.props.url, status, err.toString());
        }.bind(this)
      });*/
    },
    getInitialState: function(){
      var barData = [{
        "name":"Class A",
        "values":[{"x": 'A', "y": 2345},
        {"x": 'B', "y": 5463},
        {"x": 'C', "y": 102},
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
        {"x": 'Z', "y": 5675}]}
      ];
      return {data: barData};
    },
    componentDidMount: function(){
      this.loadSizeMetricFromServer();
      //introduces that we will need a pollInterval for the external element
//      setInterval(this.loadSizeMetricFromServer);
    },
    render: function() {
        return (<div className="graph-container col-md-4">
                  <div className="graphContainerList">
                    <div className="barChart_Size_Metric">
                      <div className="panel panel-default">
                        <div className="panel-heading">
                          <h3>
                            Size Metric
                          </h3>
                          <div className="graph-x" onClick={hide}>
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                        <BarChart
                          data={this.state.data}
                          width={graph_widths}
                          height={graph_heights}
                          fill={'#8a5715'}
                          title=''
                          margins={{top: 20, right: 30, bottom: 30, left: 40}}
                        />
                      </div>
                     </div>
                   </div>
                 </div>);
    }
});

/****************** Chart Implementation End ******************/






/****************** Assignment Directory Implementation Begin ******************/

var Assignment = React.createClass({ //updateAssignment={this.props.updateAssignment(new_title, new_descrpt)}
  updateAssignment: function(){
    //this.props.updateAssignment().bind(null,this);
    //window.alert(this.props.my_id + "hello");
    this.props.userClicksAssignment();
    //active_assignment = this.props.my_id;
    //window.alert("active id:" + active_assignment);
  },
  render: function(){
    return (
    <div className="assignment">
      <button type="button" className="btn btn-primary" onClick={this.updateAssignment}>
        <h5>
          {this.props.prob_statement + ":"}
        </h5>
      </button>
      <span>{this.props.description_html}</span>
    </div>
    );
  }
});

var AssignmentList = React.createClass({
  updateAssignment: function(){
    this.props.userSelectAssignment();
    //this.props.updateAssignment().bind(null,this);
  //  yell();
  //  window.alert("assignmentList");
  },
  render: function(){
    // commentNodes gets the values of all the json data as a mapping for each data element
    var UserClickEvent = this.updateAssignment;
    var assignmentNodes = this.props.data.map(function(assignment){
      var id = assignment.id;
      return (
        <Assignment
          prob_statement={assignment.title}
          key={id}
          my_id={id}
          description={assignment.description_html}
          userClicksAssignment={UserClickEvent}
        />);
    },this); //<div className="assignmentList panel panel-default" style={{border:"yellow 30px solid"}} onClick={this.updateAssignment}>

    return (
        <div className="assignmentList panel panel-default">
          {assignmentNodes}
        </div>
    );
  }
});

var AssignmentBox = React.createClass({
  loadAssignmentsFromServer: function(){
    $.ajax({
      url: "/problem",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      // in the case ajax runs into an error
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        window.alert("load assignments fail");
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    this.loadAssignmentsFromServer();
    // introduces that we will need a pollInterval for the external element
    // setInterval(this.loadAssignmentsFromServer, 3000); //this.props.pollInterval);
  },
  updateAssignment: function(){
    this.props.assignmentClick();

    //this.props.updateAssignment();//().bind(null,this);
//    window.alert("assignmentBox");
  },
  render: function(){ //<div className="assignmentBox" style={{border: "solid 30px black"}} onClick={this.updateAssignment}>
    var replac_tmp = (
        <div id="assignment_dir">
          <div>
            <div className="assignmentBox">
              <div>
                <AssignmentList
                  data={this.state.data}
                  updateAssignment={this.updateAssignment}
                  userSelectAssignment={this.updateAssignment}
                />
              </div>
            </div>
          </div>
        </div>
    );

    return replac_tmp;
  }
});

/****************** Assignment Directory End ******************/


/****************** Student Directory Implementation Begin ******************/
var student_container = new Trie();

var Student = React.createClass({
  rawMarkup: function(){
    // Sanitizes input from the site as a security precaution
    var rawMarkup = marked(this.props.stud_name, {sanitize: true});
  //  alert(rawMarkup);
    // Return the sanitized string
    return { __html: rawMarkup };
  },
  getInitialState: function(){
    // Takes control of the individual student's check boxes
    return {check: true};
  },
  onChange: function(e){
    var my_name = this.props.stud_name;
    var input_class = "student-input";
    if(my_name == "Select All"){
        var array = document.getElementsByClassName(input_class);
        for(var ii = 0; ii < array.length; ii++)
        {
           if(array[ii].type == "checkbox")
           {
              if(array[ii].className == input_class)
               {
                array[ii].checked = !(this.state.check);
               }
           }
        }
        this.setState({check: !(this.state.check)});
    }
  },
  render: function(){
    var student_label;
    if(this.props.stud_name == "Select All"){
      student_label = "";
    }
    else{
      student_label = "Student ";
    }
    return (
      <div className="student">
        <label>
          <input className="student-input" type="checkbox" name="student"  defaultChecked={this.state.check} onChange={this.onChange} >
            {student_label + this.props.stud_name}
          </input>
        </label>
      </div>
    );
  }
});

var clicked_go = false;
var StudentList = React.createClass({
  getInitialState : function() {
      return {data: []};
  },
  loadStudentsFromServer: function(){
    $.ajax({
      url: "/dbtest",
      dataType: 'json',
      cache: false,
      success: function(data) {
    //    window.alert(JSON.stringify(data));
        this.setState({data: data});
      }.bind(this),
      // in the case ajax runs into an error
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadStudentsFromServer();
    //introduces that we will need a pollInterval for the external element
//    setInterval(this.loadStudentsFromServer, this.props.pollInterval);


  },
  render: function(){
    var set_arr = this.state.data;
    var studentNodes;
    if(clicked_go == true){
      // window.alert(student_container.count());
      set_arr = this.props.searched_prefix;
      var temp_arr = [];
//      window.alert(this.props.searched_prefix);
      // student_name is actually just the student_id string
      studentNodes = set_arr.map(function(student_name){
        var stud_node = null
        // make sure the value is not already in the Trie && value is in the passed filtered array
        if(student_container.find(student_name) == null && ($.inArray(student_name, set_arr))){
          temp_arr.push(student_name);
          student_container.add(student_name);
          stud_node = (<Student stud_name={student_name}/>);
        }
        return stud_node;
      });
      clicked_go = false;

    /*  // if it isnt in the array, it should be deleted - Student clean up
      var all_studs = document.getElementsByClassName("student");
      for(var ii = 0; ii < all_studs.length; ii++){
        cur_stud = all_studs[ii];
        if(!($.inArray(cur_stud.value,set_arr))){
            var parent = document.getElementsByClassName("div.studentList");
            parent.removeChild(cur_stud);
        }
      }*/

    }
    else{
      studentNodes = set_arr.map(function(student){
        var stud_node = null
        // only save player_id's in the Trie
        name = student.player_id;
        if(student_container.find(name) == null){
          student_container.add(name);
          stud_node = (<Student stud_name={student.player_id}/>);
        }
        return stud_node;
      });
    }



    return (
      <div className="studentList">
        <Student stud_name={"Select All"}/>
        {studentNodes}
      </div>
    );
  }
});

var StudentForm = React.createClass({
  getInitialState: function(){
      return ({prefix: []}); // iniitially the user hasnt entered anything into the search box
  },
  // in the case the user clicks the search box
  onGo: function(){
    // Get elements of the same class results in multiple elements being grabbed, so need to specify the 0th
    var searched = document.getElementsByClassName("form-control")[0].value;

    // this is just for string formatting since the "Student" component of the string isnt saved in the Trie - only the id_num is
    searched = searched.substring(8,searched.length);
    this.setState({prefix:student_container.suggestions(searched)});
    student_container = new Trie();
    clicked_go = true;
    /*this.state.prefix.map(function(student){
      student_container.add(student);
    });*/
  },
  HandleEnter: function(event){
    if(event.charCode == 13){
      $("button.btn.btn-default").click();
    }
  },
  render: function(){
    return (
      <div id="assignment_dir" className="panel panel-default">
        <div className="panel-body">
            <div className="sidebar-search">
                <div className="input-group custom-search-form">
                    <input type="text" className="form-control" placeholder="Search..." onKeyPress={this.HandleEnter}></input>
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button" onClick={this.onGo}>
                          <i className="fa fa-search"></i>
                      </button>
                    </span>
                </div>
            </div>
          <form>
            <StudentList pollInterval={0} searched_prefix={this.state.prefix}/>
          </form>
        </div>
      </div>
    );
  }
});

/****************** Student Directory End ******************/

var GraphContainerList = React.createClass({
  getInitialState: function(){
    return {current_graph: active_graph};
  },
  componentDidMount: function(){
    //setInterval(1000);
    //window.alert(active_graph);
  },
  senseClick: function(){
  //  yell();
    //this.setState({current_graph: active_graph}); //this.senseClick();
  },
  render: function(){
    //yell();
    var act_assignment = this.props.act_assign;
    return (
    <div>
      <PieChart_Incorrect_Correct act_assign={act_assignment}/>
      <BarChart_Space_Complexity/>
      <BarChart_Lines_Code/>
      <BarChart_Time_Complexity/>
      <BarChart_Lines_Code/>
      <BarChart_Loop_Percent/>
      <PieChart_Attempt_Count/>
      <BarChart_DataStruct_Percent/>
      <BarChart_Comment_Percent/>
      <BarChart_Size_Metric/>
    </div>
    );
  }
});


var Activity_Panel = React.createClass({
  getInitialState: function(){
    return {my_stub: ""};
  },
  componentDidMount: function(){
    //setInterval(2000);
    //window.alert(active_graph);
    //yell();
  },
  senseClick: function(){
    //yell();
    //this.setState({current_graph: active_graph}); //this.senseClick();
  },
  render: function(){
    return (
    <div className=".activity_Panel">
      <div className="col-md-10">
        <div className="content-container">
          <div className="all-graph">
              <GraphContainerList act_assign={this.props.act_assign}/>
          </div>
        </div>
      </div>
    </div>
    );
  }
});

/****************** Graph Directory End ******************/


/****************** Graph Selection Directory Begin ******************/
var Graph = React.createClass({
  getInitialState: function(){
    // Takes control of the individual student's check boxes
    return {check: false};
  },
  onChange: function(e){
    //active_graph = this.props.stud_name;

    //window.alert("active graph = " + active_graph);

    switch(this.props.stud_name){
      case("Space Complexity"):{
          graph_tag = ".barChart_Space_Complexity";
        break;
      }
      case("Correct-Incorrect"):{
          graph_tag = ".pieChart_Incorrect_Correct";
        break;
      }
      case("Time Complexity"):{
          graph_tag = ".barChart_Time_Complexity";
        break;
      }
      case("Number of Lines"):{
          graph_tag = ".barChart_Lines_Code";
        break;
      }
      case("Class Rank"):{
          graph_tag = "";
        break;
      }
      case("Loop Counter"):{
          graph_tag = ".barChart_Loop_Percent";
        break;
      }
      case("Attempt Count"):{
          graph_tag = ".pieChart_Attempt_Count";
        break;
      }
      case("Comment Count"):{
          graph_tag = ".barChart_Comment_Percent"; // This needs to be re-set to another class in future
        break;
      }
      case("Data Structures"):{
          graph_tag = ".barChart_DataStruct_Percent";
        break;
      }
      case("Nested Loop Count"):{
          graph_tag = "";
        break;
      }
      case("Comment-Code Ratio"):{
          graph_tag = ".barChart_Comment_Percent";
        break;
      }
      case("Clusters"):{
          graph_tag = "";
        break;
      }
      case("Popular Functions"):{
          graph_tag = "";
        break;
      }
      case("Statistics"):{
          graph_tag = "";
        break;
      }
      case("Total Submissions"):{
          graph_tag = "";
        break;
      }
      case("Size Metric"):{
          graph_tag = ".barChart_Size_Metric";
        break;
      }
      default:{

      }
    }
    show();
    //React.render(,getElementsByClassName("graph-container"));
    //ReactDOM.render(<GraphContainerList/>, document.getElementsByClassName('all-graph'));
    //GraphContainerList.senseClick();
    //window.alert(graph_tag);
  },
  render: function(){
    return (
      <li>
        <a href="#" onClick={this.onChange}>
          <i className={"fa fa-" + this.props.icon_type}>&nbsp;</i>{this.props.stud_name}
        </a>
      </li>
    );
  }
});

/* GraphList Begins*/
var GraphList = React.createClass({
  render: function(){
  var graph_button_selectors = [{"innerHTMLs":"Correct-Incorrect","iconTYPEs":"th-large"},
                               {"innerHTMLs":"Space Complexity","iconTYPEs":"database"},
                               {"innerHTMLs":"Time Complexity","iconTYPEs":"clock-o"},
                               {"innerHTMLs":"Number of Lines","iconTYPEs":"align-justify"},
                               {"innerHTMLs":"Class Rank","iconTYPEs":"bar-chart"},
                               {"innerHTMLs":"Loop Counter","iconTYPEs":"circle-o-notch"},
                               {"innerHTMLs":"Attempt Count","iconTYPEs":"repeat"},
                               {"innerHTMLs":"Nested Loop Count","iconTYPEs":"align-left"},
                               {"innerHTMLs":"Popular Functions","iconTYPEs":"sign-in"},
                               {"innerHTMLs":"Size Metric","iconTYPEs":"file-text"}];

  var graph_button_mapping = graph_button_selectors.map(function(graph_data){
    //window.alert(graph_data.innerHTMLs + " " + graph_data.iconTYPEs);
    return (<Graph stud_name={graph_data.innerHTMLs} icon_type={graph_data.iconTYPEs}/>);
  });
  var graph_select = (
          <ul className="graphList nav nav-second-level">
            {graph_button_mapping}
          </ul>
    );
    return graph_select;
  }
});

/*
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
*/

/****************** Graph Selection Directory End ******************/

/****************** Main Begin ******************/
var MasterGraphContainer = React.createClass({
  getInitialState: function(){
    return {title: "Welcome",
            description: "Pick an assignment and then a graph to see your learning analytics!",
            active_graph: "",
            active_assignment: "556"};
  },
  /*assignmentChosen: function(){
    //this.setState({title:new_title,description:new_descrpt});
  },*/
  componentDidMount: function(){
  },
  setActiveAssignment: function(){

    this.setState({active_assignment: "470"});
  },
  render:function(){
    return (
      <div className="masterGraphContainer">
        <div className="content-toolbar">
        </div>
        <div className="content-body" >
          <div className="col-md-2">
            <div className="property-container">
              <div id="wrapper">
                <nav className="navbar" role="navigation">
                  <div className="description-box">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.description}</p>
                  </div>
                  <div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                      <ul className="nav" id="side-menu">
                        <li className="col-md-12">
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Graphs<span className="fa arrow"></span></a>
                            <GraphList/>
                        </li>
                        <li className="col-md-12">
                            <a href="#"><i className="fa fa-book fa-fw"></i> Assignments<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                  <AssignmentBox url="/assignments" pollInterval={2000} assignmentClick={this.setActiveAssignment}/>
                                </li>
                            </ul>
                        </li>
                        <li className="col-md-12">
                          <a href="#"><i className="fa fa-user fa-fw"></i> Students<span className="fa arrow"></span></a>
                          <ul className="nav nav-second-level" style={{"minHeight": "250px"}}>
                            <li>
                                <StudentForm/>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <Activity_Panel act_assign={this.state.active_assignment}/>
        </div>
      </div>
    );
  }
});

/****************** Main End ******************/

ReactDOM.render(<MasterGraphContainer/>, document.getElementById('content'));

// Intitially Set the Graph to be hidden so the user can pick one
$(".graph-container").offset({top: 60});

// this hides all graphs
all_graphs.map(function(graph_type){
  $("div" + graph_type).hide();
});

// initially show the active graph
show();
