export const requestParams = {
  headers: {
    'x-api-key': `${process.env.API_KEY}`,
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0',
    Accept: '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
  },
  referrer: 'https://lolesports.com/',
  method: 'GET',
  mode: 'cors',
} as RequestInit;
