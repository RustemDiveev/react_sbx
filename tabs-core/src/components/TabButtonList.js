import React from 'react';

import TabButton from './TabButton';


export default class TabButtonList extends React.Component {
    render() {
        
        const tab_buttons_props = this.props.buttons;

        const tab_buttons = tab_buttons_props.map((button) => 
            <TabButton 
                key={button.name} 
                caption={button.name} 
                onClick={this.props.handleButtonClick}
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