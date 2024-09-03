import DateTimePicker from '@react-native-community/datetimepicker'
import { ArrowLeft } from 'lucide-react-native'
import React, { useState } from 'react'

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
import { formatDate } from '../../utils/formmatDate'
import { formatHour } from '../../utils/formmatHour'

interface SnakProps {
  id: string
  name: string
  description: string
  date: string // yyyy-mm-dd
  time: string // hh:mm
  isWithinDiet: boolean
}

type NavigationProp = StackNavigationProp<RootStackParamList>

export function NewSnack() {
  const navigation = useNavigation<NavigationProp>()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [isDiet, setIsDiet] = useState(true)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SnakProps>()
  const onSubmit = (data: SnakProps) => {
    console.log(data)
    if (isDiet === true) {
      navigation.navigate('success')
    } else {
      navigation.navigate('failure')
    }
  }

  return (
    <View>
      <View className="w-full h-32 bg-gray-700/40  flex flex-row items-center text-left justify-center px-6">
        <TouchableOpacity>
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
              rules={{ required: 'Name is required' }}
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
              rules={{ required: 'Description is required' }}
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
                          animationType="slide"
                          visible={showDatePicker}
                          onRequestClose={() => setShowDatePicker(false)}
                        >
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <View
                              style={{
                                backgroundColor: 'white',
                                borderRadius: 8,
                                padding: 16,
                                alignItems: 'center',
                              }}
                            >
                              <DateTimePicker
                                locale="pt-BR"
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
                              <TouchableOpacity
                                onPress={() => setShowDatePicker(false)}
                              >
                                <Text>Fechar</Text>
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
                        <DateTimePicker
                          locale="pt-BR"
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
