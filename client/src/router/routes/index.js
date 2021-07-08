import { lazy } from 'react'

// ** Default Route
const DefaultRoute = '/dashboard'

// ** Merge Routes
const Routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/pages/dashboard'))
  },
  {
    path: '/postcodes',
    component: lazy(() => import('../../views/pages/postcodes'))
  },
  {
    path: '/placenames',
    component: lazy(() => import('../../views/pages/placenames'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, Routes }
