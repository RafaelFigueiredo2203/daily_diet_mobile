import { ArrowLeft } from 'lucide-react-native'
import React from 'react'
import 'react-native-get-random-values'

import { useNavigation } from '@react-navigation/native'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { NewSnackForm } from '../../components/Forms/NewSnackForm'
import { NavigationProp } from '../../utils/context/snackContext'

export function NewSnack() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <View>
      <View className="w-full h-32 bg-gray-700/40  flex flex-row items-center text-left justify-center px-6">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home')
          }}
        >
          <ArrowLeft className="text-gray-600  " size={32} />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: 'NunitoSans_700Bold' }}
          className="text-xl  w-full flex items-center text-center pr-5 justify-center"
        >
          Nova Refeição
        </Text>
      </View>
      <ScrollView
        className="bg-gray-700/40"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <NewSnackForm />
        </View>
      </ScrollView>
    </View>
  )
}
