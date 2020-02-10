import React from 'react'
import { WebView } from 'react-native-webview';


class WebViewComponent extends React.Component {
  render() {
    const { navigation } = this.props
    let url = navigation.getParam("url")
    return (
      <WebView source={{ uri: url }} />
    );
  }
}

export default WebViewComponent