import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { NavigationProp } from '../../utils/context/snackContext'

export function DietSuccess() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <Text
        style={{ fontFamily: 'NunitoSans_700Bold' }}
        className="text-green-700 text-2xl  mb-3"
      >
        Continue assim !
      </Text>
      <Text style={{ fontFamily: 'NunitoSans_400Regular' }}>
        Você continua{' '}
        <Text style={{ fontFamily: 'NunitoSans_700Bold' }}>
          {' '}
          dentro da dieta.
        </Text>{' '}
        Muito bem!
      </Text>

      <Image
        className="mt-6"
        source={require('../../assets/Illustration.png')}
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
