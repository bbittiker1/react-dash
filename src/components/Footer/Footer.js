import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
   position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: '0.875rem'
  },

  container: {
    margin: '0 auto',
    textAlign: 'center',
    padding: '7px 30px',
  },

  spacer: {
    display: 'inline-block',
    padding: '0 5px'
  },
});

class Footer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { classes } = this.props;

    return (
      <footer className={cx(classes.root, this.props.className)}>
        <div className={classes.container}>
          <span>© 2019 &nbsp;Acme</span>
          <span className={classes.spacer}>·</span>
          <Link to="/app/tos">Terms of Service</Link>
          <span className={classes.spacer}>·</span>
          <Link to="/app/privacy">Privacy Policy</Link>
          <span className={classes.spacer}>·</span>
          <Link to="/app/not-found">Support</Link>
        </div>
      </footer>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Footer);