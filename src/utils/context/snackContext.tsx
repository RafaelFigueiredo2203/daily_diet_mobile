import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

export interface SnackProps {
  id: string
  name: string
  description: string
  date: string // yyyy-mm-dd
  time: string // hh:mm
  isDiet: boolean
}

interface SnackContextType {
  snacks: SnackProps[]
  notDietPercentage: number
  dietPercentage: number
  dietCount: number
  notDietCount: number
  setSnacks: Dispatch<SetStateAction<SnackProps[]>>
  getSnacks: () => Promise<string | undefined>
  findBestDietSequence: (snacks: SnackProps[]) => number
}

export const SnackContext = createContext<SnackContextType | undefined>(
  undefined,
)

interface SnackProviderProps {
  children: ReactNode
}

export function SnackProvider({ children }: SnackProviderProps) {
  const [snacks, setSnacks] = useState<SnackProps[]>([])

  async function getSnacks() {
    try {
      const snacksJSON = await AsyncStorage.getItem('snacks')
      const snacksParse = snacksJSON ? JSON.parse(snacksJSON) : []
      setSnacks(snacksParse)
      if (snacksJSON !== null) {
        console.log('Dados recuperados:', snacksJSON)
        return snacksJSON
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados:', error)
    }
  }

  const totalSnacks = snacks.length

  const dietCount = snacks.reduce((count, snack) => {
    return snack.isDiet ? count + 1 : count
  }, 0)

  const notDietCount = totalSnacks - dietCount

  const dietPercentage = (dietCount / totalSnacks) * 100
  const notDietPercentage = (notDietCount / totalSnacks) * 100

  function findBestDietSequence(snacks: SnackProps[]): number {
    let maxSequence = 0
    let currentSequence = 0

    for (const meal of snacks) {
      if (meal.isDiet) {
        currentSequence++
        maxSequence = Math.max(maxSequence, currentSequence)
      } else {
        currentSequence = 0
      }
    }

    return maxSequence
  }

  return (
    <SnackContext.Provider
      value={{
        snacks,
        setSnacks,
        getSnacks,
        dietPercentage,
        notDietPercentage,
        notDietCount,
        dietCount,
        findBestDietSequence,
      }}
    >
      {children}
    </SnackContext.Provider>
  )
}
