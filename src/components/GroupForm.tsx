import React, { useState } from 'react';
import { firestore } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { User, LoggedInUser } from '../store/user/types';
import { RootState } from '../store/index';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { GroupsFormProps } from '../store/user/types';
import IconButton from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as EmailValidator from 'email-validator';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  input: {
    color: 'white',
  },
  inputOtherMembers: {
    marginLeft: theme.spacing(1),
    flex: 1,
    '&::placeholder': {
      color: 'white',
    },
    color: 'white',
  },
  root: {
    Width: 35,
    height: 35,
    minWidth: 35,
    marginLeft: 0,
  },
  button: {
    width: 24,
    color: 'white',
  },
  autocomplete: {
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    width: 255,
  },
  label: {
    color: 'white',
  },
  helperText: {
    color: 'white',
  },
  divider: {
    height: 28,
    margin: 4,
  },
  rootInputOtherMembers: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: 'transparent',
  },
}));

export default function GroupForm({
  setShowCreateGroupForm,
  groupToBeEdited,
}: GroupsFormProps) {
  const userState = useSelector<RootState, LoggedInUser | null>(
    (state: RootState) => state.user
  );
  let userRef:
    | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    | undefined;
  let groupRef:
    | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    | undefined;
  const db = firestore();

  const dispatch = useDispatch();

  const classes = useStyles();
  const [groupName, setGroupName] = useState(groupToBeEdited?.groupName || '');
  const [groupMembers, setGroupMembers] = useState<User[]>(
    groupToBeEdited?.groupMembers || [{ email: '', uid: '' }]
  );

  const handleEmailChange = (email: string, index: number) => {
    const tempGroupMembers = [...groupMembers];
    tempGroupMembers[index] = { email: email, uid: '' };
    if (EmailValidator.validate(email) && userState!.email !== email) {
      userRef = db.collection('users');

      userRef
        ?.where('email', '==', email)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            tempGroupMembers[index].uid = querySnapshot.docs[0].data().uid;
          }
        });
    }
    setGroupMembers(tempGroupMembers);
  };

  const handleRemoveClick = (index: number) => {
    const list = [...groupMembers];
    list.splice(index, 1);
    setGroupMembers(list);
  };

  const handleCreateGroup = () => {
    groupRef = db.collection('groups');

    const uuid = groupToBeEdited?.uid || uuidv4();

    groupRef
      .doc(uuid)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.exists) {
          groupRef
            ?.doc(uuid)
            .set({
              uid: uuid,
              groupName,
              groupMembers: [
                ...groupMembers,
                { email: userState?.email, uid: userState?.uid },
              ],
            })
            .then(() =>
              groupRef
                ?.doc(uuid)
                .get()
                .then(async (res) => {
                  const data = await res.data();
                  if (data) {
                    dispatch({
                      type: 'ADD_GROUP',
                      payload: data,
                    });
                    setShowCreateGroupForm(false);
                  }
                })
            );
        } /* else {
          groupRef?.doc(uuid).update({
            foodItem: newFoodItem,
            recipeLink: newRecipeLink,
            date: selectedDate,
            week: getISOWeek(selectedDate),
          });
        } */
      });
  };

  return (
    <div>
      <DialogContent>
        <TextField
          margin='dense'
          id='groupName'
          label={groupToBeEdited ? groupToBeEdited.groupName : 'Group name'}
          type='text'
          fullWidth
          InputProps={{
            style: {
              color: '#fff',
            },
          }}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          InputLabelProps={{ className: classes.label }}
        />
        <Typography style={{ paddingTop: 5 }}>
          People you want to invite:
        </Typography>
        {groupMembers.map((member, i) => {
          return (
            <Paper
              component='form'
              className={classes.rootInputOtherMembers}
              key={i}
              elevation={0}
            >
              <InputBase
                className={classes.inputOtherMembers}
                id={`${i}`}
                placeholder={member.email ? member.email : 'Email'}
                margin='dense'
                type='text'
                value={member.email}
                onChange={(e) => handleEmailChange(e.target.value, i)}
              />
              <Divider className={classes.divider} orientation='vertical' />
              <IconButton
                color='primary'
                className={classes.button}
                aria-label='directions'
                onClick={() => handleRemoveClick(i)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          );
        })}
        <Button
          onClick={() =>
            setGroupMembers([...groupMembers, { email: '', uid: '' }])
          }
          style={{
            backgroundColor: 'green',
            marginTop: 5,
          }}
        >
          <AddIcon />
        </Button>
      </DialogContent>
      <DialogActions>
        <IconButton
          onClick={() => setShowCreateGroupForm(false)}
          classes={{ root: classes.root }}
          className={classes.button}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          onClick={() => handleCreateGroup()}
          classes={{ root: classes.root }}
          className={classes.button}
        >
          <AddCircleOutlinedIcon />
        </IconButton>
      </DialogActions>
    </div>
  );
}
