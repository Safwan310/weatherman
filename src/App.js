import WeatherCard from "./WeatherCard";
const App = () => {

  
  return (
    <div className ="h-screen w-full flex flex-col justify-center items-center bg-green-300">
      <h1 className = "p-5 text-center font-neon text-4xl">Weatherman ⛈️</h1>
      <WeatherCard></WeatherCard>
    </div>
  )
}
export default App

