import React, { useEffect } from 'react';
import './App.css';
import { auth, firestore } from './firebase';
import { useDispatch } from 'react-redux';
import { User } from './store/user/types';
import Header from './components/Header';
import AddNewRecipeButton from './components/AddNewRecipeButton';

function App() {
  const dispatch = useDispatch();

  const db = firestore();

  let groupsRef;
  let unsubscribe: undefined | Function;

  auth().onAuthStateChanged(async user => {
    if(user) {
      const userInfo: User = {displayName: user.displayName!, email: user.email!, uid: user.uid!, selectedDate: new Date(), groupsUids: [], selectedGroup: null};
      await dispatch({type: 'LOGIN', payload: userInfo});

      groupsRef = db.collection('groups');

      unsubscribe = groupsRef
        .where('groupMembers', 'array-contains', user.uid)
        .onSnapshot(querySnapshot => {
            const groups = querySnapshot.docs.map(doc => {
                return doc;
            });
            if (groups.length > 0) {
              dispatch({type: 'SET_GROUPS', payload: groups})
            }
        });

    } else  {
      await dispatch({type: 'LOGOUT'});
      await dispatch({type: 'CLEAR_GROUPS'});
      unsubscribe && unsubscribe();
    }
  });

  return (
    <div className='App'>
      <Header />
      <AddNewRecipeButton />
    </div>
  );
}

export default App;
