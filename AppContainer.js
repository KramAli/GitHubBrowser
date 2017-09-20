'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

var Search = require('./Search');
var Feed = require('./Feed');

class AppContainer extends Component {
	constructor(props){ 
        super(props);
            this.state ={
                selectedTab: 'feed'
            }
		}
	render(){
        return (
            <TabBarIOS style={styles.container}>
                
                <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab=='feed'}
                    icon={require('./6.png')}
                    onPress={()=>this.setState({selectedTab:'feed'})}>
                   <NavigatorIOS 
                        style={{
                            flex:1
                        }}
                        initialRoute={{
                            component:Feed,
                            title:'Feed'
                        }}
                    />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab=='search'}
                    icon={require('./14.png')}
                    onPress={()=>this.setState({selectedTab:'search'})}>
                   <NavigatorIOS 
                        style={{
                            flex:1
                        }}
                        initialRoute={{
                            component:Search,
                            title:'Search'
                        }}
                    />
                </TabBarIOS.Item>
            </TabBarIOS>	
		);
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
        textAlign: 'center',
        marginTop:10,
        color: 'red'
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

module.exports = AppContainer;