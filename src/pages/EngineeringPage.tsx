import React, { useMemo, useState } from 'react';
import { BookOpen, Cpu, Database, FlaskConical, Gauge, Layers3, Target } from 'lucide-react';

type Section = 'validation' | 'embedded' | 'market' | 'roadmap';

const SectionButton: React.FC<{
  id: Section;
  active: Section;
  onClick: (id: Section) => void;
  children: React.ReactNode;
}> = ({ id, active, onClick, children }) => (
  <button
    onClick={() => onClick(id)}
    className={`px-4 py-2.5 text-xs rounded-lg border transition ${
      active === id
        ? 'bg-[#d97742]/10 border-[#d97742]/40 text-[#f4f0e8]'
        : 'border-white/10 text-[#8c939f] hover:text-[#f4f0e8] hover:bg-white/[0.03]'
    }`}
  >
    {children}
  </button>
);

const Metric: React.FC<{ label: string; value: string; note: string }> = ({ label, value, note }) => (
  <div className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
    <div className="text-[10px] uppercase tracking-[0.16em] text-[#8c939f]">{label}</div>
    <div className="mt-2 text-xl font-semibold font-mono-tech text-[#f4f0e8]">{value}</div>
    <div className="mt-1 text-[11px] text-[#717a87]">{note}</div>
  </div>
);

