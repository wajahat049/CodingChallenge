import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
  FlatList,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {usePokemonDetail} from '../services/api/pokemonApi';

interface PillProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  isSelected: boolean;
}

const Pill: React.FC<PillProps> = ({label, onPress, isSelected}) => {
  // console.log('PILL', label);
  return (
    <TouchableOpacity style={styles.pill} onPress={onPress}>
      <Text style={styles.pillText}>{label}</Text>
    </TouchableOpacity>
  );
};

const Details: React.FC = ({route}: any) => {
  const {itemId} = route.params;
  const {data, isLoading} = usePokemonDetail(itemId);
  const scaleAnimation = new Animated.Value(1);
  const [selectedImage, setSelectedImage] = useState('');

  const handlePressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;

  console.log('data?.moves', data?.name);

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <View>
          <LinearGradient
            colors={['#7b42f5', '#b741f5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.card}>
            <Text style={styles.title}>{data?.forms[0]?.name}</Text>
            {/* <View style={styles.imagesContainer}> */}
            <Animated.View
              style={[
                styles.largeImageContainer,
                {transform: [{scale: scaleAnimation}]},
              ]}
              onTouchStart={handlePressIn}
              onTouchEnd={handlePressOut}>
              <Image
                source={{uri: selectedImage || data?.sprites?.front_default}}
                style={styles.largeImage}
              />
            </Animated.View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.thumbnailContainer}>
              {data?.sprites &&
                Object.values(data.sprites).map(
                  (sprite, index) =>
                    sprite &&
                    typeof sprite == 'string' && (
                      <TouchableOpacity
                        key={index}
                        style={{
                          opacity: selectedImage == sprite ? 1 : 0.4,
                          borderWidth: selectedImage == sprite ? 1 : 0,
                          borderColor:
                            selectedImage == sprite ? '#6825f7' : 'transparent',
                          borderRadius: 5,
                          marginHorizontal: 10,
                        }}
                        onPress={() => {
                          setSelectedImage(sprite);
                          handlePressIn();
                          setTimeout(() => {
                            handlePressOut();
                          }, 500);
                        }}>
                        <Image
                          source={{
                            uri:
                              sprite ||
                              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
                          }}
                          style={styles.thumbnail}
                        />
                      </TouchableOpacity>
                    ),
                )}
            </ScrollView>
            <ScrollView
              style={styles.infoContainer}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>
                Base Experience:{' '}
                <Text style={styles.value}>{data?.base_experience}</Text>
              </Text>

              <Text style={styles.label}>
                Height: <Text style={styles.value}>{data?.height}</Text>
              </Text>

              <Text style={styles.label}>
                Weight: <Text style={styles.value}>{data?.weight}</Text>
              </Text>

              <Text style={styles.label}>Abilities:</Text>
              <View style={styles.abilitiesContainer}>
                {data?.abilities.map((ability, index) => (
                  <Text key={index} style={styles.ability}>
                    {ability.ability.name}
                  </Text>
                ))}
              </View>

              <Text style={styles.label}>Moves:</Text>

              <ScrollView
                scrollEnabled
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.pillContainer}
                style={{flexGrow: 1}}>
                {data?.moves.map((move, index) => (
                  <Pill
                    key={index}
                    label={move?.move?.name}
                    onPress={() => console.log('ASAS')}
                    isSelected={false}
                  />
                ))}
              </ScrollView>

              <Text style={styles.label}>Stats:</Text>

              <ScrollView
                scrollEnabled
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.pillContainer}
                style={{maxHeight: 200}}>
                {data?.stats.map((stat, index) => (
                  <Pill
                    key={index}
                    label={`${stat?.stat?.name} (${stat?.base_stat})`}
                    onPress={() => console.log('ASAS')}
                    isSelected={false}
                  />
                ))}
              </ScrollView>
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  loadingText: {
    flex: 1,
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: '50%',
  },
  card: {
    // borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    // maxWidth: 400,
  },
  imagesContainer: {
    width: '100%',
  },
  largeImageContainer: {
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: '100%',
    padding: 10,
    borderRadius: 15,
  },
  largeImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    // flex: 1,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    // marginHorizontal: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  infoContainer: {
    width: '100%',
    marginTop: 16,
    height: '48%',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    color: '#fff',
  },
  value: {
    fontSize: 17,
    color: '#c4c5cf',
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginBottom: 16,
  },
  ability: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    margin: 4,
    borderRadius: 8,
  },
  movesContainer: {
    maxHeight: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  move: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: Colors.primaryColorWithoutAlpha,
    margin: 4,
  },
  pillText: {
    color: 'white',
    fontSize: 16,
  },
  selectedPill: {
    // backgroundColor: Colors.primaryColorWithoutAlpha,
  },
});

export default Details;
