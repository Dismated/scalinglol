import 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Paper } from '@mui/material';
import { Scatter } from 'react-chartjs-2';

const PaperStyles = {
    maxWidth: '1200px',
    borderRadius: [0, '30px'],
    pl: [0, '15px'],
    pt: '5px',
};

const GoldGraph = ({
    goldB,
    goldR,
}: {
    goldB: [string, string][];
    goldR: [string, string][];
}) => {
    const diff = goldB.map((sec: [string, string], i: number) => [
        sec[0],
        parseInt(sec[1], 10) - parseInt(goldR[i][1], 10),
    ]);

    return (
        <Paper sx={PaperStyles}>
            <Scatter
                data={{
                    datasets: [
                        {
                            label: 'diff in gold',
                            data: diff,
                            stepped: 'before',
                            borderColor: 'blue',
                            pointRadius: 1,
                            pointBorderWidth: 1,
                            borderWidth: 1,
                        },
                    ],
                }}
            />
        </Paper>
    );
};

export default GoldGraph;
