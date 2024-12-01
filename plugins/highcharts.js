import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

export default (context, inject) => {
  inject('highcharts', Highcharts);
};
