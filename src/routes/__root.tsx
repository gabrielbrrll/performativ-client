import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import Navbar from 'components/Navbar/Navbar'
import { AuthContextProps } from 'context/AuthContext'

type RouterContext = {
  authentication: AuthContextProps
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <div>
          <Navbar />
          <Outlet />
        </div>
      </>
    )
  }
})
