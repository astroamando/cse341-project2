const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all aircraft
const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .collection('aircraft')
      .find();

    const aircraft = await result.toArray();
    res.status(200).json(aircraft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one aircraft
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid aircraft ID' });
    }

    const aircraftId = new ObjectId(req.params.id);

    const aircraft = await mongodb
      .getDb()
      .collection('aircraft')
      .findOne({ _id: aircraftId });

    if (!aircraft) {
      return res.status(404).json({ message: 'Aircraft not found' });
    }

    res.status(200).json(aircraft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE aircraft
const createAircraft = async (req, res) => {
  try {
    const {
      manufacturer,
      model,
      type,
      maxSpeed,
      range,
      crew,
      firstFlight,
      status
    } = req.body;

    if (
      !manufacturer ||
      !model ||
      !type ||
      maxSpeed === undefined ||
      range === undefined ||
      crew === undefined ||
      !firstFlight ||
      !status
    ) {
      return res.status(400).json({
        message: 'All aircraft fields are required'
      });
    }

    const aircraft = {
      manufacturer,
      model,
      type,
      maxSpeed,
      range,
      crew,
      firstFlight,
      status
    };

    const response = await mongodb
      .getDb()
      .collection('aircraft')
      .insertOne(aircraft);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Aircraft created successfully',
        id: response.insertedId
      });
    } else {
      res.status(500).json({ message: 'Could not create aircraft' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE aircraft
const updateAircraft = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid aircraft ID' });
    }

    const {
      manufacturer,
      model,
      type,
      maxSpeed,
      range,
      crew,
      firstFlight,
      status
    } = req.body;

    if (
      !manufacturer ||
      !model ||
      !type ||
      maxSpeed === undefined ||
      range === undefined ||
      crew === undefined ||
      !firstFlight ||
      !status
    ) {
      return res.status(400).json({
        message: 'All aircraft fields are required'
      });
    }

    const aircraft = {
      manufacturer,
      model,
      type,
      maxSpeed,
      range,
      crew,
      firstFlight,
      status
    };

    const response = await mongodb
      .getDb()
      .collection('aircraft')
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        aircraft
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Aircraft not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE aircraft
const deleteAircraft = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid aircraft ID' });
    }

    const response = await mongodb
      .getDb()
      .collection('aircraft')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Aircraft not found' });
    }

    res.status(200).json({
      message: 'Aircraft deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAircraft,
  updateAircraft,
  deleteAircraft
};