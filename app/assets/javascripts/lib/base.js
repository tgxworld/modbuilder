function calculateVariableCostofLabour(labour_cost, labour_overhead, production_rate) {
  return (labour_cost * (100 + labour_overhead) / 100 / production_rate);
}

function calculateUniformAnnualCost(machine_cost, maintenance_cost, salvage_value, rate_of_return, service_life) {
  var capital_return_factor = capitalReturnFactor(rate_of_return, service_life);
  var sinking_fund_factor = sinkingFundFactor(rate_of_return, service_life);
  return ((machine_cost * capital_return_factor) + maintenance_cost - (salvage_value * sinking_fund_factor));
}

function calculateUniformAnnualCostWithMachineOverhead(uniform_annual_cost, machine_overhead_rate) {
  machine_overhead_rate = machine_overhead_rate / 100;
  return (uniform_annual_cost * (1 + machine_overhead_rate));
}

function capitalReturnFactor(rate_of_return, service_life) {
  rate_of_return = rate_of_return * 0.01;
  return ((rate_of_return * Math.pow((rate_of_return + 1), service_life)) / (Math.pow((rate_of_return + 1), service_life) - 1));
}

function variableCostOfLabour(labour_cost, labour_overhead, production_rate) {
  return (labour_cost * (100 + labour_overhead) / 100 / production_rate);
}

function sinkingFundFactor(rate_of_return, service_life) {
  rate_of_return = rate_of_return * 0.01;
  return (rate_of_return/(Math.pow((1 + rate_of_return), service_life) - 1));
}

function calculateRevenue(revenue, number_of_units) {
  return (revenue * number_of_units);
}

function calculateCost(cost, variable_cost, number_of_units) {
  return (cost + (number_of_units * variable_cost)).toFixed(2);
}
