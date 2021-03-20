import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
	ONE_MINUTE_IN_SECONDS,
	ONE_HOUR_IN_SECONDS,
	ONE_DAY_IN_SECONDS,
	ONE_YEAR_IN_SECONDS,
	ZERO: new BigNumber(0),
	ONE: new BigNumber(1),
	ONES_31: new BigNumber('4294967295'), // 2**32-1
	ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
	ONES_255: new BigNumber(
		'115792089237316195423570985008687907853269984665640564039457584007913129639935',
	), // 2**256-1
	INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
	uniswapFactory: '0x45DE240fbE2077dd3e711299538A09854FAE9c9b',
	uniswapFactoryV2: '0x45DE240fbE2077dd3e711299538A09854FAE9c9b',
	BAO: '0x82dFe19164729949fD66Da1a37BC70dD6c4746ce',
	'BAO.cx': '0xe0d0b1DBbCF3dd5CAc67edaf9243863Fd70745DA',
	WETH: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
	YFI: '0xbf65bfcb5da067446CeE6A706ba3Fe2fB1a9fdFd',
	SUSHI: '0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE',
	GRT: '0xFAdc59D012Ba3c110B08A15B7755A5cb7Cbe77D7',
	RUNE: '0x4c68041898bfEfbfCc4253fbE8eD30830E6eb767',
	'1inch': '0x7f7440C5098462f833E123B44B8A03E1d9785BAb',
	NFTX: '0x8e1A12dA00BBF9DB10d48bd66Ff818bE933964d5',
	stETH: '0x3C037849a8ffcf19886e2f5B04f293B7847D0377',
	TVK: '0xeB2BCaBb0cDC099978A74cFE4Ab4d45E7e677a45',
	wBTC: '0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252',
	USDT: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
	LINK: '0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2',
	USDC: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
	OKB: '0x4eFDfbb7Cca540a79A7e4dCaD1cb6ED14f21c43e',
	HT: '0x036328204f84b423F0e1A12C3B8777aE08758481',
	AAVE: '0xDF613aF6B44a31299E48131e9347F034347E2F00',
	CEL: '0x0aCD91f92Fe07606ab51EA97d8521E29D110fD09',
	SNX: '0x3A00E08544d589E19a8e7D97D0294331341cdBF6',
	CRV: '0x712b3d230F3C1c19db860d80619288b1F0BDd0Bd',
	COMP: '0xDf6FF92bfDC1e8bE45177DC1f4845d391D3ad8fD',
	MKR: '0x5fd896D248fbfa54d26855C267859eb1b4DAEe72',
	FTT: '0x75886F00c1a20Ec1511111Fb4Ec3C51de65B1fe7',
	RENBTC: '0x4A88248BAa5b39bB4A9CAa697Fb7f8ae0C3f0ddB',
	BAT: '0xC6cC63f4AA25BBD4453eB5F3a0DfE546feF9b2f3',
	TUSD: '0xB714654e905eDad1CA1940b7790A8239ece5A9ff',
	HUSD: '0x1e37E5b504F7773460d6eB0e24D2e7C223B66EC7',
	ZRX: '0x226bCf0e417428a25012d0fA2183d37f92bCeDF6',
	OCEAN: '0x51732a6fC4673d1aCca4c047F5465922716508Ad',
	KNC: '0x1534fB3E82849314360C267FE20Df3901A2ED3f9',
	RSR: '0x5A87eaC5642BfEd4e354Ee8738DACd298E07D1Af',
	ENJ: '0x5A757F0BcAdFDb78651B7bDBe67e44e8Fd7F7f6b',
	NMR: '0x0b7A1c1A3D314DCC271EA576dA400B24e9ad3094',
	BAL: '0x7eF541E2a22058048904fE5744f9c7E4C57AF717',
	MANA: '0x7838796B6802B18D7Ef58fc8B757705D6c9d12b3',
	MATIC: '0x7122d7661c4564b7C6Cd4878B06766489a6028A2',
	SXP: '0x7CC4d60a3C83e91d8c2ec2127A10Bab5c6Ab209d',
	HEGIC: '0xc44048a4d13548E30DBF01555e6A3C3EEe08D258',
	HBTC: '0xd87FCB23da48D4D9B70c6F39B46debb5d993Ad19',
	MPH: '0xA088D78e9c9CBccAD3a0153341385633B1B1125d',
	sUSD: '0xB1950Fb2C9C0CbC8553578c67dB52Aa110A93393',
	MATH: '0xAf4D17A2077e1dE12DE66a44DE1B4f14C120d32D',
	SRM: '0x3AE8c08cD61d05ad6e22973E4b675A92D412EE3C',
	RPL: '0x2F0E755Efe6b58238A67DB420Ff3513Ec1fb31eF',
	BNT: '0x9a495a281D959192343B0e007284bf130bd05F86',
	UBT: '0xd3b93fF74E43Ba9568e5019b38AdDB804feF719B',
	mUSD: '0x7300AaFC0Ef0d47Daeb850f8b6a1931b40aCab33',
	EURS: '0x9EE40742182707467f78344F6b287bE8704F27E2',
	AXS: '0xBDE011911128F6bD4ABb1d18F39fdc3614Ca2cfe',
	STAKE: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
	BZRX: '0xE6A1f98b0F4368559BD16639C844510f5DB6Fe48',
	MLN: '0xf0dd817FF483535f4059781441596AEa4F32a4B9',
	DPI: '0xD3D47d5578e55C880505dC40648F7F9307C3e7A8',
	tBTC: '0x0811E451447D5819976a95a02f130c3b00D59346',
	KP3R: '0x5B449Ea0e550C143074146abc89A6328D9E70798',
	AKRO: '0xD27E1ECC4748F42e052331BeA917D89bEB883fc3',
	MTA: '0x5B9EED77d9500aDF7200fEeB395647be1950F7d2',
	TKN: '0xD1B11356464Ac5B48172fa6bD14Ac2417631BEDa',
	AUDIO: '0x8A95ea379E1Fa4C749dd0A7A21377162028C479e',
	Lien: '0x6062eC2A1ecfCD0026d9BD67aa5ad743Adc03995',
	JRT: '0xCCF1279C3406Ad1181bee00daB4b28B23D17Ddb1',
	BOND: '0xb31a2595E4Cf66EfBC1Fe348b1429E5730891382',
	INDEX: '0x6052245Ec516D0F653794052D24EFca8A39fcBC3',
	DOUGH: '0x6d237bb2248d3b40b1a54F3417667B2f39984fC8',
	ROOK: '0x03959Ac65e621e8C95d5E0f75EA96E5C03A15009',
	RSV: '0xD9C31db155a48f3d7304De85EC7AB7B705659bE9',
	SOCKS: '0x35f346Cb4149746272974a92d719Fd48ae2F72FA',
	DONUT: '0x524B969793a64a602342d89BC2789D43a016B13A',
	GNO: '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb',
	RGT: '0x417Ae38B3053A736B4274aed8DBD1a8A6FDbc974',
	REN: '0x0da1a02CDF84C44021671d183d616925164E08Aa',
	RARI: '0x4bE85ACC1cd711F403dC7BdE9e6caDfC5A94744b',
	IDLE: '0x534179b3d7292d8a82A2985ee80a6D2027ee8378',
	PERP: '0x7ecF26cd9A36990b8ea477853663092333f59979',
	API3: '0x44b6bBA599F100006143E82A60462D71Ac1331Da',
	FRONT: '0x1bbca7491f14b46788Ff9c834d97a668C4886523',
	DUCK: '0x8E7aB03cA7D17996b097D5866bFAA1e251c35c6a',
	TRU: '0x4384a7C9498f905e433Ee06B6552a18e1D7cD3a4',
	FRAX: '0xca5d82E40081F220d59f7ED9e2e1428DEAf55355',
	MASK: '0x4e1a2bFfe81000F7be4807FAF0315173c817d6F4',
	UNI: '0x4537e328Bf7e4eFA29D05CAeA260D7fE26af9D74',
	HNY: '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9',
	AGVE: '0x3a97704a1b25F08aa230ae53B352e2e72ef52843',
}

