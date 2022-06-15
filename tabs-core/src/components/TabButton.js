import React from 'react';

export default class TabButton extends React.Component {

    getClasses() {
        const essential_classes = ["tablinks"];
        const classes = essential_classes;

        if (this.props.isActive)
            classes.push("active");

        return classes.join(" ");
    }

    render() {
        return (
            <button className={this.getClasses()} onClick={() => this.props.onClick(this.props.caption)}>
                {this.props.caption}
            </button>
        );
    }
}