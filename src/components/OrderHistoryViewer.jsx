import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TableCell, TableRow } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Checkbox from '@mui/material/Checkbox';
import { UpdateCart } from "../context/updateCart";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const api = axios.create({
  baseURL: "https://ayshadashboard.com/api",
})

export default function CustomizedDialogs({
  id,
  date,
  items,
  price,
  state,
  products,
  userId
}) {
  const [open, setOpen] = React.useState(false);
  const { updateCart, setUpdateCart } = React.useContext(UpdateCart);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [ checklist , setChecklist]  = React.useState(new Array(products.length))
  React.useEffect(()=>{
    setChecklist(checklist.fill(true,0))
  },[])
  const handleAddToCart = () => {
    setOpen(false);
    for (let p = 0; p < products.length; p++) {
      if(checklist[p]){

      var cartFormData = new FormData();
      cartFormData.append("id_client", userId);
      cartFormData.append("id_product", products[p].id_product);
      cartFormData.append("quantity", products[p].quantity);
      cartFormData.append("unite", products[p].unite);
      api({
        method: "post",
        url: "cart-new",
        data: cartFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          setUpdateCart((p) => p + 1);
        })
      } 
    }
  }
  return (
    <>
      <TableRow
        className="hover:bg-gray-100 cursor-pointer "
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        onClick={handleClickOpen}
      >
        <TableCell>{id}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{items}</TableCell>
        <TableCell>{price} MAD</TableCell>
        <TableCell>
          <span className="px-2 py-1 bg-green-500 text-white rounded-full">
            {state}
          </span>
        </TableCell>
      </TableRow>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Order details
        </BootstrapDialogTitle>
        <TableContainer checkboxSelection>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead className="">
              <TableRow className="bg-gray-100">
                <TableCell>
                </TableCell>
                <TableCell>image</TableCell>
                <TableCell>name</TableCell>
                <TableCell>quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, key) => {
                return (
                  <TableRow key={key}>
                    <TableCell>
                      <Checkbox onClick={()=>{let a = [...checklist]; a[key]=!a[key] ; setChecklist([...a]) ; }} checked={checklist[key]} />
                    </TableCell>
                    <TableCell>
                      <img
                        className="w-10 h-10 object-fit"
                        src={
                          "https://ayshadashboard.com/" + product.product.image
                        }
                        alt=""
                      />
                    </TableCell>
                    <TableCell>{product.product.title}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.product.price} MAD</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogContent dividers>
          <p>Total Price</p>
          <span className="text-4xl">{price} MAD</span>
        </DialogContent>

        <DialogActions>
          <button className="button bg-gray-300" onClick={handleClose}>
            close
          </button>
          <button
            className="button bg-prime text-white "
            onClick={handleAddToCart}
          >
            add to cart
          </button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
