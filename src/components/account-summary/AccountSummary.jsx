//import react framework
import React from "react";

//import utils
import DataParser from "../../utils/data-parser";

//import styles
import "./AccountSummary.scss";

//import libs
import CanvasJSReact from "../../assets/lib/canvasjs.react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AccountSummary extends React.Component {
	constructor(props) {
		super(props);

		this.dataParser = new DataParser();
	}

	getChartOptions() {
		const chartData = [];

		this.props.balances.forEach((account) => {
			const accountValue = parseFloat(account.value);
			if(accountValue) {
				chartData.push({ label: account.name, y: accountValue });
			}
		});

		chartData.sort((a, b) => (parseFloat(a.y) < parseFloat(b.y)) ? 1 : -1);

		CanvasJS.addColorSet("netWorthColors", this.props.colorScheme);

		return {
			backgroundColor: null,
			colorSet: "netWorthColors",
			data: [{
				type: "pie",
				indexLabelPlacement: "inside",
				indexLabel: "${y}",
				toolTipContent: null,
				dataPoints: chartData
			}]
		}
	}

	render() {
		const chartOptions = this.getChartOptions();
		let netWorth = 0;

		this.props.balances.forEach((account) => {
			netWorth += parseFloat(account.value);
		});

		return (
			<div className="account-summary-component">
				<div className="account-summary-inner">
					<div className="account-summary-graph-container">
						<CanvasJSChart options={chartOptions}/>
					</div>

					<div className="account-summary-net-worth-container">
						<h2 className="account-summary-net-worth-label">NET WORTH:</h2>
						<h1 className="account-summary-net-worth">{this.dataParser.parseSingleCurrency(netWorth)}</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default AccountSummary;