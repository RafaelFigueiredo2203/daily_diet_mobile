import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EditSnack } from '../screens/EditSnack/EditSnack'
import { SnackDetails } from '../screens/EditSnack/SnackDetails'
import { Home } from '../screens/Home'
import { DietFailure } from '../screens/NewSnack/DietFailure'
import { DietSuccess } from '../screens/NewSnack/DietSuccess'
import { NewSnack } from '../screens/NewSnack/NewSnack'
import { Statistic } from '../screens/Statistic'

export type RootStackParamList = {
  home: undefined
  edit_snack: { id: string }
  new_snack: undefined
  success: undefined
  failure: undefined
  snack_details: { id: string }
  statistic: undefined
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
      <Screen name="snack_details" component={SnackDetails} />
      <Screen name="statistic" component={Statistic} />
    </Navigator>
  )
}
