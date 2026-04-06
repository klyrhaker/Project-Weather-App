function normalizeWeather(rawData) {
  if (!rawData) return;
  const address = rawData.resolvedAddress;

  const conditions = rawData.currentConditions?.conditions;

  const feelsLike = Math.round(rawData.currentConditions?.feelslike);

  const icon = rawData.currentConditions?.icon;

  const temp = Math.round(rawData.currentConditions?.temp);

  return { address, conditions, feelsLike, icon, temp };
}
const transformTemp = (temp, isCelsius) => {
  if (!isCelsius) {
    const f = Math.round(Number(temp) * 1.8 + 32);
    return f;
  }
  const c = Math.round((Number(temp) - 32) / 1.8);
  return c;
};

export { normalizeWeather, transformTemp };
