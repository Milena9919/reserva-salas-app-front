// src/navigation/UsuarioTabs.js
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas do usuário
import HomeUsuario from '../screens/usuario/HomeUsuario';
import NotificacaoReserva from '../screens/usuario/NotificacaoReserva';
import ReservarPorta from '../screens/usuario/ReservarPorta';

const Tab = createBottomTabNavigator();

export default function UsuarioTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#ccc' },
        tabBarActiveTintColor: '#007AFF',
      }}
    >
      <Tab.Screen
        name="HomeUsuario"
        component={HomeUsuario}
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReservarPorta"
        component={ReservarPorta}
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificacaoReserva"
        component={NotificacaoReserva}
        options={{
          title: 'Notificações',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
