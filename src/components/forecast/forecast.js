import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'
import './forecast.css'

const WEEK_DAY = [

	'Monday',
	'Tuesday',
	'Wednesday',
	'Thusday',
	'Friday',
	'Suturday',
	'Sunday',
]

const Forecast = ({ data }) => {

	const today = new Date();
	const dayInWeek = today.getDay();

	const everyDayWeather = data.list.filter((element, i) => (i + 1) % 8 === 0);


	const forecastDays = WEEK_DAY.slice(dayInWeek, WEEK_DAY.length).concat(WEEK_DAY.slice(0, dayInWeek))

	return (
		<>
			<label className="title">
				Daily
			</label>
			<Accordion allowZeroExpanded>
				{everyDayWeather.map((item, idx) => (
					<AccordionItem key={idx}>
						<AccordionItemHeading>
							<AccordionItemButton>
								<div className='daily-item'>
									<img className='icon-small' alt='weather' src={`icons/${item.weather[0].icon}.png`}></img>
									<label className='day'>{forecastDays[idx]}</label>
									<label className='description'>{item.weather[0].description}</label>
									<label className='min-max'>{Math.trunc(item.main.temp_min)}°C / {Math.trunc(item.main.temp_max)}°C</label>
								</div>
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<div className='daily-details-grid'>
								<div className='daily-details-grid-item'>
									<label>Pressure</label>
									<label>{item.main.pressure} hPa</label>
								</div>
								<div className='daily-details-grid-item'>
									<label>Humidity</label>
									<label>{item.main.humidity}%</label>
								</div>
								<div className='daily-details-grid-item'>
									<label>Clouds</label>
									<label>{item.clouds.all}%</label>
								</div>
								<div className='daily-details-grid-item'>
									<label>Wind speed</label>
									<label>{item.wind.speed} m/s</label>
								</div>
								<div className='daily-details-grid-item'>
									<label>See level</label>
									<label>{item.main.sea_level} m</label>
								</div>
								<div className='daily-details-grid-item'>
									<label>Feels like</label>
									<label>{Math.trunc(item.main.feels_like)}°C</label>
								</div>
							</div>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>

		</>
	)
}

export default Forecast;