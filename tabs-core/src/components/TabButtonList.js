import React from 'react';

import TabButton from './TabButton';


export default class TabButtonList extends React.Component {
    render() {
        const button_list = [
            {name: "London"},
            {name: "Paris"},
            {name: "Tokyo"},
        ];
        
        const buttons = button_list.map((button) => 
            <TabButton key={button.name} caption={button.name} />
        );

        return (
            <div className="tab-buttons">
                {buttons}
            </div>
        );
    }
}