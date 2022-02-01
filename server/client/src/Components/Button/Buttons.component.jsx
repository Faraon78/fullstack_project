import React from 'react';
import Button from '@mui/material/Button';


function Buttons({children}) {
  
  return (
    <Button variant="contained" size ="large">
        {children}
    </Button>
  );
}

export default Buttons;