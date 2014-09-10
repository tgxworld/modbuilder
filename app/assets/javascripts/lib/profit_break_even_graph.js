//= require 'lib/base'

(function($) {
  var ProfitBreakEvenGraph = {
    _init: function() {
      var widget = this;

      nv.addGraph(function() {
        var chart = nv.models.lineChart()
          .margin({left: 100, right: 100})  //Adjust chart margins to give the x-axis some breathing room.
          .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
          .transitionDuration(350)  //how fast do you want the lines to transition?
          .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
          .showYAxis(true)        //Show the y-axis
          .showXAxis(true)        //Show the x-axis
        ;

        chart.xAxis     //Chart x-axis settings
          .axisLabel("Annual Output")

        chart.yAxis     //Chart y-axis settings
          .axisLabel('Cost / Revenue')

        /* Done setting the chart up? Time to render it!*/
        var myData = widget._generateLineData();

        d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.
          .datum(myData)         //Populate the <svg> element with chart data...
          .call(chart);          //Finally, render the chart!

        //Update the chart when window resizes.
        nv.utils.windowResize(function() { chart.update() });

        d3.selectAll('input').each(function() {
          d3.select(this).on('input', function() {
            widget._updateChart(chart);
          })
        });

        return chart;
      });
    },

    _updateChart: function(chart) {
      var myData = this._generateLineData();

      d3.select('#chart svg')
        .datum(myData)
        .call(chart)
    },

    _generateLineData: function() {
      var revenue = parseInt(d3.select('input[name=revenue]').property('value'));
      var labourCost = parseInt(d3.select('input[name=labour_cost]').property('value'));
      var machineCost = parseInt(d3.select('input[name=machine_cost]').property('value'));
      var maintenanceCost = parseInt(d3.select('input[name=maintenance_cost]').property('value'));
      var salvageValue = parseInt(d3.select('input[name=salvage_value]').property('value'));
      var serviceLife = parseInt(d3.select('input[name=service_life]').property('value'));
      var productionRate = parseInt(d3.select('input[name=production_rate]').property('value'));
      var machineOverheadRate = parseInt(d3.select('input[name=machine_overhead_rate]').property('value'));
      var labourOverhead = parseInt(d3.select('input[name=labour_overhead]').property('value'));
      var rateOfReturn = parseInt(d3.select('input[name=rate_of_return]').property('value'));

      var variableCostOfLabour = calculateVariableCostofLabour(labourCost, labourOverhead, productionRate);
      var uniformAnnualCost = calculateUniformAnnualCost(machineCost, maintenanceCost, salvageValue, rateOfReturn, serviceLife);
      var uniformAnnualCostWithOverhead = calculateUniformAnnualCostWithMachineOverhead(uniformAnnualCost, machineOverheadRate);

      var revenueData = [];
      var costData = [];

      this._setBreakEvenValues(revenue, uniformAnnualCostWithOverhead, variableCostOfLabour, productionRate);

      for (var units = 0; units <= 1000; units++) {
        var unitsScale = units * 100;
        var revenuePoint = calculateRevenue(revenue, unitsScale);
        var costPoint = calculateCost(uniformAnnualCostWithOverhead, variableCostOfLabour, unitsScale)

        revenueData.push({ x: unitsScale, y: revenuePoint });
        costData.push({ x: unitsScale, y: costPoint });

        if ((revenuePoint - 10000) > costPoint) break;
      }

      //Line chart data should be sent as an array of series objects.
      return [
        {
          values: revenueData,      //values - represents the array of {x,y} data points
          key: 'Revenue', //key  - the name of the series.
          color: '#ff7f0e'  //color - optional: choose your own line color.
        },
        {
          values: costData,
          key: 'Total Cost',
          color: '#2ca02c'
        }
      ];
    },

    _setBreakEvenValues: function(revenue, cost, variableCost, productionRate) {
      units = (cost / (revenue - variableCost));
      time = (units / productionRate);
      d3.select('input[name=profit_break_even_point]').property('value', units.toFixed(2));
      d3.select('input[name=total_time_required]').property('value', time.toFixed(2));
    }
  }

  $.widget('custom.profitBreakEvenGraph', ProfitBreakEvenGraph);
})(jQuery);
