import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { Group } from '../store/user/types';
import { GroupsListProps } from '../store/user/types';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Card from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';
import CardContent from '@material-ui/core/CardContent';
import GroupForm from './GroupForm';

const useStyles = makeStyles((theme) => ({
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
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function GroupsList({ open, setOpen }: GroupsListProps) {
  const groupsState = useSelector<RootState, Group[] | null>(
    (state: RootState) => state.groups
  );

  const classes = useStyles();

  const [groupCards, setGroupCards] = useState<JSX.Element[]>([]);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [groupToBeEdited, setGroupToBeEdited] = useState<null | Group>(null);

  const generateGroupCards = () => {
    let tempArr: JSX.Element[] = [];

    for (let i = 0; i < groupsState!.length; i++) {
      tempArr.push(
        <Card key={groupsState![i].uid}>
          <CardContent className={classes.cardContent}>
            <Typography>{groupsState![i].groupName}</Typography>
            <Typography>
              Member count: {groupsState![i].groupMembers.length}
            </Typography>
          </CardContent>
          <IconButton
            onClick={() => {
              setShowCreateGroupForm(true);
              setGroupToBeEdited(groupsState![i]);
            }}
          >
            <EditIcon />
          </IconButton>
        </Card>
      );
    }

    setGroupCards(tempArr);
  };

  useEffect(() => {
    if (groupsState) {
      generateGroupCards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupsState]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setShowCreateGroupForm(false);
      }}
      aria-labelledby='form-dialog-title'
      PaperProps={{
        style: {
          backgroundColor: '#333',
          color: '#fff',
        },
      }}
      maxWidth='sm'
      fullWidth
    >
      {showCreateGroupForm ? (
        <GroupForm
          setShowCreateGroupForm={setShowCreateGroupForm}
          groupToBeEdited={groupToBeEdited}
        />
      ) : (
        <div>
          <DialogContent>
            {groupsState ? (
              groupCards
            ) : (
              <Typography variant='h6'>You have no groups</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
              classes={{ root: classes.root }}
              className={classes.button}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={() => setShowCreateGroupForm(true)}
              classes={{ root: classes.root }}
              className={classes.button}
            >
              <AddCircleOutlinedIcon />
            </IconButton>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}
