import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HistoricoReservas() {
  const navigation = useNavigation();
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Simula dados (depois substituir pelo Firebase)
  useEffect(() => {
    setTimeout(() => {
      const dadosExemplo = [
        { id: '1', porta: 'Laboratório 5', data: '10/11/2025', horaInicio: '14:00', horaFim: '15:00' },
        { id: '2', porta: 'Sala 103', data: '08/11/2025', horaInicio: '09:30', horaFim: '10:15' },
        { id: '3', porta: 'Laboratório 2', data: '03/11/2025', horaInicio: '18:00', horaFim: '19:30' },
      ];

      // Ordena do mais recente para o mais antigo
      const ordenado = dadosExemplo.sort(
        (a, b) => new Date(b.data.split('/').reverse().join('-')) - new Date(a.data.split('/').reverse().join('-'))
      );

      setHistorico(ordenado);
      setLoading(false);
    }, 1000);
  }, []);

  const handleVoltar = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#27ae60" />
        <Text>Carregando histórico...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Reservas</Text>

      {historico.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.text}>Nenhuma reserva encontrada.</Text>
        </View>
      ) : (
        <FlatList
          data={historico}
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

      <TouchableOpacity style={styles.buttonVoltar} onPress={handleVoltar}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
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
  buttonVoltar: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
