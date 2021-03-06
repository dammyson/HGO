import React, { Component } from "react";
import { Alert, Dimensions, TouchableOpacity, TextInput, StyleSheet, } from "react-native";
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, ListItem, } from 'native-base';

import { Card, Icon, SocialIcon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

import color from '../../component/color';
import Navbar from '../../component/Navbar';

export default class step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      data: '',
      count:140,

    };
  }

  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps
    if(this.state.titleText == ""){
      Alert.alert('Validation failed', "All fields are requried", [{ text: 'Okay' }])
      return
    }
    saveState({ title: this.state.titleText });
    next();
  };

  goBack() {
    const { back } = this.props;
    // Go to previous step
    back();
  }

  componentDidMount() {
    const { getState } = this.props;
    const state = getState();
    this.setState({ data: state })
   
  }


  countChange(text){
    this.setState({ count: 140 - text.length })

  }

  render() {

    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon
            active
            name="close"
            type='antdesign'
            color='#FFF'
          />
        </Button>
      </Left>
    );


    return (
      <Container style={{ backgroundColor: 'transparent' }}>
        <Navbar left={left} title="Create New Event" bg='#101023' />
        <Content>
          <View style={styles.container}>
            <View >

              <Text style={styles.titleText}>WHAT IS YOUR EVENT NAME</Text>
            </View>
            <Text style={styles.titlesubText}>Give your event a unique name</Text>
            <View style={styles.item}>

              <TextInput
                placeholder="Enter Event Name"
                placeholderTextColor='#8d96a6'
                returnKeyType="next"
                onSubmitEditing={() => this.nextStep()}
                keyboardType='default'
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.menu}
                onChangeText={text => [this.countChange(text), this.setState({ titleText: text})]}
              />

            

            </View>
            <View style={ { marginLeft:20, marginRight:20, justifyContent: 'flex-end',  alignItems: 'flex-end' }}>
                <View style={ {  height:30, width:30, borderRadius:15, justifyContent:'center', alignItems:'center', borderColor:'#8d96a6', borderWidth:1.9}}>
                <Text style={{ fontSize: 12, color:'#8d96a6'}}>{this.state.count}</Text>
                </View>
              </View>     

            <View style={styles.nextContainer}>


              <TouchableOpacity onPress={this.nextStep} style={styles.qrbuttonContainer} block iconLeft>
                <Icon
                  active
                  name="arrowright"
                  type='antdesign'
                  color={color.button_blue}
                />
              </TouchableOpacity>

            </View>


          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "6%"
  },
  titleText: {
    fontSize: 21,
    color: '#ffffff',
    marginTop: 25,
    marginLeft: 15,
    fontFamily: 'NunitoSans-Bold'
  },
  titlesubText: {
    fontSize: 15,
    color: '#8d96a6',
    marginTop: 25,
    marginLeft: 15,
    fontFamily: 'NunitoSans-Bold'
  },
  item: {
    flexDirection: 'row',
    marginTop: 2,
    margin: 15,
    borderColor: 'red',
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingRight: 15,
  },
  menu: {
    flex: 1,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'left',
    fontFamily: 'NunitoSans-Bold'
  },
  qrbuttonContainer: {
    flexDirection: 'row',
    backgroundColor: color.white,
    marginTop: 1,
    borderRadius: 40,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
   
  },
  nextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

    paddingBottom: 20
  }
});