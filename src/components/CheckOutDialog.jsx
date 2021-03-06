import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { checkOutAnimal } from '../actions/animal-actions.js';
import './CheckOutDialog.css';

export class CheckOutDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      step1: false,
      step2: false,
      pinNumber: '',
      submissionDisabled: true
    };
  }

  handleOpenStep1 = () => {
    this.setState({ step1: true });
  };

  handleCloseStep1 = () => {
    this.setState({ step1: false });
  };

  handleOpenStep2 = () => {
    this.setState({ step2: true });
  }

  handleCloseStep2 = () => {
    this.handleCloseStep1();
    this.setState({ step2: false });
  };

  handlePinSubmission = (evt) => {
    this.setState({ pinNumber: evt.target.value });
    if (evt.target.value.length === 4) {
      this.setState({ submissionDisabled: false });
    }
  };

  handleCheckOut = (evt) => {
    this.handleCloseStep2();
    this.setState({checkedOut: true});
    this.handleCheckOutRequest();
  }

  handleCheckOutRequest(){
    let {
      petPk,
      roomId
    } = this.props;
    this.props.checkOutAnimal(petPk, roomId, this.state.value);
  }

  handleSelect = (evt, index, val) => {
    this.setState({ value: val });
  }

  render() {

    const step1 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseStep1}
      />,
      <FlatButton
        label="Next"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleOpenStep2}
        disabled={this.state.submissionDisabled}
      />,
    ];

    const step2 = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseStep2}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleCheckOut}
      />
    ]

    return (
      <div className="checkout-button">
        <RaisedButton primary={true} label='Check Out' onClick={this.handleOpenStep1} disabled={this.props.checkedOut || this.state.checkedOut} />
        <Dialog
          title="Please enter a 4 digit pin."
          actions={step1}
          modal={false}
          open={this.state.step1}
          onRequestClose={this.handleCloseStep1}
        >
          <TextField
            floatingLabelText="4 character pin"
            type="password"
            maxLength="4"
            value={this.state.pinNumber}
            onChange={this.handlePinSubmission}
          /><br />
        </Dialog>

        <Dialog
          title="You're almost there!"
          actions={step2}
          modal={false}
          open={this.state.step2}
          onRequestClose={this.handleCloseStep2}
        >
          <SelectField
            floatingLabelText="Reason:"
            value={this.state.value}
            onChange={this.handleSelect}>
            <MenuItem value="At a sleep over" primaryText="At a sleep over" />
            <MenuItem value="Going to medical" primaryText="Going to medical" />
          </SelectField>
        </Dialog>
      </div>
    );
  }
}

CheckOutDialog.PropTypes = {
  petPk: PropTypes.number,
  roomId: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    checkedOut: state.animalReducer.currentCatCheckedOut
  };
}

function mapDispatchToProps (dispatch) {
  return {
    checkOutAnimal: (petPk, roomId, note) => dispatch(checkOutAnimal(petPk, roomId, note))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckOutDialog);