export const EngineeringPage: React.FC = () => {
  const [section, setSection] = useState<Section>('validation');
  const matrix = useMemo(() => [
    { label: 'Impact', values: [110, 4, 11] },
    { label: 'Glitch', values: [5, 87, 33] },
    { label: 'Uncertain', values: [8, 8, 109] },
  ], []);

  return (
    <div className="mission-page space-y-6">
      <div className="mission-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-mark" />
            <span>ENGINEERING NOTES</span>
            <span className="eyebrow-sep">/</span>
            <span>DEVELOPMENT &amp; VALIDATION</span>
          </div>
          <h1>From signal to flight software.</h1>
          <p className="mission-subtitle">
            Implementation details, test methodology and the route from this simulator to a flight-class demonstration.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#d97742]/25 bg-[#d97742]/[0.045] px-4 py-3 text-xs leading-relaxed text-[#c7c0b7]">
        <span className="text-[#e68d5c] font-semibold">Prototype status.</span> The live mission dashboard uses
        simulated telemetry and explainable rules. The Python training and evaluation scripts are reproducible
        development tools; no flight qualification or on-orbit performance is claimed.
      </div>

      <section className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
        <div className="flex items-center gap-2 text-sm text-[#f4f0e8]">
          <Target size={16} className="text-[#d97742]" /> Pitch deck → prototype check
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-[#8c939f]">
          The deck describes intended design goals. These are the current prototype results and limitations.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-white/[0.07] bg-[#0b0e13] p-3">
            <div className="text-xs font-semibold text-[#f4f0e8]">Existing sensors, no added hardware</div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#aeb5bf]">
              Demonstrated with simulated IMU, solar-current, magnetometer and temperature channels only. No
              spacecraft sensors or flight hardware are connected.
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.07] bg-[#0b0e13] p-3">
            <div className="text-xs font-semibold text-[#f4f0e8]">Multi-sensor impact verdict</div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#aeb5bf]">
              The live browser rules require an IMU anomaly plus a coincident solar-current or magnetometer
              anomaly. Temperature is supporting evidence, not a required trigger. The optional backend classifier
              is separate from the live browser detector.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-3">
            <div className="text-xs font-semibold text-amber-200">Detection goals not yet met</div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#c7c0b7]">
              The offline decision tree scored 88.0% impact recall and a 5.2% impact false-positive rate on its
              held-out synthetic set, versus the deck goals of at least 90% and below 5%. These are not live
              detector or real-world results.
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.07] bg-[#0b0e13] p-3">
            <div className="text-xs font-semibold text-[#f4f0e8]">Embedded size and readiness</div>
            <p className="mt-1 text-[11px] leading-relaxed text-[#aeb5bf]">
              C rules can be exported from the offline model, but the firmware footprint is unmeasured and the
              generated C has not been validated on an ARM board. The deck’s under-10-KB figure remains a target.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <SectionButton id="validation" active={section} onClick={setSection}>Validation plan</SectionButton>
        <SectionButton id="embedded" active={section} onClick={setSection}>Embedded path</SectionButton>
        <SectionButton id="market" active={section} onClick={setSection}>Use &amp; adoption</SectionButton>
        <SectionButton id="roadmap" active={section} onClick={setSection}>Roadmap</SectionButton>
      </div>

      {section === 'validation' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Metric label="Test classes" value="3" note="Impact · Glitch · Uncertain" />
            <Metric label="Sensor channels" value="4" note="IMU · Solar · Magnetometer · Thermal" />
            <Metric label="Evaluation" value="Reproducible" note="Run the optional Python pipeline locally" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
              <div className="flex items-center gap-2 text-sm text-[#f4f0e8]">
                <FlaskConical size={16} className="text-[#d97742}" /> Test protocol
              </div>
              <ol className="mt-4 space-y-3 text-xs text-[#aeb5bf] list-decimal pl-4 leading-relaxed">
                <li>Generate labelled synthetic event windows with varied baselines, noise and event timing.</li>
                <li>Split samples into training and held-out test sets before fitting the decision tree.</li>
                <li>Report the confusion matrix, per-class precision/recall and false-positive rate on held-out data.</li>
                <li>Repeat with changed noise and thresholds to check sensitivity to simulation assumptions.</li>
              </ol>
            </section>
            <section className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
              <div className="flex items-center gap-2 text-sm text-[#f4f0e8]">
                <Database size={16} className="text-[#d97742}" /> Example confusion matrix
              </div>
              <p className="text-[11px] text-[#717a87] mt-1">
                Held-out synthetic dataset (seed 17). Actual rows, predicted columns; not flight data.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs text-center">
                  <thead>
                    <tr className="text-[#8c939f]">
                      <th className="p-2 text-left">Actual ↓ / Predicted →</th>
                      <th className="p-2">Impact</th>
                      <th className="p-2">Glitch</th>
                      <th className="p-2">Uncertain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row, rowIndex) => (
                      <tr key={row.label} className="border-t border-white/[0.07]">
                        <th className="p-2 text-left text-[#c7c0b7]">{row.label}</th>
                        {row.values.map((value, columnIndex) => (
                          <td
                            key={columnIndex}
                            className={`p-2 font-mono-tech ${
                              columnIndex === rowIndex ? 'text-emerald-300' : 'text-[#aeb5bf]'
                            }`}
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-[#717a87] mt-3">
                From the project root, change to <code>backend</code> and run{' '}
                <code>.venv\\Scripts\\python.exe -m app.ml.evaluate</code> to regenerate the report.
              </p>
            </section>
          </div>
          <section className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
            <div className="flex items-center gap-2 text-sm text-[#f4f0e8]">
              <Target size={16} className="text-[#d97742}" /> Design targets from the pitch
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <Metric label="Impact recall" value="88.0%" note="Synthetic result; target ≥ 90%" />
              <Metric label="Impact false-positive rate" value="5.2%" note="Offline tree; target < 5%" />
              <Metric label="Firmware footprint" value="Not measured" note="Pitch target < 10 KB; no board test" />
            </div>
          </section>
        </div>
      )}

      {section === 'embedded' && (
        <div className="space-y-4">
          <section className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
            <div className="flex items-center gap-2 text-sm text-[#f4f0e8]">
              <Cpu size={16} className="text-[#d97742]" /> Proposed deployment chain
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-4">
              {['On-board sensors', 'Window & normalize', 'Anomaly flags', 'C decision rules', 'Event report'].map((step, index) => (
                <div key={step} className="rounded-lg border border-white/[0.08] bg-[#0b0e13] p-3 text-xs text-[#d4d0c9]">
                  <div className="text-[10px] text-[#d97742] font-mono-tech mb-2">0{index + 1}</div>
                  {step}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#aeb5bf] leading-relaxed">
              The Python pipeline trains a compact decision tree on generated telemetry and exports threshold rules
              as C source. The C file is a starting point for an ARM Cortex-M port; it has not been compiled against
              a flight board or measured for timing and memory.
            </p>
          </section>
          <section className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
            <div className="text-sm text-[#f4f0e8] flex items-center gap-2">
              <Gauge size={16} className="text-[#d97742]" /> Resource checks before hardware testing
            </div>
            <ul className="mt-3 space-y-2 text-xs text-[#aeb5bf] list-disc pl-4">
              <li>Compile the exported C with the target compiler and optimization flags.</li>
              <li>Record flash, static RAM and stack usage from the linker map.</li>
              <li>Measure worst-case execution time over nominal and anomaly windows.</li>
              <li>Test fixed-point scaling, sensor dropouts, saturation and stale samples.</li>
              <li>Run hardware-in-the-loop replay before flight-software integration.</li>
            </ul>
          </section>
        </div>
      )}

      {section === 'market' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['University & student CubeSats', 'A low-cost demonstration of onboard autonomy for missions with tight mass and power budgets.'],
            ['Small-satellite operators', 'Fleet health monitoring and triage of anomalous telemetry without adding a dedicated impact sensor.'],
            ['Agencies & research labs', 'A way to investigate impact signatures and build datasets for small-spacecraft environments.'],
            ['Mission assurance & insurers', 'A possible source of event evidence when distinguishing physical disturbances from electronics faults.'],
          ].map(([title, body]) => (
            <section key={title} className="rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
              <div className="text-sm text-[#f4f0e8]">{title}</div>
              <p className="text-xs leading-relaxed text-[#8f98a5] mt-2">{body}</p>
            </section>
          ))}
          <section className="md:col-span-2 rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
            <div className="text-sm text-[#f4f0e8] flex items-center gap-2">
              <Layers3 size={16} className="text-[#d97742}" /> Proposed adoption model
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-xs">
              <div><b className="text-[#e68d5c]">Education tier</b><p className="text-[#8f98a5] mt-1">Free access for student and research projects to encourage testing and feedback.</p></div>
              <div><b className="text-[#e68d5c]">Mission licence</b><p className="text-[#8f98a5] mt-1">Per-mission flight-software licence for commercial operators.</p></div>
              <div><b className="text-[#e68d5c]">Services</b><p className="text-[#8f98a5] mt-1">Sensor-suite tuning, integration support and optional fleet analytics subscription.</p></div>
            </div>
            <p className="text-[10px] text-[#717a87] mt-4">
              This is a proposed business model, not a launched commercial service.
            </p>
          </section>
        </div>
      )}

      {section === 'roadmap' && (
        <div className="space-y-3">
          {[
            ['01', 'Current · Software prototype', 'Exercise diagnosis logic against generated telemetry and injected impact/glitch cases.'],
            ['02', 'Next · Hardware-in-the-loop', 'Port exported C rules to a flight-class microcontroller and replay recorded telemetry.'],
            ['03', 'Then · Ground validation', 'Compare signatures with laboratory hypervelocity-impact data and suitable open CubeSat datasets.'],
            ['04', 'Later · Flight demonstration', 'Fly as a secondary payload, assess on-orbit behaviour and consider fleet-wide event sharing.'],
          ].map(([number, title, body]) => (
            <div key={number} className="flex gap-4 rounded-xl border border-white/[0.08] bg-[#10141b] p-4">
              <div className="font-mono-tech text-sm text-[#d97742]">{number}</div>
              <div>
                <div className="text-sm text-[#f4f0e8]">{title}</div>
                <p className="text-xs text-[#8f98a5] mt-1 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start gap-2 text-[11px] text-[#717a87] border-t border-white/[0.07] pt-4">
        <BookOpen size={14} className="mt-0.5 shrink-0" />
        Technical status is explicit: simulated data supports development and demonstration, while laboratory,
        embedded and flight validation remain future work.
      </div>
    </div>
  );
};
