import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function InfoCard({ title, value, background, color, children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        sx={{
          padding: 2,
          background: background || "background.paper",
          color: color || "text.primary",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom color={color || "text.primary"}>
            {title}
          </Typography>
          {value && (
            <Typography
              variant="h3"
              color={color || "primary"}
              sx={{
                wordBreak: "break-all",
                mb: children ? 1 : 0,
              }}
            >
              {value}
            </Typography>
          )}
          {children && (
            <Typography variant="body1" color={color || "text.secondary"}>
              {children}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default InfoCard;
