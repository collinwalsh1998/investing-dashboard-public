//import react framework
import React from "react";

//import packages
import NumberFormat from "react-number-format";

class DataParser extends React.Component {
    parseSingleCurrency(value) {
        return <NumberFormat value={value} displayType={"text"} renderText={value => <>{value}</>} thousandSeparator={true} prefix={"$"} decimalScale={2} fixedDecimalScale={true}/>
    }
}

export default DataParser;