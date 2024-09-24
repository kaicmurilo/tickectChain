import { Button, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: 8 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" gutterBottom>
          Venda de Ingressos Blockchain
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Compre ingressos de eventos de forma segura, transparente e
          descentralizada utilizando a tecnologia blockchain.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/buy-tickets")}
          sx={{ paddingX: 4, paddingY: 1, marginTop: 2 }}
        >
          Comprar Ingressos
        </Button>
      </motion.div>

      <Grid container spacing={4} sx={{ marginTop: 8 }}>
        <Grid item xs={12} md={4}>
          <InfoCard
            title="Segurança"
            value="100%"
            background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            Transações seguras e imutáveis na blockchain Ethereum.
          </InfoCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard
            title="Transparência"
            value="Total"
            background="linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
          >
            Todos os ingressos e transações são públicos e verificáveis.
          </InfoCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard
            title="Descentralização"
            value="Autônomo"
            background="linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
          >
            Nenhuma entidade central controla a venda de ingressos.
          </InfoCard>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
