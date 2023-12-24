import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

interface MultiLineProps {
    data: {
        width: number;
        height: number;
        marginTop: number;
        marginBottom: number;
        marginLeft: number;
        marginRight: number;
        team: {
            blue: string;
            red: string;
            winner: string;
            match: number;
            goldB: [number, number][];
            goldR: [number, number][];
        }[];
    };
}

const MultiLine = ({ data }: MultiLineProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const {
        width,
        height,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        team,
    } = data;

    const combined = team.reduce(
        (
            acc: {
                time: number;
                gold: number;
                z: { color: string; match: string };
            }[],
            matchData,
        ) => {
            matchData.goldB.forEach((e, i) => {
                console.log(
                    e[1],
                    matchData.goldR[i][1],
                    e[1] - matchData.goldR[i][1],
                );
                acc.push({
                    time: e[0],
                    gold: e[1] - matchData.goldR[i][1],
                    z: {
                        color:
                            matchData.winner === matchData.blue
                                ? 'blue'
                                : 'red',
                        match: `${matchData.blue} vs ${matchData.red} (${matchData.match})`,
                    },
                });
            });
            return acc;
        },
        [],
    );

    useEffect(() => {
        const x = d3
            .scaleLinear()
            .domain([0, d3.max(combined, (d) => d.time) as number])
            .range([marginLeft, width - marginRight]);
        const y = d3
            .scaleLinear()
            .domain(d3.extent(combined, (d) => d.gold) as [number, number])
            .nice()
            .range([height - marginBottom, marginTop]);
        const svg = d3
            .select(svgRef.current)
            .attr('width', data.width)
            .attr('height', data.height)
            .attr('viewBox', [0, 0, data.width, data.height])
            .attr(
                'style',
                'max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;',
            );

        svg.append('g')
            .attr('class', 'x axis-grid')
            .attr('transform', `translate(0,${height - marginBottom})`)
            .call(
                d3
                    .axisBottom(x)
                    .tickSize(-height + marginBottom)
                    .tickSizeOuter(0)
                    .tickFormat('')
                    .ticks(10),
            )
            .selectAll('.tick line')
            .style('stroke', '#424242');

        svg.append('g')
            .attr('class', 'y axis-grid')
            .attr('transform', `translate(${marginLeft},0)`)
            .call(
                d3
                    .axisLeft(y)
                    .tickSize(-width + marginRight + marginRight)
                    .tickSizeOuter(0)
                    .tickFormat('')
                    .ticks(10),
            )
            .selectAll('.tick line')
            .style('stroke', '#424242');

        svg.append('g')
            .attr('transform', `translate(0,${height - marginBottom})`)
            .call(
                d3
                    .axisBottom(x)
                    .ticks(width / 80)
                    .tickSizeOuter(0),
            );

        svg.append('g')
            .attr('transform', `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y))
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .append('text')
                    .attr('x', -marginLeft)
                    .attr('y', 10)
                    .attr('fill', 'currentColor')
                    .attr('text-anchor', 'start')
                    .text('↑ Unemployment (%)'),
            );

        const points: Iterable<
            [number, number, z: { color: string; match: string }]
        > = combined.map((d) => [x(d.time), y(d.gold), d.z]);
        const groups = d3.rollup(
            points,
            (v) => Object.assign(v, { z: v[0][2] }),
            (d) => d[2].match,
        );

        const databs: ((string | number)[][] & {
            z: { color: string; match: string };
        })[] = Array.from(groups.values());
        const line = d3
            .line<[number, number]>()
            .x((d) => d[0])
            .y((d) => d[1]);

        const path = svg
            .append('g')
            .attr('fill', 'none')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .selectAll('path')
            .data(databs)
            .join('path')
            .style('mix-blend-mode', 'multiply')
            .attr('d', (d) => line(d))
            .attr('stroke', (d) => d.z.color);

        const dot = svg.append('g').attr('display', 'none');

        dot.append('circle').attr('r', 2.5);

        dot.append('text').attr('text-anchor', 'middle').attr('y', -8);

        const pointermoved = (event) => {
            const [xm, ym] = d3.pointer(event);
            const i = d3.leastIndex(points, ([xPoint, yPoint]) =>
                Math.hypot(xPoint - xm, yPoint - ym),
            );
            const [xo, yo, k] = points[i];
            path.style('stroke', null).style('mix-blend-mode', ({ z }) =>
                z.match === k.match ? null : 'multiply',
            );

            dot.attr('transform', `translate(${xo},${yo})`);
            dot.select('text').text(k.match).attr('fill', 'white');
            svg.property('value', combined[i]).dispatch('input', {
                bubbles: true,
            });
        };

        const pointerentered = () => {
            path.style('mix-blend-mode', '').style('stroke', '#ddd');
            dot.attr('display', null);
        };

        const pointerleft = () => {
            path.style('mix-blend-mode', 'multiply').style('stroke', null);
            dot.attr('display', 'none');
            svg.node().value = null;
            svg.dispatch('input', { bubbles: true });
        };

        svg.on('pointerenter', pointerentered)
            .on('pointermove', pointermoved)
            .on('pointerleave', pointerleft)
            .on('touchstart', (event) => event.preventDefault());
    });
    return <svg ref={svgRef} />;
};

export default MultiLine;
