import React from "react";
import InstrumentsList from "./InstrumentsList";
import NewInstrumentForm from "./NewInstrumentForm";
import EditInstrumentForm from "./EditInstrumentForm";
import InstrumentDetail from "./InstrumentDetail";
// import { v4 } from "uuid";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/* Seed Data */
// const masterInstrumentList = [
//   {
//     // id: v4(),
//     id: 1,
//     type: "Guitar",
//     itemName: "The Guitarrro",
//     description: "hard-coded guitar",
//     price: 199.99,
//     quantity: 3,
//     image:
//       "https://images.reverb.com/image/upload/s--hCvA1Gix--/f_auto,t_large/v1559759198/bghge6q0jidiwxumevwe.png",
//   },
//   {
//     // id: v4(),
//     id: 2,
//     type: "Piano",
//     itemName: "El Piano",
//     description: "hard-coded piano",
//     price: 899.99,
//     quantity: 0,
//     image:
//       "https://kawaius.com/wp-content/uploads/2018/04/Kawai-Novus-NV10.jpg",
//   },
//   {
//     // id: v4(),
//     id: 3,
//     type: "Saxophone",
//     itemName: "The In-Stocksophone",
//     description: "this is an example of an in-stock item",
//     price: 699.99,
//     quantity: 8,
//     image:
//       "https://cdn.shoplightspeed.com/shops/612125/files/5871002/image.jpg",
//   },
//   {
//     // id: v4(),
//     id: 4,
//     type: "Piano",
//     itemName: "El Piano Dos",
//     description: "hard-coded piano",
//     price: 899.99,
//     quantity: 1,
//     image:
//       "https://kawaius.com/wp-content/uploads/2018/04/Kawai-Novus-NV10.jpg",
//   },
//   {
//     // id: v4(),
//     id: 5,
//     type: "Guitar",
//     itemName: "The Guitarrito",
//     description: "hard-coded guitar",
//     price: 199.99,
//     quantity: 3,
//     image:
//       "https://images.reverb.com/image/upload/s--hCvA1Gix--/f_auto,t_large/v1559759198/bghge6q0jidiwxumevwe.png",
//   },
//   {
//     // id: v4(),
//     id: 6,
//     type: "Saxophone",
//     itemName: "The Out-of-Stocksophone",
//     description: "this is an example of an out-of-stock item.  It's over 9000!",
//     price: 9000.99,
//     quantity: 0,
//     image:
//       "https://cdn.shoplightspeed.com/shops/612125/files/5871002/image.jpg",
//   },
// ];

