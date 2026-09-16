import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.ml.biomechanics import BiomechanicsEngine

# ponytail: Ultra-lightweight WebSocket handler processing raw pose landmarks directly in memory
router = APIRouter(tags=["websocket"])

@router.websocket("/ws/workout")
async def workout_websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    engine = BiomechanicsEngine()

    try:
        while True:
            data = await websocket.receive_text()
            packet = json.loads(data)

            landmarks = packet.get("landmarks", {})
            exercise = packet.get("exercise", "squat")

            # Extract key joints
            left_hip = landmarks.get("left_hip", {"x": 0.5, "y": 0.5})
            left_knee = landmarks.get("left_knee", {"x": 0.5, "y": 0.7})
            left_ankle = landmarks.get("left_ankle", {"x": 0.5, "y": 0.9})

            right_hip = landmarks.get("right_hip", {"x": 0.6, "y": 0.5})
            right_knee = landmarks.get("right_knee", {"x": 0.6, "y": 0.7})
            right_ankle = landmarks.get("right_ankle", {"x": 0.6, "y": 0.9})

            # Calculate real-time joint angles
            left_knee_angle = engine.calculate_angle(left_hip, left_knee, left_ankle)
            right_knee_angle = engine.calculate_angle(right_hip, right_knee, right_ankle)
            knee_diff = abs(left_knee_angle - right_knee_angle)

            # Check knee valgus
            warning = None
            if knee_diff > 14.0:
                warning = {
                    "type": "knee_valgus",
                    "title": "Knee Valgus Warning",
                    "message": "Bilateral knee asymmetry detected. Keep knees in line with toes.",
                    "severity": "medium",
                }

            response_payload = {
                "status": "active",
                "left_knee_angle": round(left_knee_angle, 1),
                "right_knee_angle": round(right_knee_angle, 1),
                "symmetry_diff": round(knee_diff, 1),
                "warning": warning,
            }

            await websocket.send_text(json.dumps(response_payload))

    except WebSocketDisconnect:
        pass
    except Exception as e:
        await websocket.close()
