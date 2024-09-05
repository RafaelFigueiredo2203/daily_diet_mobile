import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../routes/app.routes'
import { useSnackContext } from '../utils/context/useSnackContext'

type NavigationProp = StackNavigationProp<RootStackParamList>

export function DietDetailsButton() {
  const navigation = useNavigation<NavigationProp>()

  const { dietPercentage } = useSnackContext()

  console.log(dietPercentage.valueOf())

  return (
    <>
      {dietPercentage >= 40 ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('statistic')
          }}
          className="w-full h-44 bg-lime-700/40 rounded-lg mt-8 flex items-center justify-center"
        >
          <Text
            style={{ fontFamily: 'NunitoSans_700Bold' }}
            className="text-3xl"
          >
            {isNaN(dietPercentage) ? 0 : parseFloat(dietPercentage.toFixed(2))}%
          </Text>
          <Text
            style={{ fontFamily: 'NunitoSans_400Regular' }}
            className="text-gray-800 text-sm"
          >
            das refeições dentro da dieta
          </Text>
          <Text
            style={{ fontFamily: 'NunitoSans_400Regular' }}
            className="text-gray-800 text-sm"
          >
            Toque para detalhes
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('statistic')
          }}
          className="w-full h-44 bg-red-700/40 rounded-lg mt-8 flex items-center justify-center"
        >
          <Text
            style={{ fontFamily: 'NunitoSans_700Bold' }}
            className="text-3xl "
          >
            {isNaN(dietPercentage) ? 0 : parseFloat(dietPercentage.toFixed(2))}%
          </Text>
          <Text
            style={{ fontFamily: 'NunitoSans_400Regular' }}
            className="text-gray-800 text-sm"
          >
            das refeições dentro da dieta
          </Text>
          <Text
            style={{ fontFamily: 'NunitoSans_400Regular' }}
            className="text-gray-800 text-sm"
          >
            Toque para detalhes
          </Text>
        </TouchableOpacity>
      )}
    </>
  )
}
