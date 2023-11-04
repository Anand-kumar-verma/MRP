import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
const Loding = () => {


  return (

    <Dialog
    open={true}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    
    <DialogContent>
    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </DialogContent>
    
  </Dialog>
    
  )
}

export default Loding