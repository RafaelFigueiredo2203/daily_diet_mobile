import { useNavigation } from '@react-navigation/native'
import { Clipboard, Plus } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { DietDetailsButton } from '../components/DietDetailsButton'
import { Header } from '../components/Header'
import { HistoricComponent } from '../components/HistoricComponent'
import { NavigationProp } from '../utils/context/snackContext'
import { useSnackContext } from '../utils/context/useSnackContext'

export function Home() {
  const navigation = useNavigation<NavigationProp>()
  const { snacks } = useSnackContext()

  function handleNavigateToNewSnack() {
    navigation.navigate('new_snack')
  }

  return (
    <View className="h-full bg-gray-200 p-4">
      <Header />
      <DietDetailsButton />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-10 mb-4">
          <Text
            style={{ fontFamily: 'NunitoSans_400Regular' }}
            className="text-gray-800 text-lg"
          >
            Refeições
          </Text>
          <TouchableOpacity
            onPress={handleNavigateToNewSnack}
            className="w-full h-14 bg-gray-800 rounded-lg flex flex-row items-center justify-center"
          >
            <Plus color="white" className="mr-2" />
            <Text
              style={{ fontFamily: 'Inter_400Regular' }}
              className="text-gray-200 text-base"
            >
              Nova Refeição
            </Text>
          </TouchableOpacity>

          {snacks.length <= 0 ? (
            <View className="pt-14 flex-col flex items-center justify-center ">
              <Clipboard color="#3a3a3a" size={64} />

              <Text className="font-normal mt-6 mb-[-20px] text-base leading-6 text-zinc-400">
                Você ainda não tem refeições cadastradas{' '}
              </Text>
              <Text className="font-normal mt-6 text-base leading-6 text-zinc-600">
                Crie refeições e organize sua dieta
              </Text>
            </View>
          ) : (
            <HistoricComponent />
          )}
        </View>
      </ScrollView>
    </View>
  )
}
