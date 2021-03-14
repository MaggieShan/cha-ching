import React from 'react'
import './cart.css';

class Cart extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            order: 3.29,
        }
    }

    render() {
        const amount = `$${this.state.order}`;
        return (
            <div>
                <div className="circle"></div>
                <div className='cart'>
                    <h2 className="word">Your order will donate</h2>
                    <h2 className="order">{amount}</h2>
                </div>
            </div>
        );
    }
};

export default Cart;