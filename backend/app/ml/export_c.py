"""Export a fitted sklearn decision tree as readable C decision rules."""
from __future__ import annotations

from pathlib import Path

from sklearn.tree import _tree

from .evaluate import run_evaluation
from .simulate import FEATURES


def export_tree_to_c(model, destination: Path):
    tree = model.tree_
    lines = [
        "/* Generated from a scikit-learn DecisionTreeClassifier.",
        " * Feature order is defined in feature_names below.",
        " * Prototype export: review scaling, bounds and compiler output before MCU use.",
        " */",
        "#include <stddef.h>",
        "typedef enum { OG_IMPACT = 0, OG_GLITCH = 1, OG_UNCERTAIN = 2 } og_class_t;",
        f"/* {', '.join(FEATURES)} */",
        "og_class_t orbitguard_classify(const float x[7]) {",
    ]

    def emit(node: int, depth: int):
        indent = "    " * depth
        feature = tree.feature[node]
        if feature != _tree.TREE_UNDEFINED:
            threshold = tree.threshold[node]
            lines.append(f"{indent}if (x[{feature}] <= {threshold:.8f}f) {{")
            emit(tree.children_left[node], depth + 1)
            lines.append(f"{indent}}} else {{")
            emit(tree.children_right[node], depth + 1)
            lines.append(f"{indent}}}")
        else:
            class_id = int(tree.value[node][0].argmax())
            lines.append(f"{indent}return (og_class_t){class_id};")

    emit(0, 1)
    lines.extend(["}", ""])
    destination.write_text("\n".join(lines), encoding="utf-8")


def main():
    model, results = run_evaluation()
    destination = Path(__file__).resolve().parents[2] / "generated" / "orbitguard_tree.c"
    destination.parent.mkdir(exist_ok=True)
    export_tree_to_c(model, destination)
    print(f"Wrote {destination}")
    print(f"Evaluation accuracy on synthetic hold-out: {results['accuracy']:.3f}")


if __name__ == "__main__":
    main()
