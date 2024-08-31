import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import './src/global.css'
import { NewSnack } from './src/screens/NewSnack'

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <NewSnack />
    </View>
  )
}
