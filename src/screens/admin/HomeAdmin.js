// src/screens/admin/HomeAdmin.js
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeAdmin() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, Administrador!</Text>
      <Text style={styles.subtitle}>
        Acesse as abas abaixo para gerenciar usuários e portas.
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#2c3e50', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#555', 
    textAlign: 'center', 
    marginBottom: 40 
  },
  logoutButton: {
    backgroundColor: '#27ae60', // verde
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
