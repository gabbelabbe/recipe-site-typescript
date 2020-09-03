import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { GroupsFormProps } from '../store/user/types';

export default function GroupForm({ setShowCreateGroupForm, groupToBeEdited }: GroupsFormProps) {
  return (
    <div>
      <DialogContent>
      <TextField
            margin='dense'
            id='foodItem'
            placeholder={groupToBeEdited ? (groupToBeEdited.groupName) : ('Namn på Gruppen')}
            type='text'
            fullWidth
            InputProps={{
              style: {
                color: '#fff'
              }
            }}
            onChange={(e) => {

            }}
          />
      </DialogContent>
    </div>
  )
}