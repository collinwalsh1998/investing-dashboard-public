//import react framework
import React from "react";

//import utils
import DataParser from "../../utils/data-parser";

//import styles
import "./AccountBalances.scss";

class AccountBalances extends React.Component {
	constructor(props) {
		super(props);

		this.dataParser = new DataParser();
	}

	render() {
		const balances = this.props.balances;

		return (
			<div id="account-balances-section" className="account-balances-component">
				<div id="account-balances-block">
					<ul id="account-balances-list">
						{balances.map((account) => 
							<li key={account.name}>
								<span className="account-balances-name">{account.name}</span>
								<span className="account-balances-value">{this.dataParser.parseSingleCurrency(account.value)}</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default AccountBalances;