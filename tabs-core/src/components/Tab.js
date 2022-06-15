import React from 'react';

import TabButtonList from "./TabButtonList";
import TabContent from "./TabContent";


export default class Tab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [
                {
                    header: "London",
                    text: "London is the capital city of England"
                },
                {
                    header: "Paris",
                    text: "Paris is the capital of France"
                },
                {
                    header: "Tokyo",
                    text: "London is the capital of Japan"
                },
            ]
        };
    }

    render() {

        const tabcontent = this.state.content.map((content) =>
            <TabContent
                key={content.header}
                header={content.header}
                text={content.text}
            />
        );

        return (
            <div className="tab">
                <TabButtonList />
                {tabcontent}
            </div>
        );
    }
};