import AsyncStorage from '@react-native-async-storage/async-storage'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ArrowLeft, Pencil, Trash } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { RootStackParamList } from '../../routes/app.routes'
import { SnackProps } from '../../utils/context/snackContext'
import { useSnackContext } from '../../utils/context/useSnackContext'
import { formatDate } from '../../utils/formmatDate'
import { formatHour } from '../../utils/formmatHour'

interface RouteParams {
  id: string
}
type NavigationProp = StackNavigationProp<RootStackParamList>

export function SnackDetails() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { setSnacks } = useSnackContext()
  const navigation = useNavigation<NavigationProp>()
  const showToast = () => {
    Toast.show({
      type: 'info',
      text1: 'Sucesso',

      text2: 'Refeição excluída! 📍',
    })
  }
  const [snackDetails, setSnackDetails] = useState<SnackProps | undefined>(
    undefined,
  )
  const { snacks } = useSnackContext()
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>()

  const { id } = route.params
  console.log(id)

  useEffect(() => {
    const foundSnack = snacks.find((snack) => snack.id === id)
    setSnackDetails(foundSnack)
    console.log(snackDetails)
  }, [id, snackDetails])

  async function handleSnackRemove(id: string) {
    const snackIndex = snacks.findIndex((snack) => snack.id === id)
    console.log(snackIndex)
    if (snackIndex !== -1) {
      const updatedSnacks = [...snacks]
      updatedSnacks.splice(snackIndex, 1)

      setSnacks(updatedSnacks)

      try {
        await AsyncStorage.setItem('snacks', JSON.stringify(updatedSnacks))
        showToast()
        navigation.navigate('home') // Navega apenas após sucesso
      } catch (error) {
        console.error('Erro ao salvar os snacks:', error)
      }
    }
  }
  if (!snackDetails) {
    return
  }

  return (
    <View
      className={` ${snackDetails?.isDiet ? 'bg-lime-700/40' : 'bg-red-700/40'} `}
    >
      <View className="w-full h-32    flex items-center justify-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft className="text-gray-600  absolute right-36" size={32} />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Refeição</Text>
      </View>

      <View className="p-5 rounded-t-3xl h-[1100px]  bg-gray-200 flex flex-col items-left justify-left">
        <Text className="mt-6 font-bold text-xl">{snackDetails?.name}</Text>
        <Text className="mt-2 text-gray-800">{snackDetails?.description}</Text>

        <Text className="mt-6 font-bold text-base">Data e hora</Text>
        <Text className="mt-2 text-gray-800">
          {formatDate(new Date(snackDetails?.date))} às{' '}
          {formatHour(new Date(snackDetails?.time))}
        </Text>

        {snackDetails?.isDiet ? (
          <View className="flex flex-row items-center justify-between w-36 h-9 px-2 bg-gray-300 rounded-xl mt-6">
            <View className="w-2 h-2 bg-green-400 rounded-full" />
            <Text>dentro da dieta</Text>
          </View>
        ) : (
          <View className="flex flex-row items-center justify-between w-36 h-9 px-2 bg-gray-300 rounded-xl mt-6">
            <View className="w-2 h-2 bg-red-400 rounded-full" />
            <Text>fora da dieta</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('edit_snack', { id: snackDetails.id })
          }
          className=" mb-4 mt-64 w-full h-14 bg-gray-800 rounded-lg  flex flex-row items-center justify-center"
        >
          <Pencil size={18} color="white" />
          <Text className="ml-4 text-gray-200 text-base">Editar Refeição</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsDeleteModalOpen(true)}
          className=" mb-32 w-full h-14 border bg-transparent border-gray-800 rounded-lg  flex flex-row items-center justify-center"
        >
          <Trash size={18} color="black" />
          <Text className="ml-4 text-gray-900 text-base">Excluir Refeição</Text>
        </TouchableOpacity>
        {isDeleteModalOpen && (
          <Modal
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsDeleteModalOpen(false)}
          >
            <View className="flex-1 items-center justify-center bg-slate-900/50">
              <View className="bg-slate-200 w-80 py-5 rounded-lg px-4 flex items-center justify-center flex-col">
                <Text className="text-lg font-bold text-gray-800 text-center">
                  Deseja realmente excluir o registro da refeição?
                </Text>
                <View className="flex flex-row items-center justify-center mt-8">
                  <TouchableOpacity
                    onPress={() => setIsDeleteModalOpen(false)}
                    className=" w-32 mr-4 h-12 border bg-transparent border-gray-800 rounded-lg  flex flex-row items-center justify-center"
                  >
                    <Text className=" text-gray-900 text-base">Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleSnackRemove(snackDetails.id)}
                    className="  w-32 h-12 bg-gray-800 rounded-lg  flex flex-row items-center justify-center"
                  >
                    <Text className=" text-gray-200 text-base">
                      Sim, excluir
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  )
}
