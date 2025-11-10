import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeUsuario() {
  const navigation = useNavigation();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Simula carregamento de dados (depois substituir pelo Firebase)
  useEffect(() => {
    setTimeout(() => {
      const reservasExemplo = [
        { id: '1', porta: 'Laboratório 3', data: '15/11/2025', horaInicio: '14:00', horaFim: '15:30', status: 'Ativa' },
        { id: '2', porta: 'Sala 102', data: '14/11/2025', horaInicio: '10:00', horaFim: '11:00', status: 'Ativa' },
      ];

      setReservas(reservasExemplo);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleReservarPorta = () => {
    navigation.navigate('ReservarPorta'); // Corrigido para combinar com UsuarioTabs.js
  };

  const handleHistorico = () => {
    navigation.navigate('HistoricoReservas'); // Corrigido para combinar com AppNavigator.js
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text>Carregando suas reservas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Reservas Ativas</Text>

      {reservas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.text}>Sem nenhuma reserva.</Text>
          <TouchableOpacity style={styles.reserveButton} onPress={handleReservarPorta}>
            <Text style={styles.reserveText}>Reservar Salas</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.porta}>Porta: {item.porta}</Text>
              <Text style={styles.data}>Data: {item.data}</Text>
              <Text style={styles.hora}>
                Horário: {item.horaInicio} - {item.horaFim}
              </Text>
            </View>
          )}
        />
      )}

      {/* 🔹 Menu inferior verde */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuButton} onPress={handleReservarPorta}>
          <Text style={styles.menuText}>Reservar Salas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={handleHistorico}>
          <Text style={styles.menuText}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    padding: 20 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#333'
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40
  },
  text: { 
    fontSize: 16, 
    color: '#777', 
    marginBottom: 20 
  },
  reserveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  reserveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  porta: { fontSize: 16, fontWeight: 'bold' },
  data: { fontSize: 14, color: '#555', marginTop: 5 },
  hora: { fontSize: 14, color: '#888', marginTop: 5 },
  menu: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 15,
  },
  menuButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
