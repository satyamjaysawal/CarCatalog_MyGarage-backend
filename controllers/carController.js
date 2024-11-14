const Car = require('../models/Car');

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const newCar = new Car({ ...req.body, user: req.user._id });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cars for the authenticated user
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user._id });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update car details
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Car not found' });
    }

    Object.assign(car, req.body);
    await car.save();
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || car.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Use deleteOne instead of remove
    await car.deleteOne();
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Global search on cars
exports.searchCars = async (req, res) => {
  const { keyword } = req.query;
  try {
    const cars = await Car.find({
      user: req.user._id,
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
