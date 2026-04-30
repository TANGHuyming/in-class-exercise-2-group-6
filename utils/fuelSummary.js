function getWeekLabel(dateStr) {
  const d = new Date(dateStr);
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()} – Week ${week}`;
}

function getMonthLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("default", { month: "long", year: "numeric" });
}

function aggregate(data, groupFn) {
  const map = {};
  data.forEach((r) => {
    const key = groupFn(r.date);
    if (!map[key])
      map[key] = {
        label: key,
        totalCost: 0,
        totalLiters: 0,
        fills: 0,
        vehicles: new Set(),
      };
    map[key].totalCost += r.totalCost;
    map[key].totalLiters += r.liters;
    map[key].fills++;
    map[key].vehicles.add(r.vehicleType);
  });
  return Object.values(map).map((r) => ({
    ...r,
    vehicles: [...r.vehicles],
    totalCost: r.totalCost.toFixed(2),
    totalLiters: r.totalLiters.toFixed(0),
  }));
}

function getFuelSummaryContext(data) {
  const totalCost = data.reduce((s, r) => s + r.totalCost, 0);
  const totalLiters = data.reduce((s, r) => s + r.liters, 0);
  const weekSummary = aggregate(data, getWeekLabel);
  const monthSummary = aggregate(data, getMonthLabel);
  return {
    totalCost: totalCost.toFixed(2),
    totalLiters: totalLiters.toFixed(0),
    avgCostPerFill: (totalCost / data.length).toFixed(2),
    periodsCount: monthSummary.length,
    weekSummary,
    monthSummary,
  };
}

module.exports = { getFuelSummaryContext };
