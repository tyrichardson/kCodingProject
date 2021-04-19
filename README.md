# GUEST MESSAGE GENERATOR

## Application Purpose:

Allow hospitality workers to quickly and easily connect with their guests by automatically populating customizable message templates with guest-specific information.

## Application Overview:

When the application is mounted, an array of reservation objects is created using a class that is given arguments from JSON files. It is imagined that this functionality would run on a timer against batches of JSON files created by a reservation system.

The user of this application selects a reservation code comprised of a guest's name and the last four digits of the timestamp created when the guest books their stay (e.g., BridgettRichard9616). The reservation information is displayed for verification.

The user then selects a message type. There are several standard types (Reservation Made, Room Ready, Checked In), as well as a Custom message type which, when selected, presents the user with some information for using auto-replacement functionality to personalize and otherwise enhance their custom message.

The user must preview their message before it can be sent. They are notified that their message has been sent.

### Prerequisites

Before getting started, one must have the following software installed on one's computer:

- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)

### Dependencies

- Express
- jQuery

### Development Setup Instructions

- Run `npm install`
- Run `npm run server`
- Navigate to `localhost:5000`

### Lay of the Land

- `server/` contains Express App
- - `modules/` contains services used by server.js
- - `public/` contains index.html, style.css, js scripts, JSON files, favicon
- - - `vendors/` contains jquery.min.js
