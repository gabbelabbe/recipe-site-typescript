import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FoodItemFormType } from '../store/recipes/types';
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { RootState } from '../store';
import { LoggedInUser } from '../store/user/types';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { getISOWeek } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  linkImageGrid: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    width: 255,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  imageIcon: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: 16,
    },
  },
  fileInput: {
    display: 'none',
  },
  label: {
    color: 'white',
  },
}));

export default function FoodItemForm({
  open,
  setOpen,
  recipeInfo,
}: FoodItemFormType) {
  const classes = useStyles();
  const userState = useSelector<RootState, LoggedInUser | null>(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  let recipeRef:
    | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
    | undefined;
  const db = firestore();

  const [newFoodItem, setNewFoodItem] = useState(recipeInfo?.foodItem || '');
  const [newRecipeLink, setNewRecipeLink] = useState(
    recipeInfo?.recipeLink || ''
  );
  const [selectedDate, setSelectedDate] = useState(
    recipeInfo ? new Date(recipeInfo.date) : new Date()
  );

  const handleCreateRecipe = async () => {
    recipeRef = db.collection('recipes');

    const uuid = recipeInfo?.id || uuidv4();

    recipeRef
      .doc(uuid)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.exists) {
          recipeRef
            ?.doc(uuid)
            .set({
              foodItem: newFoodItem,
              id: uuid,
              recipeLink: newRecipeLink,
              ownerUid: userState?.uid,
              groupUid: userState?.selectedGroup,
              date: selectedDate,
              week: getISOWeek(selectedDate),
            })
            .then(() =>
              recipeRef
                ?.doc(uuid)
                .get()
                .then(async (res) => {
                  const data = await res.data();
                  if (data) {
                    dispatch({
                      type: 'ADD_RECIPE',
                      payload: { ...data, date: new Date(data.date.seconds) },
                    });
                    setOpen(false);
                  }
                })
            );
        } else {
          recipeRef?.doc(uuid).update({
            foodItem: newFoodItem,
            recipeLink: newRecipeLink,
            date: selectedDate,
            week: getISOWeek(selectedDate),
          });
        }
      });
  };

  const handleClose = async () => {
    if (recipeInfo) {
    }
    setSelectedDate(new Date());
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          style: {
            backgroundColor: '#333',
            color: '#fff',
          },
        }}
      >
        <DialogContent>
          <TextField
            margin='dense'
            id='foodItem'
            label={recipeInfo ? recipeInfo.foodItem : 'Maträtt'}
            type='text'
            fullWidth
            InputProps={{
              style: {
                color: '#fff',
              },
            }}
            onChange={(e) => {
              setNewFoodItem(e.target.value);
            }}
            InputLabelProps={{ className: classes.label }}
          />
          <div className={classes.linkImageGrid}>
            <TextField
              margin='dense'
              id='recipeLink'
              label={
                !!recipeInfo ? recipeInfo.recipeLink : 'Länk till receptet'
              }
              type='text'
              fullWidth
              style={{
                marginLeft: 0,
              }}
              InputProps={{
                style: {
                  color: '#fff',
                },
              }}
              onChange={(e) => {
                setNewRecipeLink(e.target.value);
              }}
              className={classes.input}
              InputLabelProps={{ className: classes.label }}
            />
            <Divider className={classes.divider} orientation='vertical' />
            <input
              accept='image/*'
              className={classes.fileInput}
              id='icon-button-file'
              type='file'
            />
            <label htmlFor='icon-button-file'>
              <Tooltip title='Ladda upp bild'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  className={classes.imageIcon}
                >
                  <ImageIcon style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </label>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              InputProps={{
                style: {
                  color: '#fff',
                },
              }}
              disableToolbar
              variant='inline'
              format='yyyy-MM-dd'
              margin='normal'
              id='date-picker-inline'
              allowKeyboardControl={true}
              value={selectedDate}
              onChange={(newDate) => {
                setSelectedDate(new Date(newDate!));
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                style: {
                  color: '#fff',
                },
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setSelectedDate(new Date());
            }}
            style={{ color: '#fff' }}
          >
            Avbryt
          </Button>
          <Button onClick={handleCreateRecipe} style={{ color: '#fff' }}>
            {!!recipeInfo ? 'Uppdatera Recept' : 'Skapa Recept'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
