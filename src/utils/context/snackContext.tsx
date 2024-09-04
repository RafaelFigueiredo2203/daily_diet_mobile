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
  setSnacks: Dispatch<SetStateAction<SnackProps[]>>
  getSnacks: () => Promise<string | undefined>
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

  return (
    <SnackContext.Provider
      value={{
        snacks,
        setSnacks,
        getSnacks,
      }}
    >
      {children}
    </SnackContext.Provider>
  )
}
