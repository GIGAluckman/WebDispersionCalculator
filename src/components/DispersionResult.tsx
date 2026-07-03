import SimplePlot from './SimplePlot';
import DownloadCSVButton from './DownloadCSVButton';
import GridPlot, { LabelSegment } from './GridPlot';
import ModeProfileForm from './ModeProfileForm';
import { useFetchModeProfile } from '../hooks/useFetchModeProfile';
import './styles/DispersionResult.css';
import { DispersionData } from '../constants/experimentTypes';
import FieldProfileForm from './FieldProfileForm';
import { useFetchFieldProfile } from '../hooks/useFetchFieldProfile';
import { useState, useEffect, useMemo } from 'react';
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
	simulationLoading: boolean;
}

interface PlotSeries {
	data: number[];
	label: string;
}

// Column names look like 'f10 (GHz)', 'v2 (m/s)', 'lt10 (ns)', 'pl3 (µm)' —
// the mode index can have more than one digit.
const modeLabel = (key: string) => `${key.match(/\d+/)?.[0] ?? '?'} mode`;

export default function DispersionResult({
	result,
	errorId,
	simulationId,
	numberOfModes,
	simulationLoading,
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
		fieldName: fieldProfileName,
		handleSubmit: handleFieldProfileSubmit,
		fetchWithParams: fetchFieldProfile,
	} = useFetchFieldProfile({ simulationId });

	const [chosenFieldName, setChosenFieldName] = useState<FieldNames>(
		FieldNames.DemagField,
	);

	useEffect(() => {
		if (!result) return;

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
	}, [result]);

	// Memoized so unrelated state changes (e.g. profile form toggles) don't
	// force the d3 plots to fully redraw.
	const {
		xData,
		dispersionData,
		xDataShifted,
		groupVelocityData,
		lifetimeData,
		propagationLengthData,
	} = useMemo(() => {
		const empty = {
			xData: [] as number[],
			dispersionData: [] as PlotSeries[],
			xDataShifted: [] as number[],
			groupVelocityData: [] as PlotSeries[],
			lifetimeData: [] as PlotSeries[],
			propagationLengthData: [] as PlotSeries[],
		};
		if (!result) {
			return empty;
		}

		const series = (match: (key: string) => boolean): PlotSeries[] =>
			Object.keys(result)
				.filter(match)
				.map((key) => ({
					data: Object.values(result[key]),
					label: modeLabel(key),
				}));

		const derived = {
			...empty,
			xData: Object.values(result['k (rad/µm)']),
			dispersionData: series((key) => key.includes('GHz')),
		};
		if (errorId !== 1) {
			// errorId 1 = NaN in the dispersion: velocity/lifetime columns don't exist
			derived.xDataShifted = Object.values(result['kshift (rad/µm)']);
			derived.groupVelocityData = series((key) => key.includes('m/s'));
			derived.lifetimeData = series((key) => key.includes('lt'));
			derived.propagationLengthData = series((key) => key.includes('pl'));
		}
		return derived;
	}, [result, errorId]);

	// Memoized structured labels: stable references keep GridPlot's redraw
	// effect from re-running on unrelated renders
	const modeColorbarLabel = useMemo<LabelSegment[]>(
		() => [
			{ text: 'm' },
			{ text: modeProfileComponent, sub: true },
			{ text: ' (a.u.)' },
		],
		[modeProfileComponent],
	);
	const modeClosestK = modeProfileData?.closest_k;
	const modePlotTitle = useMemo<LabelSegment[]>(
		() => [
			{ text: 'Mode profile (m' },
			{ text: modeProfileComponent, sub: true },
			{ text: ', ' },
			{ text: 'k', italic: true },
			{ text: ` = ${modeClosestK ?? ''} rad/µm)` },
		],
		[modeProfileComponent, modeClosestK],
	);
	const fieldColorbarLabel = useMemo<LabelSegment[]>(
		() => [
			{ text: 'H' },
			{ text: fieldProfileComponent, sub: true },
			{ text: ' (mT)' },
		],
		[fieldProfileComponent],
	);

	if (!result) {
		return null;
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
						loading={modeProfileLoading || simulationLoading}
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
							colorbarLabel={modeColorbarLabel}
							plotTitle={modePlotTitle}
							hideXAxis={
								modeProfileData?.geometry_type === 'Plane Film'
							}
							maxPlotWidth={
								modeProfileData?.geometry_type === 'Wire' ||
								modeProfileData?.geometry_type === 'Plane Film'
									? 250
									: 500
							}
							titleYOffset={
								modeProfileData?.geometry_type === 'Wire' ||
								modeProfileData?.geometry_type === 'Plane Film'
									? 15
									: 30
							}
							maxContainerWidth={
								modeProfileData?.geometry_type === 'Wire' ||
								modeProfileData?.geometry_type === 'Plane Film'
									? 350
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
						loading={fieldProfileLoading || simulationLoading}
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
							colorbarLabel={fieldColorbarLabel}
							plotTitle={`${fieldProfileName} profile`}
							hideXAxis={
								fieldProfileData?.geometry_type === 'Plane Film'
							}
							maxPlotWidth={
								fieldProfileData?.geometry_type === 'Wire' ||
								fieldProfileData?.geometry_type === 'Plane Film'
									? 250
									: 500
							}
							titleYOffset={
								fieldProfileData?.geometry_type === 'Wire' ||
								fieldProfileData?.geometry_type === 'Plane Film'
									? 15
									: 30
							}
							maxContainerWidth={
								fieldProfileData?.geometry_type === 'Wire' ||
								fieldProfileData?.geometry_type === 'Plane Film'
									? 350
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
