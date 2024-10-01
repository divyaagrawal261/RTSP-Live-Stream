from flask import Flask, jsonify, request, Response
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import cv2
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000","http://localhost:3001"]}})

client = MongoClient("mongodb://localhost:27017/")
db = client["video_streaming"]
overlays_collection = db.overlays

@app.route('/overlays', methods=['GET'])
def get_overlays():
    try:
        overlays = overlays_collection.find()
        result = [
            {
                "_id": str(overlay["_id"]),
                "text": overlay["text"],
                "text_position": overlay["text_position"],
                "logo_path": overlay["logo_path"],
                "logo_position": overlay["logo_position"],
                "size": overlay["size"]
            } for overlay in overlays
        ]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/overlays', methods=['POST'])
def create_overlay():
    try:
        data = request.json
        new_overlay = {
            "text": data['text'],
            "text_position": data['text_position'],
            "logo_path": data['logo_path'],
            "logo_position": data['logo_position'],
            "size": data['size']
        }
        result = overlays_collection.insert_one(new_overlay)
        return jsonify({"message": "Overlay created", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    try:
        data = request.json
        result = overlays_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        if result.matched_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        return jsonify({"message": "Overlay updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    try:
        result = overlays_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        return jsonify({"message": "Overlay deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/overlays/<id>', methods=['GET'])
def get_overlay(id):
    try:
        overlay = overlays_collection.find_one({"_id": ObjectId(id)})
        if overlay:
            result = {
                "_id": str(overlay["_id"]),
                "text": overlay["text"],
                "text_position": overlay["text_position"],
                "logo_path": overlay["logo_path"],
                "logo_position": overlay["logo_position"],
                "size": overlay["size"]
            }
            return jsonify(result), 200
        else:
            return jsonify({"error": "Overlay not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/stream', methods=['GET'])
def stream_rtsp():
    rtsp_url = request.args.get('url')
    
    if not rtsp_url:
        return jsonify({"error": "RTSP URL is required"}), 400
    
    def generate():
        try:          
            while True:
                frame = b'Some binary video data'
                
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
                
                time.sleep(0.1)
        
        except Exception as e:
            print(f"Failed to open RTSP stream: {str(e)}")
    
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')