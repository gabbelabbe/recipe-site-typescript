import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { 
  MuiPickersUtilsProvider, 
  KeyboardDatePicker  
} from '@material-ui/pickers';
import { FoodItemFormType } from '../store/recipes/types';
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  linkImageGrid: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    width: 255
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
    color: 'white'
  }
}));

export default function FoodItemForm({ open, setOpen, recipeInfo }: FoodItemFormType) {
  const classes = useStyles();

  const [newFoodItem, setNewFoodItem] = useState('');
  const [newRecipeLink, setNewRecipeLink] = useState('');
  const [selectedDate, setSelectedDate] = useState(recipeInfo ? (new Date(recipeInfo.date)) : (new Date()));
  
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
            color: '#fff'
          }
        }}
      >
        <DialogContent>
          <TextField
            margin='dense'
            id='foodItem'
            label={recipeInfo ? (recipeInfo.foodItem) : ('Maträtt')}
            type='text'
            fullWidth
            InputProps={{
              style: {
                color: '#fff'
              }
            }}
            onChange={(e) => {
              setNewFoodItem(e.target.value);
            }}
            InputLabelProps={{className: classes.label}}
          />
          <div className={classes.linkImageGrid}>
            <TextField
              margin='dense'
              id='recipeLink'
              label={!!recipeInfo ? (recipeInfo.recipeLink) : ('Länk till receptet')}
              type='text'
              fullWidth
              style={{
                marginLeft: 0
              }}
              InputProps={{
                style: {
                  color: '#fff',
                }
              }}
              onChange={(e) => {
                setNewRecipeLink(e.target.value);
              }}
              className={classes.input}
              InputLabelProps={{className: classes.label}}
            />
            <Divider className={classes.divider} orientation='vertical' />
            <input accept='image/*' className={classes.fileInput} id='icon-button-file' type='file' />
            <label htmlFor='icon-button-file'>
              <Tooltip title='Ladda upp bild'>
                <IconButton color='primary' aria-label='upload picture' component='span' className={classes.imageIcon}>
                  <ImageIcon style={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </label>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
              InputProps={{
                style: {
                  color: '#fff'
                }
              }}
              disableToolbar
              variant='inline'
              format='yyyy-MM-dd'
              margin='normal'
              id='date-picker-inline'
              allowKeyboardControl={true}
              value={selectedDate}
              onChange={(newDate) => {setSelectedDate(new Date(newDate!))}}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                style: {
                  color: '#fff',
                }
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
            style={{color: '#fff'}}
          >
            Avbryt
          </Button>
          <Button onClick={handleClose} style={{color: '#fff'}}>
            {!!recipeInfo ? ('Uppdatera Recept') : ('Skapa Recept')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
