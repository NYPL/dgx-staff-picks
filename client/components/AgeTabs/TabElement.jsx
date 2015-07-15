import React from 'react';
import Radium from 'radium';


import BookStore from '../../stores/BookStore.js';
import BookActions from '../../actions/BookActions.js';


class TabElement extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
    this.state = { 
      age: BookStore.getAge()
    };
    this._handleClick = this._handleClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount () {
    BookStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    BookStore.removeChangeListener(this._onChange);
  }

  render () {
  	return (
  		<li key={`tab-${this.props.name}`} id={this.props.name} className='tab-element' style={styles.TabElement}>
        <a style={styles.ElementLink} onClick={this._handleClick.bind(this, this.props.name)}>{this.props.name}</a>
  		</li>
		);
  }

  _handleClick (age) {
    BookActions.updateFilterAge(age);
    console.log(age);
  }
  
  _onChange () {
    this.setState({
      age: BookStore.getAge()
    });
  }
};

const styles = {
  TabElement: {
    display: 'inline',
    margin: '0',
    textTransform: 'uppercase',
    whiteSpace: 'pre',
  },
  ElementLink: {
    ':active': {
      borderColor: '#cc1a16',
      borderBottomStyle: 'none',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px',
      borderWidth: '1px',
      color: '#cc1a16',
      padding: '20px 5% 21px 5%'
    },
    ':hover': {
      borderColor: '#cc1a16',
      borderBottomStyle: 'none',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderTopLeftRadius: '12px',
      borderTopRightRadius: '12px',
      borderWidth: '1px',
      color: '#cc1a16',
      padding: '20px 5% 21px 5%'
    },
    backgroundColor: '#ffffff',
    borderColor: '#cc1a16',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'none',
    borderRightStyle: 'none',
    borderTopStyle: 'none',
    borderWidth: '1px',
    color: '#bfbfbf',
    cursor: 'pointer',
    padding: '20px 5%',
    textDecoration: 'none',
    width: 'auto'
  }
}

export default Radium(TabElement);