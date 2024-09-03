import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EditSnack } from '../screens/EditSnack/EditSnack'
import { Home } from '../screens/Home'
import { DietSuccess } from '../screens/NewSnack/DietSuccess'
import { NewSnack } from '../screens/NewSnack/NewSnack'
import { DietFailure } from '../screens/NewSnack/DietFailure'

export type RootStackParamList = {
  home: undefined
  edit_snack: undefined
  new_snack: undefined
  success: undefined
  failure: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

export function AppRoutes() {
  return (
    <Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="edit_snack" component={EditSnack} />
      <Screen name="new_snack" component={NewSnack} />
      <Screen name="success" component={DietSuccess} />
      <Screen name="failure" component={DietFailure} />
    </Navigator>
  )
}
