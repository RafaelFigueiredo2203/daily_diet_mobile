import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export function Statistic() {
  return (
    <View className="h-screen ">
      <View className="w-full h-44 bg-lime-700/40   flex items-center justify-center">
        <TouchableOpacity>
          <ArrowLeft className="  absolute right-36 text-green-700" size={27} />
        </TouchableOpacity>
        <Text className="text-3xl font-bold">90,86%</Text>
        <Text className="text-gray-800 text-sm">
          das refeições dentro da dieta
        </Text>
      </View>

      <View className=" bg-lime-700/40">
        <View className="p-5 rounded-t-3xl h-screen  bg-gray-200 flex flex-col items-center">
          <Text className="text-gray-800 text-base font-bold">
            Estatísticas gerais
          </Text>

          <View className="w-full h-24 bg-lime-700/20   flex items-center justify-center mt-8 rounded-lg">
            <Text className="text-3xl font-bold">22</Text>
            <Text className="text-gray-800 text-sm">
              melhor sequência de pratos dentro da dieta
            </Text>
          </View>

          <View className="w-full  h-24 bg-lime-700/20   flex items-center justify-center mt-8 rounded-lg">
            <Text className="text-3xl font-bold">109</Text>
            <Text className="text-gray-800 text-sm">refeições registradas</Text>
          </View>

          <View className="flex flex-row w-full mt-8  items-center justify-between  ">
            <View className="w-[160px] h-28 flex flex-col items-center justify-center rounded-lg  bg-lime-700/20">
              <Text className="text-3xl font-bold">99</Text>
              <Text className="text-gray-800 text-sm text-center w-[125px]">
                refeições dentro da dieta
              </Text>
            </View>
            <View className="w-[160px] h-28 flex flex-col items-center justify-center rounded-lg  bg-red-700/20 ">
              <Text className="text-3xl font-bold">10</Text>
              <Text className="text-gray-800 text-sm text-center w-[125px]">
                refeições fora da dieta
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
