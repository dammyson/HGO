import React, { Component } from "react";
import { Alert, Dimensions, TouchableOpacity, TextInput, StyleSheet, } from "react-native";
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, ListItem, } from 'native-base';
import { Avatar, Badge, } from 'react-native-elements';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
const deviceHeight = Dimensions.get("window").height;

import color from '../../component/color';
const { width: screenWidth } = Dimensions.get('window')
import Moment from 'moment';
import Navbar from '../../component/Navbar';
Moment.locale('en');
export default class step3 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      data: '',
      count: 140,
      title: '',
      startdate: new Date(),
      enddate: new Date(),
      todate: "2019-06-11",

    };
  }


  nextStep = () => {
    const { next, saveState } = this.props;
    // Save state for use in other steps

    if (Moment(this.state.startdate).format('HH') == Moment(new Date()).format('HH') || Moment(this.state.enddate).format('HH') == Moment(new Date()).format('HH')) {
      Alert.alert('Validation failed', "Select when the restuarant opens and closes, the current time is prefilled", [{ text: 'Okay' }])
      return
    }
    saveState({
      startdate: this.state.startdate,
      enddate: this.state.enddate
    });
    // Go to next step
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
    this.setState({
      today: new Date(),
    });


  }


  countChange(text) {
    this.setState({ count: 140 - text.length })

  }

  render() {

    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={this.props.back}>
          <Icon
            active
            name="ios-arrow-back"
            type='ionicon'
            color='#FFF'
          />
        </Button>
      </Left>
    );


    return (
      <Container style={{ backgroundColor: 'transparent' }}>
        <Navbar left={left} title={this.state.data.title} bg='#101023' />
        <Content>
          <View style={styles.container}>
            <View >

              <Text style={styles.titleText}>SET DAILY OPENING TIME</Text>
            </View>
            <Text style={styles.titlesubText}>Opening Time </Text>
            <View style={styles.item}>
              <Icon
                active
                name="time-slot"
                type='entypo'
                color="#fff"
                size={30}
              />
              <DatePicker
                style={{ marginLeft: 30, alignItems: 'flex-start', width: 70, color: '#101023', borderColor: '#010113', borderWidth: 3 }}
                date={this.state.startdate}
                mode="time"
                dateText
                placeholder="select date"
                format="HH:mm"
                minDate={this.state.today}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateText: {
                    color: '#fff',
                    fontSize: 20
                  },
                  dateInput: {
                    color: '#010113',
                    borderColor: '#010113',
                    width: 400
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ startdate: date }) }}
              />



            </View>

            <Text style={styles.titlesubText}>Closing Time </Text>
            <View style={styles.item}>
              <Icon
                active
                name="time-slot"
                type='entypo'
                color="#fff"
                size={30}
              />
              <DatePicker
                style={{ marginLeft: 30, alignItems: 'flex-start', width: 70, color: '#101023', borderColor: '#010113', borderWidth: 3 }}
                date={this.state.enddate}
                mode="time"
                dateText
                placeholder="select date"
                format="HH:mm"
                minDate={this.state.today}
                showIcon={false}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateText: {
                    color: '#fff',
                    fontSize: 20
                  },
                  dateInput: {
                    color: '#010113',
                    borderColor: '#010113',
                    width: 400
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ enddate: date }) }}
              />



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
    marginLeft: 20,
    fontFamily: 'NunitoSans-Bold'
  },
  titlesubText: {
    fontSize: 15,
    color: '#8d96a6',
    marginTop: 15,
    marginLeft: 20,
    fontFamily: 'NunitoSans-Bold'
  },
  item: {
    flexDirection: 'row',
    marginTop: 2,
    margin: 15,
    alignItems: 'center',
    paddingRight: 15,
    marginLeft: 20,
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