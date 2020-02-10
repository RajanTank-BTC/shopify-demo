import React from 'react'
import { View, Header, Left, Icon, Body, Right, Thumbnail, Button, Text } from 'native-base'
import { } from 'react-native'
import Shopify from 'react-native-shopify'
import { cloneDeep } from 'lodash';
import { getClient } from '../helper';

class CheckOutScreen extends React.Component {

  state = {
    quantity: 1,
  }

  updateQuantity = (type) => {
    const { quantity } = this.state
    if (type === 'increase') {
      this.setState({ quantity: (quantity + 1) })
    }
    else {
      if (quantity !== 1) {
        this.setState({ quantity: (quantity - 1) })
      }
    }
  }

  confirmOder = () => {
    const { navigation } = this.props
    const itemDetails = navigation.getParam('itemDetails')
    let firstProduct = []
    let client = getClient()

    client.checkout.create().then((checkout) => {
      // Do something with the checkout
      // console.log(JSON.stringify(checkout));
      let checkoutObj = JSON.parse(JSON.stringify(checkout))
      const checkoutId = checkoutObj.id; // ID of an existing checkout
      const shippingAddress = {
        address1: 'Chestnut Street 92',
        address2: 'Apartment 2',
        city: 'Louisville',
        company: null,
        country: 'United States',
        firstName: 'Bob',
        lastName: 'Norman',
        phone: '555-625-1199',
        province: 'Kentucky',
        zip: '40202'
      };
      client.checkout.updateShippingAddress(checkoutId, shippingAddress).then(checkout => {
        // console.log(JSON.parse(JSON.stringify(checkout)))
        // Do something with the updated checkout
      });
      const lineItemsToAdd = [
        {
          variantId: itemDetails.variants[0].id,
          quantity: this.state.quantity,
          customAttributes: [{ key: "MyKey", value: "MyValue" }]
        }
      ];

      client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
        // Do something with the updated checkout
        navigation.navigate('WebViewScreen', { url: checkout.webUrl })
        // console.log(JSON.parse(JSON.stringify(checkout)))
        // console.log(JSON.parse(JSON.stringify(checkout.lineItems))); // Array with one additional line item
      });
    }).catch(error => {
      console.log(error.message)
    });

  }

  render() {
    const { quantity } = this.state
    const { navigation } = this.props
    const itemDetails = navigation.getParam('itemDetails')
    console.log(itemDetails)
    const { images } = itemDetails
    return (
      <View style={{ flex: 1 }}>
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Icon name="close" type="AntDesign" onPress={() => navigation.navigate("HomeScreen")} />
          </Left>
          <Body>
            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>ADD TO CART</Text>
          </Body>
          <Right />
        </Header>

        <View style={{ height: 40, backgroundColor: '#f2f2f2', }} ></View>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 'auto', margin: 10 }}>
          <Left>
            <Thumbnail style={{ height: 100, width: 100 }} square source={{ uri: images[0].src }} />
          </Left>
          <Body>
            <Text>{itemDetails.title}</Text>
          </Body>
        </View>
        <View style={{ flexDirection: 'column', backgroundColor: '#f2f2f2', padding: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
            <Text style={{ fontSize: 20 }}>COLOR</Text>
            <Text style={{ fontSize: 20 }}>{}white</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
            <Text style={{ fontSize: 20 }}>Quantity</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon style={{ fontSize: 22, padding: 10, backgroundColor: 'black', color: 'white' }} type="FontAwesome" name="minus" onPress={() => this.updateQuantity('decrease')} />
              <Text style={{ fontSize: 25, paddingLeft: 30, paddingRight: 30, backgroundColor: 'white', borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'grey' }}>
                {quantity}
              </Text>
              <Icon style={{ fontSize: 22, padding: 10, backgroundColor: 'black', color: 'white' }} type="FontAwesome" name="plus" onPress={() => this.updateQuantity('increase')} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginTop: 50, position: 'relative' }}>
            <Text style={{ fontSize: 20 }}>Price</Text>
            <Text style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }}>₹ {(itemDetails.variants[0].price * quantity)}</Text>
          </View>
          <View style={{ flexDirection: 'row-reverse' }}>
            <Button style={{ width: 250, paddingLeft: 20 }} onPress={() => this.confirmOder()}>
              <Text style={{ textAlign: 'center', fontSize: 14 }}>Confirm To CheckOut</Text>
            </Button>

          </View>
        </View>
      </View>
    )
  }
}

export default CheckOutScreen