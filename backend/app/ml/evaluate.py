"""Train and evaluate a small decision tree on held-out synthetic telemetry."""
from __future__ import annotations

import json
from pathlib import Path

from sklearn.metrics import accuracy_score, confusion_matrix, precision_recall_fscore_support
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

from .simulate import FEATURES, make_dataset

LABELS = ["impact", "glitch", "uncertain"]


def run_evaluation(seed: int = 17):
    features, labels = make_dataset(seed=seed)
    train_features, test_features, train_labels, test_labels = train_test_split(
        features, labels, test_size=0.25, random_state=seed, stratify=labels
    )
    model = DecisionTreeClassifier(max_depth=5, min_samples_leaf=8, random_state=seed)
    model.fit(train_features, train_labels)
    predicted = model.predict(test_features)
    matrix = confusion_matrix(test_labels, predicted, labels=[0, 1, 2])
    precision, recall, f1, support = precision_recall_fscore_support(
        test_labels, predicted, labels=[0, 1, 2], zero_division=0
    )
    true_positive = int(matrix[0, 0])
    false_positive = int(matrix[1:, 0].sum())
    false_negative = int(matrix[0, 1:].sum())
    true_negative = int(matrix[1:, 1:].sum())
    results = {
        "dataset": "synthetic telemetry; generated at runtime",
        "seed": seed,
        "train_windows": int(len(train_labels)),
        "test_windows": int(len(test_labels)),
        "accuracy": round(float(accuracy_score(test_labels, predicted)), 4),
        "labels": LABELS,
        "confusion_matrix_rows_actual_columns_predicted": matrix.tolist(),
        "per_class": {
            LABELS[index]: {
                "precision": round(float(precision[index]), 4),
                "recall": round(float(recall[index]), 4),
                "f1": round(float(f1[index]), 4),
                "support": int(support[index]),
            }
            for index in range(len(LABELS))
        },
        "impact_false_positive_rate": round(
            false_positive / (false_positive + true_negative), 4
        ) if false_positive + true_negative else 0.0,
        "impact_true_positive_rate": round(
            true_positive / (true_positive + false_negative), 4
        ) if true_positive + false_negative else 0.0,
        "feature_names": FEATURES,
        "note": "Synthetic-data metrics only. Do not interpret as flight performance.",
    }
    return model, results


def main():
    model, results = run_evaluation()
    del model
    output_dir = Path(__file__).resolve().parents[2] / "reports"
    output_dir.mkdir(exist_ok=True)
    report_path = output_dir / "synthetic_evaluation.json"
    report_path.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
