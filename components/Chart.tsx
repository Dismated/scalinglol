import "chart.js/auto";
import "chartjs-adapter-moment";
import { Paper, Typography } from "@mui/material";
import { Scatter } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";

import { secondsToTimer, timerToSeconds } from "../helpers/TimerConversions";
import { SpellStats } from "../types/types";
import calculations from "../calculations/calculations";
import { useAppSelector } from "../hooks/preTypedHooks";

const Chart = () => {
  const skillTime = useAppSelector((state) => state.skillTime);
  const skillTimeCopy = [...skillTime];
  const spells = useAppSelector((state) => state.spells);
  const lvlUp = useAppSelector((state) => state.lvlUp);
  const matchLength = useAppSelector((state) => state.matchLength);
  const champStats = useAppSelector((state) => state.champStats);
  const theme = useTheme();

  const dmg = lvlUp.map((skillLvls, lvl) =>
    spells.reduce((acc, spell) => {
      const statsShort = { ...champStats.stats };
      const spellStats: SpellStats =
        champStats.spells[spell.name].variant[spell.section].stats;

      return (
        acc +
        calculations({
          initialDmg: spellStats.initialDmg,
          dmgPerSkillLvl: spellStats.dmgPerSkillLvl,
          skillLvl: skillLvls[champStats.spells[spell.name].name],
          dmgPerChampLvl: spellStats.dmgPerChampLvl,
          champLvl: lvl,
          apModifier: spellStats.apModifier,
          ad: statsShort.attackdamage,
          adModifier: spellStats.adModifier,
          count: spell.count,
        })
      );
    }, 0)
  );

  const compareNumbers = (a: number, b: number) => a - b;

  const timeMs = skillTimeCopy.sort(compareNumbers);
  const time = timeMs.map((e) => e * 1000);

  return (
    <Paper
      sx={{ maxWidth: "1200px", borderRadius: [0, "30px"], pl: [0, "15px"] }}
    >
      <Typography variant="h3">Chart</Typography>
      <Scatter
        data={{
          labels: time,
          datasets: [
            {
              label: "Damage",
              data: dmg,
              stepped: "before",
              borderColor: theme.palette.primary.main,
              pointRadius: 5,
              pointBorderWidth: 4,
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                unit: "second",
                displayFormats: { second: "mm:ss" },
              },
              grid: { color: "#424242" },
              max: timerToSeconds(matchLength) * 1000,
            },
            y: { grid: { color: "#424242" }, beginAtZero: true },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (e) =>
                  `time: ${secondsToTimer(e.parsed.x / 1000)}, dmg: ${
                    e.parsed.y
                  }`,
              },
            },
          },
        }}
      />
    </Paper>
  );
};

export default Chart;
