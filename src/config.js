export const config =
{
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
    accept: 'Read and Accept',
    startNew: 'Start new exchange',
    terms: 'Terms of Use and Privacy Policy',
    cancel: '❌ Cancel exchange',
    next: '▶️ Next',
    back: '◀️ Back',
    confirm: '✔️ Confirm',
    help: 'ℹ️ Support Info',
  },
  interval: 15000,
  email: process.env.CN_EMAIL || 'user@config.email.com'
}