/* Styles */
const controlStyle = {
  marginBottom: 40,
};
const buttonStyle = {
  margin: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

/* 
Instruments Control
 */
class InstrumentsControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // masterInstrumentList: masterInstrumentList,
      selectedInstrument: null,
      addNewInstrumentFormVisible: false,
      editInstrumentFormVisible: false 
    };
  }

  handleToggleNewInstrumentForm = () => {
    if (this.state.selectedInstrument != null) {
      this.setState(() => ({
        selectedInstrument: null,
        editInstrumentFormVisible: false,
      }));
    } else {
      this.setState((prevState) => ({
        addNewInstrumentFormVisible: !prevState.addNewInstrumentFormVisible,
      }));
    }
  };

  handleAddingNewInstrumentToList = (newInstrument) => {
    if (newInstrument.image == "") {
      newInstrument.image = "./default-img.jpeg";
    }
    const {dispatch} = this.props;
    const {id, instrumentType, itemName, description, price, quantity, image} = newInstrument;

    const action = {
      type: 'ADD_INSTRUMENT',
      id: id,
      instrumentType: instrumentType,
      itemName: itemName,
      description: description,
      price: price,
      quantity: quantity,
      image: image
    }

    dispatch(action);

    // const newMasterInstrumentList = this.state.masterInstrumentList.concat({
    //   id: v4(),
    //   ...newInstrument,
    // });
    // this.setState({ masterInstrumentList: newMasterInstrumentList });
    this.setState({ addNewInstrumentFormVisible: false });
  };

  // handleChangingQuantity = (id, newQuantity) => {
  //   const thisInstrument = this.state.masterInstrumentList.filter(
  //     (ticket) => ticket.id === id
  //   );
  //   thisInstrument[0].quantity += newQuantity;
  //   if (thisInstrument[0].quantity <= 0) {
  //     thisInstrument[0].quantity = 0;
  //   }
  //   this.setState({ masterInstrumentList: masterInstrumentList});
  // };

  handleChangingSelectedInstrument = (id) => {
    // const selectedInstrument = this.state.masterInstrumentList.filter(
    //   (instrument) => instrument.id === id
    // )[0];
    const selectedInstrument = this.props.masterInstrumentList[id];
    this.setState({ selectedInstrument: selectedInstrument });
  };

  handleEditClick = () => {
    this.setState({ editInstrumentFormVisible: true });
  };

  handleEditingInstrument = (instrumentToEdit) => {
    // Still saving numbers as strings intially
    instrumentToEdit.price = parseInt(instrumentToEdit.price);
    const quantityNumber = parseInt(instrumentToEdit.quantity);
    if (quantityNumber <= 0) {
      instrumentToEdit.quantity = 0;
    } else {
      instrumentToEdit.quantity = quantityNumber;
    }
    const {dispatch} = this.props;
    const {id, instrumentType, itemName, description, price, quantity, image} = instrumentToEdit;

    const action = {
      type: 'ADD_INSTRUMENT',
      id: id,
      instrumentType: instrumentType,
      itemName: itemName,
      description: description,
      price: price,
      quantity: quantity,
      image: image
    }

    dispatch(action);  
    // const editedInstrumentList = this.state.masterInstrumentList
    //   .filter((instrument) => instrument.id !== editedInstrument.id)
    //   .concat(editedInstrument);
    this.setState({
      // masterInstrumentList: editedInstrumentList,
      editInstrumentFormVisible: false,
      selectedInstrument: null,
    });
  };

  handleDeletingInstrument = (id) => {
    const {dispatch} = this.props;
    const action = {
      type: 'DELETE_INSTRUMENT',
      id: id
    }
    dispatch(action);  
    // const newMasterInstrumentList = this.state.masterInstrumentList.filter(
    //   (instrument) => instrument.id !== id
    // );
    // this.setState({ masterInstrumentList: newMasterInstrumentList });
    this.setState({ selectedInstrument: null });
  };

  setVisibility = () => {
    if (this.state.editInstrumentFormVisible) {
      // UPDATE: Edit instrument form view
      return {
        component: (
          <EditInstrumentForm
            ticket={this.state.selectedInstrument}
            onEditInstrument={this.handleEditingInstrument}
          />
        ),
        buttonText: "Cancel and return to Instruments List",
      };
    } else if (this.state.selectedInstrument != null) {
      // READ ONE: instrument detail view
      // DELETE: Add delete button to detail view
      return {
        component: (
          <InstrumentDetail
            instrument={this.state.selectedInstrument}
            onClickingDelete={this.handleDeletingInstrument}
            onClickingEdit={this.handleEditClick}
          />
        ),
        buttonText: "Return to Instruments List",
      };
    } else if (this.state.addNewInstrumentFormVisible) {
      // CREATE: Add new instrument form view
      return {
        component: (
          <NewInstrumentForm
            onAddInstrument={this.handleAddingNewInstrumentToList}
          />
        ),
        buttonText: "Return to Instruments List",
      };
    } else {
      // READ ALL: "index" grid view
      return {
        component: (
          <InstrumentsList
            onInstrumentSelect={this.handleChangingSelectedInstrument}
            onQuantityChanged={this.handleChangingQuantity}
            instrumentList={this.props.masterInstrumentList}
            // instrumentList={this.state.masterInstrumentList}
          />
        ),
        buttonText: "Add Instrument",
      };
    }
  };

  render() {
    const currentlyVisibleState = this.setVisibility();
    return (
      <React.Fragment>
        <div style={controlStyle}>
          <div style={buttonStyle} className="btn-group text-center">
            <button
              className="btn btn-light col-2"
              onClick={this.handleToggleNewInstrumentForm}
            >
              {currentlyVisibleState.buttonText}
            </button>
          </div>
          {currentlyVisibleState.component}
        </div>
      </React.Fragment>
    );
  }
}

InstrumentsControl.propTypes = {
  masterInstrumentList: PropTypes.object
}

const mapStateToProps = state => {
  return {
    masterInstrumentList: state
  }
}

InstrumentsControl = connect(mapStateToProps)(InstrumentsControl);

export default InstrumentsControl;
