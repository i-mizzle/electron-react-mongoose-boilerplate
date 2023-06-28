// const electron = require('electron');
// const path = require('path');
// const mongoose = require('mongoose');

// // const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

// const { app, BrowserWindow } = electron;

// let mainWindow;
// let win

// function createWindow() {
//     mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true,
//             preload: path.join(__dirname, 'preload.js'),
//         },
//     });

//     // mainWindow.loadURL('http://localhost:3000');
//     win.webContents.openDevTools();
//     win.loadFile('index.html');

//     mainWindow.on('closed', function () {
//         mainWindow = null;
//     });

//     //   installExtension(REACT_DEVELOPER_TOOLS)
//     //   .then(name => console.log(`Added Extension: ${name}`))
//     //   .catch(err => console.log('An error occurred: ', err));

//     mongoose.connect('mongodb://localhost:27017/mydatabase', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });

//     const db = mongoose.connection;
//         db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//         db.once('open', () => {
//         console.log('Connected to MongoDB');
//     });

//     const sampleSchema = new mongoose.Schema({
//         name: String,
//         email: String,
//     });
    
//     const SampleModel = mongoose.model('Sample', sampleSchema);
    
//     // Create a new document
//     const sampleData = new SampleModel({
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//     });
    
//     // Save the document to MongoDB
//     sampleData.save((err, savedSample) => {
//     if (err) {
//         console.error('Error saving sample data:', err);
//     } else {
//         console.log('Sample data saved:', savedSample);
//     }
//     });


// }

// app.on('ready', function () {
//     createWindow();
//     //   installExtension(REACT_DEVELOPER_TOOLS)
//     //     .then(name => console.log(`Added Extension: ${name}`))
//     //     .catch(err => console.log('An error occurred: ', err));
// });

// app.on('window-all-closed', function () {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', function () {
//     if (mainWindow === null) {
//         createWindow();
//     }
// });


const { app, BrowserWindow } = require('electron');
const path = require('path');
const mongoose = require('mongoose');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the index.html file.
  win.loadFile('index.html');
  win.loadURL('http://localhost:3000');

  // Open the DevTools console.
  win.webContents.openDevTools();

  // Mongoose connection
  mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  // Rest of the code...
  const sampleSchema = new mongoose.Schema({
        name: String,
        email: String,
    });
    
    const SampleModel = mongoose.model('Sample', sampleSchema);
    
    // Create a new document
    const sampleData = new SampleModel({
        name: 'John Doe',
        email: 'johndoe@example.com',
    });
    
    // Save the document to MongoDB
    sampleData.save((err, savedSample) => {
    if (err) {
        console.error('Error saving sample data:', err);
    } else {
        console.log('Sample data saved:', savedSample);
    }
    });
}

// Event handler for when Electron has finished initializing
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Event handler for activating the application (macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
