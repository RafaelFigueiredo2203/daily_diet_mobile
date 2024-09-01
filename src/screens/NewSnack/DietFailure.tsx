import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export function DietFailure() {
  return (
    <View className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <Text className="text-red-700 text-2xl font-bold mb-3">Que pena !</Text>
      <Text className=" text-center">
        Você <Text className="font-bold text-center">saiu da dieta</Text> dessa
        vez, mas continue se esforçando e não desista!
      </Text>

      <Image
        className="mt-6"
        source={require('../../assets/failure.png')}
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
