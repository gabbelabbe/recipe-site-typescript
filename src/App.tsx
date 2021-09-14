import React from 'react';
import './App.css';
import { auth, firestore } from './firebase';
import { useDispatch } from 'react-redux';
import { LoggedInUser } from './store/user/types';
import Header from './components/Header';
import AddNewRecipeButton from './components/AddNewRecipeButton';
import Recipes from './components/Recipes';

function App() {
  const dispatch = useDispatch();

  const db = firestore();

  let groupsRef;
  let recipeRef;
  let userRef:
    | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    | undefined;
  let unsubscribe: undefined | Function;

  auth().onAuthStateChanged(async (user) => {
    if (user) {
      const userInfo: LoggedInUser = {
        displayName: user.displayName!,
        email: user.email!,
        uid: user.uid!,
        selectedDate: new Date(),
        selectedGroup: null,
      };
      await dispatch({ type: 'LOGIN', payload: userInfo });

      userRef = db.collection('users');

      userRef
        .doc(user.uid)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.exists) {
            userRef!.doc(user.uid).set({
              email: user.email,
              uid: user.uid,
            });
          }
        });

      groupsRef = db.collection('groups');

      unsubscribe = await groupsRef
        .where('groupMembers', 'array-contains', user.uid)
        .onSnapshot(async (querySnapshot) => {
          const groups = querySnapshot.docs.map((doc) => doc.data());
          if (groups.length > 0) {
            await dispatch({ type: 'SET_GROUPS', payload: groups });
          }
        });

      recipeRef = db.collection('recipes');

      await recipeRef
        .where('ownerUid', '==', user.uid)
        .get()
        .then(async (res) => {
          if (!res.empty) {
            await dispatch({
              type: 'SET_RECIPES',
              payload: res.docs.map((doc) => {
                const data = doc.data();
                return { ...data, date: new Date(data.date.seconds * 1000) };
              }),
            });
          }
        });
    } else {
      await dispatch({ type: 'LOGOUT' });
      await dispatch({ type: 'CLEAR_GROUPS' });
      await dispatch({ type: 'CLEAR_RECIPES' });
      unsubscribe && unsubscribe();
    }
  });

  return (
    <div className='App'>
      <Header />
      <Recipes />
      <AddNewRecipeButton />
    </div>
  );
}

export default App;
