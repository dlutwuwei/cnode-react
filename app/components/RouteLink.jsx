import React from 'react';
import {
  Link
} from 'react-router';

const RouteLink = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  render() {
    const isActive = this.context.router.isActive(this.props.to, this.props.query);
    const activeClassName = isActive ? 'am-active' : '';
    
    const link = (
      <Link {...this.props} />
    ); 

    return (
      <li className={activeClassName}>
        {link}
      </li>
    );
  },
});

export default RouteLink;