import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export function NewSnack() {
  return (
    <View>
      <View className="w-full h-32 bg-gray-700/40   flex items-center justify-center">
        <TouchableOpacity>
          <ArrowLeft className="text-gray-600  absolute right-36" size={27} />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Nova Refeição</Text>
      </View>
      <ScrollView
        className="bg-gray-700/40"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View className="p-5 rounded-t-3xl h-[1100px]  bg-gray-200 flex flex-col items-left justify-left">
            <Text className="mt-4">Nome</Text>
            <TextInput className="h-12 w-full border border-gray-400  rounded-lg mt-1 focus:border-gray-900 px-2" />

            <Text className="mt-4">Descrição</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              className="h-28 w-full border border-gray-400  rounded-lg mt-1 focus:border-gray-900 px-2"
            />

            <View className="flex flex-row items-center justify-between w-full">
              <View className="flex flex-col items-left justify-left w-[153px] ">
                <Text className="mt-4">Data</Text>
                <TextInput className="h-12 w-full border border-gray-400  rounded-lg mt-1 focus:border-gray-900 px-2" />
              </View>

              <View className="flex flex-col items-left justify-left w-[153px]">
                <Text className="mt-4">Hora</Text>
                <TextInput className="h-12 w-full border border-gray-400  rounded-lg mt-1 focus:border-gray-900 px-2" />
              </View>
            </View>

            <Text className="mt-4">Esta dentro da dieta?</Text>
            <View className="flex flex-row items-center  mb-40 justify-between w-full mt-1 mb-">
              <TouchableOpacity className="bg-gray-500/40 w-2/5 rounded-lg flex flex-row items-center justify-center h-12">
                <View className="w-2 h-2 bg-green-400 rounded-full " />
                <Text className="mx-2">Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity className="bg-gray-500/40 w-2/5 rounded-lg flex flex-row items-center justify-center h-12">
                <View className="w-2 h-2 bg-red-400 rounded-full " />
                <Text className="mx-2">Não</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity className=" mb-32 w-full h-14 bg-gray-800 rounded-lg flex flex-row items-center justify-center">
              <Text className="text-gray-200 text-base">Nova Refeição</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
