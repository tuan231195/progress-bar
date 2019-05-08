import './styles.scss';
import { fetchData } from './services/chart-data.http';
import { ChartButtonsComponent } from './components/chart-buttons.component';
import { ChartSelectorComponent } from './components/chart-selector.component';
import { ChartContainerComponent } from './components/chart-container.component';

const components = {};
const endpointInput = document.querySelector('#endpoint-txt');

setupEvents();
setupComponents();

function setupEvents() {
	document.querySelector('#fetch-btn').addEventListener('click', fetchAndRenderChart);
}

fetchData('http://localhost:5000/assets/test-data.json').then(renderChart);

function setupComponents() {
	components.chartButtons = new ChartButtonsComponent(document.querySelector('#chart-buttons'));
	components.chartSelector = new ChartSelectorComponent(
		document.querySelector('#chart-selector')
	);
	components.chartContainer = new ChartContainerComponent(
		document.querySelector('#chart-container')
	);
}

async function fetchAndRenderChart() {
	const endpoint = endpointInput.value;
	if (!endpoint) {
		return;
	}

	const chartData = await fetchData(endpoint);

	renderChart(chartData);
}

function renderChart({ buttons, bars, limit }) {
	buttons.sort();
	components.chartButtons.render(buttons);
	components.chartSelector.render(bars.length);
	components.chartContainer.render({ bars, limit });
}
