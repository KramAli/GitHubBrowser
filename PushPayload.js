'use strict';

import React, { Component } from 'react';
import {
  Text,
  View, 
  ListView,
  Image,
  StyleSheet
} from 'react-native';

var moment = require('moment')

class PushPayload extends Component {
	constructor(props){ 
		super(props);
		
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !=r2
		});

		this.state = {
			dataSource: ds
		};
	}
	componentDidMount(){
		this.fetchFeed();
	}

	fetchFeed(){

		console.log('did we even get here')
		require('./AuthService').getAuthInfo((err,authInfo)=>{
			var url ='https://api.github.com/users/'
			+ 'facebook'
			+'/received_events';

			console.log(url);

			fetch(url, {
				headers: authInfo.header
			})
			.then((response)=>{

				console.log(response)
				return response.json()

			})
			.then((responseData)=>{

				var feedItems =
					responseData.filter((ev)=>
					ev.type =='PushEvent');


				console.log(feedItems);
				this.setState({
					dataSource: this.state.dataSource
						.cloneWithRows(feedItems)
				})

			})
		})
	}

    renderRow(rowData){
        return(
            <View style={{
                flex:1,
                justifyContent: 'center', 
                borderColor:'#DFDFDF',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                paddingTop:20,
                paddingBottom:20,
                padding:10
            }}>
                <Text>{rowData.payload.commits[0].message}</Text>
            </View>
        )
    }

	render(){

        return (
			<View style={{
				flex: 1, 
                paddingTop:80, 
                justifyContent: 'flex-start', 
                alignItems: 'center'
			}}>
                <Image 
                        source={{uri: this.props.PushEvent.actor.avatar_url}}
                        style={{
                            height: 120,
                            width: 120,
                            borderRadius: 60
                        }}
                        />
                        <Text style={{
                            paddingTop:20,
                            paddingBottom:20,
                            fontSize: 20
                        }}>
                            {moment(this.props.PushEvent.created_at).fromNow()}
                            </Text>
                            <Text><Text style={styles.bold}>{this.props.PushEvent.actor.login}</Text> pushed to</Text>
                            <Text><Text style={styles.bold}>{this.props.PushEvent.payload.ref.replace('refs/heads/','')}</Text></Text>
                            <Text>at {this.props.PushEvent.repo.name}</Text>
                            <Text style={{
                                paddingTop:40,
                                fontSize: 20
                            }}>
                                {this.props.PushEvent.payload.commits.length} Commit(s)
                            </Text>


                            <ListView
                                contentInset={{
                                    top:-50
                                }}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow.bind(this)} />
                            
			</View>
		);
    }
}

var styles = StyleSheet.create({
    bold:{
        fontWeight:'800',
        fontSize:16
    }
})

module.exports = PushPayload;