import "chart.js/auto";
import { Paper, Typography } from "@mui/material";
import { Scatter } from "react-chartjs-2";

import { ChampNameType } from "../types/types";
import calculations from "../calculations/calculations";
import stats from "../champStats/champStats.json";
import { useAppSelector } from "../hooks/preTypedHooks";

const champStats: ChampNameType = { ...stats };

const LineChart = ({ champion }: { champion: string }) => {
  const skillTime = useAppSelector((state) => state.skillTime);
  const skillTimeCopy = [...skillTime];
  const spells = useAppSelector((state) => state.spells);
  const lvlUp = useAppSelector((state) => state.lvlUp);

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

  const time = skillTimeCopy.sort(compareNumbers);
  console.log(typeof time[0]);

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
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{ scales: { x: { min: 0, max: 2700 } } }}
      />
    </Paper>
  );
};

export default LineChart;
