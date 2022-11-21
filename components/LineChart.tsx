import "chart.js/auto";
import { Line } from "react-chartjs-2";
import calculations from "../calculations/calculations";
import champStats from "../champStats/champStats.json";
import { useAppSelector } from "../hooks/preTypedHooks";

const LineChart = ({ champion }: { champion: string }) => {
  const itemTime = useAppSelector((state) => state.itemTime);
  const skillTime = useAppSelector((state) => state.skillTime);
  const spells = useAppSelector((state) => state.spells);
  const lvlUp = useAppSelector((state) => state.lvlUp);

  const dmg =
    spells[0]?.count > 1
      ? lvlUp.map((skillLvls) =>
          spells.reduce((acc, spell) => {
            console.log(spell);

            const stats = { ...champStats.Alistar.stats };
            const spellStats =
              champStats[champion].spells[spell.name][spell.section];

            return (
              acc +
              calculations({
                initialDmg: spellStats.initialDmg,
                dmgPerSkillLvl: spellStats.dmgPerSkillLvl,
                apModifier: spellStats.apModifier,
                ad: stats.attackdamage,
                count: spell.count,
                skillLvl: skillLvls[spell.name[spell.name.length - 1]],
              })
            );
          }, 0)
        )
      : 0;

  const compareNumbers = (a: number, b: number) => a - b;

  const time = itemTime.concat(skillTime).sort(compareNumbers);

  return (
    <div style={{ width: "600px" }}>
      <Line
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
    </div>
  );
};

export default LineChart;
