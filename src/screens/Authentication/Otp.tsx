import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const Otp = (props: Props) => {
  const navigation = useNavigation<any>();
  const et1 = useRef<any>();
  const et2 = useRef<any>();
  const et3 = useRef<any>();
  const et4 = useRef<any>();
  const et5 = useRef<any>();
  const et6 = useRef<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <View style={styles.otpView}>
        <TextInput ref={et1} style={styles.inputView} keyboardType='number-pad' maxLength={1} onChangeText={txt => {
          if (txt.length >= 1) {
            et2.current.focus()
          }
        }} />
        <TextInput ref={et2} style={styles.inputView} keyboardType='number-pad' maxLength={1}
          onChangeText={txt => {
            if (txt.length >= 1) {
              et3.current.focus()
            } else if (txt.length < 1) {
              et1.current.focus();
            }
          }}
        />
        <TextInput ref={et3} style={styles.inputView} keyboardType='number-pad' maxLength={1}
          onChangeText={txt => {
            if (txt.length >= 1) {
              et4.current.focus()
            } else if (txt.length < 1) {
              et2.current.focus();
            }
          }}
        />
        <TextInput ref={et4} style={styles.inputView} keyboardType='number-pad' maxLength={1}
          onChangeText={txt => {
            if (txt.length >= 1) {
              et5.current.focus()
            } else if (txt.length < 1) {
              et3.current.focus();
            }
          }}
        />
        <TextInput ref={et5} style={styles.inputView} keyboardType='number-pad' maxLength={1}
          onChangeText={txt => {
            if (txt.length >= 1) {
              et6.current.focus()
            } else if (txt.length < 1) {
              et4.current.focus()
            }
          }} />
        <TextInput ref={et6} style={styles.inputView} keyboardType='number-pad' maxLength={1}
          onChangeText={txt => {
            if (txt.length < 1) {
              et5.current.focus()
            }
          }}
        />
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop:50 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.otpBtn}>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: '600' }}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Otp

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 100,
    alignSelf: 'center',
    color: '#000',
  },
  otpView: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 100,
    gap: 10
  },
  inputView: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  otpBtn: {
    width: "80%",
    height: 45,
    backgroundColor: "green",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }
})