const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all missions
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('missions').find();
    const missions = await result.toArray();
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET one mission
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid mission ID' });
    }

    const mission = await mongodb
      .getDb()
      .collection('missions')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }

    res.status(200).json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE mission
const createMission = async (req, res) => {
  try {
    const {
      name,
      agency,
      vehicle,
      destination,
      launchDate,
      status,
      crewSize
    } = req.body;

    if (
      !name ||
      !agency ||
      !vehicle ||
      !destination ||
      !launchDate ||
      !status ||
      crewSize === undefined
    ) {
      return res.status(400).json({
        message: 'All mission fields are required'
      });
    }

    const mission = {
      name,
      agency,
      vehicle,
      destination,
      launchDate,
      status,
      crewSize
    };

    const response = await mongodb
      .getDb()
      .collection('missions')
      .insertOne(mission);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Mission created successfully',
        id: response.insertedId
      });
    } else {
      res.status(500).json({ message: 'Could not create mission' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE mission
const updateMission = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid mission ID' });
    }

    const {
      name,
      agency,
      vehicle,
      destination,
      launchDate,
      status,
      crewSize
    } = req.body;

    if (
      !name ||
      !agency ||
      !vehicle ||
      !destination ||
      !launchDate ||
      !status ||
      crewSize === undefined
    ) {
      return res.status(400).json({
        message: 'All mission fields are required'
      });
    }

    const mission = {
      name,
      agency,
      vehicle,
      destination,
      launchDate,
      status,
      crewSize
    };

    const response = await mongodb
      .getDb()
      .collection('missions')
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        mission
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Mission not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE mission
const deleteMission = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid mission ID' });
    }

    const response = await mongodb
      .getDb()
      .collection('missions')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Mission not found' });
    }

    res.status(200).json({
      message: 'Mission deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMission,
  updateMission,
  deleteMission
};