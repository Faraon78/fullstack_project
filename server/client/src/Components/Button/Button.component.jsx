import React from 'react'
import Button from '@mui/material/Button'

function Buttons({ children }, props) {
    return (
        <Button variant="contained" size="large">
            {children}
        </Button>
    )
}

export default Buttons
