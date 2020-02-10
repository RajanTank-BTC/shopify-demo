import React from 'react'
import { View, Text, DeckSwiper, Image, Card, CardItem, Left, Thumbnail, Body, Icon, Header, Right, Button } from 'native-base'
import { ImageBackground, ScrollView } from 'react-native'
import Shopify from 'react-native-shopify'

class DisplayItem extends React.Component {


  getImages = () => {
    const { navigation } = this.props
    let item = navigation.getParam("item")
    let { images, vendor } = item
    let finalImages = []
    images.map(item => {
      finalImages.push(
        {
          text: vendor,
          name: 'One',
          image: item.src,
        }
      )
    })
    return finalImages
  }

  checkoutItem = () => {
    const { navigation } = this.props
    let itemDetails = navigation.getParam("item")
    navigation.navigate("CheckOutScreen", { itemDetails })
  }

  render() {
    const { navigation } = this.props
    let itemDetails = navigation.getParam("item")
    let images = this.getImages()
    console.log(images)
    return (
      <>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            <Header noLeft={false} style={{ height: 50, backgroundColor: 'blue' }} >
              <Left style={{ margin: 20 }}>
                <Icon name="chevron-left" type="Entypo" onPress={() => navigation.navigate("HomeScreen")} />
              </Left>
              <Body />
              <Right />
            </Header>
            <View style={{ height: 300, margin: 15, marginBottom: 0 }}>
              <DeckSwiper
                dataSource={images}
                renderItem={item => {
                  return (
                    <Card style={{ elevation: 3 }}>
                      <CardItem cardBody>
                        <ImageBackground style={{ width: 300, height: 300 }} source={{ uri: item.image }} />
                      </CardItem>
                    </Card>
                  )
                }
                }
              />
            </View>
            <View style={{ margin: 20, margin: 20 }}>
              <Text style={{ fontSize: 14, color: 'grey' }}>{itemDetails.vendor}</Text>
              <Text style={{ textAlign: 'left', fontSize: 20, }}>{itemDetails.title}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'green' }}>₹{itemDetails.variants[0].price}</Text>
            </View>
            <View>
              <View style={{ backgroundColor: '#d3d3d3', height: 5 }} ></View>
              <Text style={{ margin: 10, marginLeft: 20, color: 'grey', fontSize: 15 }}>{itemDetails.description}</Text>
              <View style={{ backgroundColor: '#d3d3d3', height: 5 }} ></View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 5 }} >Variants</Text>
            {itemDetails.variants &&
              <View style={{ margin: 10, flexDirection: 'row' }}>
                <Left>
                  <Thumbnail style={{ width: 70, height: 70 }} square source={{ uri: itemDetails.variants[0].image.src }} />
                </Left>
                <Body>
                  <Text>{itemDetails.variants[0].title}</Text>
                  <Text style={{ color: 'green' }}>{itemDetails.variants[0].price}</Text>
                </Body>
                <Right />
              </View>}
          </ScrollView>
          <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 0 }}>
            <Button style={{ flex: 1, alignContent: 'center', margin: 3, backgroundColor: 'white' }}><Text style={{ textAlign: 'center', color: 'black' }}>ADD TO CART</Text></Button>
            <Button
              onPress={() => this.checkoutItem()}
              style={{ flex: 1, alignContent: 'center', margin: 3, backgroundColor: '#ff6242', textAlign: 'center' }}>
              <Text style={{ textAlign: 'center', color: 'white' }}>
                BUY NOW
              </Text>
            </Button>
          </View>
        </View>
      </>
    )
  }
}

export default DisplayItem
