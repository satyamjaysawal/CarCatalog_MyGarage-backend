const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  searchCars,
} = require('../controllers/carController');

// Car Routes
router.post('/', authMiddleware, createCar);
router.get('/', authMiddleware, getCars);
router.get('/search', authMiddleware, searchCars);
router.get('/:id', authMiddleware, getCarById);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);

module.exports = router;
