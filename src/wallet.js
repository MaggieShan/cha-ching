import React from 'react';
import './wallet.css';

class Wallet extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            currentBalance: 48.25,
            amountTillNext: 1.75,
            total: 150.00,
        }
    }

    render() {
        const curr = `$${this.state.currentBalance}`;
        const next = `$${this.state.amountTillNext}`;
        const total = `$${this.state.total}`;

        return (
            <div>
                <div className="creditcard white">
                    <div className="col text">
                        <p className="start">Current balance</p>
                        <div className="col">
                            <h1 className="curr">{curr}</h1>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>{next}</h2>
                                <p className="caption">UNTIL NEXT DONATION</p>
                            </div>
                            <div className="col">
                                <h2>{total}</h2>
                                <p className="caption">TOTAL DONATED</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="creditcard2"></div>
            </div>
        );
    };

};

export default Wallet; 