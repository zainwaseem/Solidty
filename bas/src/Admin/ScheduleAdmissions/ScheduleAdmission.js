import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { CssBaseline, AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, createTheme, ThemeProvider, Button, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ScheduleAdmissionContract from '../../contracts/ScheduleAdmissionContract';
import Web3 from 'web3';
import { Grid } from '@mui/material';

const theme = createTheme();

function ScheduleAdmission() {
  const [openingDate, setOpeningDate] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [address, setAddress] = useState('');
  const [scheduleAdmissionContract, setScheduleAdmissionContract] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isExtendDialogOpen, setIsExtendDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const scheduleAdmissionContract = await ScheduleAdmissionContract(web3Instance);

      if (scheduleAdmissionContract) {
        setAddress(storedAddress);
        setScheduleAdmissionContract(scheduleAdmissionContract);

        const dates = await scheduleAdmissionContract.methods.getAdmissionDates().call({ from: storedAddress });
        const date1 = new Date(dates[0] * 1000);
        const formattedDate1 = `${date1.getDate()}-${date1.getMonth() + 1}-${date1.getFullYear()}`;
        setOpeningDate(formattedDate1);

        const date2 = new Date(dates[1] * 1000);
        const formattedDate2 = `${date2.getDate()}-${date2.getMonth() + 1}-${date2.getFullYear()}`;
        setClosingDate(formattedDate2);
      }
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  }

  const scheduleAdmission = async (event) => {
    event.preventDefault();

    try {
      if (openingDate && closingDate) {
        const [openingDay, openingMonth, openingYear] = openingDate.split('-');
        const openingTimestamp = Math.floor(new Date(openingYear, openingMonth - 1, openingDay).getTime() / 1000);

        const [closingDay, closingMonth, closingYear] = closingDate.split('-');
        const closingTimestamp = Math.floor(new Date(closingYear, closingMonth - 1, closingDay).getTime() / 1000);

        await scheduleAdmissionContract.methods.scheduleAdmission(openingTimestamp, closingTimestamp).send({ from: address });
        toast.success("Admission scheduled successfully");
        fetchData();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const extendAdmissionDate = async () => {
    try {
      if (closingDate) {
        const [closingDay, closingMonth, closingYear] = closingDate.split('-');
        const closingTimestamp = Math.floor(new Date(closingYear, closingMonth - 1, closingDay).getTime() / 1000);

        await scheduleAdmissionContract.methods.extendAdmissionDate(closingTimestamp).send({ from: address });
        toast.success("Admission date extended successfully");
        fetchData();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEditDialogOpen = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleExtendDialogOpen = () => {
    setIsExtendDialogOpen(true);
  };

  const handleExtendDialogClose = () => {
    setIsExtendDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '25px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <Typography component="h3" variant="h4" align="center" className="text-center headings">
            Schedule Admissions
          </Typography>
          <form onSubmit={scheduleAdmission}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="opening_date"
                  name="opening_date"
                  label="Opening Date: dd-mm-yyyy"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  // value={openingDate}
                  onChange={(e) => setOpeningDate(e.target.value)}
                />
              {openingDate}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="closing_date"
                  name="closing_date"
                  label="Closing Date: dd-mm-yyyy"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(e) => setClosingDate(e.target.value)}
                  />
                  {closingDate}
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" className="btn-custom" style={{ marginTop: '6%', marginLeft: '83%' }}>
              Submit
            </Button>
          </form>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" color="secondary" onClick={handleExtendDialogOpen} style={{ marginTop: '6%' }}>
                Extend Admission Date
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Schedule</DialogTitle>
        <DialogContent>
          <form onSubmit={scheduleAdmission}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="opening_date_edit"
                  name="opening_date_edit"
                  label="Opening Date: dd-mm-yyyy"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={openingDate}
                  onChange={(e) => setOpeningDate(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="closing_date_edit"
                  name="closing_date_edit"
                  label="Closing Date: dd-mm-yyyy"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleEditDialogClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Extend Dialog */}
      <Dialog open={isExtendDialogOpen} onClose={handleExtendDialogClose}>
        <DialogTitle>Extend Admission Date</DialogTitle>
        <DialogContent>
          <form onSubmit={extendAdmissionDate}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="closing_date_extend"
                  name="closing_date_extend"
                  label="Closing Date: dd-mm-yyyy"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  // value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={handleExtendDialogClose}>Cancel</Button>
              <Button onClick={extendAdmissionDate} type="submit" variant="contained" color="primary">
                Extend
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default ScheduleAdmission;