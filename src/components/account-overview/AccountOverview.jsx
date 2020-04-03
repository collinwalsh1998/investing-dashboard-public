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

		this.setState({
			accountBalancesData: balancesObject
		});
	}

	render() {
		const colorScheme = [
			"#3f51b5",
			"#c91111",
			"#009688",
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
				{this.state.accountBalancesData && <AccountSummary balances={this.state.accountBalancesData} colorScheme={colorScheme}/>}
				{this.state.accountBalancesData && <AccountBalances balances={this.state.accountBalancesData} colorScheme={colorScheme}/>}
			</article>
		);
	}
}

export default AccountOverview;