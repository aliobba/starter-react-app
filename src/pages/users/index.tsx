import * as React from "react";

import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconLabelButtons from "../../components/Button";
import CustomizedDialogs from "../../components/CustomizedDialogs";
import axiosInstance from "../../api/axiosInstance";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Users() {
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axiosInstance.get('users/')
    .then(
      (res) => {
        setUsers(res.data)
      }
    )
    .catch(
      (_err) => {
        console.log({_err});
      }
      )
  }, [])
  

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography textAlign={"center"} variant="h2">
          Gestion des utilisateurs
        </Typography>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyItems="center"
          alignContent="center"
          justifyContent="center"
          style={{ minHeight: "80vh" }}
        >
          <Grid item xs={"auto"} md={6} lg={"auto"}>
            <IconLabelButtons
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Ajouter <br /> utilisateur
            </IconLabelButtons>
          </Grid>
          <Grid item xs={9} md={6} lg={9}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell /* align="right" */>Avatar</TableCell>
                    {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.map((row: any, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.nom}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row?.prenom}
                      </TableCell>
                      <TableCell>
                        <div style={{ justifySelf: "right" }}>
                          <Avatar id="avatar" src={row?.img} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <CustomizedDialogs open={open} setOpen={setOpen} />
      </Grid>
    </Container>
  );
}
