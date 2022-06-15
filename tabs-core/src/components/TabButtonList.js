import React from 'react';

import TabButton from './TabButton';


export default class TabButtonList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: [
                {name: "London", isActive: false},
                {name: "Paris", isActive: false},
                {name: "Tokyo", isActive: false},
            ]    
        };
    }
    
    handleButtonClick(i) {
        function getButtonState(button) {
            let new_button = button;
            new_button.isActive = true ? button.name === this.button_key : false;
            return new_button;
        }

        let buttons_state = this.state.buttons.map(
            getButtonState, {button_key: i}
        );
        
        this.setState({
            buttons: buttons_state
        });
    }

    render() {

        const buttons = this.state.buttons;

        const tab_buttons = buttons.map((button) => 
            <TabButton 
                key={button.name} 
                caption={button.name} 
                onClick={() => this.handleButtonClick(button.name)}
                isActive={button.isActive}
            />
        );

        return (
            <div className="tab-buttons">
                {tab_buttons}
            </div>
        );
    }
}