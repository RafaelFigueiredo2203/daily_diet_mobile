import { ArrowLeft, Pencil, Trash } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export function SnackDetails() {
  return (
    <View className="bg-lime-700/40">
      <View className="w-full h-32    flex items-center justify-center">
        <TouchableOpacity>
          <ArrowLeft className="text-gray-600  absolute right-36" size={27} />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Nova Refeição</Text>
      </View>

      <View className="p-5 rounded-t-3xl h-[1100px]  bg-gray-200 flex flex-col items-left justify-left">
        <Text className="mt-6 font-bold text-xl">Sanduíche</Text>
        <Text className="mt-2 text-gray-800">
          Sanduíche de pão integral com atum e salada de alface e tomate
        </Text>

        <Text className="mt-6 font-bold text-base">Data e hora</Text>
        <Text className="mt-2 text-gray-800">12/08/2022 às 16:00</Text>

        <View className="flex flex-row items-center justify-between w-36 h-9 px-2 bg-gray-300 rounded-xl mt-6">
          <View className="w-2 h-2 bg-green-400 rounded-full" />
          <Text>dentro da dieta</Text>
        </View>

        <TouchableOpacity className=" mb-4 mt-64 w-full h-14 bg-gray-800 rounded-lg  flex flex-row items-center justify-center">
          <Pencil size={18} color="white" />
          <Text className="ml-4 text-gray-200 text-base">Editar Refeição</Text>
        </TouchableOpacity>

        <TouchableOpacity className=" mb-32 w-full h-14 border bg-transparent border-gray-800 rounded-lg  flex flex-row items-center justify-center">
          <Trash size={18} color="black" />
          <Text className="ml-4 text-gray-900 text-base">Excluir Refeição</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
