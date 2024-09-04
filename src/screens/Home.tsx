import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Plus } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { DietDetailsButton } from '../components/DietDetailsButton'
import { Header } from '../components/Header'
import { HistoricComponent } from '../components/HistoricComponent'
import { RootStackParamList } from '../routes/app.routes'

type NavigationProp = StackNavigationProp<RootStackParamList, 'home'>

export function Home() {
  const navigation = useNavigation<NavigationProp>()

  function handleNavigateToNewSnack() {
    navigation.navigate('new_snack')
  }

  return (
    <View className="h-full bg-gray-200 p-4">
      <Header />
      <DietDetailsButton />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-10 mb-4">
          <Text className="text-gray-800 text-lg">Refeições</Text>
          <TouchableOpacity
            onPress={handleNavigateToNewSnack}
            className="w-full h-14 bg-gray-800 rounded-lg flex flex-row items-center justify-center"
          >
            <Plus color="white" className="mr-2" />
            <Text className="text-gray-200 text-base">Nova Refeição</Text>
          </TouchableOpacity>

          <HistoricComponent />
        </View>
      </ScrollView>
    </View>
  )
}
