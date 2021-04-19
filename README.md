# GUEST MESSAGE GENERATOR

## Application Purpose:

Allow hospitality workers to quickly and easily connect with their guests by automatically populating customizable message templates with guest-specific information.

## Application Overview:

When the application is mounted, an array of reservation objects is created using a class that is given arguments from JSON files. It is imagined that this functionality would run on a timer against batches of JSON files created by a reservation system.

The user of this application selects a reservation code comprised of a guest's name and the last four digits of the timestamp created when the guest books their stay (e.g., BridgettRichard9616). The reservation information is displayed for verification.

The user then selects a message type. There are several standard types (Reservation Made, Room Ready, Checked In), as well as a Custom message type which, when selected, presents the user with some information for using auto-replacement functionality to personalize and otherwise enhance their custom message.

The user then previews their message before sending their message. They are notified that their message has been sent.

### Prerequisites

Before getting started, one must have the following software installed on one's computer:

- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)

### Dependencies

- [Express]
- [jQuery]

### Snapshot of my package.json

{
"name": "kcodingproject",
"version": "1.0.0",
"main": "server.js",
"scripts": {
"test": "\"echo \\\"Error: no text specified\\\" && exit 1\"",
"start": "node server/server.js",
"server": "nodemon --watch server server/server.js"
},
"repository": {
"type": "git",
"url": "git+https://github.com/tyrichardson/kCodingProject.git"
},
"author": "Ty Richardson",
"license": "ISC",
"bugs": {
"url": "https://github.com/tyrichardson/kCodingProject/issues"
},
"homepage": "https://github.com/tyrichardson/kCodingProject#readme",
"description": "kcodingproject",
"dependencies": {
"express": "^4.17.1",
"jquery": "^3.6.0"
}
}

### Development Setup Instructions

- Run `npm install`
- Run `npm run server`
- Navigate to `localhost:5000`

### Lay of the Land

- `server/` contains Express App
- - `modules/` contains services used by server.js
- - `public/` contains index.html, style.css, js scripts, JSON files, favicon
- - - `vendors/` contains jquery.min.js
