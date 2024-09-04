import { useContext } from 'react'
import { SnackContext } from './snackContext'

export const useSnackContext = () => {
  const context = useContext(SnackContext)
  if (!context) {
    throw new Error('useSnack must be used within a SnackProvider')
  }
  return context
}
