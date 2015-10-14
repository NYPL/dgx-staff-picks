// Import React libraries
import React from 'react';
import cx from 'classnames';

// Import components
import BasicButton from '../Buttons/BasicButton.jsx';
import SearchBox from '../SearchBox/SearchBox.jsx';

import HeaderStore from '../../stores/HeaderStore.js';
import HeaderActions from '../../actions/HeaderActions.js';

// Create React class
class SearchButton extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    // Give active class if the button is activated by hover
    let classes = cx({
        'active': HeaderStore._getSearchButtonActionValue() === 'hoverSearch' ||
          HeaderStore._getLastActiveMenuItem() === 'hoverSearch'
      });

    return (
      <div className={`${this.props.className}-SearchBox-Wrapper`}>
        <BasicButton
          onMouseEnter={this._activateHover.bind(this)}
          onMouseLeave={this._deactivateHover.bind(this)}
          id={`${this.props.className}-SearchButton`}
          className={`nypl-icon-magnifier-fat ${this.props.className}-SearchButton ${classes}`}
          name='Search Button'
          label='' />
        <SearchBox 
          id={`${this.props.className}-SearchBox`}
          className={`${this.props.className}-SearchBox`} />
      </div>
    );
  }

  /**
   * _activateHover()
   * Update the Store's searchButtonActionValue
   * with hoverSearch after a set time delay.
   */
  _activateHover() {

    this.hoverTimer = setTimeout(() => {
      HeaderActions.searchButtonActionValue('hoverSearch');
    }, 350);
  }

  /**
   * _hoverClose()
   * Clear the activateHover timer if it exists.
   * Reset the Store's searchButtonActionValue to empty
   * after a set time delay.
   */
  _deactivateHover() {
    clearTimeout(this.hoverTimer);

    setTimeout(() => {
      HeaderActions.searchButtonActionValue('');
    }, 250);
  }
}

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

// Export the component
export default SearchButton;