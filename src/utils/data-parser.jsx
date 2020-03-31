//import react framework
import React from "react";

//import packages
import NumberFormat from "react-number-format";

class DataParser extends React.Component {
    parseSingleCurrency(value) {
        return <NumberFormat value={value} displayType={"text"} thousandSeparator={true} prefix={"$"}/>
    }
}

export default DataParser;