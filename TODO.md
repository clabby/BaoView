# TO DO

### General
* Styled components instead of scss :art: [ :eight_pointed_black_star: IN PROGRESS ]
  * About Page [ :white_check_mark: ]
  * Header Component [ :white_check_mark: ]
  * Footer Component [ :white_check_mark: ]
  * NotFoundPage [ :white_check_mark: ]
  * Overview Component [ :white_check_mark: ]
  * Not Connected Component [ :white_check_mark: ]
  * Connected Component [ :white_check_mark: ]
  * FarmCard / FarmCards Component [  ]
* Freshen up [hook functions](https://reactjs.org/docs/hooks-reference.html) :anchor:
* Clean up codebase [ :eight_pointed_black_star: IN PROGRESS ]
* Prepare for other Bao franchises (Yetiswap, Pandaswap)

### Specifics
* Make APY's more accurate with xDai block time instead of mainnet blocktime, consideration of % LP staked (TVL), and price data from chain oracles rather than CoinGecko. [ :eight_pointed_black_star: IN PROGRESS - Timeseries data logger program (Pool Metrics) has not been updated yet. FarmCards show a good APY estimate, still using CoinGecko for prices however. ]
  * mainnet block time (avg as of 4/4/21): 2.0s
  * xdai block time (avg as of 4/4/21): 5.2s
* Fix wallet disconnecting on page navigation
* Fix "Pool Info" dropdown retracting upon component re-render
* Add support for address input alongside MetaMask to view account data.
* Add mobile support
* Implement support for Sushi LPs on xDai [ :white_check_mark: ]
* Implement support for Mainnet LPs (Uni & Sushi)