export const contractAddresses = {
	bao: {
		100: '0xe0d0b1DBbCF3dd5CAc67edaf9243863Fd70745DA',
		4: '0xE5AFBb49BeB7552a1167df6aAED70d88279787e8',
	},
	masterChef: {
		100: '0xf712a82DD8e2Ac923299193e9d6dAEda2d5a32fd',
		4: '0xdA6CFdB12112309E4587D4a747a55E2970Eda4f3',
	},
	weth: {
		100: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
		4: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
	},
	wethPrice: {
		100: '0xa767f745331D267c7751297D982b050c93985627',
		4: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
	},
	baoPrice: {
		100: '0xdcf3aC78f37098222C53C79974faaC5ce1aaF707',
		4: '0x649AfCf002742cf93CbE1F8C3832FD05ACA2D8ea',
	},
}
//
/*
BAO Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
	{
		pid: 0,
		lpAddresses: {
			100: '0x82820a99c431d0Bb7cA775Fa7247d1AC481f2E56',
		},
		tokenAddresses: {
			100: '0x82dFe19164729949fD66Da1a37BC70dD6c4746ce',
		},
		tokenDecimals: 18,
		name: 'BAO PARTY',
		symbol: 'BAO-xDAI BAOLP',
		tokenSymbol: 'BAO',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 1,
		lpAddresses: {
			100: '0x4659640F3444e96ac96cb901177486c1775aAE09',
		},
		tokenAddresses: {
			100: '0x82dFe19164729949fD66Da1a37BC70dD6c4746ce',
		},
		tokenDecimals: 18,
		name: 'BAO PARTYv2',
		symbol: 'BAO-wETH BAOLP',
		tokenSymbol: 'BAO',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 2,
		lpAddresses: {
			100: '0x3D1d2B236ad8ef3FD7C6C1625845fB59dFFaCCa1',
		},
		tokenAddresses: {
			100: '0x82dFe19164729949fD66Da1a37BC70dD6c4746ce',
		},
		tokenDecimals: 18,
		name: 'BAO PARTYv2',
		symbol: 'BAO-ETH SLP',
		tokenSymbol: 'BAO',
		poolType: 'sushi',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 3,
		lpAddresses: {
			100: '0x42d69d4b7fC4506504dc4aaA224565B6618e5722',
		},
		tokenAddresses: {
			100: '0xe0d0b1DBbCF3dd5CAc67edaf9243863Fd70745DA',
		},
		tokenDecimals: 18,
		name: 'BAO Two Ways',
		symbol: 'BAO-BAO.cx BaoLP',
		tokenSymbol: 'BAO.cx',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 4,
		lpAddresses: {
			100: '0xFEeC1B8Acd23068fa29Bf01759e0DA1C7cede4F4',
		},
		tokenAddresses: {
			100: '0x82dFe19164729949fD66Da1a37BC70dD6c4746ce',
		},
		tokenDecimals: 18,
		name: 'BAO USDC',
		symbol: 'BAO-USDC SushiLP',
		tokenSymbol: 'BAO',
		poolType: 'sushi',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 5,
		lpAddresses: {
			100: '0xcf076d7663cc16109f3879b3C60A60CdD2ef31DB',
		},
		tokenAddresses: {
			100: '0xbf65bfcb5da067446CeE6A706ba3Fe2fB1a9fdFd',
		},
		tokenDecimals: 18,
		name: 'BAO YFI',
		symbol: 'BAO-YFI SushiLP',
		tokenSymbol: 'BAO',
		poolType: 'sushi',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 6,
		lpAddresses: {
			100: '0xF768945410933cA301C347FB6C945EC6E9B4c497',
		},
		tokenAddresses: {
			100: '0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE',
		},
		tokenDecimals: 18,
		name: 'BAO Sushi',
		symbol: 'BAO-Sushi SushiLP',
		tokenSymbol: 'BAO',
		poolType: 'sushi',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 7,
		lpAddresses: {
			100: '0xd83ce865aBcE674Ec61116c4aBDA281f0184cff7',
		},
		tokenAddresses: {
			100: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
		},
		tokenDecimals: 18,
		name: 'BAO DAI',
		symbol: 'BAO-DAI SushiLP',
		tokenSymbol: 'BAO',
		poolType: 'sushi',
		icon: '/bao.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 107,
		lpAddresses: {
			100: '0xf2F9Ff5Cb8E2B21117715B2E3B5C6285349da498',
		},
		tokenAddresses: {
			100: '0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE',
		},
		tokenDecimals: 18,
		name: 'Sushi Eth',
		symbol: 'SUSH-ETH SUSHILP',
		tokenSymbol: 'SUSHI',
		poolType: 'sushi',
		icon: '/unagi.png',
		refUrl: 'https://ftx.com/trade/SUSHI/USD#a=createtrade',
	},
	{
		pid: 8,
		lpAddresses: {
			100: '0x1987399C0C023869ea00a51750667721BA009be6',
		},
		tokenAddresses: {
			100: '0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE',
		},
		tokenDecimals: 18,
		name: 'Sushi xSushi',
		symbol: 'SUSHI-xSUSHI SushiLP',
		tokenSymbol: 'sushi',
		poolType: 'sushi',
		icon: '/simplysushi.png',
		refUrl: 'https://ftx.com/trade/BAO/USD#a=getbao',
	},
	{
		pid: 9,
		lpAddresses: {
			100: '0xfE536fE3c3E870675083f66441dF0F8ed3273650',
		},
		tokenAddresses: {
			100: '0x726f66BBdaf5DC0D66CADdc24dA13C3E9301Fc2A',
		},
		tokenDecimals: 18,
		name: 'xSushi ETH',
		symbol: 'xSUSHI-ETH SushiLP',
		tokenSymbol: 'sushi',
		poolType: 'sushi',
		icon: '/simplysushi.png',
		refUrl: 'https://ftx.com/trade/SUSHI/USD#a=getbao',
	},
	{
		pid: 10,
		lpAddresses: {
			100: '0xF8f02044B74F34CBd83dCa483547B7F32768Fe50',
		},
		tokenAddresses: {
			100: '0xFAdc59D012Ba3c110B08A15B7755A5cb7Cbe77D7',
		},
		tokenDecimals: 18,
		name: 'GRT Gummies',
		symbol: 'GRT-xDAI BAOLP',
		tokenSymbol: 'GRT',
		icon: '/gummy-bear.png',
		refUrl: 'https://ftx.com/trade/GRT/USD#a=getbao',
	},
	{
		pid: 11,
		lpAddresses: {
			100: '0x40B8EB2575926B1F67C939B01d1716296576dc33',
		},
		tokenAddresses: {
			100: '0xFAdc59D012Ba3c110B08A15B7755A5cb7Cbe77D7',
		},
		tokenDecimals: 18,
		name: 'GRT Gummies',
		symbol: 'GRT-wBTC BAOLP',
		tokenSymbol: 'GRT',
		icon: '/gummy-bear.png',
		refUrl: 'https://ftx.com/trade/GRT/USD#a=getbao',
	},
	{
		pid: 12,
		lpAddresses: {
			100: '0x0378cc2fb49Ae06b857dEBfcbB45339dC692802C',
		},
		tokenAddresses: {
			100: '0x4c68041898bfEfbfCc4253fbE8eD30830E6eb767',
		},
		tokenDecimals: 18,
		name: 'Rune Ramen',
		symbol: 'RUNE-xDAI BAOLP',
		tokenSymbol: 'RUNE',
		icon: '/ramennoodle.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/RUNE',
	},
	{
		pid: 13,
		lpAddresses: {
			100: '0x8746355882E10AAE144d3709889dfAA39FF2a692',
		},
		tokenAddresses: {
			100: '0x7f7440C5098462f833E123B44B8A03E1d9785BAb',
		},
		tokenDecimals: 18,
		name: '1Inch Nibbles',
		symbol: '1INCH-xDAI BAOLP',
		tokenSymbol: '1inch',
		icon: '/moon-cakers.png',
		refUrl: 'https://ftx.com/trade/1INCH/USD#a=getbao',
	},
	{
		pid: 14,
		lpAddresses: {
			100: '0x9fbB63681bD9939514Fc437944B404E8e5208E20',
		},
		tokenAddresses: {
			100: '0x8e1A12dA00BBF9DB10d48bd66Ff818bE933964d5',
		},
		tokenDecimals: 18,
		name: 'NFTX Nuggets',
		symbol: 'NFTX-xDAI BAOLP',
		tokenSymbol: 'NFTX',
		icon: '/nuggets.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/NFTX',
	},
	{
		pid: 15,
		lpAddresses: {
			100: '0x539672a592a4EC2cA58d0CC594D1757A838C4292',
		},
		tokenAddresses: {
			100: '0x3C037849a8ffcf19886e2f5B04f293B7847D0377',
		},
		tokenDecimals: 18,
		name: 'stETH xDAI',
		symbol: 'stETH-xDAI BAOLP',
		tokenSymbol: 'stETH',
		icon: '/eth.png',
		refUrl:
			'https://app.uniswap.org/#/swap?outputCurrency=0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
	},
	{
		pid: 16,
		lpAddresses: {
			100: '0x855A564DE501eDB4d11b475f47e69d86E686Fae6',
		},
		tokenAddresses: {
			100: '0x3C037849a8ffcf19886e2f5B04f293B7847D0377',
		},
		tokenDecimals: 18,
		name: 'stETH wETH',
		symbol: 'stETH-wETH BAOLP',
		tokenSymbol: 'stETH',
		icon: '/eth.png',
		refUrl:
			'https://app.uniswap.org/#/swap?outputCurrency=0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
	},
	{
		pid: 17,
		lpAddresses: {
			100: '0x0EEb6dFda017Db4F76A7Da69AD6670fF6b841618',
		},
		tokenAddresses: {
			100: '0xeB2BCaBb0cDC099978A74cFE4Ab4d45E7e677a45',
		},
		tokenDecimals: 18,
		name: 'TVK Shared Meal',
		symbol: 'TVK-xDAI BAOLP',
		tokenSymbol: 'TVK',
		icon: '/picnic.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/TVK',
	},
	{
		pid: 18,
		lpAddresses: {
			100: '0x8c36F7CA02D50bF8E705F582328b873Acbe9438D',
		},
		tokenAddresses: {
			100: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
		},
		tokenDecimals: 18,
		name: 'wETH xDAI',
		symbol: 'wETH-xDAI BAOLP',
		tokenSymbol: 'wETH',
		icon: '/eth.png',
		refUrl: 'https://ftx.com/trade/ETH/USD#a=getbao',
	},
	{
		pid: 19,
		lpAddresses: {
			100: '0xa498fFe098f4dc9a52FAB6fBdd5c624Ca237F39c',
		},
		tokenAddresses: {
			100: '0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252',
		},
		tokenDecimals: 18,
		name: 'wBTC Wraps',
		symbol: 'wBTC-xDAI BAOLP',
		tokenSymbol: 'wBTC',
		icon: '/wrap.png',
		refUrl: 'https://www.binance.com/en/register?ref=NFBFR4AC',
	},
	{
		pid: 104,
		lpAddresses: {
			100: '0x7143aB1782bD66d966CAC3dba902Bde4c1Bfe31B',
		},
		tokenAddresses: {
			100: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
		},
		tokenDecimals: 18,
		name: 'Tether Truffles',
		symbol: 'USDT-xDAI BAOLP',
		tokenSymbol: 'USDT',
		icon: '/chocolate.png',
		refUrl: 'https://ftx.com/trade/USDT/USD#a=getbao',
	},
	{
		pid: 20,
		lpAddresses: {
			100: '0x4cCB2Fe7472c0a6f73a7154023a6F652F24694ee',
		},
		tokenAddresses: {
			100: '0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2',
		},
		tokenDecimals: 6,
		name: 'Link Lunch',
		symbol: 'LINK-xDAI BAOLP',
		tokenSymbol: 'LINK',
		icon: '/sandwich.png',
		refUrl: 'https://ftx.com/trade/LINK/USD#a=getbao',
	},
	{
		pid: 21,
		lpAddresses: {
			100: '0x71c20bfCb1170E1643ccDf1FF25714615eEF6701',
		},
		tokenAddresses: {
			100: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
		},
		tokenDecimals: 6,
		name: 'USDC Crunch',
		symbol: 'USDC-xDAI BAOLP',
		tokenSymbol: 'USDC',
		icon: '/cereals.png',
		refUrl: 'https://www.binance.com/en/register?ref=NFBFR4AC',
	},
	{
		pid: 22,
		lpAddresses: {
			100: '0xB3F137f8966317DDB63e59d28831962f30C56be2',
		},
		tokenAddresses: {
			100: '0x4eFDfbb7Cca540a79A7e4dCaD1cb6ED14f21c43e',
		},
		tokenDecimals: 18,
		name: 'OKB Okra',
		symbol: 'OKB-xDAI BAOLP',
		tokenSymbol: 'OKB',
		icon: '/okra.png',
		refUrl: 'https://ftx.com/trade/OKB/USD#a=createtrade',
	},
	{
		pid: 23,
		lpAddresses: {
			100: '0x456Cbcf435f8c21280F947C6197a725c508cbC29',
		},
		tokenAddresses: {
			100: '0x036328204f84b423F0e1A12C3B8777aE08758481',
		},
		tokenDecimals: 18,
		name: 'Huobi Har Gow',
		symbol: 'HT-xDAI BAOLP',
		tokenSymbol: 'HT',
		icon: '/shrimp.png',
		refUrl: 'https://www.huobi.com/en-us/topic/invited/?invite_code=pfr33',
	},
	{
		pid: 24,
		lpAddresses: {
			100: '0xfE146525b01dcF721d0714eb46a2E5dE3C01357a',
		},
		tokenAddresses: {
			100: '0xDF613aF6B44a31299E48131e9347F034347E2F00',
		},
		tokenDecimals: 18,
		name: 'Aave Appetizer',
		symbol: 'AAVE-xDAI BAOLP',
		tokenSymbol: 'AAVE',
		icon: '/appetizer.png',
		refUrl: 'https://app.aave.com/?referral=108',
	},
	{
		pid: 25,
		lpAddresses: {
			100: '0xDb9f7C72B9bCE159dba62f3E4C84477A6Baf4597',
		},
		tokenAddresses: {
			100: '0x0aCD91f92Fe07606ab51EA97d8521E29D110fD09',
		},
		tokenDecimals: 18,
		name: 'Celcius Compote',
		symbol: 'CEL-xDAI BAOLP',
		tokenSymbol: 'CEL',
		icon: '/apple-jam.png',
		refUrl: 'https://www.hoozh.com/friends/26368269?localeLang=en&',
	},
	{
		pid: 26,
		lpAddresses: {
			100: '0xCEAd5C71231764aBfc8B809824666603E8614853',
		},
		tokenAddresses: {
			100: '0x3A00E08544d589E19a8e7D97D0294331341cdBF6',
		},
		tokenDecimals: 18,
		name: 'Synthetix Snacks',
		symbol: 'SNX-xDAI BAOLP',
		tokenSymbol: 'SNX',
		icon: '/snack.png',
		refUrl: 'https://ftx.com/trade/SNX/USD#a=getbao',
	},
	{
		pid: 27,
		lpAddresses: {
			100: '0xCdf15b16B5dd71f17ef1d1996292Af205f960A68',
		},
		tokenAddresses: {
			100: '0x712b3d230F3C1c19db860d80619288b1F0BDd0Bd',
		},
		tokenDecimals: 18,
		name: 'Curve Custard',
		symbol: 'CRV-xDAI BAOLP',
		tokenSymbol: 'CRV',
		icon: '/custard.png',
		refUrl: 'https://www.okex.com/join/3/1914410',
	},
	{
		pid: 28,
		lpAddresses: {
			100: '0x2fB0dD74f6365Ff77dA7Aa7D4b1B790847a5DA00',
		},
		tokenAddresses: {
			100: '0xDf6FF92bfDC1e8bE45177DC1f4845d391D3ad8fD',
		},
		tokenDecimals: 18,
		name: 'Compound Congee',
		symbol: 'COMP-xDAI BAOLP',
		tokenSymbol: 'COMP',
		icon: '/congee.png',
		refUrl: 'https://ftx.com/trade/COMP-PERP#a=createtrade',
	},
	{
		pid: 29,
		lpAddresses: {
			100: '0x6AcE292e8e67d66597F9598f593c986c88A062cA',
		},
		tokenAddresses: {
			100: '0x5fd896D248fbfa54d26855C267859eb1b4DAEe72',
		},
		tokenDecimals: 18,
		name: 'Maker Mooncake',
		symbol: 'MKR-xDAI BAOLP',
		tokenSymbol: 'MKR',
		icon: '/moon-cake.png',
		refUrl: 'https://ftx.com/trade/MKR-PERP#a=createtrade',
	},
	{
		pid: 30,
		lpAddresses: {
			100: '0x0196706CE5610541E4AD54B7B81216ca9F69C99A',
		},
		tokenAddresses: {
			100: '0x75886F00c1a20Ec1511111Fb4Ec3C51de65B1fe7',
		},
		tokenDecimals: 18,
		name: 'FTT Fried Tofu',
		symbol: 'FTT-xDAI BAOLP',
		tokenSymbol: 'FTT',
		icon: '/tofu.png',
		refUrl: 'https://ftx.com/trade/FTT/USD#a=createtrade',
	},
	{
		pid: 31,
		lpAddresses: {
			100: '0x1de82AF7622F3c1c9b4c7917C417222B97A6aE27',
		},
		tokenAddresses: {
			100: '0x4A88248BAa5b39bB4A9CAa697Fb7f8ae0C3f0ddB',
		},
		tokenDecimals: 18,
		name: 'RenBTC Red Bean Soup',
		symbol: 'RENBTC-xDAI BAOLP',
		tokenSymbol: 'RENBTC',
		icon: '/soup.png',
		refUrl: 'https://virgox.com/login/register?code=gxkb7dva',
	},
	{
		pid: 32,
		lpAddresses: {
			100: '0x1B405646d8c8506Ff51DAD739c61A64040b0b8F5',
		},
		tokenAddresses: {
			100: '0xC6cC63f4AA25BBD4453eB5F3a0DfE546feF9b2f3',
		},
		tokenDecimals: 18,
		name: 'Brave Braised Pork',
		symbol: 'BAT-xDAI BAOLP',
		tokenSymbol: 'BAT',
		icon: '/beef.png',
		refUrl: 'https://www.decoin.io/?ref=56336',
	},
	{
		pid: 33,
		lpAddresses: {
			100: '0x013CCFFec2209829407De76108DFBa65857E395B',
		},
		tokenAddresses: {
			100: '0xB714654e905eDad1CA1940b7790A8239ece5A9ff',
		},
		tokenDecimals: 18,
		name: 'TUSD Tea Egg',
		symbol: 'TUSD-xDAI BAOLP',
		tokenSymbol: 'TUSD',
		icon: '/boiled-egg.png',
		refUrl: 'https://www.digifinex.com/en-ww/from/v7D3UM?channelCode=ljaUPp',
	},
	{
		pid: 34,
		lpAddresses: {
			100: '0x447Fe71ABCc00959B8cA9eD4E55b3D4bEA5E15E5',
		},
		tokenAddresses: {
			100: '0x1e37E5b504F7773460d6eB0e24D2e7C223B66EC7',
		},
		tokenDecimals: 18,
		name: 'HUSD Hot Pot',
		symbol: 'HUSD-xDAI BAOLP',
		tokenSymbol: 'HUSD',
		icon: '/chinese-food.png',
		refUrl: 'https://www.huobi.com/en-us/topic/invited/?invite_code=pfr33',
	},
	{
		pid: 35,
		lpAddresses: {
			100: '0xB3b5D8f6108C19FeedE2525D9c7DbaD29C8Dd20e',
		},
		tokenAddresses: {
			100: '0x226bCf0e417428a25012d0fA2183d37f92bCeDF6',
		},
		tokenDecimals: 18,
		name: '0x Ox Tail',
		symbol: 'ZRX-xDAI BAOLP',
		tokenSymbol: 'ZRX',
		icon: '/meat.png',
		refUrl: 'https://nominex.io/?r=33642',
	},
	{
		pid: 36,
		lpAddresses: {
			100: '0xD4AaD8CAD77fc255B1a7F4aB0e4273deFe529Fb4',
		},
		tokenAddresses: {
			100: '0x51732a6fC4673d1aCca4c047F5465922716508Ad',
		},
		tokenDecimals: 18,
		name: 'Ocean Orange Chicken',
		symbol: 'OCEAN-xDAI BAOLP',
		tokenSymbol: 'OCEAN',
		icon: '/orange-chicken.png',
		refUrl: 'https://www.kucoin.com/ucenter/signup?rcode=Ptuf31',
	},
	{
		pid: 37,
		lpAddresses: {
			100: '0xc8812c9BBb3554F862e427CA063E3A057Ec2b335',
		},
		tokenAddresses: {
			100: '0x1534fB3E82849314360C267FE20Df3901A2ED3f9',
		},
		tokenDecimals: 18,
		name: 'Kyber Kung Pao Chicken',
		symbol: 'KNC-xDAI BAOLP',
		tokenSymbol: 'KNC',
		icon: '/kung-pao-chicken.png',
		refUrl: 'https://ftx.com/trade/KNC-PERP#a=createtrade',
	},
	{
		pid: 38,
		lpAddresses: {
			100: '0x7d3B30c6b2B0A4868bf080E732841e406a6CaD7c',
		},
		tokenAddresses: {
			100: '0x5A87eaC5642BfEd4e354Ee8738DACd298E07D1Af',
		},
		tokenDecimals: 18,
		name: 'Reserve Ragout',
		symbol: 'RSR-xDAI BAOLP',
		tokenSymbol: 'RSR',
		icon: '/stew.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 39,
		lpAddresses: {
			100: '0xeB3BAC49C4ab021590BF0FD73F7cD22d462b47a4',
		},
		tokenAddresses: {
			100: '0x5A757F0BcAdFDb78651B7bDBe67e44e8Fd7F7f6b',
		},
		tokenDecimals: 18,
		name: 'Enjin Egg',
		symbol: 'ENJ-xDAI BAOLP',
		tokenSymbol: 'ENJ',
		icon: '/egg.png',
		refUrl: 'https://crypto.com/exch/93x4g2q4zk',
	},
	{
		pid: 40,
		lpAddresses: {
			100: '0x7D3E57341dD6Cc8aEbE07a78a43cB085eA033fde',
		},
		tokenAddresses: {
			100: '0x0b7A1c1A3D314DCC271EA576dA400B24e9ad3094',
		},
		tokenDecimals: 18,
		name: 'NMR Niurou Wan',
		symbol: 'NMR-xDAI BAOLP',
		tokenSymbol: 'NMR',
		icon: '/meatballs.png',
		refUrl: 'https://www.digifinex.com/en-ww/from/?channelCode=ljaUPp',
	},
	{
		pid: 41,
		lpAddresses: {
			100: '0xD068967Bf363e3149a60fCD35925cE0a2B863455',
		},
		tokenAddresses: {
			100: '0x7eF541E2a22058048904fE5744f9c7E4C57AF717',
		},
		tokenDecimals: 18,
		name: 'Balancer Bento',
		symbol: 'BAL-xDAI BAOLP',
		tokenSymbol: 'BAL',
		icon: '/bento.png',
		refUrl: 'https://ftx.com/trade/BAL-PERP#a=createtrade',
	},
	{
		pid: 42,
		lpAddresses: {
			100: '0xe0AcaC02638F4BA6Be14d3e49b9e028157610306',
		},
		tokenAddresses: {
			100: '0x7838796B6802B18D7Ef58fc8B757705D6c9d12b3',
		},
		tokenDecimals: 18,
		name: 'Mana Miantiao',
		symbol: 'MANA-xDAI BAOLP',
		tokenSymbol: 'MANA',
		icon: '/noodles.png',
		refUrl: 'https://virgox.com/login/register?code=gxkb7dva',
	},
	{
		pid: 43,
		lpAddresses: {
			100: '0x01E0AC7AC401705809ac4EF4E5E480F0C4F54a97',
		},
		tokenAddresses: {
			100: '0x7122d7661c4564b7C6Cd4878B06766489a6028A2',
		},
		tokenDecimals: 18,
		name: 'Matic Mandarin Fish',
		symbol: 'MATIC-xDAI BAOLP',
		tokenSymbol: 'MATIC',
		icon: '/fish.png',
		refUrl: 'https://ftx.com/trade/MATIC-PERP#a=createtrade',
	},
	{
		pid: 44,
		lpAddresses: {
			100: '0xF8a9c9F1853eD36Af45e8d5B16E8D119Aca44f26',
		},
		tokenAddresses: {
			100: '0x7CC4d60a3C83e91d8c2ec2127A10Bab5c6Ab209d',
		},
		tokenDecimals: 18,
		name: 'SXP Suan La Tang',
		symbol: 'SXP-xDAI BAOLP',
		tokenSymbol: 'SXP',
		icon: '/hotsour.png',
		refUrl: 'https://ftx.com/trade/SXP-PERP#a=createtrade',
	},
	{
		pid: 45,
		lpAddresses: {
			100: '0xc02716a93fD05e7704699a09091565f79305887F',
		},
		tokenAddresses: {
			100: '0xc44048a4d13548E30DBF01555e6A3C3EEe08D258',
		},
		tokenDecimals: 18,
		name: 'Hegic Hom Sui Gok',
		symbol: 'HEGIC-xDAI BAOLP',
		tokenSymbol: 'HEGIC',
		icon: '/dumpling.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 46,
		lpAddresses: {
			100: '0x4Ef2294c429EB72c7463beb8dBFe3Fe6B01AA749',
		},
		tokenAddresses: {
			100: '0xd87FCB23da48D4D9B70c6F39B46debb5d993Ad19',
		},
		tokenDecimals: 18,
		name: 'HBTC Har Cheung',
		symbol: 'HBTC-xDAI BAOLP',
		tokenSymbol: 'HBTC',
		icon: '/egg-rolls.png',
		refUrl: 'https://www.huobi.com/en-us/topic/invited/?invite_code=pfr33',
	},
	{
		pid: 47,
		lpAddresses: {
			100: '0x33d4E2EDe208B3616210558a4d99FB4eCF40e411',
		},
		tokenAddresses: {
			100: '0xA088D78e9c9CBccAD3a0153341385633B1B1125d',
		},
		tokenDecimals: 18,
		name: '88mph Chilis',
		symbol: 'MPH-xDAI BAOLP',
		tokenSymbol: 'MPH',
		icon: '/chili.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 48,
		lpAddresses: {
			100: '0xD054A866F8cc3031e4CB9f2C1C72EBa4820b6E60',
		},
		tokenAddresses: {
			100: '0xB1950Fb2C9C0CbC8553578c67dB52Aa110A93393',
		},
		tokenDecimals: 18,
		name: 'sUSD Sticky Rice',
		symbol: 'sUSD-xDAI BAOLP',
		tokenSymbol: 'sUSD',
		icon: '/sticky-rice.png',
		refUrl: 'https://virgox.com/login/register?code=gxkb7dva',
	},
	{
		pid: 49,
		lpAddresses: {
			100: '0xba18cA5450acc124EA756bA3fb2ba55F2bABD0e7',
		},
		tokenAddresses: {
			100: '0xAf4D17A2077e1dE12DE66a44DE1B4f14C120d32D',
		},
		tokenDecimals: 18,
		name: 'Math Mapo Tofu',
		symbol: 'MATH-xDAI BAOLP',
		tokenSymbol: 'MATH',
		icon: '/mapo-tofu.png',
		refUrl: 'https://ftx.com/trade/MATH/USD#a=createtrade',
	},
	{
		pid: 50,
		lpAddresses: {
			100: '0xA08678B12CAa9573920B934d700b15e625eA13fa',
		},
		tokenAddresses: {
			100: '0x3AE8c08cD61d05ad6e22973E4b675A92D412EE3C',
		},
		tokenDecimals: 18,
		name: 'SRM Springrolls',
		symbol: 'SRM-xDAI BAOLP',
		tokenSymbol: 'SRM',
		icon: '/spring-rolls.png',
		refUrl: 'https://ftx.com/trade/SRM/USD#a=createtrade',
	},
	{
		pid: 51,
		lpAddresses: {
			100: '0x3B62358d139451898A57513Fc5e8E1b75b587740',
		},
		tokenAddresses: {
			100: '0x2F0E755Efe6b58238A67DB420Ff3513Ec1fb31eF',
		},
		tokenDecimals: 18,
		name: 'Rocketpool Roe',
		symbol: 'RPL-xDAI BAOLP',
		tokenSymbol: 'RPL',
		icon: '/caviar.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/RPL',
	},
	{
		pid: 52,
		lpAddresses: {
			100: '0x1eBe02AEBd5FFD6847D03A435C21DF90974435be',
		},
		tokenAddresses: {
			100: '0x9a495a281D959192343B0e007284bf130bd05F86',
		},
		tokenDecimals: 18,
		name: 'Bancor Black Bean Sauce',
		symbol: 'BNT-xDAI BAOLP',
		tokenSymbol: 'BNT',
		icon: '/soy-sauce.png',
		refUrl: 'https://ftx.com/trade/BNT/USD#a=createtrade',
	},
	{
		pid: 53,
		lpAddresses: {
			100: '0x2f77238399b19B16B98c502b37C8d4D6a56331B0',
		},
		tokenAddresses: {
			100: '0xd3b93fF74E43Ba9568e5019b38AdDB804feF719B',
		},
		tokenDecimals: 18,
		name: 'UBT Umeboshi',
		symbol: 'UBT-xDAI BAOLP',
		tokenSymbol: 'UBT',
		icon: '/dried-fruit.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 54,
		lpAddresses: {
			100: '0x65B0671997391ff6983142d4DAc9fa08Eb0daFdb',
		},
		tokenAddresses: {
			100: '0x7300AaFC0Ef0d47Daeb850f8b6a1931b40aCab33',
		},
		tokenDecimals: 18,
		name: 'mUSD Meatballs',
		symbol: 'mUSD-xDAI BAOLP',
		tokenSymbol: 'mUSD',
		icon: '/meatball.png',
		refUrl: 'https://virgox.com/login/register?code=gxkb7dva',
	},
	{
		pid: 55,
		lpAddresses: {
			100: '0x4841B38EeC7E0c1A48EFa5dDDC5e1e35572E5E9f',
		},
		tokenAddresses: {
			100: '0x9EE40742182707467f78344F6b287bE8704F27E2',
		},
		tokenDecimals: 18,
		name: 'EURS Eclairs',
		symbol: 'EURS-xDAI BAOLP',
		tokenSymbol: 'EURS',
		icon: '/eclair.png',
		refUrl: 'https://virgox.com/login/register?code=gxkb7dva',
	},
	{
		pid: 56,
		lpAddresses: {
			100: '0x93888156eCd6E1D8644285A057dde37fdBd620D1',
		},
		tokenAddresses: {
			100: '0xBDE011911128F6bD4ABb1d18F39fdc3614Ca2cfe',
		},
		tokenDecimals: 18,
		name: 'AXS Ahi Tuna',
		symbol: 'AXS-xDAI BAOLP',
		tokenSymbol: 'AXS',
		icon: '/salmon.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 57,
		lpAddresses: {
			100: '0x3CFd76aF96be1491dc58c76458791763D354f275',
		},
		tokenAddresses: {
			100: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
		},
		tokenDecimals: 18,
		name: 'Stake Soy Sauce',
		symbol: 'Stake-ETH SLP',
		tokenSymbol: 'STAKE',
		poolType: 'sushi',
		icon: '/soy.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 58,
		lpAddresses: {
			100: '0x7cC121D777C4322fb1DaaB5d511236e682d83512',
		},
		tokenAddresses: {
			100: '0xE6A1f98b0F4368559BD16639C844510f5DB6Fe48',
		},
		tokenDecimals: 18,
		name: 'BZRX Beef Tendon',
		symbol: 'BZRX-ETH SLP',
		tokenSymbol: 'BZRX',
		poolType: 'sushi',
		icon: '/ham.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 59,
		lpAddresses: {
			100: '0xB1C5372E620FFDBfc98187Ee08C80043Ca5aB201',
		},
		tokenAddresses: {
			100: '0xf0dd817FF483535f4059781441596AEa4F32a4B9',
		},
		tokenDecimals: 18,
		name: 'Melon Marmalade',
		symbol: 'MLN-xDAI BAOLP',
		tokenSymbol: 'MLN',
		icon: '/marmalade.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 60,
		lpAddresses: {
			100: '0xbBb715Ab2c1188ae2c63533EE57f0FEd16E2bE20',
		},
		tokenAddresses: {
			100: '0xD3D47d5578e55C880505dC40648F7F9307C3e7A8',
		},
		tokenDecimals: 18,
		name: 'DPI Deep Fried Shrimp',
		symbol: 'DPI-xDAI BAOLP',
		tokenSymbol: 'DPI',
		icon: '/tempura.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 61,
		lpAddresses: {
			100: '0x29601D0743a1c28d07b11aBD6A7790d14152302D',
		},
		tokenAddresses: {
			100: '0x0811E451447D5819976a95a02f130c3b00D59346',
		},
		tokenDecimals: 18,
		name: 'tBTC Taro Dumpling',
		symbol: 'tBTC-xDAI BAOLP',
		tokenSymbol: 'tBTC',
		icon: '/taro.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/tBTC',
	},
	{
		pid: 62,
		lpAddresses: {
			100: '0x78Ac941CE1b0A3B7cAf09d374c186D1A170B1B51',
		},
		tokenAddresses: {
			100: '0x5B449Ea0e550C143074146abc89A6328D9E70798',
		},
		tokenDecimals: 18,
		name: 'KP3R Kebab',
		symbol: 'KP3R-xDAI BAOLP',
		tokenSymbol: 'KP3R',
		icon: '/kebab.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 63,
		lpAddresses: {
			100: '0xf79De375c6e3d7CCa91fA5cFbfcFa1f1a09C0A80',
		},
		tokenAddresses: {
			100: '0xD27E1ECC4748F42e052331BeA917D89bEB883fc3',
		},
		tokenDecimals: 18,
		name: 'Akro Amygdalota',
		symbol: 'AKRO-xDAI BAOLP',
		tokenSymbol: 'AKRO',
		icon: '/cookie.png',
		refUrl: 'https://ftx.com/trade/AKRO/USD#a=createtrade',
	},
	{
		pid: 64,
		lpAddresses: {
			100: '0xFCFEb63c60dfed479Bc0fbB0D3774341330B0545',
		},
		tokenAddresses: {
			100: '0x5B9EED77d9500aDF7200fEeB395647be1950F7d2',
		},
		tokenDecimals: 18,
		name: 'MTA Mantou',
		symbol: 'MTA-xDAI BAOLP',
		tokenSymbol: 'MTA',
		icon: '/mantou.png',
		refUrl: 'https://ftx.com/trade/MTA-PERP#a=createtrade',
	},
	{
		pid: 65,
		lpAddresses: {
			100: '0x24aC1A1bb7993eDbB4cFA45A6fc60DeBFF29aA23',
		},
		tokenAddresses: {
			100: '0xD1B11356464Ac5B48172fa6bD14Ac2417631BEDa',
		},
		tokenDecimals: 18,
		name: 'Monolith Matcha',
		symbol: 'TKN-xDAI BAOLP',
		tokenSymbol: 'TKN',
		icon: '/matcha-tea.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 66,
		lpAddresses: {
			100: '0xEaa608CC858b2C315216A40d3F5263121D06ddC2',
		},
		tokenAddresses: {
			100: '0x8A95ea379E1Fa4C749dd0A7A21377162028C479e',
		},
		tokenDecimals: 18,
		name: 'Audio Arame',
		symbol: 'AUDIO-xDAI BAOLP',
		tokenSymbol: 'AUDIO',
		icon: '/spices.png',
		refUrl: 'https://ftx.com/trade/AUDIO/USD#a=createtrade',
	},
	{
		pid: 67,
		lpAddresses: {
			100: '0x439440133E47acC5F22A26dA574F81137bac7d0e',
		},
		tokenAddresses: {
			100: '0x6062eC2A1ecfCD0026d9BD67aa5ad743Adc03995',
		},
		tokenDecimals: 18,
		name: 'Lien Lo Mein',
		symbol: 'LIEN-xDAI BAOLP',
		tokenSymbol: 'LIEN',
		icon: '/wonton-noodles.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 68,
		lpAddresses: {
			100: '0x2590eB745199436b404757e8d2e38b31049633b0',
		},
		tokenAddresses: {
			100: '0xCCF1279C3406Ad1181bee00daB4b28B23D17Ddb1',
		},
		tokenDecimals: 18,
		name: 'JRT Jiaohua Ji',
		symbol: 'JRT-xDAI BAOLP',
		tokenSymbol: 'JRT',
		icon: '/chicken-dish.png',
		refUrl: 'https://bitmax.io/register?inviteCode=MCTXZDRU',
	},
	{
		pid: 69,
		lpAddresses: {
			100: '0x1c47428d5B07bf19cca9a770484204b02352a337',
		},
		tokenAddresses: {
			100: '0xb31a2595E4Cf66EfBC1Fe348b1429E5730891382',
		},
		tokenDecimals: 18,
		name: 'BOND Baobing',
		symbol: 'BOND-xDAI BAOLP',
		tokenSymbol: 'BOND',
		icon: '/shaved-ice.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 70,
		lpAddresses: {
			100: '0xC0F1596DcdEb142af173F85b972064e6d55253AA',
		},
		tokenAddresses: {
			100: '0x6052245Ec516D0F653794052D24EFca8A39fcBC3',
		},
		tokenDecimals: 18,
		name: 'Index Ice Tea',
		symbol: 'INDEX-xDAI BAOLP',
		tokenSymbol: 'INDEX',
		icon: '/bubble-tea.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 71,
		lpAddresses: {
			100: '0xBA4c502cF4eC63c34ea58713c23b602365eabd36',
		},
		tokenAddresses: {
			100: '0x6d237bb2248d3b40b1a54F3417667B2f39984fC8',
		},
		tokenDecimals: 18,
		name: 'DOUGH(nut)',
		symbol: 'DOUGH-xDAI BAOLP',
		tokenSymbol: 'DOUGH',
		icon: '/dough.png',
		refUrl: 'https://www.hotbit.io/register?ref=669143',
	},
	{
		pid: 72,
		lpAddresses: {
			100: '0x481166914c85de5709751974407e29506e2AA8bA',
		},
		tokenAddresses: {
			100: '0x03959Ac65e621e8C95d5E0f75EA96E5C03A15009',
		},
		tokenDecimals: 18,
		name: 'Rook Rice Noodle Roll',
		symbol: 'ROOK-xDAI BAOLP',
		tokenSymbol: 'ROOK',
		icon: '/roll-fish.png',
		refUrl: 'https://www.hotbit.io/register?ref=669143',
	},
	{
		pid: 73,
		lpAddresses: {
			100: '0x10cb3eeDA12958b9260e4346f4AEDEFaDfcC3238',
		},
		tokenAddresses: {
			100: '0xD9C31db155a48f3d7304De85EC7AB7B705659bE9',
		},
		tokenDecimals: 18,
		name: 'RSV Radish Cake',
		symbol: 'RSV-xDAI BAOLP',
		tokenSymbol: 'RSV',
		icon: '/radish-cake.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/RSV/ETH',
	},
	{
		pid: 74,
		lpAddresses: {
			100: '0xCa5BecAe7788BdD3025f243835866464262543e4',
		},
		tokenAddresses: {
			100: '0x35f346Cb4149746272974a92d719Fd48ae2F72FA',
		},
		tokenDecimals: 18,
		name: 'SOCKS Non-Edible',
		symbol: 'SOCKS-xDAI BAOLP',
		tokenSymbol: 'SOCKS',
		icon: '/socks.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/SOCKS/ETH',
	},
	{
		pid: 75,
		lpAddresses: {
			100: '0x9C43b67cf7af1e65253634ac1c48c7FE8E5D8234',
		},
		tokenAddresses: {
			100: '0x524B969793a64a602342d89BC2789D43a016B13A',
		},
		tokenDecimals: 18,
		name: 'DONUT (Snoo Sprinkles)',
		symbol: 'DONUT-xDAI BAOLP',
		tokenSymbol: 'DONUT',
		icon: '/donut.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/DONUT',
	},
	{
		pid: 76,
		lpAddresses: {
			100: '0xba2fc9EDBA4944973Ab0cB26f0B80DD2D58389E1',
		},
		tokenAddresses: {
			100: '0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb',
		},
		tokenDecimals: 18,
		name: 'GNO Gongbao Jiding',
		symbol: 'GNO-xDAI BAOLP',
		tokenSymbol: 'GNO',
		icon: '/kungpao.png',
		refUrl: 'https://www.hoozh.com/friends/26368269?localeLang=en&',
	},
	{
		pid: 77,
		lpAddresses: {
			100: '0x246eb65d5527AcdD24De2949071Ff82694BEC758',
		},
		tokenAddresses: {
			100: '0x417Ae38B3053A736B4274aed8DBD1a8A6FDbc974',
		},
		tokenDecimals: 18,
		name: 'RGT Reheated',
		symbol: 'RGT-xDAI BAOLP',
		tokenSymbol: 'RGT',
		icon: '/stew2.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/RGT/ETH',
	},
	{
		pid: 78,
		lpAddresses: {
			100: '0x9013Ce7AA5CdFD6665e4F1796eA58197BAea80cd',
		},
		tokenAddresses: {
			100: '0x0da1a02CDF84C44021671d183d616925164E08Aa',
		},
		tokenDecimals: 18,
		name: 'REN Roast Chicken',
		symbol: 'REN-xDAI BAOLP',
		tokenSymbol: 'REN',
		icon: '/roastchicken.png',
		refUrl: 'https://www.digifinex.com/en-ww/from/?channelCode=ljaUPp',
	},
	{
		pid: 79,
		lpAddresses: {
			100: '0xb8f9d3F58c4243bE33DB8246877Bbf89614869d4',
		},
		tokenAddresses: {
			100: '0x4bE85ACC1cd711F403dC7BdE9e6caDfC5A94744b',
		},
		tokenDecimals: 18,
		name: 'Rari Riceballs',
		symbol: 'RARI-xDAI BAOLP',
		tokenSymbol: 'RARI',
		icon: '/rice-ball-with-seaweed.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/RARI',
	},
	{
		pid: 80,
		lpAddresses: {
			100: '0xD73A386b836D02e44cf9F9CC95f029d8B803C226',
		},
		tokenAddresses: {
			100: '0x534179b3d7292d8a82A2985ee80a6D2027ee8378',
		},
		tokenDecimals: 18,
		name: 'Idle Ice',
		symbol: 'IDLE-xDAI BAOLP',
		tokenSymbol: 'IDLE',
		icon: '/ice-cube.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/IDLE/ETH',
	},
	{
		pid: 81,
		lpAddresses: {
			100: '0xEdE0e75533EF8987777139778E5fDC187622FD65',
		},
		tokenAddresses: {
			100: '0x7ecF26cd9A36990b8ea477853663092333f59979',
		},
		tokenDecimals: 18,
		name: 'Perpetual Pizza',
		symbol: 'PERP-xDAI BAOLP',
		tokenSymbol: 'PERP',
		icon: '/pizza.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 82,
		lpAddresses: {
			100: '0x71696a13a1e3e4a5e3929d88DA6E0aA3091ECf96',
		},
		tokenAddresses: {
			100: '0x44b6bBA599F100006143E82A60462D71Ac1331Da',
		},
		tokenDecimals: 18,
		name: 'API3 Avocado Toast',
		symbol: 'API3-xDAI BAOLP',
		tokenSymbol: 'API3',
		icon: '/toaster.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 83,
		lpAddresses: {
			100: '0xe2ed9f396F8c4AE1b0B51a928222A65dD0019C3d',
		},
		tokenAddresses: {
			100: '0x1bbca7491f14b46788Ff9c834d97a668C4886523',
		},
		tokenDecimals: 18,
		name: 'Front Frog Legs',
		symbol: 'FRONT-xDAI BAOLP',
		tokenSymbol: 'FRONT',
		icon: '/frog-prince.png',
		refUrl: 'https://ftx.com/trade/FRONT/USD#a=createtrade',
	},
	{
		pid: 84,
		lpAddresses: {
			100: '0xC8FA93d318686cd542709a28939D0E7E0Ba0E35a',
		},
		tokenAddresses: {
			100: '0x4384a7C9498f905e433Ee06B6552a18e1D7cD3a4',
		},
		tokenDecimals: 18,
		name: 'Tru Turtle Soup',
		symbol: 'TRU-xDAI BAOLP',
		tokenSymbol: 'TRU',
		icon: '/turtle.png',
		refUrl: 'https://ftx.com/trade/TRU/USD#a=createtrade',
	},
	{
		pid: 85,
		lpAddresses: {
			100: '0xD17E2024B1357B8485D0CeC16370D5258f5b1634',
		},
		tokenAddresses: {
			100: '0x8E7aB03cA7D17996b097D5866bFAA1e251c35c6a',
		},
		tokenDecimals: 18,
		name: 'Duck Roasted',
		symbol: 'DUCK-xDAI BAOLP',
		tokenSymbol: 'DUCK',
		icon: '/roastchicken.png',
		refUrl: '#',
	},
	{
		pid: 86,
		lpAddresses: {
			100: '0xf8837744F1036838E054e68d8d53F337702c240E',
		},
		tokenAddresses: {
			100: '0xca5d82E40081F220d59f7ED9e2e1428DEAf55355',
		},
		tokenDecimals: 18,
		name: 'Frax Fries',
		symbol: 'FRAX-xDAI BAOLP',
		tokenSymbol: 'FRAX',
		icon: '/fried-potatoes.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/FRAX',
	},
	{
		pid: 87,
		lpAddresses: {
			100: '0x98425c753d945d3124Bc1335bCb09595DFa029F4',
		},
		tokenAddresses: {
			100: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
		},
		tokenDecimals: 18,
		name: 'USDT USDC',
		symbol: 'USDT-USDC BAOLP',
		tokenSymbol: 'USDT',
		icon: '/bao.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/USDT',
	},
	{
		pid: 88,
		lpAddresses: {
			100: '0xa59f0B26fD802AEc20AF0B24e26b12C08c1b64F7',
		},
		tokenAddresses: {
			100: '0x4e1a2bFfe81000F7be4807FAF0315173c817d6F4',
		},
		tokenDecimals: 18,
		name: 'Mask Maki',
		symbol: 'MASK-xDAI BAOLP',
		tokenSymbol: 'MASK',
		icon: '/simplysushi.png',
		refUrl: 'https://www.mxc.ai/auth/signup?inviteCode=13z4G',
	},
	{
		pid: 89,
		lpAddresses: {
			100: '0xC1c4D3070f2E87686777bEE0011CFd05c5c60115',
		},
		tokenAddresses: {
			100: '0x0811E451447D5819976a95a02f130c3b00D59346',
		},
		tokenDecimals: 18,
		name: 'wBTC tBTC',
		symbol: 'wBTC-tBTC BAOLP',
		tokenSymbol: 'tBTC',
		icon: '/bao.png',
		refUrl:
			'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/tBTC',
	},
	{
		pid: 90,
		lpAddresses: {
			100: '0xD7eaa697f60fE733eA12526698C88302BA1b4060',
		},
		tokenAddresses: {
			100: '0x2995D1317DcD4f0aB89f4AE60F3f020A4F17C7CE',
		},
		tokenDecimals: 18,
		name: 'Sushi wBTC',
		symbol: 'Sushi-wBTC BAOLP',
		tokenSymbol: 'SUSHI',
		icon: '/simplysushi.png',
		refUrl: 'https://ftx.com/trade/SUSHI-PERP#a=createtrade',
	},
	{
		pid: 91,
		lpAddresses: {
			100: '0x1E6c53215Da8CcccEF524Fb0b68Ee9fb28f04a43',
		},
		tokenAddresses: {
			100: '0xbf65bfcb5da067446CeE6A706ba3Fe2fB1a9fdFd',
		},
		tokenDecimals: 18,
		name: 'YFI wBTC',
		symbol: 'YFI-wBTC BAOLP',
		tokenSymbol: 'YFI',
		icon: '/churros.png',
		refUrl: 'https://phemex.com/bonus?group=737&referralCode=BVJCQ',
	},
	{
		pid: 92,
		lpAddresses: {
			100: '0x7A7A8b21EFdcD131Dd894fF32609c2d0c5F6677C',
		},
		tokenAddresses: {
			100: '0x4537e328Bf7e4eFA29D05CAeA260D7fE26af9D74',
		},
		tokenDecimals: 18,
		name: 'UNI wBTC',
		symbol: 'UNI-wBTC BAOLP',
		tokenSymbol: 'UNI',
		icon: '/unagi.png',
		refUrl: 'https://ftx.com/trade/UNI/USD#a=createtrade',
	},
	{
		pid: 93,
		lpAddresses: {
			100: '0xBa594Eb3B58A2Dc380c67C63CeE00182B119457a',
		},
		tokenAddresses: {
			100: '0x7eF541E2a22058048904fE5744f9c7E4C57AF717',
		},
		tokenDecimals: 18,
		name: 'BAL wBTC',
		symbol: 'BAL-wBTC BAOLP',
		tokenSymbol: 'BAL',
		icon: '/bento.png',
		refUrl: 'https://ftx.com/trade/BAL-PERP#a=createtrade',
	},
	{
		pid: 94,
		lpAddresses: {
			100: '0xD61F580370E8C53757935119B7c08818f238506d',
		},
		tokenAddresses: {
			100: '0xE2e73A1c69ecF83F464EFCE6A5be353a37cA09b2',
		},
		tokenDecimals: 18,
		name: 'LINK wBTC',
		symbol: 'LINK-wBTC BAOLP',
		tokenSymbol: 'LINK',
		icon: '/sandwich.png',
		refUrl: 'https://ftx.com/trade/LINK/USD#a=getbao',
	},
	{
		pid: 95,
		lpAddresses: {
			100: '0xF7bA0d722b98a9e7da3c387887B5fF6610c491E7',
		},
		tokenAddresses: {
			100: '0x75886F00c1a20Ec1511111Fb4Ec3C51de65B1fe7',
		},
		tokenDecimals: 18,
		name: 'FTT wBTC',
		symbol: 'FTT-wBTC BAOLP',
		tokenSymbol: 'FTT',
		icon: '/tofu.png',
		refUrl: 'https://ftx.com/trade/FTT/USD#a=createtrade',
	},
	{
		pid: 96,
		lpAddresses: {
			100: '0x25BFfC0B93536Ac36FEe29B028Cde0BDfA74Ff60',
		},
		tokenAddresses: {
			100: '0xDF613aF6B44a31299E48131e9347F034347E2F00',
		},
		tokenDecimals: 18,
		name: 'AAVE wBTC',
		symbol: 'AAVE-wBTC BAOLP',
		tokenSymbol: 'AAVE',
		icon: '/cocktail.png',
		refUrl: 'https://app.aave.com/?referral=108',
	},
	{
		pid: 97,
		lpAddresses: {
			100: '0xbbB23f86cCb36c471bF466c36Ae6C38De417EF16',
		},
		tokenAddresses: {
			100: '0x3A00E08544d589E19a8e7D97D0294331341cdBF6',
		},
		tokenDecimals: 18,
		name: 'SNX wBTC',
		symbol: 'SNX-wBTC BAOLP',
		tokenSymbol: 'SNX',
		icon: '/snack.png',
		refUrl: 'https://ftx.com/trade/SNX/USD#a=createtrade',
	},
	{
		pid: 106,
		lpAddresses: {
			100: '0x88B781026565214894aC74F11d4B246AA334143E',
		},
		tokenAddresses: {
			100: '0xD3D47d5578e55C880505dC40648F7F9307C3e7A8',
		},
		tokenDecimals: 18,
		name: 'DPI wBTC',
		symbol: 'DPI-wBTC BAOLP',
		tokenSymbol: 'DPI',
		icon: '/tempura.png',
		refUrl: 'https://bilaxy.com/user/register?intro=1428882',
	},
	{
		pid: 99,
		lpAddresses: {
			100: '0xe3e70e8607e120dbf271e0af6b549531b37d14d8',
		},
		tokenAddresses: {
			100: '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9',
		},
		tokenDecimals: 18,
		name: 'Honey!',
		symbol: 'HNY-xDAI BAOLP',
		tokenSymbol: 'HNY',
		icon: '/nectar.png',
		refUrl: 'https://app.honeyswap.org/#/swap',
	},
	{
		pid: 100,
		lpAddresses: {
			100: '0x9fed63B4Cf4EC2706C1111A081597921b99EBC8d',
		},
		tokenAddresses: {
			100: '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9',
		},
		tokenDecimals: 18,
		name: 'Honey Bunz ;)',
		symbol: 'HNY-BAO BAOLP',
		tokenSymbol: 'HNY',
		icon: '/nectar.png',
		refUrl: 'https://app.honeyswap.org/#/swap',
	},
	{
		pid: 101,
		lpAddresses: {
			100: '0xcf7f4a04f204fcFea7d8617C9c8e80f95920A8c5',
		},
		tokenAddresses: {
			100: '0x3a97704a1b25F08aa230ae53B352e2e72ef52843',
		},
		tokenDecimals: 18,
		name: 'Agave Nectar',
		symbol: 'AGVE-xDAI BAOLP',
		tokenSymbol: 'AGVE',
		icon: '/nectar.png',
		refUrl: 'https://app.honeyswap.org/#/swap',
	},
	{
		pid: 102,
		lpAddresses: {
			100: '0x4b2c191198ACd5F1C941fa1ba0C870b38470F331',
		},
		tokenAddresses: {
			100: '0xbf65bfcb5da067446CeE6A706ba3Fe2fB1a9fdFd',
		},
		tokenDecimals: 18,
		name: 'YFI Youtiao',
		symbol: 'YFI-ETH SUSHILP',
		tokenSymbol: 'YFI',
		poolType: 'sushi',
		icon: '/churros.png',
		refUrl: 'https://phemex.com/bonus?group=737&referralCode=BVJCQ',
	},
	{
		pid: 103,
		lpAddresses: {
			100: '0x43BC76493dEa7c82116A38e9C012B9a03127132c',
		},
		tokenAddresses: {
			100: '0x4537e328Bf7e4eFA29D05CAeA260D7fE26af9D74',
		},
		tokenDecimals: 18,
		name: 'Uni Unagi',
		symbol: 'UNI-ETH SUSHILP',
		tokenSymbol: 'UNI',
		poolType: 'sushi',
		icon: '/unagi.png',
		refUrl: 'https://ftx.com/trade/UNI/USD#a=createtrade',
	},
]
