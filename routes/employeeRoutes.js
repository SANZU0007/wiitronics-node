import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const router = express.Router();
const employeesFilePath = './data/employees.json';

// Function to get employees data from file
function getEmployees() {
  return JSON.parse(fs.readFileSync(employeesFilePath, 'utf8'));
}

// Function to save employees data to file
function saveEmployees(employees) {
  fs.writeFileSync(employeesFilePath, JSON.stringify(employees, null, 2));
}

// Get all employees
router.get('/', (req, res) => {
  const employees = getEmployees();
  res.json(employees);
});

// Add a new employee
router.post('/', (req, res) => {
  const employees = getEmployees();
  const newEmployee = { id: uuidv4(), ...req.body };
  employees.push(newEmployee);
  saveEmployees(employees);
  res.status(201).json(newEmployee);
});

// Update an existing employee
router.put('/:id', (req, res) => {
  const employees = getEmployees();
  const employeeIndex = employees.findIndex(emp => emp.id === req.params.id);
  if (employeeIndex !== -1) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
    saveEmployees(employees);
    res.json(employees[employeeIndex]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Delete an employee
router.delete('/:id', (req, res) => {
  const employees = getEmployees();
  const updatedEmployees = employees.filter(emp => emp.id !== req.params.id);
  if (employees.length === updatedEmployees.length) {
    res.status(404).json({ message: 'Employee not found' });
  } else {
    saveEmployees(updatedEmployees);
    res.status(204).send();
  }
});

export default router;
