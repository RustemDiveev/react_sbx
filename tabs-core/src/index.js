import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css';


class Tabs extends React.Component {
    render() {
        return (
            <div class="tab">
                <TabButtonList />
            </div>
        );
    }
};


class TabButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isSelected: false};

        this.onClick = this.onClick.bind(this);
        this.getClasses = this.getClasses.bind(this);
    }

    onClick() {
        this.setState({isSelected: true});
    }

    getClasses() {
        const essential_classes = ["tablinks"];
        let classes = essential_classes;

        if (this.state.isSelected) {
            classes.push("active");
        }

        return classes.join(" ");
    }

    render() {
        return (
            <button class={this.getClasses()} onClick={this.onClick}>{this.props.caption}</button>
        );
    }
}


class TabButtonList extends React.Component {
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
            <div class="tab-buttons">
                {buttons}
            </div>
        );
    }
}


class LondonContent extends React.Component {
    render() {
        return (
            <div id="London" class="tabcontent">
                <h3>London</h3>
                <p>London is the capital city of England.</p>
            </div>
        );
    }
};


class ParisContent extends React.Component {
    render() {
        return (
            <div id="Paris" class="tabcontent">
                <h3>Paris</h3>
                <p>Paris is the capital of France.</p>
            </div>
        );
    }
};


class TokyoContent extends React.Component{
    render() {
        return (
            <div id="Paris" class="tabcontent">
                <h3>Tokyo</h3>
                <p>Tokyo is the capital of Japan.</p>
            </div>
        );
    }
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Tabs />
);
