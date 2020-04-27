import instrumentReducer from '../../reducers/instrument-reducer';

describe ('instrumentReducer', () => {

  let action;

  const instrumentData = {
    id: 1,
    instrumentType: "Guitar",
    itemName: "The Guitarrro",
    description: "hard-coded guitar",
    price: 199.99,
    quantity: 3,
    image:
      "https://images.reverb.com/image/upload/s--hCvA1Gix--/f_auto,t_large/v1559759198/bghge6q0jidiwxumevwe.png",
  }

  const currentState = {
    1: {
      id: 1,
      instrumentType: "Guitar",
      itemName: "The Guitarrro",
      description: "hard-coded guitar",
      price: 199.99,
      quantity: 3,
      image:
        "https://images.reverb.com/image/upload/s--hCvA1Gix--/f_auto,t_large/v1559759198/bghge6q0jidiwxumevwe.png",
    },
    2: {
      id: 2,
      instrumentType: "Piano",
      itemName: "El Piano",
      description: "hard-coded piano",
      price: 899.99,
      quantity: 0,
      image:
        "https://kawaius.com/wp-content/uploads/2018/04/Kawai-Novus-NV10.jpg",
    }
  }


  test ('Should return default state if there is no action type passed into the reducer', () => {
    expect(instrumentReducer({}, {type: null})).toEqual({})
  });

  
  test ('Should successfully add new instrument data to masterInstrumentList', () => {

    const {id, instrumentType, itemName, description, price, quantity, image} = instrumentData;

    action = {
      type: 'ADD_INSTRUMENT',
      id: id,
      instrumentType: instrumentType,
      itemName: itemName,
      description: description,
      price: price,
      quantity: quantity,
      image: image
    };

    expect(instrumentReducer({}, action)).toEqual({
      [id]: {
        id: id,
        instrumentType: instrumentType,
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity,
        image: image
      }
    });
  });

  test('Should successfully delete a tcket', () =>{

    action = {
      type: 'DELETE_INSTRUMENT',
      id: 1
    };

    expect(instrumentReducer(currentState, action)).toEqual({

      2: {
        id: 2,
        instrumentType: "Piano",
        itemName: "El Piano",
        description: "hard-coded piano",
        price: 899.99,
        quantity: 0,
        image:
          "https://kawaius.com/wp-content/uploads/2018/04/Kawai-Novus-NV10.jpg",
      }
    });
  });
});

