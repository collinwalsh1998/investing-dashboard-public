//import react framework
import React from "react";

//import components
import AccountOverview from "../account-overview/AccountOverview";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accountData: {}
		};
	}

	async componentDidMount() {
		const accountData = await this.getAccountData();
		this.setState({
			accountData: accountData
		});
	}
	
	async getAccountData() {
		let res = await fetch("//localhost:8081/getAllAssets");
		res = await res.json();
		return res;
	}
    
	render() {
		return (
            <div id="dashboard-container">
				<AccountOverview accountData={this.state.accountData}/>
			</div>
		);
	}
}

export default App;