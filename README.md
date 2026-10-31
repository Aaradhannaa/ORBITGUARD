# ORBITGUARD — Satellite Impact Intelligence Platform

**Subtitle:** Micrometeorite Impact Self-Diagnosis for Small Satellites  
**Tagline:** *"Detect the event. Understand the evidence."*

---

## 🛰️ Executive Overview

Small satellites (CubeSats) in Low Earth Orbit (LEO) operate in an increasingly dense environment of space debris and micrometeoroids. Dedicated impact detection systems (piezoelectric grids, acoustic sensors, PVDF foil sheets) add mass, power, and harness complexity that CubeSats cannot afford.

**ORBITGUARD** demonstrates that a small satellite can use its **existing onboard payload & bus sensors** to self-diagnose kinetic micrometeorite impacts vs. single-sensor electrical/radiation glitches with high confidence:

1. **IMU Rate Gyroscopes**: Measures angular acceleration impulses ($\Delta\omega$).
2. **Solar Array Shunt Current**: Detects attitude perturbation off-pointing and solar wing structural micro-vibrations.
3. **3-Axis Magnetometers**: Corroborates rigid-body rotation against Earth's geomagnetic field vector.
4. **Thermal Subsystem**: Observes localized dissipation and sun/shade thermal response.

---

## ⚡ Core Capabilities

- **Interactive 3D Satellite Digital Twin**: Procedural 3U CubeSat with realistic gold MLI foil, anodized chassis frame, deployed silicon solar arrays with conductive busbars, optical star-tracker baffle, patch and whip antennas, Earth nadir horizon, and orbital trajectory. Visually wiggles and dampens in response to injected kinetic strikes.
- **Synchronized 4-Channel Live Telemetry**: Real-time sliding window graphs (5–10 Hz) for angular rate ($\text{deg/s}$), solar current ($\text{A}$), magnetic field ($\mu\text{T}$), and temperature ($^\circ\text{C}$).
- **Explainable Anomaly Diagnosis Engine**: Dynamic mathematical deduction tree comparing multi-channel onset timestamps ($t_0$), peak deviations ($t_{\text{peak}}$), and rigid-body physical consistency ($\Delta t \le 1.5\,\text{s}$) to classify events into:
  - `POSSIBLE IMPACT` (multi-sensor kinematic coupling)
  - `SENSOR GLITCH` (isolated single-channel transient)
  - `UNCERTAIN` (ambiguous signal-to-noise ratio)
- **High-Resolution Event Replay**: Interactive time-scrubber to step through or play back telemetry around any detected event, showing pre-event nominal baseline, kinetic shock impulse, and AI evidence convergence.
- **Searchable Event Archive**: Full filterable log with exportable JSON diagnostic reports.
- **Mission Control Tuning**: Configurable sigma thresholds ($\tau_{\text{imu}}, \tau_{\text{solar}}, \tau_{\text{mag}}$), correlation windows, and stream frequencies.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS v4, Lucide Icons
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Data Visualization**: Recharts real-time synchronized streams & custom SVG sparklines
- **Analytics/Backend**: Browser-side real-time simulator and detector, backed by a Python FastAPI service with SQLite persistence and a server-side diagnosis endpoint

---

## 🚀 Getting Started

### 1. Install & Run Application
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Public demo hosting (GitHub Pages)

The public demo is a frontend-only static site. The browser simulator remains active, while the API is deliberately disabled in the hosted build because the prototype API currently has unauthenticated write and delete endpoints. The public deployment therefore does not connect to or expose the SQLite backend.

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. To publish it:

1. Push the `main` branch to GitHub.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Wait for the **Deploy OrbitGuard demo** workflow to complete.

The site URL will be `https://jayanthv-git.github.io/OrbitGuard/`. Updates pushed to `main` redeploy automatically. The local app continues to use `http://localhost:8000` by default; only the Pages build disables backend requests.

### 2. Production Build
```bash
npm run build
npm run preview
```

### 3. Start the backend API

In a second terminal, from the project root:

**Windows PowerShell**

```powershell
python -m venv backend\.venv
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
.\backend\.venv\Scripts\Activate.ps1
npm run dev:backend
```

**macOS / Linux**

```bash
python3 -m venv backend/.venv
backend/.venv/bin/pip install -r backend/requirements.txt
source backend/.venv/bin/activate
npm run dev:backend
```

The API is available at `http://localhost:8000`; interactive API documentation is at `http://localhost:8000/docs`. The website checks the API status, sends telemetry in one-second batches, and stores event diagnosis windows when the backend is running. The browser simulator remains active if the API is offline.

SQLite data is stored in `backend/data/orbitguard.sqlite3`. Set `ORBITGUARD_DB_PATH` to use another location. Set `VITE_API_BASE_URL` before starting Vite if the API runs somewhere other than `http://localhost:8000`.

Main endpoints: `GET /health`, `GET /api/mission/state`, `GET /api/telemetry`, `POST /api/telemetry/batch`, `POST /api/diagnose`, `GET /api/events`, and `GET/PUT /api/settings`. Live telemetry can be consumed over `ws://localhost:8000/api/stream`.

---

*Disclaimer: This is a hackathon engineering prototype based on simulated telemetry and physics-informed correlation. Not certified for flight operations.*

## Engineering & validation tools

The **Engineering & Validation** section in the app describes the development workflow, embedded deployment path, proposed adoption model, and roadmap. The Python model-development tools use synthetic data only; they do not train or control the live browser simulator.

Install the optional machine-learning dependencies into the backend virtual environment:

```powershell
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements-ml.txt
```

From the project root, generate a reproducible synthetic dataset, train a decision tree, and evaluate it on a held-out split:

```powershell
Set-Location backend
.venv\Scripts\python.exe -m app.ml.evaluate
```

The report is written to `backend/reports/synthetic_evaluation.json`. To export the fitted tree as readable C decision rules:

```powershell
.venv\Scripts\python.exe -m app.ml.export_c
```

The generated C source is written to `backend/generated/orbitguard_tree.c`. Its feature order is documented in that file and in `app/ml/simulate.py`.

These metrics describe only the generated synthetic dataset and its fixed random train/test split. They are not measured spacecraft performance and do not establish flight readiness. The C output is an unvalidated starting point: compile, profile and test it on the target hardware before considering embedded or flight use. Hardware-in-the-loop replay, laboratory impact data and suitable open CubeSat telemetry remain required validation steps.
