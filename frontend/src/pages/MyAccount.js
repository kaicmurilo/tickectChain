import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import { Web3Context } from "../context/Web3Context";

function shortenAddress(address) {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}

function MyAccount() {
  const {
    web3,
    account,
    contract,
    loading: web3Loading,
    notification,
    setNotification,
  } = useContext(Web3Context);
  const [ticketsOwned, setTicketsOwned] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (contract && account && web3) {
        try {
          const tickets = await contract.methods.ticketsOwned(account).call();

          setTicketsOwned(tickets);

          const balanceWei = await web3.eth.getBalance(account);
          const balanceEth = web3.utils.fromWei(balanceWei, "ether");

          setBalance(balanceEth);

          const pastEvents = await contract.getPastEvents("TicketPurchased", {
            filter: { buyer: account },
            fromBlock: 0,
            toBlock: "latest",
          });

          setTransactions(pastEvents);
        } catch (error) {
          setNotification({
            open: true,
            message: "Erro ao buscar dados da conta.",
            severity: "error",
          });
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [contract, account, web3, setNotification]);

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  if (web3Loading || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 8, marginBottom: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" gutterBottom>
          Minha Conta
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <InfoCard
              title="Endereço da Conta"
              value={
                <Tooltip title={account}>
                  <span>{shortenAddress(account)}</span>
                </Tooltip>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoCard title="Saldo" value={`${balance} ETH`}>
              Transações seguras e imutáveis na blockchain Ethereum.
            </InfoCard>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoCard title="Ingressos Possuídos" value={ticketsOwned} />
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ padding: 2, backgroundColor: "background.paper" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="text.primary">
                  Histórico de Transações
                </Typography>
                {transactions.length > 0 ? (
                  <List>
                    {transactions.map((tx, index) => (
                      <ListItem key={index} divider>
                        <ListItemText
                          primary={`Compra de ${tx.returnValues.amount} ingresso(s)`}
                          secondary={`Tx Hash: ${tx.transactionHash.substring(
                            0,
                            6
                          )}...${tx.transactionHash.substring(
                            tx.transactionHash.length - 4
                          )}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Nenhuma transação encontrada.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>

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

export default MyAccount;
