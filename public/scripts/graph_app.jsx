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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Stack(){
 this.stac=new Array();
 this.pop=function(){
  return this.stac.pop();
 }
 this.push=function(item){
   if(this.size() > 7){
     this.stac.shift();
   }
  this.stac.push(item);

 }
 this.print=function(){
   window.alert(this.stac);
 }
 this.size=function(){
   return this.stac.length;
 }
}

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

/*Treat the following as CONSTANTS*/
var graph_widths = 1000; //250; //500;  // 1000;
var graph_heights = 480; //123; //245; // 490;
var graph_R = Math.round(graph_heights/3);
var graph_r = 20;

// test functionality for couting
var yell = function(yelling_what = ""){
  window.alert("YELLING " + yelling_what);
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
                        <div className="graph-x">
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
                        <div className="graph-x" >
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
    test_func: function(new_label, new_value) {
      this.setState({myLabel: new_label, myValue: new_value});
      window.alert("last myLabel = " + this.state.myLabel + " last myValue = " + this.state.myValue);
    },
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

    return {pieData: pieData, colorFunction: colorFunction, last_assign:"556",  myLabel: "unknown", myValue: -1};
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
                          <div className="graph-x" >
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                  			<PieChart
					  test_func={this.test_func}
                  			  data={this.state.pieData}
                  			  width={graph_widths}
                  			  height={graph_heights}
                  			  radius={graph_R}
                  			  colors={this.state.colorFunction}
                  			  innerRadius={graph_r}
                  			  sectorBorderColor="white"
                  			  //title="Pie Chart"
                  			/>
                        </div>
                       </div>
                     </div>
                   </div>);
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
                        <div className="graph-x" >
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
                        <div className="graph-x" >
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
                        <div className="graph-x" >
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
                      <div className="graph-x" >
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
    test_func: function(new_xx, new_yy) {
      this.setState({xx: new_xx, yy: new_yy});
      window.alert("last New_xx = " + this.state.xx + " last New_yy = " + this.state.yy);
    },
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
      return {data: barData, xx: -1, yy: -1};
    },
    componentDidMount: function(){
      this.loadSizeMetricFromServer();
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
                          <div className="graph-x" >
                            <i className="fa fa-times"></i>
                          </div>
                        </div>
                        <BarChart
			  			  test_func={this.test_func}
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
  setActiveAssignment: function(new_title = "Scoring for Oriented Dominoes", new_description = "The assignment description has been changed", new_id = "470"){
    this.props.setActiveAssignment(this.props.prob_statement,this.props.description,this.props.my_id);
  },
  render: function(){
    return (
    <div className="assignment">
      <button type="button" className="btn btn-primary" onClick={this.setActiveAssignment}>
        <h5>
          {this.props.prob_statement + ":"}
        </h5>
      </button>
      <span>{this.props.description}</span>
    </div>
    );
  }
});

