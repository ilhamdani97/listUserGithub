import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator, TouchableHighlight, Image } from 'react-native'
import { connect } from "react-redux";
import { Avatar } from 'react-native-paper'
import { Item, Input, Icon } from 'native-base';
import * as List from '../redux/actions/list'
import axios from 'axios'
import { URL } from 'react-native-dotenv'
import { createStackNavigator, createAppContainer } from 'react-navigation';

class ListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            data: []
        };
    }
    handleChange = (text, name) => {
        this.setState({
            [name]: text
        })
    }
    onSearch = () => {
        let username = this.state.username
        axios.get(`${URL}users/${username}`)
            .then(response => {
                const data = response.data;
                this.setState({data});
                console.log(data);
            })
            .catch(error => {
                alert(error)
            })
    }
    componentDidMount() {
        this.props.getData()
        this.state.data
    }
    async componentWillMount() {
        this.setState(
            { data: await this.props.list.data }
        )
    }
    render() {
        const { width, height } = Dimensions.get('window');
        if (this.state.data.length === 1) {
            return (
                <View><Text>Hai</Text></View>
            );
        }
        return (
            <View>
                <View style={{ flex: 1, flexDirection: 'row', margin: 10 }}>
                    <View style={{ width: width * 75 / 100, height: 60, }} >
                        <Item regular style={{ borderRadius: 20, Colors: '#FF8A65' }}>
                            <Input style={{ color: 'black' }} placeholder='Search By Username'
                                onChangeText={text => this.handleChange(text, "username")}
                                value={this.state.username}
                            />
                        </Item>
                    </View>
                    <View style={{ height: 52, width: 60, backgroundColor: "#9E9E9E", borderRadius: 50, marginLeft: 10 }}>
                        <TouchableHighlight onPress={() => { this.onSearch(this.state) }} underlayColor="white">
                            <Image
                                style={{ width: 30, height: 30, marginLeft: 16, marginTop: 12 }}
                                source={require('../image/magnifier.png')}
                            />

                        </TouchableHighlight>
                    </View>
                </View>
                <FlatList style={{ marginTop: 54 }}
                    data={this.props.list.data}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>

                        <View style={styles}>
                            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                <View style={{ width: width * 25 / 100, height: 70 }} >
                                    <Avatar.Image size={70} source={{ uri: item.avatar_url }} />
                                </View>
                                <View style={{ width: width * 50 / 100, height: 70 }}>
                                    <Text style={{ fontSize: 20, marginBottom: 6, fontWeight: 'bold' }}>{item.login}</Text>
                                    <Text style={{ fontSize: 20 }}>{item.type}</Text>
                                </View>
                                <View style={{ width: width * 22 / 100, height: 70 }} />
                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },

})
const mapStateToProps = state => {
    return {
        list: state.list
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(List.getData()),
        searchData: (username) => dispatch(List.searchData(username)),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListUser);