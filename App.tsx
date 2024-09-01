import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import './src/global.css'
import { Statistic } from './src/screens/Statistic'

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <Statistic />
    </View>
  )
}
