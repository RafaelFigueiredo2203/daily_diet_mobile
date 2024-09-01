import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export function HistoricComponent() {
  return (
    <View className="mt-8">
      <Text className="text-gray-800 text-lg font-bold">12.08.22</Text>
      <View className="w-full flex flex-col items-center justify-center">
        <TouchableOpacity className="w-full my-1 p-4 h-12 border border-gray-400 rounded-md flex flex-row items-center justify-left">
          <Text>20:00</Text>
          <View className="h-4 ml-2 mr-2 bg-slate-400 w-[1px]" />

          <View className="flex flex-row w-full items-center justify-left">
            <Text className="w-[240px]">X-tudo </Text>
            <View className="w-4 h-4 bg-red-400 rounded-full" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-full my-1 p-4 h-12 border border-gray-400 rounded-md flex flex-row items-center justify-left">
          <Text>20:00</Text>
          <View className="h-4 ml-2 mr-2 bg-slate-400 w-[1px]" />

          <View className="flex flex-row w-full items-center justify-left">
            <Text className="w-[240px]">X-tudo </Text>
            <View className="w-4 h-4 bg-red-400 rounded-full" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="w-full my-1 p-4 h-12 border border-gray-400 rounded-md flex flex-row items-center justify-left">
          <Text>20:00</Text>
          <View className="h-4 ml-2 mr-2 bg-slate-400 w-[1px]" />

          <View className="flex flex-row w-full items-center justify-left">
            <Text className="w-[240px]">X-tudo </Text>
            <View className="w-4 h-4 bg-red-400 rounded-full" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