var AssignmentList = React.createClass({
  setActiveAssignment: function(new_title = "Scoring for Oriented Dominoes", new_description = "The assignment description has been changed", new_id = "470"){
    this.props.setActiveAssignment(new_title,new_description, new_id);
  },
  render: function(){
    // commentNodes gets the values of all the json data as a mapping for each data element
    var setActiveAssignment = this.setActiveAssignment;
    var assignmentNodes = this.props.data.map(function(assignment){
      var id = assignment.id;
      return (
        <Assignment
          prob_statement={assignment.title}
          key={id}
          my_id={id}
          description={assignment.description_html}
          setActiveAssignment={setActiveAssignment}
        />);
    },this);
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
  },
  setActiveAssignment: function(new_title = "Scoring for Oriented Dominoes", new_description = "The assignment description has been changed", new_id = "470"){
    this.props.setActiveAssignment(new_title,new_description,new_id);
  },
  render: function(){
    var replac_tmp = (
        <div id="assignment_dir">
          <div>
            <div className="assignmentBox">
              <div>
                <AssignmentList
                  data={this.state.data}
                  setActiveAssignment={this.setActiveAssignment}
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
var Student = React.createClass({
  rawMarkup: function(){
    // Sanitizes input from the site as a security precaution
    var rawMarkup = marked(this.props.stud_name, {sanitize: true});
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
var StudentForm = React.createClass({
  getInitialState: function(){
      var this_loaded = new Trie();
      return ({prefix: [], data: [],trie: this_loaded}); // iniitially the user hasnt entered anything into the search box
  },
  // in the case the user clicks the search box
  onGo: function(){
    // Get elements of the same class results in multiple elements being grabbed, so need to specify the 0th
    var searched = document.getElementsByClassName("form-control")[0].value;
    // this is just for string formatting since the "Student" component of the string isnt saved in the Trie - only the id_num is
    searched = searched.substring(8,searched.length);
    this.setState({prefix: this.state.trie.suggestions(searched)});
  },
  HandleEnter: function(event){
    if(event.charCode == 13){
      $("button.btn.btn-default").click();
    }
  },
  componentDidMount: function(){
    this.loadStudentsFromServer();
  },
  loadStudentsFromServer: function(){
    $.ajax({
      url: "/dbtest",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        // initially load up the trie tree
        var temp_trie = new Trie();
        temp_trie.add(" ");
        var temp_arr = new Array();
        data.map(function(student){
          var student_name = student.player_id.toString(); /**HERE HERE**/

          // Only add it if it does not already exist. We do not want duplicates
          if(temp_trie.find(student_name) == null){
          //  window.alert(student_name);
            temp_trie.add(student_name);
            temp_arr.push(student_name);
          }
        });
        this.setState({trie: temp_trie, prefix: temp_arr});
      }.bind(this),
      // in the case ajax runs into an error
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
  //initialized to hold everything
  var set_arr = this.state.prefix;
  var studentNodes = set_arr.map(function(student_name){
    var stud_node = null;
    if($.inArray(student_name, set_arr) != -1){
      stud_node = (<Student stud_name={student_name} key={student_name}/>);
    }
    return stud_node;
  });
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
          <div className="studentList">
            <Student stud_name={"Select All"}/>
            {studentNodes}
          </div>
          </form>
        </div>
      </div>
    );
  }
});

/****************** Student Directory End ******************/

var Activity_Panel = React.createClass({
  getInitialState: function(){
    return {active_graph: null,
            active_assignment:{
                          title: "",
                          description: "",
                          id: ""
                        }
          };
  },
  componentWillMount: function(){
    this.setState({active_assignment:this.props.active_assignment,active_graph:this.props.active_graph});
  },
  render: function(){
    //yell("assignment updated to " + this.props.active_assignment.id);


    // ensure the graph is up to date
    var ActiveGraph = React.cloneElement(this.props.active_graph, {act_assign:this.props.active_assignment.id}, null);
/*
<h4>
  Selected Assignment:
</h4>
*/
    return (
    <div className=".activity_Panel">
      <div className="col-md-10">
        <div className="content-container">
          <div className="assignment_Description">
            <div className="submission_counter-container">
              <h7>Submissions: 2342</h7>
            </div>
            <div className="h4-container">
              <h4>
                <span>{this.props.active_assignment.title}</span>
              </h4>
            </div>
            <p>{this.props.active_assignment.description}</p>
          </div>
          <div className="assignment_Flags">
            <div className="alert alert-warning" role="alert">
                  <h4>
                    Assignment Flags:
                  </h4>
                  <h4>
                    <span>No Flags</span>
                  </h4>
                  <p>This assignment has no flags or outliers to report</p>
            </div>
          </div>
          <div className="all-graph">
              {ActiveGraph}
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
    return {active_assignment_id: ""};
  },
  setActiveGraph: function(new_graph = null){
    this.props.setActiveGraph(new_graph);
  },
  getInitialState: function(){
    // Takes control of the individual student's check boxes
    return {check: false};
  },
  componentWillMount: function(){
    this.setState({active_assignment_id: this.props.active_assignment_id});
  },
  onChange: function(e){
    var new_graph = null;
    //window.alert(this.props.active_assignment_id);

    switch(this.props.stud_name){ // act_assign={this.props.active_assignment_id}
      case("Correct-Incorrect"):{
        new_graph = <PieChart_Incorrect_Correct/>;
        break;
      }
      case("Space Complexity"):{
        new_graph = <BarChart_Space_Complexity/>;
        break;
      }
      case("Time Complexity"):{
        new_graph = <BarChart_Time_Complexity/>;
        break;
      }
      case("Number of Lines"):{
        new_graph = <BarChart_Lines_Code/>;
        break;
      }
      case("Class Rank"):{
        break;
      }
      case("Loop Counter"):{
        new_graph = <BarChart_Loop_Percent/>;
        break;
      }
      case("Nested Loop Count"):{
        new_graph = <BarChart_Loop_Count/>;
        break;
      }
      case("Popular Functions"):{
        break;
      }
      case("Size Metric"):{
          new_graph = <BarChart_Size_Metric/>;
        break;
      }
      default:{}
    }
    //new_graph.props.act_assign = this.props.active_assignment.id;

    this.setActiveGraph(new_graph);
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
  setActiveGraph: function(new_graph = null){
    this.props.setActiveGraph(new_graph);
  },
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
  var setActiveGraph = this.setActiveGraph;
  var active_id = this.props.active_assignment_id;
  var graph_button_mapping = graph_button_selectors.map(function(graph_data){
    //window.alert(graph_data.innerHTMLs + " " + graph_data.iconTYPEs);
    return (<Graph stud_name={graph_data.innerHTMLs}
                   icon_type={graph_data.iconTYPEs}
                   setActiveGraph={setActiveGraph}
                   active_assignment_id={active_id}
                 />);
  });
  var graph_select = (
          <ul className="graphList nav nav-second-level">
            {graph_button_mapping}
          </ul>
    );
    return graph_select;
  }
});

/****************** Graph Selection Directory End ******************/

/****************** Main Begin ******************/
var global = {
  forward_stack:new Stack(),
  backward_stack:new Stack()
};

var MasterGraphContainer = React.createClass({
  getInitialState: function(){
    return {title: "Welcome",
            description: "Pick an assignment and then a graph to see your learning analytics!",
            active_graph: null,
            active_assignment:{
                                title: "Stuff the Board!",
                                description: "This is only a temporary stub",
                                id: "556"
                              },
            //forward_stack: new Stack(),
            //backward_stack: new Stack(),
            activity_window: <Activity_Panel/>
          };
  },
  componentDidMount: function(){
  },
  componentWillMount: function(){
    var first_graph = <PieChart_Incorrect_Correct act_assign={this.state.active_assignment.id}/>;
    this.setState({active_graph: first_graph,
                  activity_window: <Activity_Panel
                                    active_assignment={this.state.active_assignment}
                                    active_graph={first_graph}
                                   />
    });
  },
  clickedBack: function(old_window){
    global.forward_stack.push(old_window);
    if(global.backward_stack.size() > 0){
      this.setState({activity_window: global.backward_stack.pop()});
    }
    // yell("clicked back");
  },
  clickedForward: function(old_window){
    global.backward_stack.push(old_window);
    if(global.forward_stack.size() > 0){
      this.setState({activity_window: global.forward_stack.pop()});
    }
    // yell("clicked forward");
  },
  setActiveGraph: function(new_graph = null){
    var new_active_window = (<Activity_Panel
                              active_assignment={this.state.active_assignment}
                              active_graph={new_graph}
                             />);
    this.setState({active_graph: new_graph,
                  activity_window: new_active_window
    });
    //global.backward_stack.push(new_active_window);
    global.backward_stack.push(this.state.activity_window);
  },
  setActiveAssignment: function(new_title = "Scoring for Oriented Dominoes", new_description = "The assignment description has been changed", new_id = "470"){
    var new_assignment = {
                          title: new_title,
                          description: new_description,
                          id: new_id
    }
    var new_active_window = (<Activity_Panel
                              active_assignment={new_assignment}
                              active_graph={this.state.active_graph}
                             />);
    this.setState({
      active_assignment: new_assignment,
      activity_window: new_active_window
    });
    //global.backward_stack.push(new_active_window);
    global.backward_stack.push(this.state.activity_window);
    //yell("set window");
  },
  render:function(){
    yell("backstack size: " + global.backward_stack.size() + " frontstack size: " + global.forward_stack.size());
    var Activity_Window = <Activity_Panel active_assignment={this.state.active_assignment} active_graph={this.state.active_graph}/>;
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
                    <div className="fb-container">
                      <div className="btn-group" role="group">
                        <button onClick={this.clickedBack.bind(this,Activity_Window)} type="button" className="btn btn-default btn-sm"><i className="fa fa-arrow-left"></i></button>
                        <button onClick={this.clickedForward.bind(this,Activity_Window)} type="button" className="btn btn-default btn-sm"><i className="fa fa-arrow-right"></i></button>
                      </div>
                    </div>
                  </div>
                  <div className="navbar-default sidebar" role="navigation">
                    <div className="sidebar-nav navbar-collapse">
                      <ul className="nav" id="side-menu">
                        <li className="col-md-12">
                            <a href="#"><i className="fa fa-bar-chart-o fa-fw"></i> Graphs<span className="fa arrow"></span></a>
                            <GraphList active_assignment_id={this.state.active_assignment.id} setActiveGraph={this.setActiveGraph}/>
                        </li>
                        <li className="col-md-12">
                            <a href="#"><i className="fa fa-book fa-fw"></i> Assignments<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level">
                                <li>
                                  <AssignmentBox url="/assignments" pollInterval={2000} setActiveAssignment={this.setActiveAssignment}/>
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
          {this.state.activity_window}
        </div>
      </div>
    );
  }
}); // {Activity_Window}

/****************** Main End ******************/

ReactDOM.render(<MasterGraphContainer/>, document.getElementById('content'));
