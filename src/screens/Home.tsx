import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Button from '../components/Button';
import {usePokemons} from '../services/api/pokemonApi';
import {useDispatch, useSelector} from 'react-redux';
import {toggleButton} from '../store/slices/buttonState';
import {RootState} from '../store/types';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {resetUser} from '../store/slices/user';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const {data, fetchNextPage, isFetchingNextPage} = usePokemons();
  const {button1, button2, button3} = useSelector(
    (state: RootState) => state.buttons,
  );
  const {userName, userPhoto, userEmail} = useSelector(
    (state: RootState) => state.user,
  );

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData =
    data?.pages
      .flatMap(page => page.results)
      .filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || [];

  const renderItem = ({item}: {item: {name: string}}) => (
    <LinearGradient
      colors={['#7b42f5', '#b741f5']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.pokemonContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            itemId: item.url,
          })
        }>
        <Text style={styles.pokemon}>{item.name}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{uri: userPhoto || ''}} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={{fontSize: 22, fontWeight: 'bold', marginLeft: 2}}>
            {userName || ''}
          </Text>
          <Text style={{fontSize: 16}}>( {userEmail || ''})</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredData}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color="#6825f7" />
          ) : null
        }
      />
      <View style={styles.buttons}>
        {['Catch Pokémon', 'View Team', 'Settings'].map((title, index) => (
          <Button
            key={index}
            title={`${title}: ${
              (index + 1 == 1 ? button1 : index + 1 == 2 ? button2 : button3)
                ? 'ON'
                : 'OFF'
            }`}
            onPress={() => dispatch(toggleButton(index + 1))}
          />
        ))}
      </View>
      <Button
        title="Logout"
        onPress={() => {
          dispatch(resetUser());
          navigation.navigate('Auth');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  profile: {
    // marginTop: 20,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    // marginBottom: 10,
  },
  pokemonContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginVertical: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pokemon: {
    fontSize: 18,
    padding: 8,
    color: 'white',
    textTransform: 'capitalize',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default HomeScreen;
