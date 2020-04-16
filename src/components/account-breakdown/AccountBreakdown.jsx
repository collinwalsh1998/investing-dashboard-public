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
        let assetsPercentage = breakdownData.liabilities / breakdownData.netWorth;
        assetsPercentage = (assetsPercentage * 100).toFixed(2) + "%";

		return (
            <div className="account-breakdown-component">
                <div className="account-breakdown-inner">
                    <div className="liabilities-content" style={{width: assetsPercentage}}>
                        <p className="breakdown-label">LIABILITIES</p>
                        <p className="breakdown-amount">{this.dataParser.parseSingleCurrency(breakdownData.liabilities)}</p>
                        <div className="indicator-line down"></div>
                    </div>

                    <div className="breakdown-bars">
                        <div className="breakdown-bar liabilities" style={{width: assetsPercentage}}></div>
                        <div className="breakdown-bar assets"></div>
                    </div>

                    <div className="assets-content">
                        <div className="indicator-line up"></div>
                        <p className="breakdown-label right">ASSETS</p>
                        <p className="breakdown-amount right">{this.dataParser.parseSingleCurrency(breakdownData.netWorth)}</p>
                    </div>
                </div>
            </div>
		);
	}
}

export default AccountBreakdown;