import SimplePlot from './SimplePlot';
import DownloadCSVButton from './DownloadCSVButton';
import GridPlot from './GridPlot';
import ModeProfileForm from './ModeProfileForm';
import { useFetchModeProfile } from '../hooks/useFetchModeProfile';
import './styles/DispersionResult.css';
import { DispersionData } from '../constants/experimentTypes';
import FieldProfileForm from './FieldProfileForm';
import { useFetchFieldProfile } from '../hooks/useFetchFieldProfile';
import { useState, useEffect } from 'react';
import { FieldNames } from '../constants/fieldFetchingTypes';
import {
	modeProfileParameters,
	ModeProfileParameterNames,
} from '../constants/modeFetchingTypes';
import {
	fieldProfileParameters,
	FieldProfileParameterNames,
} from '../constants/fieldFetchingTypes';

interface DispersionResultProps {
	result: DispersionData | null;
	errorId: number | null;
	simulationId: string;
	numberOfModes: number;
}

export default function DispersionResult({
	result,
	errorId,
	simulationId,
	numberOfModes,
}: DispersionResultProps) {
	const {
		data: modeProfileData,
		loading: modeProfileLoading,
		error: modeProfileError,
		component: modeProfileComponent,
		handleSubmit: handleModeProfileSubmit,
		fetchWithParams: fetchModeProfile,
	} = useFetchModeProfile({ simulationId });

	const {
		data: fieldProfileData,
		loading: fieldProfileLoading,
		error: fieldProfileError,
		component: fieldProfileComponent,
		handleSubmit: handleFieldProfileSubmit,
		fetchWithParams: fetchFieldProfile,
	} = useFetchFieldProfile({ simulationId });

	const [chosenFieldName, setChosenFieldName] = useState<FieldNames>(
		FieldNames.DemagField,
	);

	useEffect(() => {
		const modeDefaults: Record<string, string> = {};
		for (const key of Object.values(ModeProfileParameterNames)) {
			modeDefaults[key] = modeProfileParameters[key].defaultValue;
		}
		fetchModeProfile(modeDefaults);

		const fieldDefaults: Record<string, string> = {};
		for (const key of Object.values(FieldProfileParameterNames)) {
			fieldDefaults[key] = fieldProfileParameters[key].defaultValue;
		}
		fetchFieldProfile(fieldDefaults);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!result) {
		return null;
	}

	const xData = Object.values(result['k (rad/µm)'] as unknown as number[]);

	const dispersionData = Object.keys(result)
		.filter((key) => key.includes('GHz'))
		.map((key) => ({
			data: Object.values(result[key]) as unknown as number[],
			label: `${key[1]} mode`,
		}));

	let xDataShifted: number[] = [];
	let groupVelocityData: { data: number[]; label: string }[] = [];
	let lifetimeData: { data: number[]; label: string }[] = [];
	let propagationLengthData: { data: number[]; label: string }[] = [];
	if (errorId !== 1) {
		xDataShifted = Object.values(
			result['kshift (rad/µm)'],
		) as unknown as number[];
		groupVelocityData = Object.keys(result)
			.filter((key) => key.includes('m/s'))
			.map((key) => ({
				data: Object.values(result[key]) as unknown as number[],
				label: `${key[1]} mode`,
			}));
		lifetimeData = Object.keys(result)
			.filter((key) => key.includes('lt'))
			.map((key) => ({
				data: Object.values(result[key]) as unknown as number[],
				label: `${key[2]} mode`,
			}));
		propagationLengthData = Object.keys(result)
			.filter((key) => key.includes('pl'))
			.map((key) => ({
				data: Object.values(result[key]) as unknown as number[],
				label: `${key[2]} mode`,
			}));
	}

	return (
		<div>
			<hr />
			<div className="imagecontainer">
				<div className="image">
					<SimplePlot
						xData={xData}
						yData={dispersionData}
						xLabel="k (rad/µm)"
						yLabel="f (GHz)"
						plotTitle="Dispersion relation"
					/>
				</div>
				<div className="image">
					<SimplePlot
						xData={xDataShifted}
						yData={groupVelocityData}
						xLabel="k (rad/µm)"
						yLabel="v (m/s)"
						plotTitle="Group velocity"
					/>
				</div>
				<div className="image">
					<SimplePlot
						xData={xData}
						yData={lifetimeData}
						xLabel="k (rad/µm)"
						yLabel="t (ns)"
						plotTitle="Lifetime"
					/>
				</div>
				<div className="image">
					<SimplePlot
						xData={xDataShifted}
						yData={propagationLengthData}
						xLabel="k (rad/µm)"
						yLabel="L (µm)"
						plotTitle="Propagation length"
					/>
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<div className="button p-2">
					<DownloadCSVButton data={result} />
				</div>
			</div>
			<hr />
			<div className="modeProfileContainer">
				<div className="modeProfileFormCol p-2">
					<ModeProfileForm
						onSubmit={handleModeProfileSubmit}
						loading={modeProfileLoading}
						maxModeNumber={numberOfModes}
					/>
				</div>
				{(modeProfileLoading ||
					modeProfileData ||
					modeProfileError) && (
					<div className="modeProfilePlotCol p-2">
						<GridPlot
							data={modeProfileData}
							loading={modeProfileLoading}
							error={modeProfileError}
							xLabel="Width (nm)"
							yLabel="Thickness (nm)"
							colorbarLabel={`m<tspan baseline-shift="sub" font-size="13.5px">${modeProfileComponent}</tspan> (a.u.)`}
							plotTitle={`Mode profile (m<tspan baseline-shift="sub" font-size="15px">${modeProfileComponent}</tspan>, <tspan font-style="italic">k</tspan> = ${modeProfileData?.closest_k ?? ''} rad/\u00b5m)`}
							hideXAxis={
								modeProfileData?.geometry_type === 'Plane Film'
							}
							maxPlotWidth={
								modeProfileData?.geometry_type === 'Wire'
									? 250
									: modeProfileData?.geometry_type ===
										  'Plane Film'
										? 200
										: 500
							}
							maxContainerWidth={
								modeProfileData?.geometry_type === 'Wire'
									? 350
									: modeProfileData?.geometry_type ===
										  'Plane Film'
										? 300
										: 800
							}
							loadingMessage="Loading mode profile..."
						/>
					</div>
				)}
			</div>
			<hr />
			<div className="modeProfileContainer">
				<div className="modeProfileFormCol p-2">
					<FieldProfileForm
						onSubmit={handleFieldProfileSubmit}
						loading={fieldProfileLoading}
						chosenFieldName={chosenFieldName}
						setChosenFieldName={setChosenFieldName}
					/>
				</div>
				{(fieldProfileLoading ||
					fieldProfileData ||
					fieldProfileError) && (
					<div className="modeProfilePlotCol p-2">
						<GridPlot
							data={fieldProfileData}
							loading={fieldProfileLoading}
							error={fieldProfileError}
							xLabel="Width (nm)"
							yLabel="Thickness (nm)"
							colorbarLabel={`H<tspan baseline-shift="sub" font-size="13.5px">${fieldProfileComponent}</tspan> (T)`}
							plotTitle={`${chosenFieldName} profile`}
							hideXAxis={
								fieldProfileData?.geometry_type === 'Plane Film'
							}
							maxPlotWidth={
								fieldProfileData?.geometry_type === 'Wire'
									? 250
									: fieldProfileData?.geometry_type ===
										  'Plane Film'
										? 200
										: 500
							}
							maxContainerWidth={
								fieldProfileData?.geometry_type === 'Wire'
									? 350
									: fieldProfileData?.geometry_type ===
										  'Plane Film'
										? 300
										: 800
							}
							loadingMessage="Loading field profile..."
						/>
					</div>
				)}
			</div>
		</div>
	);
}
