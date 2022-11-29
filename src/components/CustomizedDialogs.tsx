import * as React from "react";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Collapse,
  Alert,
  Box,
  TextField,
  Avatar,
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { convertBase64 } from "../util/ConvertBase64";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
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

export default function CustomizedDialogs({
  open,
  setOpen,
}: {
  open: any;
  setOpen: Function;
}) {
  const [data, setData] = React.useState({ base64: "", nom: "", prenom: "" });
  const [alert, setAlert] = React.useState(false);
  const [validation, setValidation] = React.useState({
    nom: false,
    prenom: false,
  });

  const handleClose = () => {
    setOpen(false);
    setData((data) => ({ ...data, base64: "" }));
    setValidation({ nom: false, prenom: false });
  };

  const onsubmit = () => {
    if (data.nom === "" || data.prenom === "") {
      if (data.nom === "") {
        setValidation((validation) => ({ ...validation, nom: true }));
      }
      if (data.prenom === "") {
        setValidation((validation) => ({ ...validation, prenom: true }));
      }
    } else {
      axiosInstance
        .post(`users/${data.nom}/${data.prenom}`, {
          img: data.base64,
        })
        .then(() => {
          handleClose();
          window.location.reload();
        })
        .catch((_err) => {
            
          if (_err.response.data.statusCode === 401) {
            setTimeout(() => {
                Cookies.remove("access_token");
                window.location.reload();
            }, 3000);
          }
          setAlert(true);
        });
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        onKeyUp={(e) => {
          const ENTER = 13;

          if (e.keyCode === ENTER) {
            onsubmit();
          }
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Ajouter un utilisateur
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-required"
              label="Nom"
              error={validation.nom}
              onChange={(event: any) => {
                const val = event.target.value;
                if (val !== "") {
                  setData((data) => ({ ...data, nom: val }));
                  setValidation((validation) => ({
                    ...validation,
                    nom: false,
                  }));
                } else {
                  setData((data) => ({ ...data, nom: val }));
                  setValidation((validation) => ({ ...validation, nom: true }));
                }
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Prénom"
              error={validation.prenom}
              onChange={(event: any) => {
                const val = event.target.value;
                if (val !== "") {
                  setData((data) => ({ ...data, prenom: val }));
                  setValidation((validation) => ({
                    ...validation,
                    prenom: false,
                  }));
                } else {
                  setData((data) => ({ ...data, prenom: val }));
                  setValidation((validation) => ({
                    ...validation,
                    prenom: true,
                  }));
                }
              }}
            />
            <div style={{ marginLeft: 8 }}>
              <Button variant="outlined" component="label">
                Télécharger Image
                <input
                  type="file"
                  hidden
                  accept="image/png, image/jpeg"
                  id="selectAvatar"
                  onChange={async (event: any) => {
                    var base64 = await convertBase64(event.target.files[0]);
                    if (base64) {
                      setData((data) => ({ ...data, base64: base64 }));
                    }
                  }}
                />
              </Button>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <h6>Image a télécharger:</h6>
                    <Avatar id="avatar" src={data.base64} />
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Collapse in={alert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Une erreur est survenue
            </Alert>
          </Collapse>
          <Button
            variant="contained"
            type="submit"
            autoFocus
            onClick={onsubmit}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
