import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from '../states/AuthState';

export default function ConditionalRoute({
  redirectTo,
  children,
}: ConditionalRouteProps): JSX.Element {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <>{children}</> : <Navigate to={redirectTo} replace />
}

export type ConditionalRouteProps = {
  redirectTo: string
  children?: ReactNode
}