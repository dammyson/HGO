
import React, { Component } from 'react';
import { TextInput, StyleSheet, TouchableOpacity, StatusBar, AsyncStorage, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col, Separator } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Avatar, Badge, } from 'react-native-elements';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import {
    BarIndicator,
} from 'react-native-indicators';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


import color from '../../component/color';
const { width: screenWidth } = Dimensions.get('window')
import Navbar from '../../component/Navbar';
const URL = require("../../component/server");
import Moment from 'moment';

export default class MerchantDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            dataone: [
            ],
            datatwo: [5, 7, 9, 0, 8, 8, 8, 9
            ],
            data: '',
            nodata: false,
            slider1ActiveSlide: 0,
            selected: null,
            user: {},
            searchText: '',
            bal: 0
        };
    }




    componentDidMount() {
        AsyncStorage.getItem('data').then((value) => {
            if (value == '') { } else {
                this.setState({ data: JSON.parse(value) })
                this.setState({ user: JSON.parse(value).user })
            }

            // this.getEventsRequest()
        })

        AsyncStorage.getItem('bal').then((value) => {
            if (value == '') { } else {
                this.setState({ bal: value })
            }
        })
    }


    getEventsRequest() {
        const { data, user } = this.state
        console.warn(user)


        fetch(URL.url + 'events', {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + data.token,
            }
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res);
                if (res.status) {
                    this.setState({
                        dataone: res.data.trending,

                        loading: false
                    })
                } else {
                    this.setState({
                        nodate: true,
                        loading: false
                    })
                }
            })
            .catch(error => {
                alert(error.message);
                console.warn(error);
                this.setState({ loading: false })
            });


    };





    render() {

        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
                    <View style={styles.welcome}>
                        <Text style={{ fontSize: 15, color: '#fff' }}>Fetching all your goodies</Text>
                        <BarIndicator count={4} color={color.primary_color} />
                        <Text style={{ fontSize: 13, flex: 1, color: '#fff' }}>Please wait...</Text>
                    </View>
                </View>
            );
        }


        const { slider1ActiveSlide } = this.state;
        var left = (
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => Actions.profile()}>
                    <Avatar
                        rounded
                        source={{
                            uri: this.state.user.profilePicture

                        }}
                    />
                </Button>
            </Left>
        );
        var right = (
            <Right>
                <Button transparent>
                    <Icon
                        active
                        name="notifications-active"
                        type='material-icons'
                        color='#FFF'
                    />
                </Button>
            </Right>
        );

        return (
            <Container style={{ backgroundColor: color.secondary_color }}>

                <Navbar left={left} right={right} title="Home" bg='#101023' />
                <Content>
                    <View style={styles.container}>
                        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
                        <View >
                            <View style={{ flexDirection: 'row', backgroundColor: '#FFF', marginTop: 24, marginBottom: 24, marginLeft: 30, marginRight: 30, borderRadius: 5 }}>
                                <View style={{ marginLeft: 20, flex: 1, alignItems: 'flex-start', marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ color: '#010113', fontSize: 16, fontWeight: '200', fontFamily: 'NunitoSans-Bold', }}>₦{this.state.bal}</Text>
                                    <Text style={{ color: '#010113', fontSize: 12, fontFamily: 'NunitoSans', opacity: 0.77 }}>My Wallet Balance</Text>

                                </View>
                                <View style={{ alignItems: 'flex-start', marginTop: 10, marginBottom: 10, marginRight: 15 }}>
                                    <TouchableOpacity onPress={() => Actions.fundW()} style={{ backgroundColor: '#139F2A', alignItems: 'center', alignContent: 'space-around', paddingLeft: 13.5, paddingRight: 13.5, borderRadius: 5, }} block iconLeft>
                                        <Text style={{ color: "#fff", marginTop: 7, marginBottom: 7, fontSize: 16, fontWeight: '200', fontFamily: 'NunitoSans', opacity: 0.77 }}>Withdraw Funds</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ backgroundColor: '#FFF', marginTop: 10, marginLeft: 20, marginRight: 20, opacity: 0.77, height: 0.6 }}></View>
                            <View style={{ marginLeft: 10, marginRight: 7, marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.titleText}>RUNNING SERVICES</Text>
                                <TouchableOpacity onPress={() => Actions.more({ prams: "eventListing/Trending/7" })} style={{ marginLeft: 10, marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: '#188EFF', }}>View All </Text>
                                    <Icon
                                        active
                                        name="ios-arrow-forward"
                                        type='ionicon'
                                        color='#188EFF'
                                    /></TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 1, marginLeft: 20, marginRight: 20, }}>
                            <ScrollView  >

                                {this.renderItem(this.state.datatwo)}

                            </ScrollView>
                        </View>

                    </View>
                </Content>
                <TouchableOpacity style={styles.fab} onPress={() => Actions.createRestaurant()}>
                    <Icon
                        active
                        name="plus"
                        type='entypo'
                        color='#000'
                        size={25}
                    />
                </TouchableOpacity>
            </Container>
        );
    }

    renderItem(tickets) {

        let items = [];
        for (let i = 0; i < tickets.length; i++) {
            items.push(
                <TouchableOpacity style={styles.oneRow}>

                    <View style={{ flex: 1, padding: 10 }}>
                        <AnimatedCircularProgress
                            size={100}
                            width={8}
                            fill={60}
                            tintColor="#139F2A"
                            rotation={0}
                            backgroundColor="#3d5875">
                            {
                                (fill) => (
                                    <View style={{}} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ marginLeft: 2, textAlign: 'left', color: '#fff', fontSize: 13, fontWeight: '500', }}> 500/</Text>
                                        <Text style={{ textAlign: 'left', color: '#fff', fontSize: 10, fontWeight: '100', opacity: 0.59 }}>1000 </Text>
                                        </View>
                                        <Text style={{ marginLeft: 2, textAlign: 'left', color: '#fff', fontSize: 10, fontWeight: '100', opacity: 0.59 }}> Tickets Sold </Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                    <View style={{ flex: 3, paddingLeft:12, justifyContent: 'center',}}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 20 }}>
                            <Text style={{ marginLeft: 2, textAlign: 'left', color: '#fff', fontSize: 8, color: '#FA9917', }}> event </Text>
                            <View style={{ height: 8, width: 24, backgroundColor: '#FA9917' }} />
                        </View>
                        <Text style={styles.title}> GTB Food & Drink</Text>
                        <Text style={{ marginLeft: 2, marginTop:10, textAlign: 'left', color: '#fff', fontSize: 14, fontWeight: '100', }}> 12,400.00 </Text>


                    </View>

                </TouchableOpacity>
            )

        };
        return items;
    }


}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    slider: {
        backgroundColor: '#fff'
    },
    paginationContainer: {
        paddingVertical: 8
    },
    welcome: {
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    },
    titleText: {
        flex: 1,
        fontSize: 19,
        color: '#ffffff',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        fontFamily: 'NunitoSans-Bold'
    },
    oneRow: {
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: '#111124',
        borderLeftWidth: 4,
        paddingBottom: 2,
        borderRadius: 10
    },
    title: {
        marginTop: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    fab: {
        height: 60,
        width: 60,
        borderRadius: 200,
        position: 'absolute',
        bottom: 30,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7A400',
    },

});
