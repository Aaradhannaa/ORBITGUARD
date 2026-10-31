"""Create labelled synthetic telemetry windows for development.

These signals are intentionally synthetic. They exercise the pipeline but are
not a substitute for measured spacecraft or hypervelocity-impact data.
"""
from __future__ import annotations

import numpy as np
from scipy.ndimage import gaussian_filter1d

FEATURES = [
    "imu_peak_z", "solar_peak_z", "mag_peak_z", "temp_peak_z",
    "onset_spread_ms", "channels_flagged", "motion_power",
]


def make_dataset(samples_per_class: int = 500, seed: int = 17):
    rng = np.random.default_rng(seed)
    rows, labels = [], []
    classes = ("impact", "glitch", "uncertain")
    thresholds = np.array([3.2, 2.8, 3.0, 3.2])

    for label_id, label in enumerate(classes):
        for _ in range(samples_per_class):
            signal = np.abs(rng.normal(1.0, 0.45, size=(4, 64)))
            onset = int(rng.integers(15, 38))
            strength = float(rng.uniform(4.0, 13.0))

            if label == "impact":
                offsets = rng.integers(-3, 4, size=4)
                amplitudes = np.array([
                    strength, rng.uniform(3.2, 8.0),
                    rng.uniform(3.0, 7.0), rng.uniform(1.5, 5.0),
                ])
                for channel in range(4):
                    centre = int(np.clip(onset + offsets[channel], 4, 58))
                    pulse = np.zeros(64)
                    pulse[centre] = amplitudes[channel]
                    signal[channel] += gaussian_filter1d(pulse, sigma=1.25)
            elif label == "glitch":
                channel = int(rng.integers(0, 4))
                pulse = np.zeros(64)
                pulse[onset] = strength
                signal[channel] += gaussian_filter1d(pulse, sigma=0.8)
            else:
                count = int(rng.integers(1, 4))
                for channel in rng.choice(4, size=count, replace=False):
                    pulse = np.zeros(64)
                    centre = int(np.clip(onset + rng.integers(-14, 15), 4, 59))
                    pulse[centre] = rng.uniform(2.2, 4.0)
                    signal[channel] += gaussian_filter1d(pulse, sigma=0.8)

            peaks = np.max(signal, axis=1)
            flagged = peaks >= thresholds
            active_onsets = []
            for channel in range(4):
                indices = np.flatnonzero(signal[channel] >= thresholds[channel])
                if len(indices):
                    active_onsets.append(int(indices[0]))
            spread = (max(active_onsets) - min(active_onsets)) * 1000 / 10 if active_onsets else 0
            motion_power = float(np.sqrt(np.mean(signal[:3] ** 2)))
            rows.append([*peaks.tolist(), float(spread), float(flagged.sum()), motion_power])
            labels.append(label_id)

    return np.asarray(rows, dtype=float), np.asarray(labels, dtype=int)
