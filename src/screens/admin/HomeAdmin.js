// src/screens/admin/HomeAdmin.js
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeAdmin() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>

      {/* Círculos decorativos */}
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo, Administrador</Text>
        <Text style={styles.subtitle}>
          Selecione uma opção para começar a gerenciar o sistema.
        </Text>

        {/* CARD 1 - Usuários */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('CadastrarUsuario')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="people" size={28} color="#fff" />
          </View>
          <View>
            <Text style={styles.cardTitle}>Gerenciar Usuários</Text>
            <Text style={styles.cardSubtitle}>Cadastre e acompanhe os usuários do sistema</Text>
          </View>
        </TouchableOpacity>

        {/* CARD 2 - Portas */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('CadastrarPorta')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="lock-closed" size={28} color="#fff" />
          </View>
          <View>
            <Text style={styles.cardTitle}>Gerenciar Portas</Text>
            <Text style={styles.cardSubtitle}>Configure novas portas e níveis de acesso</Text>
          </View>
        </TouchableOpacity>

        {/* CARD 3 - Histórico */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('HistoricoPortas')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="time" size={28} color="#fff" />
          </View>
          <View>
            <Text style={styles.cardTitle}>Histórico</Text>
            <Text style={styles.cardSubtitle}>Veja as atividades e acessos recentes</Text>
          </View>
        </TouchableOpacity>

        {/* Botão Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1B30',
  },

  content: {
    marginTop: 60,
    paddingHorizontal: 20,
  },

  // Decorativos
  circleTop: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: '#1C3B70',
    top: -120,
    left: -80,
    opacity: 0.35,
  },
  circleBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: '#1C3B70',
    bottom: -100,
    right: -60,
    opacity: 0.3,
  },

  // Textos
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 70,
  },
  subtitle: {
    color: '#cdd5e0',
    fontSize: 14,
    marginBottom: 35,
  },

  // Cards
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#142544',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  iconBox: {
    backgroundColor: '#14A1FD',
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cardSubtitle: {
    color: '#b7c5d8',
    fontSize: 12,
  },

  // Botão Sair
  logoutButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
