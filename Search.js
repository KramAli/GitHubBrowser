'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

var SearchResults = require('./SearchResults')

class Search extends Component {
	constructor(props){ super(props);
		console.log('SEARCH')
	}
	render(){
	
		return (
			<View style={styles.container}>
				<TextInput 
					onChangeText={(text)=>this.setState({
						searchQuery: text
						})}
					style={styles.input} 
					placeholder='Search Query'>
					</TextInput>
						<TouchableHighlight 
							onPress={this.OnSearchPressed.bind(this)}
							style={styles.button}>
							<Text 
								style={styles.buttonText}>Search 
							</Text>
						</TouchableHighlight>
			</View>
		);
	}

	OnSearchPressed(){
		this.props.navigator.push({
			component:SearchResults,
			title: 'Results',
			passProps: {
				searchQuery:this.state.searchQuery
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
		padding:10,
		paddingTop:70
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

})
module.exports = Search;
