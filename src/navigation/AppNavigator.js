// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import Login from '../screens/Login';
import HistoricoReservas from '../screens/usuario/HistoricoReservas';

// Navegações separadas
import AdminTabs from './AdminTabs';
import UsuarioTabs from './UsuarioTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tela inicial */}
        <Stack.Screen name="Login" component={Login} />

        {/* Rotas principais */}
        <Stack.Screen name="AdminMain" component={AdminTabs} />
        <Stack.Screen name="UserMain" component={UsuarioTabs} />

        {/* Tela de histórico do usuário */}
        <Stack.Screen
          name="HistoricoReservas"
          component={HistoricoReservas}
          options={{
            headerShown: true,
            title: 'Histórico de Reservas',
            headerStyle: { backgroundColor: '#27ae60' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
