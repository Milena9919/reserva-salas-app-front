// src/screens/admin/HistoricoPortas.js
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const historico = [
  { id: '1', porta: 'Laboratório 3', data: '15/10/2025 21:00 até 22:50' },
  { id: '2', porta: 'Laboratório 11', data: '14/10/2025 21:00 até 22:50' },
  { id: '3', porta: 'Sala 103', data: '12/10/2025 19:00 até 20:50' },
];

export default function HistoricoPortas() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas Recentes</Text>

      <FlatList
        data={historico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.porta}>{item.porta}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    padding: 20, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    textAlign: 'center' 
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  porta: { fontSize: 16, fontWeight: 'bold' },
  data: { fontSize: 14, color: '#666' },
  logoutButton: {
    backgroundColor: '#27ae60', // verde
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
