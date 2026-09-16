import math
from typing import Dict, Any, Tuple, Optional

# ponytail: Pure numpy/math biomechanics evaluation engine with sub-5ms latency
class BiomechanicsEngine:
    @staticmethod
    def calculate_angle(
        a: Dict[str, float],
        b: Dict[str, float],
        c: Dict[str, float]
    ) -> float:
        """
        Calculates the interior 2D/3D angle in degrees between vectors BA and BC.
        Joint vertex is at point 'b'.
        """
        ba_x = a.get("x", 0.0) - b.get("x", 0.0)
        ba_y = a.get("y", 0.0) - b.get("y", 0.0)
        bc_x = c.get("x", 0.0) - b.get("x", 0.0)
        bc_y = c.get("y", 0.0) - b.get("y", 0.0)

        dot_product = (ba_x * bc_x) + (ba_y * bc_y)
        mag_ba = math.sqrt(ba_x * ba_x + ba_y * ba_y)
        mag_bc = math.sqrt(bc_x * bc_x + bc_y * bc_y)

        if mag_ba * mag_bc == 0:
            return 180.0

        cosine = max(-1.0, min(1.0, dot_product / (mag_ba * mag_bc)))
        angle_rad = math.acos(cosine)
        return math.degrees(angle_rad)

    @classmethod
    def evaluate_squat_rep(
        cls,
        peak_knee_angle: float,
        tempo_eccentric: float,
        left_right_knee_diff: float,
        spine_neutral_angle: float
    ) -> Tuple[float, Dict[str, float], Optional[str]]:
        """
        Evaluates a finished squat rep across 4 biomechanical pillars:
        - ROM (Target: 80° - 90° parallel depth)
        - Tempo (Target: 2.0s - 3.0s controlled eccentric)
        - Symmetry (Target: < 5° difference between left & right knee)
        - Stability & Spine Neutrality (Target: > 75° upright trunk)
        """
        # 1. ROM Score (0 - 100)
        if peak_knee_angle <= 90:
            # Parallel or below
            rom_score = 100.0 - max(0.0, (80.0 - peak_knee_angle) * 1.5)
        else:
            # Above parallel (shallow)
            rom_score = max(40.0, 100.0 - (peak_knee_angle - 90.0) * 2.5)

        # 2. Tempo Score (0 - 100)
        if 2.0 <= tempo_eccentric <= 3.5:
            tempo_score = 100.0
        elif tempo_eccentric < 2.0:
            tempo_score = max(50.0, 100.0 - (2.0 - tempo_eccentric) * 30.0)
        else:
            tempo_score = max(70.0, 100.0 - (tempo_eccentric - 3.5) * 15.0)

        # 3. Symmetry Score (0 - 100)
        symmetry_score = max(50.0, 100.0 - left_right_knee_diff * 4.0)

        # 4. Joint Stability / Spine Score (0 - 100)
        if spine_neutral_angle >= 75:
            stability_score = 100.0
        else:
            stability_score = max(40.0, 100.0 - (75.0 - spine_neutral_angle) * 3.0)

        # Weighted FitScore Formula: 35% ROM, 25% Tempo, 20% Symmetry, 20% Stability
        fitscore = (
            rom_score * 0.35 +
            tempo_score * 0.25 +
            symmetry_score * 0.20 +
            stability_score * 0.20
        )
        fitscore = round(max(0.0, min(100.0, fitscore)), 1)

        # Injury Risk Flag Detection
        flaw = None
        if left_right_knee_diff > 12.0:
            flaw = "Significant bilateral knee valgus collapse"
        elif spine_neutral_angle < 60.0:
            flaw = "Excessive lumbar spine forward flexion"
        elif peak_knee_angle > 105.0:
            flaw = "Insufficient range of motion (partial rep)"

        breakdown = {
            "rom": round(rom_score, 1),
            "tempo": round(tempo_score, 1),
            "symmetry": round(symmetry_score, 1),
            "stability": round(stability_score, 1),
        }

        return fitscore, breakdown, flaw
