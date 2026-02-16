# OPTIFIT Backend

Fitness tracking backend with adaptive protein system.

## Stack

Node.js
Express.js
MongoDB
JWT Authentication

## Setup

npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run:

npm run dev

## Main API

Dashboard:
GET /api/dashboard

Food log:
POST /api/food/log

Water log:
POST /api/water/log

Steps log:
POST /api/steps/log

Wearable sync:
POST /api/wearable/sync
