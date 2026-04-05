export function normalizeWeather(rawData) {
  if (!rawData) return;
  const address = rawData.resolvedAddress;

  const conditions = rawData.currentConditions?.conditions;

  const feelsLike = rawData.currentConditions?.feelslike;

  const icon = rawData.currentConditions?.icon;

  const temp = rawData.currentConditions?.temp;
  return { address, conditions, feelsLike, icon, temp };
}
