import React from 'react';


export default class TabButton extends React.Component {
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
            <button className={this.getClasses()} onClick={this.onClick}>{this.props.caption}</button>
        );
    }
}