import React, { lazy, Suspense, useState } from 'react';
import { Sidebar, NavTab } from './Sidebar';
import { Header } from './Header';
import { EventReplayModal } from '../events/EventReplayModal';

const MissionOverviewPage = lazy(() =>
  import('../../pages/MissionOverviewPage').then(({ MissionOverviewPage }) => ({ default: MissionOverviewPage }))
);
const LiveTelemetryPage = lazy(() =>
  import('../../pages/LiveTelemetryPage').then(({ LiveTelemetryPage }) => ({ default: LiveTelemetryPage }))
);
const ImpactDiagnosisPage = lazy(() =>
  import('../../pages/ImpactDiagnosisPage').then(({ ImpactDiagnosisPage }) => ({ default: ImpactDiagnosisPage }))
);
const EventHistoryPage = lazy(() =>
  import('../../pages/EventHistoryPage').then(({ EventHistoryPage }) => ({ default: EventHistoryPage }))
);
const SettingsPage = lazy(() =>
  import('../../pages/SettingsPage').then(({ SettingsPage }) => ({ default: SettingsPage }))
);
const EngineeringPage = lazy(() =>
  import('../../pages/EngineeringPage').then(({ EngineeringPage }) => ({ default: EngineeringPage }))
);

export const AppLayout: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Header */}
        <Header onSelectTab={setCurrentTab} />

        {/* Scrollable Page Body */}
        <main className="app-content">
          <Suspense fallback={<div className="min-h-48" aria-label="Loading mission data" />}>
            {currentTab === 'overview' && (
              <MissionOverviewPage
                onNavigateToDiagnosis={() => setCurrentTab('diagnosis')}
                onNavigateToTelemetry={() => setCurrentTab('telemetry')}
              />
            )}
            {currentTab === 'telemetry' && <LiveTelemetryPage />}
            {currentTab === 'diagnosis' && <ImpactDiagnosisPage />}
            {currentTab === 'history' && (
              <EventHistoryPage
                onNavigateToDiagnosis={() => setCurrentTab('diagnosis')}
              />
            )}
            {currentTab === 'settings' && <SettingsPage />}
            {currentTab === 'engineering' && <EngineeringPage />}
          </Suspense>
        </main>
      </div>

      {/* Global Interactive Event Replay Modal */}
      <EventReplayModal />
    </div>
  );
};
