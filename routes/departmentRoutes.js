import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const router = express.Router();
const departmentsFilePath = './data/departments.json';

// Function to get departments data from file
function getDepartments() {
  return JSON.parse(fs.readFileSync(departmentsFilePath, 'utf8'));
}

// Function to save departments data to file
function saveDepartments(departments) {
  fs.writeFileSync(departmentsFilePath, JSON.stringify(departments, null, 2));
}

// Get all departments
router.get('/', (req, res) => {
  const departments = getDepartments();
  res.json(departments);
});

// Add a new department
router.post('/', (req, res) => {
  const departments = getDepartments();
  const newDepartment = { id: uuidv4(), ...req.body };
  departments.push(newDepartment);
  saveDepartments(departments);
  res.status(201).json(newDepartment);
});

// Update an existing department
router.put('/:id', (req, res) => {
  const departments = getDepartments();
  const departmentIndex = departments.findIndex(dept => dept.id === req.params.id);
  if (departmentIndex !== -1) {
    departments[departmentIndex] = { ...departments[departmentIndex], ...req.body };
    saveDepartments(departments);
    res.json(departments[departmentIndex]);
  } else {
    res.status(404).json({ message: 'Department not found' });
  }
});

// Delete a department
router.delete('/:id', (req, res) => {
  const departments = getDepartments();
  const updatedDepartments = departments.filter(dept => dept.id !== req.params.id);
  if (departments.length === updatedDepartments.length) {
    res.status(404).json({ message: 'Department not found' });
  } else {
    saveDepartments(updatedDepartments);
    res.status(204).send();
  }
});

export default router;
