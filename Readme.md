# RTSP Live Stream and Overlay Application

This project is a full-stack application for managing and displaying video overlays. It consists of a Python backend, a React frontend, and uses MongoDB for data storage.


## Backend

The backend is built with Python, likely using a framework like Flask or FastAPI, and uses MongoDB for data storage.

### Setup

1. Navigate to the `backend` directory.
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`

### Running MongoDB

1. Ensure MongoDB is installed on your system. If not, download and install it from [MongoDB's official website](https://www.mongodb.com/try/download/community).
2. Start the MongoDB service:
   - On Windows: Run `mongod` in the command prompt
   - On macOS/Linux: Run `sudo service mongod start` or `brew services start mongodb-community`
3. The MongoDB server should now be running on the default port 27017.

### Running the Backend Server

1. Ensure MongoDB is running.
2. In the `backend` directory, run: `python app.py`
3. The server should start and be accessible at `http://localhost:5000` (or your configured port).

### API Routes

- Default route: `http://localhost:5000/`
  - This route may serve as a health check or provide basic API information.
- Video streaming route: `http://localhost:5000/stream`
  - This route handles video streaming functionality and related operations.
- Overlay Routes : `http://localhost:5000/overlays`
  - This route handles overlays  

## Frontend

To activate the frontend, navigate to the `frontend` directory
- Install the dependencies using `npm install`
- Start the development server using `npm start`
- The Server would start at `http://localhost:3000` by default

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## Troubleshooting

- If you encounter issues connecting to MongoDB, ensure the service is running and that your backend is configured with the correct connection string.
