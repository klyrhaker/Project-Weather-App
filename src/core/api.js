export async function getWeatherFetch(url) {
  const resWeather = await fetch(url);
  if (!resWeather.ok)
    throw new Error(`Ошибка при запросе погоды ${resWeather.status}`);

  const dataWeather = await resWeather.json();
  return dataWeather;
}
