//import react framework
import React from "react";

//import utils
import DataParser from "../../utils/data-parser";

//import styles
import "./AccountSummary.scss";

//import components
import AccountBreakdown from "../account-breakdown/AccountBreakdown";

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

		CanvasJS.addColorSet("netWorthColors", this.props.colorScheme);

		return {
			backgroundColor: null,
			colorSet: "netWorthColors",
			data: [{
				type: "pie",
				indexLabelPlacement: "inside",
				indexLabel: "${y}",
				indexLabelFontColor: "#FFF",
				indexLabelFontSize: 18,
				indexLabelFontFamily: "Source Sans Pro",
				indexLabelFontWeight: 600,
				toolTipContent: null,
				explodeOnClick: false,
				dataPoints: chartData,
				mouseover: (e) => { this.props.onChartClick(e.dataPoint.label); },
				mouseout: (e) => { this.props.onChartClick(e.dataPoint.label); }
			}]
		}
	}

	render() {
		const chartOptions = this.getChartOptions();
		let netWorth = 0;

		this.props.balances.forEach((account) => {
			netWorth += parseFloat(account.value);
		});

		const breakdownDummyData = { netWorth: netWorth, liabilities: 1900 };

		return (
			<div className="account-summary-component">
				<div className="account-summary-inner">
					<div className="account-summary-graph-container">
						<CanvasJSChart options={chartOptions}/>
					</div>

					<div className="account-summary-net-worth-container">
						<div className="net-worth-inner">
							<h2 className="account-summary-net-worth-label">NET WORTH:</h2>
							<h1 className="account-summary-net-worth">{this.dataParser.parseSingleCurrency(netWorth - breakdownDummyData.liabilities)}</h1>

							{/* wait for credit card support to get access to credit card APIs and liability data */}
							{breakdownDummyData && <AccountBreakdown breakdownData={breakdownDummyData}/>}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AccountSummary;