export const config =
{
  api_url: 'https://changenow.io/api/v1',
  api_key: process.env.API_CN_KEY,
  popularCurrs: {
    btc: 'Bitcoin (BTC)',
    eth: 'Ethereum (ETH)',
    bch: 'BitcoinCash (BCH)',
    ltc: 'Litecoin (LTC)',
    xmr: 'Monero (XMR)',
    zec: 'Zcash (ZEC)'
  },
  kb: {
    start: 'Start exchange',
    startNew: 'Start new exchange',
    cancel: '❌ Cancel exchange',
    next: '▶️ Next',
    back: '◀️ Back',
    confirm: '✔️ Confirm',
    help: 'ℹ️ Support Info'
  },
  interval: 15000
}
