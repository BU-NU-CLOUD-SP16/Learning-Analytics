var React = require('react');
var ReactDOM = require('react-dom');
var rd3 = require('react-d3');
var ReactBootstrap = require('react-bootstrap');
var TabbedArea = ReactBootstrap.TabbedArea;
var TabPane = ReactBootstrap.TabbedPane;
var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;
var Tooltip = require('react-d3-tooltip');
var BarTooltip = Tooltip.BarTooltip;
var BarChart = rd3.BarChart;
var PieChart = rd3.PieChart;
var PieTooltip = Tooltip.PieTooltip;
var SimpleTooltipStyle = require('react-d3-tooltip').SimpleTooltip;
var Trie = require('./trie').Trie;

//generate custom legend for a graph
genLegend = function(xxlabel, yylabel){
//Size Range
//Number of Submissions
  return (<div className="legend-container">
            <h4 className="legend">Legend:</h4>
            <div className="axis-label-container">
              <h5>X: {xxlabel}</h5>
              <h5>Y: {yylabel}</h5>
            </div>
          </div>);
}


// binning code
function countToBarChart(lineArray, binWidth){
    lineArray.sort(function(a, b){
        return a -b;
    });
    var maximum = lineArray[lineArray.length - 1];

    // Do the histogram in increments of 50
    var blockSize = binWidth * 5
    var upperBound = (Math.floor(maximum / blockSize) + 1)*blockSize;
    var lowerBound = 0;

    //var binWidth = 10;
    var numOfBins = (upperBound - lowerBound) / binWidth;

    var histogram = Array.apply(null, Array(numOfBins)).map(Number.prototype.valueOf, 0);

    var binIndex = 0;
    for(var i = 0; i < lineArray.length; i++){
        // Check to see if the code length is too big for the bin
        while(lineArray[i] >= (binIndex + 1)*binWidth) binIndex += 1;
        histogram[binIndex] += 1;
    }

    // Create associative array to send back
    var barData = [];
    for(binIndex = 0; binIndex < numOfBins; binIndex++){
        var lowerLabel = binWidth * binIndex;
        var upperLabel = lowerLabel + (binWidth - 1);
        if (binWidth > 1)
            var label = lowerLabel.toString() + "-" + upperLabel.toString();
        else
            var label = lowerLabel.toString()
        barData.push({"x": label, "y": histogram[binIndex]});
    }
    return barData;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
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
              yTicks: yTicks,
              last_assign:"0",};
    },loadLineCountMetricFromServer: function(){
      $.ajax({
        url: "/problem/" + this.props.act_assign + "/metrics/linecount", //"/problem/" + selected_id + "/linecount",    //selected_id = 470;
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
      if(this.state.last_ass != this.props.act_assign){
        this.loadLineCountMetricFromServer();
      }
        return (
          <div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Lines_Code">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                        Lines of Code
                        </h3>
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

var BarChart_Attempts_Til_Correct = React.createClass({
    getInitialState : function() {
    	var chartSeries = [
    	      {
    	        field: 'y',
    	        name: 'Submissions.Attempts Until Correct'
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
              yTicks: yTicks,
              last_assign:"0",};
    },loadLineCountMetricFromServer: function(){
      $.ajax({
        url: "/problem/" + this.props.act_assign + "/metrics/first_correct", //"/problem/" + selected_id + "/linecount",    //selected_id = 470;
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
      if(this.state.last_ass != this.props.act_assign){
        this.loadLineCountMetricFromServer();
      }
        return (
          <div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Attempts_Til_Correct">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                        Attempts Until Correct
                        </h3>
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
      var is_correct = (new_value == "correct")?(true):(false); // true or false //is_correct={is_correct}
      this.props.setActiveGraph(<L1FilterContainer correct_sub={is_correct} act_assign={this.props.act_assign}/>);
      this.props.setFilteredMode(1); //indicating that you are transitioning to the L1 mode
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

    return {pieData: pieData, colorFunction: colorFunction, last_assign:"0",  myLabel: "unknown", myValue: -1};
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
              yTicks: yTicks,
              last_assign:"0",};
    },loadSizeMetricFromServer: function(){
      $.ajax({
        url: "/problem/" + this.props.act_assign + "/metrics/size", //"/problem/" + selected_id + "/linecount",    //selected_id = 470;
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
      this.loadSizeMetricFromServer();
      //introduces that we will need a pollInterval for the external element
    //  setInterval(this.loadSizeMetricFromServer);
    },
    test_func: function(new_xx, new_yy) {
      this.setState({xx: new_xx, yy: new_yy});
      window.alert("last New_xx = " + new_xx + " last New_yy = " + new_yy);
    },
    render: function() {
      if(this.state.last_ass != this.props.act_assign){
        this.loadSizeMetricFromServer();
      }
        return (
          <div className="graph-container col-md-4">
                <div className="graphContainerList">
                  <div className="barChart_Size_Metric">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <h3>
                        Lines of Code
                        </h3>
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

/****************** Chart Implementation End ******************/

var strToUpperLower = function(clickedRange){
  var length = clickedRange.length;
  var whereHyph = clickedRange.indexOf("-");
  var lower = function(){
    temp = "";
    for(var ii = 0; ii < whereHyph; ii++){
      temp += clickedRange[ii];
    }
    return temp;
  };
  var higher = function(){
    temp = "";
    for(var ii = whereHyph + 1; ii < length; ii++){
      temp += clickedRange[ii];
    }
    return temp;
  };

  var low = lower();
  var high = higher();

  couple = {"lowBound": low, "highBound": high};
  //window.alert(JSON.stringify(couple));
  return couple;
}

/** Filtered Graphs Start**/

var active_code_size = {};
var F1_BarChart_Size_Metric = React.createClass({
    test_func: function(new_xx, new_yy) {
      this.setState({xx: new_xx, yy: new_yy}); // This purpose is not clear yet
      if(new_xx.indexOf("student") == -1){
        var pair = strToUpperLower(new_xx);
        //pair.lowBound pair.highBound
          $.ajax({
            url: "/solutions/fromhistogram?lowerbound=" + pair.lowBound + "&upperbound=" + pair.highBound + "&problemid=" + this.props.act_assign + "&correct=" + this.props.is_correct + "&submetric=size",
            dataType: 'json',
            cache: false,
            success: function(data) {
              json_size = 0;
              //get how many submission/datapoints there are
              while(data[json_size]){
                json_size++;
              }
              var lineArray = [];
              for(var ii = 0; ii < json_size; ii++){
                  lineArray.push({"x":("student " + data[ii].player_id),"y":data[ii].size});
                  active_code_size[("student " + data[ii].player_id)] = data[ii].body; //HERE HERE
              }
              var loaded_barData = lineArray; //[{},{}]//countToBarChart(lineArray, 5);

              var barData = [{
              	"name":"Class A",
              	"values":loaded_barData}
              ];

              this.setState({barData: barData});
              //window.alert(barData);
            }.bind(this),
            // in the case ajax runs into an error
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
      }
      // this case is when you are clicking a specific student xx & yy take on a new meaning
      else{
        //window.alert(new_xx + " " + new_yy);
        window.alert(new_xx + "'s solution: " + '\n' + '\n' + active_code_size[new_xx]);
      }

    },
    getInitialState : function() {
      var barData = [{
          "name":"Class A",
          "values":[
        {"x": 'A', "y": 245},
        {"x": 'B', "y": 543},
        {"x": 'C', "y": 1093},
        {"x": 'D', "y": 5643},
        {"x": 'E', "y": 37},
        {"x": 'F', "y": 7854},
        {"x": 'G', "y": 645},
        {"x": 'H', "y": 2443},
        {"x": 'J', "y": 5544},
        {"x": 'K', "y": 769},
        {"x": 'L', "y": 343},
        {"x": 'M', "y": 4433},
        {"x": 'N', "y": 354},
        {"x": 'O', "y": 3654},
        {"x": 'P', "y": 788},
        {"x": 'Q', "y": 667},
        {"x": 'R', "y": 6587},
        {"x": 'S', "y": 665},
        {"x": 'T', "y": 2343},
        {"x": 'U', "y": 45},
        {"x": 'V', "y": 6645},
        {"x": 'W', "y": 9786},
        {"x": 'X', "y": 232},
        {"x": 'Y', "y": 4345},
        {"x": 'Z', "y": 5675}
       ]}
      ];
      return {barData: barData, xx: -1, yy: -1};
    },loadLineCountMetricFromServer: function(){
      $.ajax({
        url: "/solutions/fromhistogram?lowerbound=1&upperbound=1000&problemid=" + this.props.act_assign + "&correct=" + this.props.is_correct + "&submetric=size", //"/problem/" + this.props.act_assign + "/metrics/linecount", //"/problem/" + selected_id + "/linecount",    //selected_id = 470;
        dataType: 'json',
        cache: false,
        success: function(data) {
          json_size = 0;
          //get how many submission/datapoints there are
          while(data[json_size]){
            json_size++;
          }
          var lineArray = [];
          for(var ii = 0; ii < json_size; ii++){
              lineArray.push(data[ii].size);
          }
          var loaded_barData = countToBarChart(lineArray, 5);

          var barData = [{
          	"name":"Class A",
          	"values":loaded_barData}
          ];

          this.setState({barData: barData});
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
      /*if(this.state.last_ass != this.props.act_assign){
        this.loadLineCountMetricFromServer();
      }*/

      var new_width = (graph_widths * 0.9);
      var new_height = (graph_heights * 0.9);

        return (
          <div className="graph-container col-md-4">
                <BarChart
                  test_func={this.test_func}
                  data={this.state.barData}
                  width={1000}
                  height={490}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />

              {genLegend("Size Range","Number of Submissions")}

               </div>);
    }
});

var active_code_linecount = {};
var F1_BarChart_Lines_Code = React.createClass({
    test_func: function(new_xx, new_yy) {
      this.setState({xx: new_xx, yy: new_yy}); // This purpose is not clear yet
      if(new_xx.indexOf("student") == -1){
        var pair = strToUpperLower(new_xx);
        //pair.lowBound pair.highBound
          $.ajax({
            url: "/solutions/fromhistogram?lowerbound=" + pair.lowBound + "&upperbound=" + pair.highBound + "&problemid=" + this.props.act_assign + "&correct=" + this.props.is_correct + "&submetric=linecount",
            dataType: 'json',
            cache: false,
            success: function(data) {
              json_size = 0;
              //get how many submission/datapoints there are
              while(data[json_size]){
                json_size++;
              }
              var lineArray = [];
              for(var ii = 0; ii < json_size; ii++){
                  lineArray.push({"x":("student " + data[ii].player_id),"y":data[ii].linecount});
                  active_code_linecount[("student " + data[ii].player_id)] = data[ii].body; //HERE HERE
              }
              var loaded_barData = lineArray; //[{},{}]//countToBarChart(lineArray, 5);

              var barData = [{
                "name":"Class A",
                "values":loaded_barData}
              ];
              this.setState({barData: barData});
            }.bind(this),
            // in the case ajax runs into an error
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
      }
      // this case is when you are clicking a specific student xx & yy take on a new meaning
      else{
        //window.alert(new_xx + " " + new_yy);
        window.alert(new_xx + "'s solution: " + '\n' + '\n' + active_code_linecount[new_xx]);
      }
    },
    getInitialState : function() {
      var barData = [{
          "name":"Class A",
          "values":[
        {"x": 'A', "y": 245},
        {"x": 'B', "y": 543},
        {"x": 'C', "y": 1093},
        {"x": 'D', "y": 5643},
        {"x": 'E', "y": 37},
        {"x": 'F', "y": 7854},
        {"x": 'G', "y": 645},
        {"x": 'H', "y": 2443},
        {"x": 'J', "y": 5544},
        {"x": 'K', "y": 769},
        {"x": 'L', "y": 343},
        {"x": 'M', "y": 4433},
        {"x": 'N', "y": 354},
        {"x": 'O', "y": 3654},
        {"x": 'P', "y": 788},
        {"x": 'Q', "y": 667},
        {"x": 'R', "y": 6587},
        {"x": 'S', "y": 665},
        {"x": 'T', "y": 2343},
        {"x": 'U', "y": 45},
        {"x": 'V', "y": 6645},
        {"x": 'W', "y": 9786},
        {"x": 'X', "y": 232},
        {"x": 'Y', "y": 4345},
        {"x": 'Z', "y": 5675}
       ]}
      ];
      return {barData: barData, xx: -1, yy: -1};
    },loadLineCountMetricFromServer: function(){
      $.ajax({
        url: "/solutions/fromhistogram?lowerbound=1&upperbound=1000&problemid=" + this.props.act_assign + "&correct=" + this.props.is_correct + "&submetric=linecount", //"/problem/" + this.props.act_assign + "/metrics/linecount", //"/problem/" + selected_id + "/linecount",    //selected_id = 470;
        dataType: 'json',
        cache: false,
        success: function(data) {
          json_size = 0;
          //get how many submission/datapoints there are
          while(data[json_size]){
            json_size++;
          }
          var lineArray = [];
          for(var ii = 0; ii < json_size; ii++){
              lineArray.push(data[ii].linecount);
          }
          var loaded_barData = countToBarChart(lineArray, 5);

          var barData = [{
          	"name":"Class A",
          	"values":loaded_barData}
          ];

          this.setState({barData: barData});
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
      /*if(this.state.last_ass != this.props.act_assign){
        this.loadLineCountMetricFromServer();
      }*/

      var new_width = (graph_widths * 0.9);
      var new_height = (graph_heights * 0.9);

        return (
          <div className="graph-container col-md-4">
                <BarChart
                  test_func={this.test_func}
                  data={this.state.barData}
                  width={1000}
                  height={490}
                  fill={'#8a5715'}
                  title=''
                  margins={{top: 20, right: 30, bottom: 30, left: 40}}
                />
              {genLegend("Line Count Range","Number of Submissions")}
           </div>);

    }
});







/** Filtered Graphs End **/

/* Upon clicking the correct or incorrect portion of the splash graph,
   This is the filtered section that will be loaded.
*/
const L1FilterContainer = React.createClass({
  getInitialState() {
    return {
      key: 1
    };
  },
  setActiveGraph: function(new_graph = null){
    this.props.setActiveGraph(new_graph);
  },
  handleSelect(key) {
    this.setState({key});
  },

  render() {
    var metrics = [{"innerHTMLs":"Size Metric","iconTYPEs":"file-text","sub_graph":(<F1_BarChart_Size_Metric act_assign={this.props.act_assign} is_correct={this.props.correct_sub}/>)},
    {"innerHTMLs":"Number of Lines","iconTYPEs":"align-justify","sub_graph":(<F1_BarChart_Lines_Code act_assign={this.props.act_assign} is_correct={this.props.correct_sub}/>)}];
  //  {"innerHTMLs":"Attempts Until Correct","iconTYPEs":"align-justify"},
  //  {"innerHTMLs":"Space Complexity","iconTYPEs":"database"},
  //  {"innerHTMLs":"Time Complexity","iconTYPEs":"clock-o"},
    //   {"innerHTMLs":"Class Rank (null)","iconTYPEs":"bar-chart"},
    //   {"innerHTMLs":"Nested Loop Count","iconTYPEs":"align-left"},
    //   {"innerHTMLs":"Popular Functions (null)","iconTYPEs":"sign-in"},
  //  {"innerHTMLs":"Loop Counter","iconTYPEs":"circle-o-notch"}];

    var allTabs = function(tt){
      var createTabs = [];
      for(var ii = 1; ii < tt; ii++){ //{}"Tab " + ii}
        createTabs.push(<Tab className="tab" eventKey={ii} title={metrics[ii - 1].innerHTMLs}>
            {metrics[ii - 1].sub_graph}
          </Tab>
        );
      }
      return createTabs;
    }

    var sub_type = (this.props.correct_sub)?(
      <h4 style={{color:"rgb(137, 203, 124)"}}>Correct</h4>
      ):(<h4 style={{color:"rgb(215, 136, 136)"}}>Incorrect</h4>);

    return (
      <div className="l1FilterContainer">
        {sub_type}
        <Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
          {allTabs(metrics.length + 1)}
        </Tabs>
      </div>

    );
  }
});

/****************** Assignment Directory Implementation Begin ******************/

var Assignment = React.createClass({ //updateAssignment={this.props.updateAssignment(new_title, new_descrpt)}
  setActiveAssignment: function(new_title = "Scoring for Oriented Dominoes", new_description = "The assignment description has been changed", new_id = "470"){
    this.props.setActiveAssignment(this.props.prob_statement,$(this.props.description).html(),this.props.my_id);
  },
  render: function(){
    return (
    <div className="assignment">
      <button type="button" className="btn btn-primary" onClick={this.setActiveAssignment}>
        <h5>
          {this.props.prob_statement + ":"}
        </h5>
      </button>
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
      return ({prefix: [], data: [],trie: this_loaded, last_id:"0"}); // iniitially the user hasnt entered anything into the search box
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
      url: "/problem/" + this.props.active_assignment_id + "/students",  //    /problem/470/students
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
        this.setState({trie: temp_trie, prefix: temp_arr, last_id:this.props.active_assignment_id});
      }.bind(this),
      // in the case ajax runs into an error
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    // if the assignment_id is different, reload the students
    if(this.props.active_assignment_id != this.state.last_id){
      // This updating functionality needs to be implemented such that when a new problem id is selected
       this.loadStudentsFromServer();
    }


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
    var ActiveGraph = React.cloneElement(this.props.active_graph,
      {act_assign:this.props.active_assignment.id,
        setActiveGraph:this.props.setActiveGraph,
        setFilteredMode:this.props.setFilteredMode},
      null);

    return (
    <div className=".activity_Panel">
      <div className="col-md-10">
        <div className="content-container">
          <div className="assignment_Description">
            <div className="submission_counter-container">
              <h7>Submissions: {this.props.sub_count}</h7>
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
      case("Attempts Until Correct"):{
        new_graph = <BarChart_Attempts_Til_Correct/>;
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
                          //     {"innerHTMLs":"Space Complexity","iconTYPEs":"database"},
                          //     {"innerHTMLs":"Time Complexity","iconTYPEs":"clock-o"},
                               {"innerHTMLs":"Number of Lines","iconTYPEs":"align-justify"},
                  			       {"innerHTMLs":"Attempts Until Correct","iconTYPEs":"check"},
                          //     {"innerHTMLs":"Class Rank (null)","iconTYPEs":"bar-chart"},
                          //     {"innerHTMLs":"Loop Counter","iconTYPEs":"circle-o-notch"},
                               //{"innerHTMLs":"Attempt Count","iconTYPEs":"repeat"},
                          //     {"innerHTMLs":"Nested Loop Count","iconTYPEs":"align-left"},
                          //     {"innerHTMLs":"Popular Functions (null)","iconTYPEs":"sign-in"},
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
                                title: "Stuff the Board",
                                description: "You have a stack of tiles to put onto an array-like playing board. Each tile has a number (always an integer), and the board varies in size (you are given dimensions nRows and nCols). You need to put the high-value tiles on the table in any order.",
                                id: "556",
                              },
            submission_num: "652",
            activity_window: <Activity_Panel/>,
            filtered_mode: 0 //indicates if the user has drilled down, if so, they cannot select a different assignment
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
                                    setActiveGraph={this.setActiveGraph}
                                    sub_count={this.state.submission_num}
                                    setFilteredMode={this.setFilteredMode}
                                   />
    });
  },
  clickedBack: function(){
    if(global.backward_stack.size() > 0){
      global.forward_stack.push(this.state.activity_window);
    }
    //var new_filter_mode = (this.state.filtered_mode != 0)?(0):(1);
    var new_filter_mode;
    var new_active_window;
    var new_act_graph;
    // if you are in the filtered view, you will need to pop twice
    if(this.state.filtered_mode != 0){
        new_filter_mode = 0;
        if(global.backward_stack.size() > 1)
          global.backward_stack.pop();
        new_active_window = global.backward_stack.pop();
        new_act_graph = (<PieChart_Incorrect_Correct
                          act_assign={this.state.active_assignment.id}
                          setActiveGraph={this.setActiveGraph}
                          setFilteredMode={this.setFilteredMode}
                        />);
    }
    else{
        new_active_window = global.backward_stack.pop();
        new_act_graph = this.state.active_graph;
    }



    this.setState({activity_window: new_active_window, filtered_mode: new_filter_mode, active_graph:new_act_graph});
  },
  clickedForward: function(){
    if(global.forward_stack.size() > 0){
      global.backward_stack.push(this.state.activity_window);
      this.setState({activity_window: global.forward_stack.pop()});
    }
  },
  setFilteredMode: function(new_mode){
    //window.alert("filter set");
    this.setState({filtered_mode: new_mode});
  },
  setActiveGraph: function(new_graph = null){
    var new_active_window = (<Activity_Panel
                              active_assignment={this.state.active_assignment}
                              active_graph={new_graph}
                              setActiveGraph={this.setActiveGraph}
                              sub_count={this.state.submission_num}
                              setFilteredMode={this.setFilteredMode}
                             />);
    this.setState({active_graph: new_graph,
                  activity_window: new_active_window,
                  filtered_mode: 0
    });
    //global.backward_stack.push(new_active_window);
    global.backward_stack.push(this.state.activity_window);
  },
  setActiveAssignment: function(new_title = "Scoring for Oriented Dominoes", new_description = "The assignment description has been changed", new_id = "470"){
    // The user can only select a different graph if they are not drilled down
    if(this.state.filtered_mode == 0){
      var new_assignment = {
                            title: new_title,
                            description: new_description,
                            id: new_id,
      }

      global.backward_stack.push(this.state.activity_window);

      $.ajax({
        url: "/problem/" + new_id + "/student_submissions",
        dataType: 'json',
        cache: false,
        success: function(data) {
          var the_count = JSON.stringify(data[0].count);

          var new_active_window = (<Activity_Panel
                                    active_assignment={new_assignment}
                                    active_graph={this.state.active_graph}
                                    setActiveGraph={this.setActiveGraph}
                                    sub_count={the_count}
                                    setFilteredMode={this.setFilteredMode}
                                   />);
//

          this.setState({active_assignment: new_assignment,
            activity_window: new_active_window,
            submission_num: the_count
          });
      }.bind(this),
      // in the case ajax runs into an error
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
   }
   // In the case that you are drilled down in some capacity
   else{
     window.alert("Cannot select different assignment while drilling down. You can however select a different graph from the dropdown.");
   }
  },
  render:function(){
    //yell("backstack size: " + global.backward_stack.size() + " frontstack size: " + global.forward_stack.size());
    //var Activity_Window = <Activity_Panel active_assignment={this.state.active_assignment} active_graph={this.state.active_graph}/>;
    // .bind(this,Activity_Window) <- if you want to pass a parameter
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
                        <button onClick={this.clickedBack} type="button" className="btn btn-default btn-sm"><i className="fa fa-arrow-left"></i></button>
                        <button onClick={this.clickedForward} type="button" className="btn btn-default btn-sm"><i className="fa fa-arrow-right"></i></button>
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
                                <StudentForm active_assignment_id={this.state.active_assignment.id}/>
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
