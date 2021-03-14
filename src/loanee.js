import React from 'react';
import './loanee.css';

class Loanee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lenderChoice: 0,
            bestLoanee: null
        };
        
        this.handleLenderChange = this.handleLenderChange.bind(this);
    }

    componentDidMount = () => {
        this.limit = 5;
        // change query loan based on the filters you want 
        this.queryLoan = `
        { 
            lend {
                loans(filters: {gender: female, country: ["KE"]}, limit: ${this.limit}) {
                    totalCount
                    values {
                        name
                        status
                        loanAmount
                        loanFundraisingInfo {
                            fundedAmount
                        }
                        lenderRepaymentTerm
                        whySpecial
                        geocode {
                            city
                            state
                            country {
                                name
                            }
                        }
                        image {
                            url(presetSize: original)
                        }
                        activity {
                            name
                        }
                        lenders(limit: 0) {
                            totalCount
                        }
                    }
                }
            }
        }
        `;

        // from kiva
        fetch('https://api.kivaws.org/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: this.queryLoan }),
        })
        .then(res => res.json())
        .then((res) => {
            if(res) {
                console.log(res);
                this.setState({ bestLoanee: res.data.lend.loans.values[this.state.lenderChoice]});
                console.log(this.state.bestLoanee);
            }
        });
    }

    changeLoanee() {
        console.log("new lender ", this.state.lenderChoice);
        fetch('https://api.kivaws.org/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: this.queryLoan }),
        })
        .then(res => res.json())
        .then((res) => {
            if(res) {
                console.log(res);
                this.setState({ bestLoanee: res.data.lend.loans.values[this.state.lenderChoice]});
                console.log(this.state.bestLoanee);
            }
        });
    }

    handleLenderChange() {
        console.log("called");
        if (this.state.lenderChoice < this.limit) {
            this.setState({ lenderChoice: this.state.lenderChoice += 1 });
        }
        console.log(this.state.lenderChoice);
        this.changeLoanee();
    }

    render() {
        const place = this.state.bestLoanee?.geocode;
        const address = `${place?.city}, ${place?.state}, ${place?.country?.name}`; 
        const loan = `$${this.state.bestLoanee?.loanAmount}`;
        const term = `${this.state.bestLoanee?.lenderRepaymentTerm} months`;
        const description = this.state.bestLoanee?.whySpecial;

        return (
            <div className="loanee">
                <div className="card">
                    <h3> WHO YOU'RE SUPPORTING</h3>
                    <div className="row">
                        <img src={this.state.bestLoanee?.image.url}></img>
                        <div className="infoText">
                            <h2>Meet {this.state.bestLoanee?.name}</h2>
                            <p> {address} </p>
                            <br/>
                            <div className="row">
                                <div className="col">
                                    <p>Loan amount</p>
                                    <h2 className="amount green"> {loan} </h2>
                                </div>
                                <div className="col">
                                    <p>Loan length</p>
                                    <h2 className="amount"> {term} </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="goal"> <b>Goal: </b> {description} </h3>
                </div>
                <div className="button" onClick={this.handleLenderChange}>
                    <h1>Support another</h1>
                </div>
            </div>
        );
    }
}

export default Loanee;