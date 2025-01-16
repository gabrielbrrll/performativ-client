import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { AuthContextProps } from 'context/AuthContext'

type RouterContext = {
  authentication: AuthContextProps
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />
})
