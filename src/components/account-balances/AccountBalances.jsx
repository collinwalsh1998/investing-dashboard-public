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
			<div className="account-balances-component">
				<div className="account-balances-list-block">
					<h3 className="account-balances-list-header">Accounts ({balances.length} Total):</h3>

					<ul className="account-balances-list">
						{balances.map((account, index) =>
							<li key={account.name} className={"border-" + this.props.colorScheme[index].substr(1) + (account.toggleActive ? " active" : "")}>
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