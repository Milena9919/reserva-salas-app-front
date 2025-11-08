import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeUsuario() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Aqui você pode limpar o login, token, etc, se quiser
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas</Text>
      <Text style={styles.text}>Sem nenhuma reserva no momento.</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
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
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  text: { 
    fontSize: 16, 
    color: '#777', 
    marginBottom: 40 
  },
  button: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
