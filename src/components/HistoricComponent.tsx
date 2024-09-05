import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../routes/app.routes'
import { SnackProps } from '../utils/context/snackContext'
import { useSnackContext } from '../utils/context/useSnackContext'
import { formatDate } from '../utils/formmatDate'
import { formatHour } from '../utils/formmatHour'

interface GroupedSnacks {
  [date: string]: SnackProps[]
}

type NavigationProp = StackNavigationProp<RootStackParamList>

export function HistoricComponent() {
  const { snacks, getSnacks } = useSnackContext()
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    getSnacks()
    console.log(snacks)
  }, [])

  const groupSnacksByDate = (
    snacks: SnackProps[],
  ): { [date: string]: SnackProps[] } => {
    const grouped: { [date: string]: SnackProps[] } = snacks.reduce(
      (groups, snack) => {
        const date = new Date(snack.date).toDateString() // Normaliza a data

        if (!groups[date]) {
          groups[date] = []
        }

        groups[date].push(snack)

        return groups
      },
      {} as { [date: string]: SnackProps[] },
    )

    // Ordena os snacks por horário dentro de cada data
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
      )
    })

    return grouped
  }

  const renderGroupedSnacks = (groupedSnacks: {
    [date: string]: SnackProps[]
  }) => {
    // Ordena as datas de forma decrescente
    const sortedDates = Object.keys(groupedSnacks).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    )

    return sortedDates.map((date) => (
      <View className="mt-8" key={date}>
        <Text className="text-gray-800 text-lg font-bold">
          {formatDate(new Date(date))}
        </Text>
        {groupedSnacks[date].map((snack) => (
          <View
            className="w-full flex flex-col items-center justify-center"
            key={snack.id}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('snack_details', { id: snack.id })
              }}
              className="w-full my-1 p-4 h-12 border border-gray-400 rounded-md flex flex-row items-center justify-left"
            >
              <Text className=" h-4">{formatHour(new Date(snack.time))}</Text>
              <View className="h-4 ml-2 mr-2 bg-slate-400 w-[1px]" />
              <View className="flex flex-row w-full items-center justify-left">
                <Text className="w-[240px] h-4">{snack.name}</Text>
                <View
                  className={`w-4 h-4 ${snack.isDiet ? 'bg-green-400' : 'bg-red-400'} rounded-full`}
                />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    ))
  }
  const groupedSnacks = groupSnacksByDate(snacks)

  return <>{renderGroupedSnacks(groupedSnacks)}</>
}
