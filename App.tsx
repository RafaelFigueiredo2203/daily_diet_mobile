import { StatusBar } from 'expo-status-bar'
import './src/global.css'
import { Routes } from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  )
}
