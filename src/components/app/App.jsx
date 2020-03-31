//import react framework
import React from "react";

//import components
import AccountOverview from "../account-overview/AccountOverview";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accountData: null
		};
	}

	async componentDidMount() {
		const accountData = await this.getAccountData();
		this.setState({
			accountData: accountData
		});
	}
	
	async getAccountData() {
		let res = await fetch(process.env.REACT_APP_API_ENDPOINT + "/getAccountData");
		res = await res.json();
		return res;
	}
    
	render() {
		return (
            <div id="dashboard-container">
				{this.state.accountData && <AccountOverview accountData={this.state.accountData}/>}
			</div>
		);
	}
}

export default App;