/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { List, ListItem, Left, Thumbnail, Body } from 'native-base'
import { getClient } from '../helper';

class HomeScreen extends React.Component {

  state = {
    products: [],
    title: '',
  }

  componentDidMount() {
    let client = getClient()
    client.product.fetchAll().then((products) => {
      // Do something with the products
      let prd = JSON.parse(JSON.stringify(products))
      this.setState(() => { return { products: prd } })
    });

  }

  getProductsDetails = (item) => {
    const { navigation } = this.props
    navigation.navigate("DisplayItem", { item: item })
  }

  render() {
    const { products } = this.state
    console.log(products)
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {/* <Header /> */}
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <Text style={{ fontSize: 24, color: 'black', textAlign: 'center' }}>
                Welcome To
              </Text>
              <Text style={{ fontSize: 27, color: 'black', textAlign: 'center', fontWeight: 'bold' }}>
                {this.state.title}
              </Text>
              <View style={styles.sectionContainer}>

                <List>
                  {products && products.map(item => {
                    return (
                      <ListItem thumbnail onPress={() => this.getProductsDetails(item)}>
                        <Left  >
                          <Thumbnail height={200} width={200} square source={{ uri: item.images[0].src }} />
                        </Left>
                        <Body>
                          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {item.title}
                          </Text>
                          <Text note numberOfLines={3}>{item.descriptionHtml}</Text>
                          <Text style={{ fontWeight: 'bold', fontSize: 17, color: 'green' }}>${item.variants[0].price}</Text>
                        </Body>
                        {/* <Right>
                          <Button transparent>
                            <Text>View</Text>
                          </Button>
                        </Right> */}
                      </ListItem>
                    )
                  })}
                </List>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
