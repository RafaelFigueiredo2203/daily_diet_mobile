import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../../routes/app.routes'

type NavigationProp = StackNavigationProp<RootStackParamList>

export function DietFailure() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View className="flex flex-col items-center justify-center bg-gray-100 h-screen px-6">
      <Text
        style={{ fontFamily: 'NunitoSans_700Bold' }}
        className="text-red-700 text-2xl  mb-3"
      >
        Que pena !
      </Text>
      <Text
        style={{ fontFamily: 'NunitoSans_400Regular' }}
        className=" text-center"
      >
        Você{' '}
        <Text
          style={{ fontFamily: 'NunitoSans_700Bold' }}
          className=" text-center"
        >
          saiu da dieta
        </Text>{' '}
        dessa vez, mas continue se esforçando e não desista!
      </Text>

      <Image
        className="mt-6"
        source={require('../../assets/failure.png')}
        alt="Illustration"
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('home')
        }}
        className="mt-10  w-52 h-14 bg-gray-800 rounded-lg flex flex-row items-center justify-center"
      >
        <Text
          style={{ fontFamily: 'NunitoSans_400Regular' }}
          className="text-gray-200 text-base"
        >
          Ir para a página inicial
        </Text>
      </TouchableOpacity>
    </View>
  )
}
