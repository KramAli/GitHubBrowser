'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  ErrorUtils
} from 'react-native';

var buffer = require('buffer');

class Login extends Component {
	constructor(props){ super(props);
		this.state = {
			showProgress:false
		}
	}
	render(){
		var errorCtrl = <View />

		if(!this.state.success && this.state.badCredentials){
			errorCtrl = <Text style={styles.error}>
				Please check your username and password and try again
			</Text>;
		}

		if(!this.state.success && this.state.unknownError){
			errorCtrl = <Text style={styles.error}>
				We experienced an unexpected error
			</Text>;
		}
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('./Mario.png')} />
		<Text style={styles.heading}>Krambo</Text>
		<TextInput 
			onChangeText={(text)=>this.setState({username:text})}
			style={styles.input} 
			placeholder='Username'></TextInput>
		<TextInput 
			onChangeText={(text)=>this.setState({password:text})}
			style={styles.input} 
			placeholder='Password' 
			secureTextEntry={true}></TextInput>
			<TouchableHighlight 
				onPress={this.OnLoginPressed.bind(this)}
				style={styles.button}>
				<Text 
					style={styles.buttonText}>Log in </Text>
			</TouchableHighlight>
				{errorCtrl}
			<ActivityIndicator 
				animating={this.state.showProgress}
				size="large"
				style={styles.loader}
				/>
			</View>
			
		);
	}

	OnLoginPressed(){
		console.log('username ' + this.state.username);
		this.setState({showProgress:true});

		var authService = require('./AuthService')
		authService.login({username:this.state.username, password: this.state.password}, (results)=>{this.setState(Object.assign({
			showProgress:false},results));

			if(results.success && this.props.onLogin){
				console.log('log me me in now')
				this.props.onLogin();
			}
		});
	}
};

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF', 
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding:10
	},
	logo: { 
			width:100, 
			height:120
	},
	heading:{
		fontSize:30,
		marginTop:10
	},
	input: {
		height: 50,
		marginTop:10,
		padding:4,
		fontSize:18,
		borderWidth:1,
		borderColor: '#48bbec',
		justifyContent: 'center',
		alignSelf:'stretch',
	},
	button:
	{
		height:50,
		backgroundColor:'#48bbec',
		alignSelf:'stretch',
		marginTop:10,
		justifyContent:'center'
		
	},
	buttonText:
	{
		fontSize:22,
		color:'#FFF',
		alignSelf: 'center'
	},
	loader:
	{
		marginTop:20
	},
	error: {
		color:'red',
		marginTop:20
	}

})
module.exports = Login;
