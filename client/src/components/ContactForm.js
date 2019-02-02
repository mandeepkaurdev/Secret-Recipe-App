import React, { Component, Fragment } from 'react';
import '../style.css';

class ContactForm extends Component {
    state = {
        shouldShowSendEmail: false,
        successMessage: ''
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState({ shouldShowSendEmail: true })
    }

    sendEmail = (event) => {
        event.preventDefault()
        this.setState({ successMessage: 'Recipe sent.' })
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.handleClick} className="share" style={{ background: 'rgb(2, 159, 250)', color: 'white' }}>Share</button>
                {this.state.shouldShowSendEmail &&


                    <form>
                        <label>Enter Email Address</label>
                        <input className="email" name='emailaddress' type='emailaddress' placeholder='Enter Email Address' />
                        <button className="send" onClick={this.sendEmail} style={{ background: 'rgb(2, 159, 250)', color: 'white' }}>Send</button>
                    </form>
                }
                {this.state.successMessage && <h3 style={{ color: 'rgb(0, 204, 0)', textAlign: 'center' }}>{this.state.successMessage}</h3>}


            </Fragment>
        )
    }
}

export default ContactForm
