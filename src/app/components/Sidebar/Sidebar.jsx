// Import React and other utility libraries
import React from 'react';
import PropTypes from 'prop-types';

import BookDisplayButtons from '../BookDisplayButtons/BookDisplayButtons.jsx';
import BookFilters from '../BookFilters/BookFilters.jsx';
import SimpleButton from '../Buttons/SimpleButton.jsx';

import utils from '../../utils/utils.js';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileDisplay: false,
    };

    this.showFilters = this.showFilters.bind(this);
    this.hideFilters = this.hideFilters.bind(this);
  }

  showFilters() {
    this.setState({ mobileDisplay: true });
    // Make the whole document not scrollable for mobile version
    document.body.className = 'no-scroll';
    window.scrollTo(0, 0);

    utils.trackPicks('Filters', 'Mobile display filters');
  }

  hideFilters() {
    this.setState({ mobileDisplay: false });
    // Make the whole document scrollable again
    document.body.className = '';

    utils.trackPicks('Filters', 'Mobile close filters');
  }

  render() {
    let about = null;

    if (this.props.params && this.props.params.type) {
      about = (
        <div className="about">
          <span className="about-divider"></span>
          <h2 className="about-link">
            <a href="http://nypl.org/books-music-dvds/recommendations/about/annual-lists">
              About this list
            </a>
          </h2>
        </div>
      );
    }

    return (
      <div ref="sidebar" className="sidebar-content">
        <BookDisplayButtons />

        <SimpleButton
          gaCategory="Staff Picks"
          gaAction="Mobile Filter"
          gaEvent="Filter"
          className="mobile-filter-btn"
          onClick={this.showFilters}
          label="Filter By Tags"
        />

        <BookFilters
          {...this.props}
          active={this.state.mobileDisplay ? 'active' : ''}
          mobileCloseBtn={this.hideFilters}
        />

        {about}
      </div>
    );
  }
}

Sidebar.propTypes = {
  params: PropTypes.object,
};

export default Sidebar;
