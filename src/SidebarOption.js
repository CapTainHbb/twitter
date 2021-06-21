import React from 'react';
import './SidebarOption.css';

class SidebarOption extends React.Component {
    constructor(props) {
        super(props);
    }

    myOnClick = () => {
        this.props.onClick(this.props.text);
    }

    render() {
        return (
            <div className={`sidebarOption ${(this.props.activeTabName == this.props.text) && 'sidebarOption--active'}`} 
            onClick={this.myOnClick}>
                <this.props.Icon />
                <h2 style={{paddingTop: 15}}>{this.props.text}</h2>
            </div>
        );
    }

}

export default SidebarOption
