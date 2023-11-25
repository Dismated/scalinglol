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
        voronoi: boolean;
        team: {
            blue: string;
            red: string;
            goldB: [number, number][];
            goldR: [number, number][];
        }[];
    };
}

const MultiLine = ({ data }: MultiLineProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const combined = data.team.reduce(
        (acc: { match: string; time: number; gold: number }[], matchData) => {
            matchData.goldB.forEach((e, i) => {
                console.log(matchData);

                acc.push({
                    match: `${matchData.blue} vs ${matchData.red}`,
                    time: e[0],
                    gold: e[1] - matchData.goldR[i][1],
                });
            });
            return acc;
        },
        [],
    );
    console.log(combined);

    const convertedData: { value: number }[] = combined.map(
        (e): { value: number }[] => ({
            value: e[0] !== undefined ? e[0] : 0, // Or handle undefined in a way that makes sense for your data
        }),
    );

    useEffect(() => {
        const x = d3
            .scaleLinear()
            .domain(d3.extent(combined, (d) => d.time))
            .range([marginLeft, width - marginRight]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(unemployment, (d) => d.unemployment)])
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
            .attr(
                'transform',
                `translate(0,${data.height - data.marginBottom})`,
            )
            .call(
                d3
                    .axisBottom(x)
                    .ticks(data.width / 80)
                    .tickSizeOuter(0),
            );

        svg.append('g')
            .attr('transform', `translate(${data.marginLeft},0)`)
            .call(d3.axisLeft(y))
            .call((g) => g.select('.domain').remove())
            .call(
                data.voronoi
                    ? () => {}
                    : (g) =>
                          g
                              .selectAll('.tick line')
                              .clone()
                              .attr(
                                  'x2',
                                  data.width -
                                      data.marginLeft -
                                      data.marginRight,
                              )
                              .attr('stroke-opacity', 0.1),
            )
            .call((g) =>
                g
                    .append('text')
                    .attr('x', -data.marginLeft)
                    .attr('y', 10)
                    .attr('fill', 'currentColor')
                    .attr('text-anchor', 'start')
                    .text('↑ Unemployment (%)'),
            );
    });
    return <svg ref={svgRef} />;
};

export default MultiLine;
