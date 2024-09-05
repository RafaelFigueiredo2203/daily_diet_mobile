import {
  NunitoSans_400Regular,
  NunitoSans_700Bold,
  useFonts,
} from '@expo-google-fonts/nunito-sans'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import { RoutesLoading } from './src/components/Loading'
import './src/global.css'
import { Routes } from './src/routes'
import { SnackProvider } from './src/utils/context/snackContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold,
  })

  return (
    <>
      <StatusBar style="auto" />
      <SnackProvider>
        {fontsLoaded ? <Routes /> : <RoutesLoading />}
        <Toast />
      </SnackProvider>
    </>
  )
}
