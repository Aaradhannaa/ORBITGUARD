/* Generated from a scikit-learn DecisionTreeClassifier.
 * Feature order is defined in feature_names below.
 * Prototype export: review scaling, bounds and compiler output before MCU use.
 */
#include <stddef.h>
typedef enum { OG_IMPACT = 0, OG_GLITCH = 1, OG_UNCERTAIN = 2 } og_class_t;
/* imu_peak_z, solar_peak_z, mag_peak_z, temp_peak_z, onset_spread_ms, channels_flagged, motion_power */
og_class_t orbitguard_classify(const float x[7]) {
    if (x[6] <= 1.18064052f) {
        if (x[5] <= 0.50000000f) {
            if (x[6] <= 1.17579150f) {
                if (x[0] <= 3.04702735f) {
                    if (x[2] <= 1.81592786f) {
                        return (og_class_t)2;
                    } else {
                        return (og_class_t)2;
                    }
                } else {
                    return (og_class_t)2;
                }
            } else {
                return (og_class_t)2;
            }
        } else {
            if (x[3] <= 3.77920270f) {
                if (x[2] <= 3.61159730f) {
                    if (x[0] <= 3.74783552f) {
                        return (og_class_t)2;
                    } else {
                        return (og_class_t)1;
                    }
                } else {
                    if (x[1] <= 2.15542936f) {
                        return (og_class_t)1;
                    } else {
                        return (og_class_t)1;
                    }
                }
            } else {
                if (x[3] <= 4.00951457f) {
                    return (og_class_t)1;
                } else {
                    return (og_class_t)1;
                }
            }
        }
    } else {
        if (x[0] <= 2.40782547f) {
            if (x[3] <= 2.41311133f) {
                if (x[0] <= 2.18822730f) {
                    if (x[3] <= 2.15205693f) {
                        return (og_class_t)1;
                    } else {
                        return (og_class_t)1;
                    }
                } else {
                    if (x[3] <= 2.06247461f) {
                        return (og_class_t)1;
                    } else {
                        return (og_class_t)1;
                    }
                }
            } else {
                return (og_class_t)0;
            }
        } else {
            if (x[0] <= 5.47757816f) {
                if (x[6] <= 1.21748394f) {
                    if (x[0] <= 4.04972982f) {
                        return (og_class_t)0;
                    } else {
                        return (og_class_t)1;
                    }
                } else {
                    if (x[0] <= 2.54607999f) {
                        return (og_class_t)0;
                    } else {
                        return (og_class_t)0;
                    }
                }
            } else {
                if (x[1] <= 2.44790030f) {
                    if (x[3] <= 2.16071427f) {
                        return (og_class_t)1;
                    } else {
                        return (og_class_t)1;
                    }
                } else {
                    return (og_class_t)0;
                }
            }
        }
    }
}
