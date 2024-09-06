import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'
import React from 'react'

import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { EditSnackForm } from '../../components/Forms/EditSnackForm'
import { NavigationProp } from '../../utils/context/snackContext'

export function EditSnack() {
  const navigation = useNavigation<NavigationProp>()

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
          <EditSnackForm />
        </View>
      </ScrollView>
    </View>
  )
}
