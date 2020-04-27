export default (state = {}, action) => {
  const {id, instrumentType, itemName, description, price, quantity, image} = action;
  switch (action.type){
    case 'ADD_INSTRUMENT':
      return Object.assign({}, state, {
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
    
    case 'DELETE_INSTRUMENT':
      const newState = {...state};
      delete newState[id];
      return newState;
    
    default: 
      return state;
  }
}