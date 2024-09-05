import DateTimePicker from '@react-native-community/datetimepicker'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ArrowLeft } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
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

export function EditSnack() {
  const navigation = useNavigation<NavigationProp>()
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>()
  const { setSnacks, snacks, getSnacks } = useSnackContext()
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sucesso',

      text2: 'Refeição editada! ✅',
    })
  }

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [isDiet, setIsDiet] = useState(true)

  const [snackDetails, setSnackDetails] = useState<SnackProps | undefined>(
    undefined,
  )

  const { id } = route.params
  console.log(id)

  useEffect(() => {
    const foundSnack = snacks.find((snack) => snack.id === id)
    setSnackDetails(foundSnack)
    console.log(snackDetails)
  }, [id, snackDetails])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SnackProps>()

  useEffect(() => {
    const foundSnack = snacks.find((snack) => snack.id === id)
    setSnackDetails(foundSnack)

    if (foundSnack) {
      // Atualiza os valores do formulário quando os dados forem carregados
      reset({
        id: foundSnack.id,
        name: foundSnack.name,
        description: foundSnack.description,
        date: foundSnack.date,
        time: foundSnack.time,
        isDiet: foundSnack.isDiet,
      })
    }
  }, [id, snacks, reset])

  const onSubmit = async (data: SnackProps) => {
    const updatedSnacks = snacks.map((snack) =>
      snack.id === id ? { ...snack, ...data, isDiet } : snack,
    )

    try {
      await AsyncStorage.setItem('snacks', JSON.stringify(updatedSnacks))
      setSnacks(updatedSnacks)
      navigation.navigate('home')
      showToast()
      console.log('Dados atualizados com sucesso!', updatedSnacks)
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error)
    }
  }

  if (!snackDetails) {
    return
  }

  return (
    <View>
      <View className="w-full h-32 bg-gray-700/40  flex flex-row items-center text-left justify-center px-6">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <ArrowLeft className="text-gray-600  " size={32} />
        </TouchableOpacity>
        <Text className="text-xl font-bold w-full flex items-center text-center pr-5 justify-center">
          Editar Refeição
        </Text>
      </View>
      <ScrollView
        className="bg-gray-700/40"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View className="p-5 rounded-t-3xl h-[1100px]  bg-gray-200 flex flex-col items-left justify-left">
            <Text className="mt-4">Nome</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Nome é obrigatório!' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  defaultValue={snackDetails?.name}
                  className="h-12 w-full border border-gray-400  rounded-lg mt-1 focus:border-gray-900 px-2"
                />
              )}
            />
            {errors.name && (
              <Text style={{ color: 'red' }}>{errors.name.message}</Text>
            )}

            <Text className="mt-4">Descrição</Text>
            <Controller
              control={control}
              name="description"
              rules={{ required: 'Descrição é obrigatório!' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  defaultValue={snackDetails?.description}
                  multiline={true}
                  style={{ textAlignVertical: 'top' }}
                  numberOfLines={4}
                  className="h-28 w-full border pt-1   border-gray-400  rounded-lg mt-1 focus:border-gray-900 px-2"
                />
              )}
            />
            {errors.description && (
              <Text style={{ color: 'red' }}>{errors.description.message}</Text>
            )}

            <View className="flex flex-row items-center justify-between w-full">
              <View className="flex flex-col items-left justify-left w-[153px] ">
                <Text className="mt-4">Data</Text>
                <Controller
                  control={control}
                  name="date"
                  defaultValue={new Date().toString()} // Valor padrão
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TouchableOpacity
                        className="h-12 w-full border border-gray-400 flex items-center justify-center rounded-lg mt-1 focus:border-gray-900 px-2"
                        onPress={() => setShowDatePicker(true)}
                      >
                        <Text>{formatDate(new Date(value))}</Text>
                      </TouchableOpacity>
                      {showDatePicker && (
                        <Modal
                          transparent={true}
                          animationType="fade"
                          visible={showDatePicker}
                          onRequestClose={() => setShowDatePicker(false)}
                        >
                          <View className="flex flex-1 items-center justify-center bg-gray-900/40">
                            <View
                              style={{
                                backgroundColor: 'white',
                                borderRadius: 8,
                                borderWidth: '2px',
                                borderColor: '#777777',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                padding: 16,
                                alignItems: 'center',
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 8,
                                  overflow: 'hidden', // Isso garante que o conteúdo respeite a borda arredondada
                                  backgroundColor: '#777676',
                                }}
                              >
                                <DateTimePicker
                                  locale="pt-BR"
                                  style={{
                                    backgroundColor: '#777676',
                                    width: '100%',
                                  }}
                                  value={new Date(value)}
                                  mode="date"
                                  display="calendar"
                                  onChange={(event, selectedDate) => {
                                    setShowDatePicker(Platform.OS === 'ios')
                                    if (selectedDate) {
                                      onChange(selectedDate)
                                    }
                                  }}
                                />
                              </View>

                              <TouchableOpacity
                                onPress={() => setShowDatePicker(false)}
                                className=" mt-4 w-32 h-12 bg-gray-800 rounded-lg flex flex-row items-center justify-center"
                              >
                                <Text className="text-gray-200 text-base">
                                  Confirmar
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                      )}
                    </View>
                  )}
                />
              </View>

              <View className="flex flex-col items-left justify-left w-[153px]">
                <Text className="mt-4">Hora</Text>
                <Controller
                  control={control}
                  name="time"
                  defaultValue={new Date().toString()} // Valor padrão
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TouchableOpacity
                        className="h-12 w-full border flex items-center justify-center border-gray-400  rounded-lg mt-1 focus:border-gray-900 px-2"
                        onPress={() => setShowTimePicker(true)}
                      >
                        <Text>{formatHour(new Date(value))}</Text>
                      </TouchableOpacity>

                      {showTimePicker && (
                        <Modal
                          transparent={true}
                          animationType="fade"
                          visible={showTimePicker}
                          onRequestClose={() => setShowTimePicker(false)}
                        >
                          <View className="flex flex-1 items-center justify-center bg-gray-900/40">
                            <View
                              style={{
                                backgroundColor: 'white',
                                borderRadius: 8,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // Isso garante que o conteúdo respeite a borda arredondada
                                borderWidth: '2px',
                                borderColor: '#777777',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                                padding: 16,
                              }}
                            >
                              <View className=" flex items-center justify-center pr-4 rounded-lg overflow-hidden bg-[#777676]">
                                <DateTimePicker
                                  locale="pt-BR"
                                  style={{
                                    backgroundColor: '#777676',
                                    width: '100%',
                                  }}
                                  value={new Date(value)}
                                  mode="time"
                                  display="default"
                                  onChange={(event, selectedTime) => {
                                    setShowTimePicker(Platform.OS === 'ios')
                                    if (selectedTime) {
                                      onChange(selectedTime)
                                    }
                                  }}
                                />
                              </View>

                              <TouchableOpacity
                                onPress={() => setShowTimePicker(false)}
                                className=" mt-4 w-32 h-12 bg-gray-800 rounded-lg flex flex-row items-center justify-center"
                              >
                                <Text className="text-gray-200 text-base">
                                  Confirmar
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </Modal>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            <Text className="mt-4">Esta dentro da dieta?</Text>
            <View className="flex flex-row items-center  mb-40 justify-between w-full mt-1 mb-">
              {isDiet === true ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsDiet(true)
                  }}
                  className="bg-green-500/40 w-2/5 rounded-lg border border-green-600 flex flex-row items-center justify-center h-12"
                >
                  <View className="w-2 h-2 bg-green-400 rounded-full " />
                  <Text className="mx-2">Sim</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIsDiet(true)
                  }}
                  className="bg-gray-500/40 w-2/5 rounded-lg flex flex-row items-center justify-center h-12"
                >
                  <View className="w-2 h-2 bg-green-400 rounded-full " />
                  <Text className="mx-2">Sim</Text>
                </TouchableOpacity>
              )}

              {isDiet === false ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsDiet(false)
                  }}
                  className="bg-red-500/40 w-2/5 rounded-lg border border-red-600 flex flex-row items-center justify-center h-12"
                >
                  <View className="w-2 h-2 bg-red-400 rounded-full " />
                  <Text className="mx-2">Não</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIsDiet(false)
                  }}
                  className="bg-gray-500/40 w-2/5 rounded-lg flex flex-row items-center justify-center h-12"
                >
                  <View className="w-2 h-2 bg-red-400 rounded-full " />
                  <Text className="mx-2">Não</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className=" mb-32 w-full h-14 bg-gray-800 rounded-lg flex flex-row items-center justify-center"
            >
              <Text className="text-gray-200 text-base">Confirmar Edição</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
