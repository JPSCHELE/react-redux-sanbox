console.clear();


//Gente botando un formulario
// 44019739863-ojp86e99oa08l0cnmjc64157o13eie9t.apps.googleusercontent.com
// iIUP7wsFJptXKkEQwfYk43at
const createPolicy = (name, amount) => {
  return {//formulario
    type: 'CREATE_POLICY',
    payload:{
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) => {
  return {//formulario
    type: 'DELETE_POLICY',
    payload:{
      name: name,
    }
  };
};

const createClaim = (name, amountCollect) => {
  return {//formulario
    type: 'CREATE_CLAIM',
    payload:{
      name: name,
      amountCollect: amountCollect
    }
  };
};


//reducers
const claimsHistory = (oldListOfClaims = [], action) =>{
  if(action.type === 'CREATE_CLAIM'){
    return[...oldListOfClaims, action.payload]
  }
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if(action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amountCollect;
  }else if(action.type === 'CREATE_POLICY'){
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if(action.type === 'CREATE_POLICY'){
    return[...listOfPolicies, action.payload.name];
  }else if(action.type === 'DELETE_POLICY'){
    return listOfPolicies.filter(name => name !== action.payload.name);
  }
  return listOfPolicies;
};

const { createStore, combineReducers}= Redux;

const ourDepartments = combineReducers({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies: policies
});

const store = createStore(ourDepartments);


store.dispatch(createPolicy('Alex',20));
store.dispatch(createPolicy('malaya',40));
store.dispatch(createPolicy('mana',200));
store.dispatch(createClaim('Alex',220));
store.dispatch(deletePolicy('Alex'));
console.log(store.getState());