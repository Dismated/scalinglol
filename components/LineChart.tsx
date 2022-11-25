import "chart.js/auto";
import "chartjs-adapter-moment";
import { Paper, Typography } from "@mui/material";
import { Scatter } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";

import { ChampNameType } from "../types/types";
import calculations from "../calculations/calculations";
import { secondsToTimer } from "../helpers/TimerConversions";
import stats from "../champStats/champStats.json";
import { useAppSelector } from "../hooks/preTypedHooks";

const champStats: ChampNameType = { ...stats };

const LineChart = ({ champion }: { champion: string }) => {
  const skillTime = useAppSelector((state) => state.skillTime);
  const skillTimeCopy = [...skillTime];
  const spells = useAppSelector((state) => state.spells);
  const lvlUp = useAppSelector((state) => state.lvlUp);
  const theme = useTheme();

  const filledSpellSlot = spells.find((e) => !e.name || !e.section);
  const dmg = !filledSpellSlot
    ? lvlUp.map((skillLvls) =>
        spells.reduce((acc, spell) => {
          if (!spell.name) return acc;
          const statsShort = { ...champStats[champion].stats };
          const spellStats =
            champStats[champion].spells[spell.name][spell.section];

          return (
            acc +
            calculations({
              initialDmg: spellStats.initialDmg,
              dmgPerSkillLvl: spellStats.dmgPerSkillLvl,
              apModifier: spellStats.apModifier,
              ad: statsShort.attackdamage,
              adModifier: spellStats.adModifier,
              count: spell.count,
              skillLvl: skillLvls[spell.name[spell.name.length - 1]],
            })
          );
        }, 0)
      )
    : 0;

  const compareNumbers = (a: number, b: number) => a - b;

  const timeMs = skillTimeCopy.sort(compareNumbers);
  const time = timeMs.map((e) => e * 1000);

  return (
    <Paper sx={{ maxWidth: "1200px", py: "5px", px: "10px" }}>
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
            },
            y: { grid: { color: "#424242" } },
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

export default LineChart;
