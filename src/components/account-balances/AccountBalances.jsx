import React from "react";

class AccountBalances extends React.Component {
	render() {
		const balances = this.props.balances;

		return (
			<div id="account-balances-section">
				<div id="account-balances-block">
					<ul id="account-balances-list">
						{balances.map((account) => 
							<li key={account.name}>
								<span className="account-balances-name">{account.name}</span>
								<span className="account-balances-value">{account.value}</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		);
	}
}

export default AccountBalances;