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
  const isAdmin = route?.params?.isAdmin ?? true;

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

  const historicoFiltrado = useMemo(() => {
    return historicoMock
      .filter(item => {
        const dataItem = new Date(item.data).toLocaleDateString('pt-BR');
        return (
          (!filtroUsuario || item.usuario.toLowerCase().includes(filtroUsuario.toLowerCase())) &&
          (!filtroStatus || item.status.toLowerCase().includes(filtroStatus.toLowerCase())) &&
          (!filtroData || dataItem.includes(filtroData))
        );
      })
      .sort((a, b) => new Date(b.data) - new Date(a.data));
  }, [filtroUsuario, filtroStatus, filtroData]);

  const handleLogout = () => navigation.navigate('Login');

  return (
    <View style={styles.container}>

      {/* Círculos decorativos */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <Text style={styles.title}>Histórico de Portas</Text>

      {/* Filtros */}
      <View style={styles.filtros}>
        <TextInput
          style={styles.input}
          placeholder="Filtrar por usuário"
          placeholderTextColor="#94a3b8"
          value={filtroUsuario}
          onChangeText={setFiltroUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Filtrar por status (Ativa/Concluída/Cancelada)"
          placeholderTextColor="#94a3b8"
          value={filtroStatus}
          onChangeText={setFiltroStatus}
        />
        <TextInput
          style={styles.input}
          placeholder="Filtrar por data (dd/mm/aaaa)"
          placeholderTextColor="#94a3b8"
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
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const dataHora = new Date(item.data).toLocaleString('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'short',
            });
            return (
              <View style={styles.card}>
                <Text style={styles.porta}>{item.porta}</Text>
                <Text style={styles.info}>Usuário: <Text style={styles.infoValue}>{item.usuario}</Text></Text>
                <Text style={styles.info}>Data/Hora: <Text style={styles.infoValue}>{dataHora}</Text></Text>

                <Text
                  style={[
                    styles.status,
                    item.status === 'Ativa' ? styles.statusAtiva :
                    item.status === 'Concluída' ? styles.statusConcluida :
                    styles.statusCancelada
                  ]}
                >
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
    backgroundColor: '#0d1b2a',
    padding: 24,
  },

  title: { 
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 70,
    marginBottom: 25,
    textAlign: 'left',
  },

  filtros: { marginBottom: 10 },

  input: {
    backgroundColor: '#1C3B70',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
    color: '#fff',
  },

  card: {
    backgroundColor: '#1C3B70',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },

  porta: { fontSize: 17, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  info: { fontSize: 14, color: '#cbd5e1' },
  infoValue: { color: '#fff' },

  status: { marginTop: 8, fontWeight: 'bold', fontSize: 15 },
  statusAtiva: { color: '#38bdf8' },
  statusConcluida: { color: '#22c55e' },
  statusCancelada: { color: '#ef4444' },

  noRecords: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 20,
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  circleTop: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    top: -120,
    left: -80,
    opacity: 0.28,
    zIndex: -1,
  },

  circleBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    bottom: -120,
    right: -60,
    opacity: 0.28,
    zIndex: -1,
  },

  blockedContainer: {
    flex: 1,
    backgroundColor: '#0d1b2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
