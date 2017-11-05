/* @flow */
import React from 'react';
import type { AppState, AppContext } from '../../../type.js';
import Chart from 'chart.js';
import randomColor from 'randomcolor';

type Props = {
  state: AppState,
  context: AppContext
}

export default class ReportChart extends React.Component<Props> {

  _chart: Chart

  render() {
    const { ranks } = this.props.state.report;

    const rows = ranks.map((r, i) => {
      return (
        <tr key={i}>
          <td>{r.category}</td>
          <td className="col-count">{r.count}</td>
        </tr>
      );
    });
    return(
      <div className="report-chart">
        <div>
          <canvas ref="chartArea" />
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Web Site</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    const { ranks } = this.props.state.report;
    const ctx = this.refs.chartArea.getContext('2d');

    const BASE_COLORS = [
      'red',
      'green',
      'yellow',
      'blue',
      'pink',
      'purple',
      'orange'
      //'rgb(255, 99, 132)',
      //'rgb(255, 159, 64)',
      //'rgb(255, 205, 86)',
      //'rgb(75, 192, 192)',
      //'rgb(54, 162, 235)',
      //'rgb(153, 102, 255)',
      //'rgb(201, 203, 207)'
    ];
    const BASE_COLORS_LENGTH = BASE_COLORS.length;

    const colors = [];

    for (let i = 0; i< 255; i++) {
      colors.push(randomColor({ seed: i + 1, luminosity: 'bright', hue: BASE_COLORS[i % BASE_COLORS_LENGTH] }));
    }

    this._chart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: ranks.map(r => r.count),
          backgroundColor: colors,
          label: 'Dataset 1'
        }],
        labels: ranks.map(r => r.category)
      },
      options: {
        responsive: true
      }
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    const { ranks } = nextProps.state.report;
    this._chart.data.datasets[0].data = ranks.map(r => r.count);
    this._chart.data.labels = ranks.map(r => r.category);
    this._chart.update();
  }

  componentWillUnmount() {
    this._chart.destroy();
    this._chart = null;
  }
}
