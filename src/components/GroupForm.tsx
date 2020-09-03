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
  }
}));

export default function GroupForm({ setShowCreateGroupForm, groupToBeEdited }: GroupsFormProps) {
  const userState = useSelector<RootState, LoggedInUser | null>((state: RootState) => state.user);
  let usersRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> | undefined;
  const dispatch = useDispatch();
  const db = firestore();

  const classes = useStyles();

  const [groupMembers, setGroupMemebers] = useState<User[]>([]);

  useEffect(() => {
    let tempArr: User[] = [{uid: userState!.uid, email: userState!.email}];
    if (groupToBeEdited && groupToBeEdited.groupMembers[0].uid !== userState!.uid) {
      tempArr = groupToBeEdited.groupMembers;
      for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i].uid === userState!.uid) {
          const first = tempArr[0];
          tempArr[0] = tempArr[i];
          tempArr[i] = first;
        }
      }
    }
    setGroupMemebers(tempArr);
  }, [groupToBeEdited]);

  const [newGroupName, setNewGroupName] = useState(groupToBeEdited ? groupToBeEdited.groupName : '');
  const [numberOfMembers, setNumberOfMembers] = useState(groupToBeEdited ? groupToBeEdited.groupMembers.length : 2);
  const [emailErrors, setEmailErrors] = useState([false]);
  const inputOtherMembers: JSX.Element[] = [
    <TextField
      margin='dense'
      id={`${numberOfMembers - 1}`}
      key={numberOfMembers - 1}
      label='En användares mail'
      type='email'
      fullWidth
      error={emailErrors[0]}
      InputProps={{
        style: {
          color: '#fff'
        }
      }}
      onChange={(e) => {
        handleEmailChange(parseInt(e.target.id) - 1, e.target.value)
      }}
      InputLabelProps={{className: classes.label}}
    />
  ];

  useEffect(() => {
    console.log(emailErrors[0])
    console.log(inputOtherMembers[0]);
  }, [emailErrors]);

  function handleEmailChange(id: number, email: string) {
    const tempArr = [...emailErrors];
    console.log(email)
    tempArr[id] = !validateEmail(email);
    console.log(tempArr);
    setEmailErrors(tempArr);
  }

  function validateEmail(email: string): boolean {
    const re: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
          label='Antal i Gruppen'
          type='number'
          value={groupToBeEdited ? (groupToBeEdited.groupMembers.length) : (numberOfMembers)}
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