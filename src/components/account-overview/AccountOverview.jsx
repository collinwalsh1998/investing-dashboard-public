//import react framework
import React from "react";

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
		return (
			<article id="account-overview">
				<AccountInfo/>
				<AccountSummary/>
				{this.state.accountBalancesData && <AccountBalances balances={this.state.accountBalancesData}/>}
			</article>
		);
	}
}

export default AccountOverview;