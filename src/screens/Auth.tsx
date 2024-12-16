import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../store/slices/user';
import {RootState} from '../store/types';
import Button from '../components/Button';

const Auth: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = React.useState<any>(null);
  const {userName, userPhoto, userEmail} = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '812568441576-rcd9aa56jnnqjeukof8sap8l7ljnm25k.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      profileImageSize: 120,
    });
  }, []);

  useEffect(() => {
    if (userName) {
      navigation.navigate('Home');
    }
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.getTokens();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      setUserInfo(userInfo);
      // console.log('Google', userInfo?.data?.user);
      dispatch(
        setUser({
          userName: userInfo?.data?.user?.name || '',
          userPhoto: userInfo?.data?.user?.photo || '',
          userEmail: userInfo?.data?.user?.email || '',
        }),
      );
      navigation.navigate('Home');
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available');
      } else {
        console.error('Sign-in Error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nBv_y9C7Ic1A8qFpIWMHad2Wbtqb10Jv2Q&s',
          }}
          style={styles.image}
        />
        <Text style={styles.title}>POKEMON APP</Text>
      </View>
      {!userName && (
        <GoogleSigninButton
          style={{marginTop: '20%'}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignIn}
        />
      )}

      {userName && (
        <View style={styles.profile}>
          <Image source={{uri: userPhoto}} style={styles.profileImage} />
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>{userName}</Text>
          <Text style={{fontSize: 16}}>( {userEmail})</Text>
          <View style={{margin: 15}}>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    // flex: 1,
    alignItems: 'center', // Centers content horizontally
    justifyContent: 'flex-start', // Keeps content near the top
    paddingTop: 50, // Adjust to control the vertical position
    color: '#7b42f5',
    // backgroundColor: '#fff',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain', // Ensures the image fits nicely within bounds
    marginBottom: 10, // Spacing between image and text
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7b42f5',
  },
  profile: {
    marginTop: '10%',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default Auth;
