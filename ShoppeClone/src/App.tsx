import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import 'react-toastify/dist/ReactToastify.css'
import { localStorageEventTarget } from './utils/auth'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/app.context'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      <div className=''>{routeElements}</div>
      <ToastContainer />
    </>
  )
}

export default App
