// ** React Imports
import { Navigate } from 'react-router-dom'
import { useContext, Suspense } from 'react'

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext)
  console.log('Current Ability:', ability);

  const user = JSON.parse(localStorage.getItem('userData'))

  if (route) {
    let action = null
    let resource = null
    let restrictedRoute = false

    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }

    if (!user) {
      return <Navigate to='/login' />
    }
    if (user && restrictedRoute) {
      return <Navigate to='/' />
    }
    if (user && restrictedRoute && user.role === 'client') {
      return <Navigate to='/access-control' />
    }
    if (user && !ability.can(action || 'read', resource)) {
      console.log(`User lacks permission: ${action || 'read'} on ${resource}`);
      return <Navigate to='/misc/not-authorized' replace />
    }
  }


  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
