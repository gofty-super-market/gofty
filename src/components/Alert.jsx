import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CartContext } from '../context/cartContext';

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const { cart, setCart } = useContext(CartContext)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handelClean = () => {
        setCart([])
    }

    return (
        <div>
            <button onClick={handleClickOpen} className='button bg-gray-800 ease-in-out duration-200 text-white flex items-center justify-center gap-2 hover:bg-red-500'>
                Clear cart <DeleteRoundedIcon />
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='rounded-3xl'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to clean cart? "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        if you clean the cart u will never get it back
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="button bg-gray-300 text-black ">
                        Disagree
                    </button>
                    <button onClick={() => { handleClose(); handelClean() }} className="button bg-red-500 text-white ">
                        Agree
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}




