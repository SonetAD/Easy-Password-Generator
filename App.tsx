import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passvalid = yup.object({
  passLength: yup
    .number()
    .min(4, 'Should be more than 4 charecter')
    .max(16, 'Should be less than 16  ')
    .required('Length is required'),
});

const App = () => {
  const [pass, setPass] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [number, setNumber] = useState(true);
  const [symbol, setSymbol] = useState(true);

  const createPassString = (charecter: string, passLength: number) => {
    let res = '';
    for (let i = 0; i < passLength; i++) {
      const index = Math.round(Math.random() * charecter.length);
      res += charecter.charAt(index);
    }
    return res;
  };

  const genPas = (passwordLength: number) => {
    let res = '';
    const upperCaseLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetter = 'abcdefghijklmnopqrstupwxyz';
    const numberList = '0123456789';
    const symbolList = '@#$%^&*()_';
    if (upperCase) {
      res += upperCaseLetter;
    }
    if (lowerCase) {
      res += lowerCaseLetter;
    }
    if (number) {
      res += numberList;
    }
    if (symbol) {
      res += symbolList;
    }
    const passRes = createPassString(res, passwordLength);
    setPass(passRes);
    setIsPassGenerated(true);
  };
  const resetPass = () => {
    setIsPassGenerated(false);
    setPass('');
    setNumber(false);
    setUpperCase(false);
    setLowerCase(false);
    setSymbol(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.headTxt}>Password Generator</Text>
          <Formik
            initialValues={{passLength: ''}}
            validationSchema={passvalid}
            onSubmit={val => {
              genPas(+val.passLength);
            }}>
            {({values, isValid, handleChange, handleSubmit, handleReset}) => (
              <>
                <View style={styles.input}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#999"
                    value={values.passLength}
                    onChangeText={handleChange('passLength')}
                    placeholder="Your Password length"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.options}>
                  <Text style={styles.txt}>Include uppercase characters</Text>
                  <BouncyCheckbox
                    size={25}
                    fillColor="#888"
                    unFillColor="#333"
                    onPress={(isChecked: boolean) => {
                      setUpperCase(isChecked);
                    }}
                  />
                </View>

                <View style={styles.options}>
                  <Text style={styles.txt}>Include lower characters</Text>
                  <BouncyCheckbox
                    size={25}
                    fillColor="#888"
                    unFillColor="#333"
                    onPress={(isChecked: boolean) => {
                      setLowerCase(isChecked);
                    }}
                  />
                </View>
                <View style={styles.options}>
                  <Text style={styles.txt}>Include numbers</Text>
                  <BouncyCheckbox
                    size={25}
                    fillColor="#888"
                    unFillColor="#333"
                    onPress={(isChecked: boolean) => {
                      setNumber(isChecked);
                    }}
                  />
                </View>

                <View style={styles.options}>
                  <Text style={styles.txt}>Include special symbols</Text>
                  <BouncyCheckbox
                    size={25}
                    fillColor="#888"
                    unFillColor="#333"
                    onPress={(isChecked: boolean) => {
                      setSymbol(isChecked);
                    }}
                  />
                </View>

                <View style={styles.action}>
                  <TouchableOpacity
                    style={[styles.btn, styles.genPass]}
                    disabled={!isValid}
                    onPress={() => {
                      handleSubmit();
                      console.log('haha');
                    }}>
                    <Text style={styles.getPassTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, styles.reset]}
                    onPress={() => {
                      handleReset();
                      resetPass();
                    }}>
                    <Text style={styles.resetPassTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
                {isPassGenerated ? (
                  <View style={styles.prompt}>
                    <Text style={styles.promptTitle}>Pasword Generated!</Text>
                    <Text style={styles.promptSub}>
                      Please long press to copy or share your password
                    </Text>
                    <Text selectable style={styles.passTxt}>
                      {pass}
                    </Text>
                  </View>
                ) : null}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headTxt: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: '#555',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#444',
    color: '#fff',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txt: {
    color: 'white',
    fontSize: 20,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 50,
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    textAlign: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  genPass: {
    backgroundColor: 'white',
  },
  reset: {
    backgroundColor: 'red',
    paddingHorizontal: 60,
  },
  getPassTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  resetPassTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  prompt: {
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 10, // Optional: Adds rounded corners
    padding: 20, // Optional: Adds internal padding
    marginVertical: 10, // Optional: Adds vertical margins
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // Elevation for Android
  },
  promptTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: 'black',
  },
  promptSub: {
    fontSize: 15,
    textAlign: 'center',
    flexWrap: 'wrap',
    color: 'black',
  },
  passTxt: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'red',
  },
});
