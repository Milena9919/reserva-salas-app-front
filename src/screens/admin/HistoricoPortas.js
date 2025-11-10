// src/screens/admin/HistoricoPortas.js
import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const historicoMock = [
  { id: '1', porta: 'Laboratório 3', usuario: 'Thiago', data: '2025-10-15T21:00:00', status: 'Concluída' },
  { id: '2', porta: 'Sala 103', usuario: 'Milena', data: '2025-10-12T19:00:00', status: 'Cancelada' },
  { id: '3', porta: 'Laboratório 11', usuario: 'João', data: '2025-10-14T21:00:00', status: 'Ativa' },
];

export default function HistoricoPortas({ route }) {
  const navigation = useNavigation();
  const isAdmin = route?.params?.isAdmin ?? true; // valida se é admin (mockado como true)
  
  // se não for admin → bloqueia
  if (!isAdmin) {
    return (
      <View style={styles.blockedContainer}>
        <Text style={styles.blockedText}>Acesso restrito aos administradores.</Text>
      </View>
    );
  }

  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [filtroData, setFiltroData] = useState('');

  // aplica ordenação (mais recente primeiro) e filtros
  const historicoFiltrado = useMemo(() => {
    return historicoMock
      .filter(item => {
        const dataItem = new Date(item.data).toLocaleDateString('pt-BR');
        return (
          (filtroUsuario ? item.usuario.toLowerCase().includes(filtroUsuario.toLowerCase()) : true) &&
          (filtroStatus ? item.status.toLowerCase().includes(filtroStatus.toLowerCase()) : true) &&
          (filtroData ? dataItem.includes(filtroData) : true)
        );
      })
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [filtroUsuario, filtroStatus, filtroData]);

  const handleLogout = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Portas</Text>

      {/* Filtros */}
      <View style={styles.filtros}>
        <TextInput
          style={styles.input}
          placeholder="Filtrar por usuário"
          value={filtroUsuario}
          onChangeText={setFiltroUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Filtrar por status (Ativa/Concluída/Cancelada)"
          value={filtroStatus}
          onChangeText={setFiltroStatus}
        />
        <TextInput
          style={styles.input}
          placeholder="Filtrar por data (dd/mm/aaaa)"
          value={filtroData}
          onChangeText={setFiltroData}
        />
      </View>

      {/* Lista */}
      {historicoFiltrado.length === 0 ? (
        <Text style={styles.noRecords}>Nenhum registro encontrado.</Text>
      ) : (
        <FlatList
          data={historicoFiltrado}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const dataHora = new Date(item.data).toLocaleString('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'short',
            });
            return (
              <View style={styles.card}>
                <Text style={styles.porta}>{item.porta}</Text>
                <Text style={styles.info}>Usuário: {item.usuario}</Text>
                <Text style={styles.info}>Data/Hora: {dataHora}</Text>
                <Text style={[styles.status, 
                  item.status === 'Ativa' ? styles.statusAtiva :
                  item.status === 'Concluída' ? styles.statusConcluida :
                  styles.statusCancelada
                ]}>
                  {item.status}
                </Text>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa', 
    padding: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15, 
    color: '#2c3e50' 
  },
  filtros: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  porta: { fontSize: 16, fontWeight: 'bold', color: '#34495e' },
  info: { fontSize: 14, color: '#555' },
  status: { marginTop: 5, fontWeight: 'bold' },
  statusAtiva: { color: '#2980b9' },
  statusConcluida: { color: '#27ae60' },
  statusCancelada: { color: '#c0392b' },
  logoutButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noRecords: {
    textAlign: 'center',
    color: '#7f8c8d',
    marginTop: 20,
    fontSize: 16,
  },
  blockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  blockedText: {
    color: '#721c24',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
