//import react framework
import React from "react";

//import styles
import "./AccountOverview.scss";

//import components
import AccountInfo from "../account-info/AccountInfo";
import AccountSummary from "../account-summary/AccountSummary";
import AccountBalances from "../account-balances/AccountBalances";

class AccountOverview extends React.Component {
	constructor(props) {
		super(props);

		this.handleChartClick = this.handleChartClick.bind(this);

		this.state = {
			accountBalancesData: null
		};
	}

	componentDidMount() {
		this.generateAccountBalancesData();
	}

	generateAccountBalancesData() {
		const balances = this.props.accountData.accountData;
		const balancesObject = [];
		const allyAccountLabels = {};
		allyAccountLabels[process.env.REACT_APP_ALLY_ROTH_ACCOUNT] = "Roth IRA";
		allyAccountLabels[process.env.REACT_APP_ALLY_INVEST_ACCOUNT] = "Individual Investment Account";
		
		balances.coinbaseData.forEach((coinbaseAccount) => {
			balancesObject.push({ name: coinbaseAccount.name, value: coinbaseAccount.native_balance.amount });
		});

		balances.allyData.accounts.forEach((allyAccount) => {
			const accountLabel = allyAccountLabels[allyAccount.account];
			balancesObject.push({ name: accountLabel, value: allyAccount.accountbalance.accountvalue });
		});

		balancesObject.sort((a, b) => (parseFloat(a.value) < parseFloat(b.value)) ? 1 : -1);

		this.setState({
			accountBalancesData: balancesObject
		});
	}

	handleChartClick(accountName) {
		this.setState((lastState) => {
			const accountIndex = lastState.accountBalancesData.findIndex((account) => account.name === accountName);
			const toggleActive = !lastState.accountBalancesData[accountIndex].toggleActive ? true : !lastState.accountBalancesData[accountIndex].toggleActive;
			//keep in mind this may cause performance issues with larger objects
			return { accountBalancesData: lastState.accountBalancesData.map(el => (el.name === accountName ? Object.assign({}, el, { toggleActive: toggleActive }) : el)) };
		});
	}

	render() {
		const colorScheme = [
			"#009688",
			"#c91111",
			"#3f51b5",
			"#df874d",
			"#c9d45c",
			"#af658f",
			"#51cda0",
			"#0088cc",
			"#f99301",
			"#9bbb57"
		];

		return (
			<article className="account-overview-component">
				<AccountInfo/>
				{this.state.accountBalancesData && <AccountSummary balances={this.state.accountBalancesData} colorScheme={colorScheme} onChartClick={this.handleChartClick}/>}
				{this.state.accountBalancesData && <AccountBalances balances={this.state.accountBalancesData} colorScheme={colorScheme}/>}
			</article>
		);
	}
}

export default AccountOverview;