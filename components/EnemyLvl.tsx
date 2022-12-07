import { Paper, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import MultiNodeSlider from "./MultiNodeSlider";

const EnemyLvl = () => {
  const { t } = useTranslation("common");
  return (
    <Paper sx={{ pt: "5px" }}>
      <Typography
        variant="h4"
        sx={{
          color: "primary.main",
        }}
      >
        {t("champPage.enemyContainer.header")}
      </Typography>
      <MultiNodeSlider nodeOptions="enemy" />
    </Paper>
  );
};

export default EnemyLvl;
