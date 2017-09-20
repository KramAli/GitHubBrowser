/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';

var Login = require('./Login');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');

//export default class Test extends Component {
//  render() {
//    return (
//   <Login />
//    );
//  }
//  onLogin: function(){
//    console.log('successfully logged in')
//  }
//}

var Test = React.createClass({
  componentDidMount: function(){
      AuthService.getAuthInfo((err,authInfo)=>{
        this.setState({
          checkIngAuth:false, 
          isLoggedIn:authInfo!=null
        })
      });
  },
  render:function(){
    if(this.state.checkIngAuth){
      <View style={styles.container}>
        <ActivityIndicatorIOS 
          animating={true}
          size="large"
          style={styles.loader} />
      </View>
    }
    

    console.log(this.state.isLoggedIn)

    if(this.state.isLoggedIn){
      return(
        <AppContainer />
      );
    }else{
      return(
        <Login onLogin={this.onLogin} />
      );
    }
  },
  onLogin:function(){
    this.setState({isLoggedIn:true});
  },
  getInitialState: function(){
    return {
      isLoggedIn:false,
      checkIngAuth:true
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
      textAlign: 'center',
      marginTop:10
    
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('Test', () => Test);
