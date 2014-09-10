//= require 'lib/base'

(function($) {
  var ProductionMethodCostBreakEvenGraph = {
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
      // Manual Method Calculation Start
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
      // Manual Method Calculation End

      // Automated Method Calculation Start
      var autoRevenue = parseInt(d3.select('input[name=auto_revenue]').property('value'));
      var autoLabourCost = parseInt(d3.select('input[name=auto_labour_cost]').property('value'));
      var autoMachineCost = parseInt(d3.select('input[name=auto_machine_cost]').property('value'));
      var autoMaintenanceCost = parseInt(d3.select('input[name=auto_maintenance_cost]').property('value'));
      var autoSalvageValue = parseInt(d3.select('input[name=auto_salvage_value]').property('value'));
      var autoServiceLife = parseInt(d3.select('input[name=auto_service_life]').property('value'));
      var autoProductionRate = parseInt(d3.select('input[name=auto_production_rate]').property('value'));
      var autoLabourOverhead = parseInt(d3.select('input[name=auto_labour_overhead]').property('value'));
      var autoMachineOverheadRate = parseInt(d3.select('input[name=auto_machine_overhead_rate]').property('value'));
      var autoRateOfReturn = parseInt(d3.select('input[name=auto_rate_of_return]').property('value'));

      var variable_cost_of_machine = calculateVariableCostofLabour(autoLabourCost, autoLabourOverhead, autoProductionRate);
      var uniformAnnualCost_machine = calculateUniformAnnualCost(autoMachineCost, autoMaintenanceCost, autoSalvageValue, autoRateOfReturn, autoServiceLife);
      var uniformAnnualCostWithOverhead_machine = calculateUniformAnnualCostWithMachineOverhead(uniformAnnualCost_machine, autoMachineOverheadRate);
      // Automated Method Calculation End

      var revenueData = [];
      var manualCostData = [];
      var autoCostData = [];

      this._setManualBreakEvenValues(revenue, uniformAnnualCostWithOverhead, variableCostOfLabour, productionRate);
      this._setAutoBreakEvenValues(autoRevenue, uniformAnnualCostWithOverhead_machine, variable_cost_of_machine, autoProductionRate);
      this._setManualAutoBreakEvenValues(uniformAnnualCostWithOverhead, uniformAnnualCostWithOverhead_machine, variableCostOfLabour, variable_cost_of_machine, productionRate, autoProductionRate);

      for (var units = 0; units <= 1000; units++) {
        var unitsScale = units * 100;
        var revenuePoint = calculateRevenue(revenue, unitsScale);
        var manualCostPoint = calculateCost(uniformAnnualCostWithOverhead, variableCostOfLabour, unitsScale);
        var autoCostPoint = calculateCost(uniformAnnualCostWithOverhead_machine, variable_cost_of_machine, unitsScale);

        revenueData.push({ x: unitsScale, y: revenuePoint });
        manualCostData.push({ x: unitsScale, y: manualCostPoint });
        autoCostData.push({ x: unitsScale, y:  autoCostPoint });

        if ((revenuePoint - 10000) > (autoCostPoint > manualCostPoint ? autoCostPoint : manualCostPoint)) break;
      }

      //Line chart data should be sent as an array of series objects.
      return [
        {
          values: revenueData,      //values - represents the array of {x,y} data points
          key: 'Revenue', //key  - the name of the series.
          color: '#ff7f0e'  //color - optional: choose your own line color.
        },
        {
          values: manualCostData,
          key: 'Manual Method Total Cost',
          color: '#2ca02c'
        },
        {
          values: autoCostData,
          key: 'Automated Method Total Cost',
          color: '#0033CC'
        }
      ];
    },

    _setManualBreakEvenValues: function(revenue, cost, variable_cost, productionRate) {
      units = (cost / (revenue - variable_cost));
      time = (units / productionRate);
      d3.select('input[name=profit_break_even_point]').property('value', units.toFixed(2));
      d3.select('input[name=total_time_required]').property('value', time.toFixed(2));
    },

    _setAutoBreakEvenValues: function(revenue, cost, variable_cost, productionRate) {
      units = (cost / (revenue - variable_cost));
      time = (units / productionRate);
      d3.select('input[name=auto_profit_break_even_point]').property('value', units.toFixed(2));
      d3.select('input[name=auto_total_time_required]').property('value', time.toFixed(2));
    },

    _setManualAutoBreakEvenValues: function(manual_cost, auto_cost, manual_variable_cost, auto_variable_cost, manualProductionRate, autoProductionRate) {
      units = (auto_cost - manual_cost) / (manual_variable_cost - auto_variable_cost);
      manualTime = units / manualProductionRate;
      autoTime = units / autoProductionRate;
      d3.select('input[name=break_even_point]').property('value', units.toFixed(2));
      d3.select('input[name=total_time_required_for_manual_method]').property('value', manualTime.toFixed(2));
      d3.select('input[name=total_time_required_for_auto_method]').property('value', autoTime.toFixed(2));
    }
  }

  $.widget('custom.productionMethodCostBreakEvenGraph', ProductionMethodCostBreakEvenGraph);
})(jQuery);
