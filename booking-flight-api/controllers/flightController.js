const fs = require('fs');
const Flight = require("../models/Flight");

exports.getAllFlight = (req, res) => {
    res.send(Flight);
};

exports.getFlight = (req, res) => {
    try {
        const id = req.params.id * 1;
        const flght = Flight.find((flight) => flight.id === id);
        if(!flight) throw new Error("Flght does not exist");

        return res.send(flight).status(200);
    } catch (err) {
        return res.status(404).json({
            status: "failed",
            msg: err.message,
        });
    }
};

exports.createFlight = (req, res) => {
    try {
        // verify if flight exist
        const id = req.body.id * 1;
        const flight = Flight.find((flight) => flight.id === id);
        console.log(flight);
        if(flight) throw new Error("This Flight Already exist...");

        //if flight does not exist, create a new flight
        Flight.push(req.body);

        let newFlight =JSON.stringify(Flight, null, 2);
        //adding new flight to the flight file structure
        fs.writeFileSync(`${__dirname}/../models/Flight.json`, newFlight);

        return res.status(200).json({
            status: "Success",
            msg: "Flight created successfully!!!",
        });
    } catch (err) {
        return res.status(404).json({
            status: "failed",
            msg: err.message,
        });
    }
};

exports.updateFlight = (req, res) => {
    try {
        const id = req.params * 1;
        const body = { ...req.body };

        let flight = Flight.find((flight) => flight.id === id);

        if(!flight) throw new Error("Flight Not Found");

        for(let key in body) {
            flight[key] = body[key]; 
        }

        let updateFlight = JSON.stringify(Flight, null, 2);
        //adding new flght to the flight file
        fs.writeFileSync(`${__dirname}/../models/Flight.json`, updateFlight);

        return res.status(200).json({
            status: "Success",
            msg: "Flight Updated successfully!!!",
        });   
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            msg: err.message,
        });
    }
};

exports.deleteFlight = (req, res) => {
    try {
        const id = req.params.id * 1;
        const flight = flight.find((flight) => flight.id === id);
        flight.indexOf;
        if(!flight) throw new Error("Flight not Found");

        const index = flight.findIndex((object) => {
            return object.id === id;
        });

        flight.splice(index, 1);

        let deleteFlight = JSON.stringify(Flight, null, 2);

        fs.writeFileSync(`${__dirname}/../models/Flight.json`, deleteFlight);

        return res.status(200).json({
            status: "Success",
            msg: "Flight Deleted successfully!!!",
        }); 
    } catch (err) { 
        return res.status(500).json({
            status: "failed",
            msg: err.message,
        });
    }
};