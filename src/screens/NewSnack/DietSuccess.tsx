import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export function DietSuccess() {
  return (
    <View className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <Text className="text-green-700 text-2xl font-bold mb-3">
        Continue assim !
      </Text>
      <Text>
        Você continua <Text className="font-bold"> dentro da dieta.</Text> Muito
        bem!
      </Text>

      <Image
        className="mt-6"
        source={require('../../assets/Illustration.png')}
        alt="Illustration"
      />

      <TouchableOpacity className="mt-10  w-52 h-14 bg-gray-800 rounded-lg flex flex-row items-center justify-center">
        <Text className="text-gray-200 text-base">
          Ir para a página inicial
        </Text>
      </TouchableOpacity>
    </View>
  )
}
