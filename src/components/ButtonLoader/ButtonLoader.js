import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";


class ButtonLoader extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.clickIdentifier = null;
        this.toggleConfirm = this.toggleConfirm.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            isFetching: this.props.isFetching,
            modal: false
        };
    }

    toggleConfirm() {
        this.setState({
            modal: !this.state.modal
        })
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return "returned from snapshot";
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isFetching !== this.props.isFetching) {
            this.setState({ isFetching: this.props.isFetching });
        }
    }

    static propTypes = {
        isFetching: PropTypes.bool,
        buttonText: PropTypes.string,
        fetchingButtonText: PropTypes.string,
        color: PropTypes.string,
        buttonId: PropTypes.string,
        block: PropTypes.bool,
        showConfirm: PropTypes.bool,
        disabled: PropTypes.bool,
        confirmProps: PropTypes.object,
        fullWidth: PropTypes.bool,
        size: PropTypes.string,
        title: PropTypes.string,
        variant: PropTypes.string
    };

    static defaultProps = {
        isFetching: false,
        buttonText: "",
        fetchingButtonText: "",
        color: "",
        block: false,
        showConfirm: false,
        buttonId: "",
        disabled: false,
        confirmProps: {},
        fullWidth: false,
        size: "large",
        title: null,
        variant: "contained"
    };

    submit = (e) => {
        // To prevent multiple buttons from entering fetching state, onClick function
        // return same id as buttonId prop passed in.
        this.clickIdentifier = this.props.onClick.apply();
    };

    render() {
        const { isFetching, buttonText, fetchingButtonText } = this.props;
        const onClick = this.props.showConfirm ? this.toggleConfirm : this.submit;
        const confirmProps = this.props.confirmProps || {};
        const clicked = (this.clickIdentifier) ? (this.clickIdentifier === this.props.buttonId) : false;

        return (
            <div>
                <div>
                    <Button variant={this.props.variant}
                            fullWidth={this.props.fullWidth}
                            color={this.props.color}
                            onClick={ onClick }
                            disabled={ (isFetching && clicked) || this.props.disabled }
                            size={ this.props.size }
                            style={{marginBottom: '10px'}}
                            title={this.props.title}
                            // classes={}
                    >
                        { (isFetching && clicked) && (
                            <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
                        )}
                        {(isFetching && clicked) && <span>{fetchingButtonText}</span>}
                        {(!isFetching || (isFetching && !clicked)) && <span>{buttonText}</span>}
                    </Button>
                </div>

                <div>
                    {this.props.showConfirm &&
                        <Dialog onClose={this.toggleConfirm} aria-labelledby="simple-dialog-title" open={this.state.modal}>
                            <DialogTitle id="simple-dialog-title">Confirm</DialogTitle>
                            <DialogContent>
                                <div style={{marginBottom: '25px'}}>
                                    { confirmProps.confirmText }
                                </div>
                                <div>
                                    <Button color='primary' onClick={this.submit}>
                                        { confirmProps.okButtonText}
                                    </Button>
                                    {' '}
                                    <Button color='secondary' onClick={this.toggleConfirm}>
                                        { confirmProps.cancelButtonText }
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    }
                </div>
            </div>
        );
    }
}

export default connect()(ButtonLoader);
