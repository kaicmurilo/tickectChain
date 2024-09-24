import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import TicketSaleContract from "../contracts/TicketSale.json";
import getWeb3 from "../utils/getWeb3";

function BuyTickets() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [ticketsAvailable, setTicketsAvailable] = useState(0);
  const [ticketPrice, setTicketPrice] = useState("0");
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [ticketsOwned, setTicketsOwned] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Selecionar Ingressos", "Confirmar Compra", "Finalizar"];

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = TicketSaleContract.networks[networkId];
        if (!deployedNetwork) {
          throw new Error("Contrato não implantado na rede selecionada");
        }
        const instance = new web3Instance.eth.Contract(
          TicketSaleContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setContract(instance);

        const tickets = await instance.methods.ticketsAvailable().call();
        const price = await instance.methods.ticketPrice().call();
        const owned = await instance.methods.ticketsOwned(accounts[0]).call();

        setTicketsAvailable(tickets);
        setTicketPrice(web3Instance.utils.fromWei(price, "ether"));
        setTicketsOwned(owned);
      } catch (error) {
        console.error("Erro ao conectar ao contrato:", error);
        setNotification({
          open: true,
          message: "Falha ao conectar ao MetaMask ou ao contrato.",
          severity: "error",
        });
      }
    };
    init();
  }, []);

  const handleBuyTickets = async () => {
    if (amount < 1) {
      setNotification({
        open: true,
        message: "A quantidade mínima é 1 ingresso.",
        severity: "warning",
      });
      return;
    }
    if (amount > ticketsAvailable) {
      setNotification({
        open: true,
        message: "Quantidade excede ingressos disponíveis.",
        severity: "warning",
      });
      return;
    }
    setLoading(true);
    try {
      const value = web3.utils.toWei(
        (amount * parseFloat(ticketPrice)).toString(),
        "ether"
      );
      await contract.methods.buyTickets(amount).send({
        from: account,
        value,
      });
      const tickets = await contract.methods.ticketsAvailable().call();
      const owned = await contract.methods.ticketsOwned(account).call();
      setTicketsAvailable(tickets);
      setTicketsOwned(owned);
      setNotification({
        open: true,
        message: "Ingressos comprados com sucesso!",
        severity: "success",
      });
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao comprar ingressos:", error);
      setNotification({
        open: true,
        message: "Falha na compra dos ingressos.",
        severity: "error",
      });
    }
    setLoading(false);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmBuy = async () => {
    setOpenDialog(false);
    await handleBuyTickets();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 8 }}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" gutterBottom>
          Comprar Ingressos
        </Typography>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ marginBottom: 4 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <InfoCard
              title="Ingressos Disponíveis"
              value={ticketsAvailable}
              color="white"
              background="linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
            >
              <Typography variant="h6" color="white">
                Preço por ingresso: {ticketPrice} ETH
              </Typography>
            </InfoCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <InfoCard
              title="Comprar Ingressos"
              value=""
              color="black"
              background="linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
            >
              <Tooltip title="Digite a quantidade de ingressos que deseja comprar">
                <TextField
                  label="Quantidade"
                  type="number"
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                  inputProps={{ min: 1, max: ticketsAvailable }}
                  margin="normal"
                />
              </Tooltip>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleOpenDialog}
                disabled={loading}
                sx={{ marginTop: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Comprar"
                )}
              </Button>
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Você possui: {ticketsOwned} ingresso(s)
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
        </Grid>
      </motion.div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Compra</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você está prestes a comprar {amount} ingresso(s) por{" "}
            {amount * parseFloat(ticketPrice)} ETH. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmBuy} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BuyTickets;
