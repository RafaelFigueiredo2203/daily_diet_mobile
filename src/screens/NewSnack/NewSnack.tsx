import DateTimePicker from '@react-native-community/datetimepicker'
import { ArrowLeft } from 'lucide-react-native'
import React, { useState } from 'react'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Controller, useForm } from 'react-hook-form'
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { RootStackParamList } from '../../routes/app.routes'
import { SnackProps } from '../../utils/context/snackContext'
import { useSnackContext } from '../../utils/context/useSnackContext'
import { formatDate } from '../../utils/formmatDate'
import { formatHour } from '../../utils/formmatHour'

type NavigationProp = StackNavigationProp<RootStackParamList>

export function NewSnack() {
  const { setSnacks, snacks, getSnacks } = useSnackContext()
  const navigation = useNavigation<NavigationProp>()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [isDiet, setIsDiet] = useState(true)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SnackProps>()
  const onSubmit = async (data: SnackProps) => {
    const newSnack = {
      ...data,
      isDiet,
      id: uuidv4(),
    }

    const updatedSnacks = [...snacks, newSnack]

    try {
      await AsyncStorage.setItem('snacks', JSON.stringify(updatedSnacks))
      setSnacks(updatedSnacks)
      console.log('Dados salvos com sucesso!', newSnack)
    } catch (error) {
      console.error('Erro ao salvar os dados:', error)
    }

    if (isDiet === true) {
      navigation.navigate('success')
    } else {
      navigation.navigate('failure')
    }
  }

  return (
    <View>
      <View className="w-full h-32 bg-gray-700/40  flex flex-row items-center text-left justify-center px-6">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home')
          }}
        >
          <ArrowLeft className="text-gray-600  " size={27} />
        </TouchableOpacity>
        <Text className="text-xl font-bold w-full flex items-center text-center pr-4 justify-center">
          Nova Refeição
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
              <Text className="text-gray-200 text-base">Nova Refeição</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
