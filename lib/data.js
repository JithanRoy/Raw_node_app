//dependencies
const fs = require('fs');
const path = require('path');

//module scaffolding
const lib = {};

//base directory of the data folder
lib.basedir = path.join(__dirname, '../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    //open file for writing
    fs.open(lib.basedir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            //convert data to string
            const stringData = JSON.stringify(data);

            //write data to file then close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if(!err2){
                    fs.close(fileDescriptor, (err3) => {
                        if(!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the new file');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            })
        } else {
            callback("failed!!! it may already exist");
        }
    })
}

//read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.basedir+dir+'/'+file+'.json', 'utf8', (err, data) => {
        callback(err, data);
    })
}

//update existing files
lib.update = (dir, file, data, callback) => {
    //file open for writing
    fs.open(lib.basedir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            //convert data to string
            const stringData = JSON.stringify(data);

            // truncate the file
            fs.truncate(fileDescriptor, (err2) => {
                if(!err2) {
                    // write to the file and close it
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if(!err3) {
                            //close tje file
                            fs.close(fileDescriptor, (err4) => {
                                if(!err4) {
                                    callback(false);
                                } else {
                                    callback('Error cloasing file');
                                }

                            });
                        }
                    })
                } else {
                    callback(`Error truncating file!`);
                }
            });
        } else {
            console.log(`Error updating. File may not exist`);
        }
    })
};

module.exports = lib;