import React from 'react';
import { Button } from '@mui/material';

function AnswerOption({ option, onSelect, disabled, isSelected }) {
  return (
    <Button
      fullWidth
      variant={isSelected ? 'contained' : 'outlined'}
      color={isSelected ? 'primary' : 'secondary'}
      onClick={onSelect}
      disabled={disabled}
    >
      {option}
    </Button>
  );
}

export default AnswerOption;