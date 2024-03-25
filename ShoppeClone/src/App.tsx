import './App.css'
import useRouteElements from './pages/useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <div className=''>{routeElements}</div>
    </>
  )
}

export default App
