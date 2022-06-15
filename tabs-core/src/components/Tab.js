import React from 'react';

import TabButtonList from "./TabButtonList";
import TabContent from "./TabContent";


export default class Tab extends React.Component {

    constructor(props) {
        super(props);

        const contents = [
            {
                name: "London",
                text: "London is the capital city of England"
            },
            {
                name: "Paris",
                text: "Paris is the capital of France"
            },
            {
                name: "Tokyo",
                text: "Tokyo is the capital of Japan"
            },
        ];

        function prepare_content(content) {
            let new_content = {...content};
            new_content.isActive = false;
            return new_content;
        }

        const state = contents.map(prepare_content);
        this.state = {
            content: state
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(i) {
        function getButtonState(button) {
            let new_button = {...button};
            new_button.isActive = true ? new_button.name === this.button_key : false;
            return new_button;
        }

        let buttons_state = this.state.content.map(
            getButtonState, {button_key: i}
        );
        
        this.setState({
            content: buttons_state
        });
    }

    render() {
        const content = this.state.content;
        const tabcontent = content.filter((obj) => obj.isActive === true).map((obj) =>
            <TabContent
                key={obj.name}
                header={obj.name}
                text={obj.text}
            />
        );

        const buttons = this.state.content.map((content) => 
            ({name: content.name, isActive: content.isActive})
        );

        return (
            <div className="tab">
                <TabButtonList buttons={buttons} handleButtonClick={this.handleButtonClick} />
                {tabcontent}
            </div>
        );
    }
};