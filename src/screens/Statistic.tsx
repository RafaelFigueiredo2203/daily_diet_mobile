import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp } from '../utils/context/snackContext'
import { useSnackContext } from '../utils/context/useSnackContext'

export function Statistic() {
  const {
    dietPercentage,
    snacks,
    dietCount,
    notDietCount,
    findBestDietSequence,
  } = useSnackContext()

  const navigation = useNavigation<NavigationProp>()

  const bestSequence = findBestDietSequence(snacks)

  return (
    <View className="h-screen ">
      <View
        className={` ${dietPercentage >= 40 ? 'bg-lime-700/40' : 'bg-red-700/40'} w-full h-44  px-6  flex flex-row items-center justify-center`}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home')
          }}
        >
          <ArrowLeft
            className={`${dietPercentage >= 40 ? 'text-green-700' : 'text-red-700'}    `}
            size={32}
          />
        </TouchableOpacity>
        <View className="flex items-center justify-center w-full pr-5">
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
        </View>
      </View>

      <View className=" bg-lime-700/40">
        <View className="p-5 rounded-t-3xl h-screen  bg-gray-200 flex flex-col items-center">
          <Text
            style={{ fontFamily: 'NunitoSans_700Bold' }}
            className="text-gray-800 text-base "
          >
            Estatísticas gerais
          </Text>

          <View className="w-full h-24 bg-lime-700/20   flex items-center justify-center mt-8 rounded-lg">
            <Text
              style={{ fontFamily: 'NunitoSans_700Bold' }}
              className="text-3xl "
            >
              {bestSequence}
            </Text>
            <Text className="text-gray-800 text-sm">
              melhor sequência de pratos dentro da dieta
            </Text>
          </View>

          <View className="w-full  h-24 bg-lime-700/20   flex items-center justify-center mt-8 rounded-lg">
            <Text
              style={{ fontFamily: 'NunitoSans_700Bold' }}
              className="text-3xl "
            >
              {snacks.length}
            </Text>
            <Text className="text-gray-800 text-sm">refeições registradas</Text>
          </View>

          <View className="flex flex-row w-full mt-8  items-center justify-between  ">
            <View className="w-[160px] h-28 flex flex-col items-center justify-center rounded-lg  bg-lime-700/20">
              <Text
                style={{ fontFamily: 'NunitoSans_700Bold' }}
                className="text-3xl "
              >
                {dietCount}
              </Text>
              <Text className="text-gray-800 text-sm text-center w-[125px]">
                refeições dentro da dieta
              </Text>
            </View>
            <View className="w-[160px] h-28 flex flex-col items-center justify-center rounded-lg  bg-red-700/20 ">
              <Text
                style={{ fontFamily: 'NunitoSans_700Bold' }}
                className="text-3xl "
              >
                {notDietCount}
              </Text>
              <Text
                style={{ fontFamily: 'NunitoSans_400Regular' }}
                className="text-gray-800 text-sm text-center w-[125px]"
              >
                refeições fora da dieta
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
