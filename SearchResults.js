'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
  Image
} from 'react-native';


class SearchResults extends Component {
	constructor(props){ 
		super(props);

		console.log('SEARCHRESULTS')
		
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !=r2
		});

		this.state = {
			dataSource: ds,
			searchQuery: props.searchQuery
		};
		
	}
	componentDidMount(){
		this.doSearch();
	}

	doSearch(){
		var url = 'https://api.github.com/search/repositories?q=' + 
			encodeURIComponent(this.state.searchQuery)

		fetch(url)
		.then((response)=> response.json())
		.then((responseData)=>{
			this.setState({
				respositories: responseData.respositories,
				dataSource: this.state.dataSource
					.cloneWithRows(responseData.items)
			});
		})
		.finally(()=>{

		})
	}


	renderRow(rowData){

		return (
			<View style={{
				padding: 20,
				borderColor:'#D7D7D7',
				borderBottomWidth: 1,
				backgroundColor:'#fff'
			}}>
				<Text style={{
					fontSize: 20,
					fontWeight: '600'
				}}>
				{rowData.full_name}
				</Text>
				<View style={{
					flex:1,
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 20,
					marginBottom:20
				}}>
				<View style={styles.repoCell}>
					<Image source={require('./6.png')}
						style ={styles.repoCellIcons}></Image>
						<Text style={styles.repoCellLabel}>
							{rowData.stargazers_count}
						</Text>
				</View>
				<View style={styles.repoCell}>
					<Image source={require('./6.png')}
						style ={styles.repoCellIcons}></Image>
						<Text style={styles.repoCellLabel}>
							{rowData.forks}
						</Text>
				</View>
				<View style={styles.repoCell}>
					<Image source={require('./6.png')}
						style ={styles.repoCellIcons}></Image>
						<Text style={styles.repoCellLabel}>
							{rowData.open_issues}
						</Text>
				</View>
			</View>
		</View>

		)
	}

	render(){
		if(this.state.showProgress){
			return(
				<View style={{
					flex:1,
					justifyContent: 'center'
				}}>
					<ActivityIndicatorIOS
						size="large"
						animating={true} />
					</View>
			)
		}
        return (
			<View style={{
				flex: 1
			}}>
			<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)} >
				</ListView>
			</View>
		);
    }
}


var styles = StyleSheet.create({
	repoCell:{
		width:50,
		alignItems: 'center'
	},
	repoCellIcons:{
		width:20,
		height:20
	
	},
	repoCellLabel:{
		textAlign: 'center'
	}
})
module.exports = SearchResults;