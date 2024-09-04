import { StatusBar } from 'expo-status-bar'
import './src/global.css'
import { Routes } from './src/routes'
import { SnackProvider } from './src/utils/context/snackContext'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SnackProvider>
        <Routes />
      </SnackProvider>
    </>
  )
}
