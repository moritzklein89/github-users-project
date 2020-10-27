export interface BarChartData {
    name: string;
    value: number;
}

export interface ColorScheme {
    domain: Array<string>;
}

export interface BarChartConfig {
    showXAxis: boolean;
    showYAxis: boolean;
    gradient: boolean;
    showLegend: boolean;
    showXAxisLabel: boolean;
    xAxisLabel: string;
    showYAxisLabel: boolean;
    yAxisLabel: string;
    colorScheme: ColorScheme;
    view: Array<number>;
    results?: BarChartData[];
}
