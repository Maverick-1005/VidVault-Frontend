import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const PlaylistDialog = ({ open, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // You can add additional logic here, like saving to a specific playlist
  };

  const playlistOptions = [
    'Watch Later',
    'TimePass',
    '90s',
    'Soothing...!',
    'DHH',
    'gOLD',
    'Bhajan',
    'New playlist',
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-xl font-bold">Save video to...</DialogTitle>
      <DialogContent>
        <List>
          {playlistOptions.map((option) => (
            <ListItem
              button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`hover:bg-gray-100 ${
                selectedOption === option ? 'bg-gray-200' : ''
              }`}
            >
              <ListItemText primary={option} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaylistDialog;