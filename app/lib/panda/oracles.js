const oracleAbi = require('./abi/chainoracle.json');

export default function(web3) {
  return {
    'ETH': {
      address: '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e',
      contract: new web3.eth.Contract(
        oracleAbi,
        '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e',
      ),
    },
    'WBNB': {
      address: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
      contract: new web3.eth.Contract(
        oracleAbi,
        '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
      ),
    },
    'DAI': {
      address: '0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA',
      contract: new web3.eth.Contract(
        oracleAbi,
        '0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA',
      ),
    },
    'USDC': {
      address: '0x51597f405303C4377E36123cBc172b13269EA163',
      contract: new web3.eth.Contract(
        oracleAbi,
        '0x51597f405303C4377E36123cBc172b13269EA163',
      ),
    },
    'BUSD': {
      address: '0xcBb98864Ef56E9042e7d2efef76141f15731B82f',
      contract: new web3.eth.Contract(
        oracleAbi,
        '0xcBb98864Ef56E9042e7d2efef76141f15731B82f',
      ),
    },
    'Cake': {
      address: '0xB6064eD41d4f67e353768aA239cA86f4F73665a1',
      contract: new web3.eth.Contract(
        oracleAbi,
        '0xB6064eD41d4f67e353768aA239cA86f4F73665a1',
      ),
    },
  };
}
