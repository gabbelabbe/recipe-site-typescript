import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { User, LoggedInUser } from '../store/user/types';
import { RootState } from '../store/index';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { GroupsFormProps } from '../store/user/types';
import IconButton from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  input: {
    color: 'white'
  },
  root: {
    Width: 35,
    height: 35,
    minWidth: 35,
    marginLeft: 0,
  },
  button: {
    width: 24,
    color: 'white'
  },
  autocomplete: {
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    width: 255
  },
  label: {
    color: 'white'
  },
  helperText: {
    color: 'white'
  },
  helperTextError: {
    color: '#f44336'
  }
}));

export default function GroupForm({ setShowCreateGroupForm, groupToBeEdited }: GroupsFormProps) {
  const userState = useSelector<RootState, LoggedInUser | null>((state: RootState) => state.user);
  let usersRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> | undefined;
  const dispatch = useDispatch();
  const db = firestore();

  const classes = useStyles();

  const [groupMembers, setGroupMemebers] = useState<User[]>([]);
  const [numberOfMembers, setNumberOfMembers] = useState(groupToBeEdited ? groupToBeEdited.groupMembers.length : 2);

  useEffect(() => {
    const generateGroupMembers = async () => {
      let tempArr: User[] = groupMembers.length > 0 ? [...groupMembers] : [{uid: userState!.uid, email: userState!.email}];
      if (groupToBeEdited && groupToBeEdited.groupMembers[0].uid !== userState!.uid) {
        // This makes sure that the logged in user is first in the array.
        tempArr = [...groupToBeEdited.groupMembers];
        for (let i = 0; i < tempArr.length; i++) {
          if (tempArr[i].uid === userState!.uid) {
            const first = tempArr[0];
            tempArr[0] = tempArr[i];
            tempArr[i] = first;
          }
        }
      } else if (tempArr.length < numberOfMembers) {
        for (let i = tempArr.length; i < numberOfMembers; i++) {
          tempArr.push({uid: '', email: ''});
        }
      } else if (tempArr.length > numberOfMembers) {
        for (let i = tempArr.length; i > numberOfMembers; i--) {
          tempArr.pop();
        }
      }
      await setGroupMemebers(tempArr);
    }
    generateGroupMembers();
    console.log(groupMembers);
  }, [numberOfMembers]);

  const [newGroupName, setNewGroupName] = useState(groupToBeEdited ? groupToBeEdited.groupName : '');
  const [emailErrors, setEmailErrors] = useState([false]);
  const [userDontExistsArr, setUserDontExistsArr] = useState([false]);
  const [inputOtherMembers, setInputOtherMembers] = useState<JSX.Element[]>([]);

  useEffect(() => {
    console.log(groupMembers);
    setInputOtherMembers([<TextField
      margin='dense'
      id='1'
      key={1}
      label='En annan användares mail'
      helperText={userDontExistsArr[0] ? ('Denna Användaren finns inte') : ('Du behöver inte lägga till sig själv.')}
      FormHelperTextProps={{
        className: userDontExistsArr[0] ? classes.helperTextError : classes.helperText
      }}
      type='email'
      fullWidth
      error={emailErrors[0]}
      InputProps={{
        style: {
          color: '#fff'
        }
      }}
      onChange={(e) => {
        handleEmailChange(parseInt(e.target.id) - 1, e.target.value);
      }}
      InputLabelProps={{className: classes.label}}
    />])
  }, [groupMembers]);

  function generateInputOtherMembers() {

  }

  async function handleEmailChange(id: number, email: string) {
    const tempGroupMembersArr = [...groupMembers];
    tempGroupMembersArr[id + 1].email = email; 
    setGroupMemebers(tempGroupMembersArr);

    const tempUserDontExistsArr = [...userDontExistsArr];
    const tempEmailErrorArr = [...emailErrors];
    tempEmailErrorArr[id] = !validateEmail(email);
    
    if (!tempEmailErrorArr[id]) {
      usersRef = db.collection('users');
      
      await usersRef.where('email', '==', email).get()
        .then(querySnapshot => {
          if (querySnapshot.docs[0]) {
            console.log(querySnapshot.docs[0].data());
            tempUserDontExistsArr[id] = false;
          } else {
            tempUserDontExistsArr[id] = true;
            tempEmailErrorArr[id] = true;
          }
        })
        .catch(err => console.error(err));

    }

    setUserDontExistsArr(tempUserDontExistsArr);
    setEmailErrors(tempEmailErrorArr);
  }

  function validateEmail(email: string): boolean {
    const re: RegExp = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) && email !== userState!.email;
  }

  return (
    <div>
      <DialogContent>
        <TextField
          margin='dense'
          id='groupName'
          label='Namn på Gruppen'
          value={newGroupName}
          type='text'
          fullWidth
          InputProps={{
            style: {
              color: '#fff'
            }
          }}
          onChange={(e) => {
            setNewGroupName(e.target.value);
          }}
          InputLabelProps={{className: classes.label}}
        />
        <TextField 
          margin='dense'
          id='numberOfOtherUsers'
          label='Antal i Gruppen, inklusive dig själv'
          type='number'
          value={numberOfMembers}
          inputProps={{min: 2, max: 10}}
          fullWidth
          InputProps={{
            style: {
              color: '#fff'
            }
          }}
          onChange={(e) => {
            setNumberOfMembers(parseInt(e.target.value));
          }}
          InputLabelProps={{className: classes.label}}
        />
        {inputOtherMembers}
      </DialogContent>
      <DialogActions>
        <IconButton 
          onClick={() => {
            setShowCreateGroupForm(false);
          }}
          classes={{root: classes.root}}
          className={classes.button}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </div>
  )
}