//import react framework
import React from "react";

//import components
import AccountInfo from "../account-info/AccountInfo";
import AccountSummary from "../account-summary/AccountSummary";
import AccountBalances from "../account-balances/AccountBalances";

class AccountOverview extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		//wait until data is requested and ready before rendering
		if(Object.keys(this.props.accountData).length === 0) {
			return null;
		}

		return (
			<article id="account-overview">
				<AccountInfo/>
				<AccountSummary/>
				<AccountBalances/>
			</article>
		);
	}
}

export default AccountOverview;