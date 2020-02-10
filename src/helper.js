import Client from 'shopify-buy';

export const getClient = () => {

  const client = Client.buildClient({
    domain: 'btc-demo1.myshopify.com',
    storefrontAccessToken: '58269570e7c27b5c7b88b2e5803c3ad5'
  });
  return client
} 
