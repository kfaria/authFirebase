import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null }

  componentWillMount(){
    firebase.initializeApp({
    apiKey: "AIzaSyD11TIteM5vU3TEdw74Ctm3D7Tui4GtlMo",
    authDomain: "authentication-67e2b.firebaseapp.com",
    databaseURL: "https://authentication-67e2b.firebaseio.com",
    projectId: "authentication-67e2b",
    storageBucket: "authentication-67e2b.appspot.com",
    messagingSenderId: "578579318116"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState ({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <CardSection>
          <Button
            onPress={() => {
              firebase.auth().signOut()}}>
            Log Out
          </Button>
        </CardSection>
      );
      case false:
        return <LoginForm />;        
      default: 
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size='large' />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  };
}

const styles={
  spinnerStyle: {
    alignSelf: 'center'
  }
}
export default App;