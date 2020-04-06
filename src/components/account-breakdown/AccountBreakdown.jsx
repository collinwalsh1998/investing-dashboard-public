//import react framework
import React from "react";

//import utils
import DataParser from "../../utils/data-parser";

//import styles
import "./AccountBreakdown.scss";

class AccountBreakdown extends React.Component {
	constructor(props) {
		super(props);

		this.dataParser = new DataParser();
	}

	render() {
        const breakdownData = this.props.breakdownData;
        let assetsPercentage = (breakdownData.netWorth - breakdownData.liabilities) / breakdownData.netWorth;
        assetsPercentage = (assetsPercentage * 100).toFixed(2) + "%";

		return (
            <div className="account-breakdown-component">
                <div className="account-breakdown-inner">
                    <div className="breakdown-labels">
                        <p className="breakdown-label">ASSETS</p>
                        <p className="breakdown-label right">LIABILITIES</p>
                    </div>

                    <div className="breakdown-bars">
                        <div className="breakdown-bar assets" style={{width: assetsPercentage}}></div>
                        <div className="breakdown-bar liabilities"></div>
                    </div>

                    <div className="breakdown-amounts">
                        <p className="breakdown-amount">{this.dataParser.parseSingleCurrency(breakdownData.netWorth)}</p>
                        <p className="breakdown-amount right">{this.dataParser.parseSingleCurrency(breakdownData.liabilities)}</p>
                    </div>
                </div>
            </div>
		);
	}
}

export default AccountBreakdown;