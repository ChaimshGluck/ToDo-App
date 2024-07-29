import Login from './Login'

function App() {

  return (
    <>
    {Array.from({length : 100}, (_, i) => i+1).map((v, i) => {
      <Login key={i}/>
    })}
    </>
  )
}

export default App
