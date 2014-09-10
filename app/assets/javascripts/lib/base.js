function calculateVariableCostofLabour(labourCost, labourOverhead, productionRate) {
  return (labourCost * (100 + labourOverhead) / 100 / productionRate);
}

function calculateUniformAnnualCost(machineCost, maintenanceCost, salvageValue, rateOfReturn, serviceLife) {
  var capital_return_factor = capitalReturnFactor(rateOfReturn, serviceLife);
  var sinking_fund_factor = sinkingFundFactor(rateOfReturn, serviceLife);
  return ((machineCost * capital_return_factor) + maintenanceCost - (salvageValue * sinking_fund_factor));
}

function calculateUniformAnnualCostWithMachineOverhead(uniformAnnualCost, machineOverheadRate) {
  machineOverheadRate = machineOverheadRate / 100;
  return (uniformAnnualCost * (1 + machineOverheadRate));
}

function capitalReturnFactor(rateOfReturn, serviceLife) {
  rateOfReturn = rateOfReturn * 0.01;
  return ((rateOfReturn * Math.pow((rateOfReturn + 1), serviceLife)) / (Math.pow((rateOfReturn + 1), serviceLife) - 1));
}

function variableCostOfLabour(labourCost, labourOverhead, productionRate) {
  return (labourCost * (100 + labourOverhead) / 100 / productionRate);
}

function sinkingFundFactor(rateOfReturn, serviceLife) {
  rateOfReturn = rateOfReturn * 0.01;
  return (rateOfReturn/(Math.pow((1 + rateOfReturn), serviceLife) - 1));
}

function calculateRevenue(revenue, numberOfUnits) {
  return (revenue * numberOfUnits);
}

function calculateCost(cost, variable_cost, numberOfUnits) {
  return (cost + (numberOfUnits * variable_cost)).toFixed(2);
}
