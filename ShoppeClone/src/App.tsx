import { ToastContainer } from 'react-toastify'
import useRouteElements from './pages/useRouteElements'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  return (
    <>
      <div className=''>{routeElements}</div>
      <ToastContainer />
    </>
  )
}

export default App
