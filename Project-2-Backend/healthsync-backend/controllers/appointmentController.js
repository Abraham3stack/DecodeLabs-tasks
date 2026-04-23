import Appointment from "../models/Appointment.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

// GET all appointments
export const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    data: appointments,
  });
});

// GET single appointment
export const getAppointmentById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid appointment ID");
  }

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});

// POST create appointment
export const createAppointment = asyncHandler(async (req, res) => {
  const { name, email, date, message } = req.body;

  if (!name || !email || !date) {
    res.status(400);
    throw new Error("Please fill required fields");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    res.status(400);
    throw new Error("Please enter a valid email");
  }

  const safeData = {
    name: String(name).trim(),
    email: String(email).toLowerCase().trim(),
    date: new Date(date),
    message: message ? String(message).trim() : undefined,
  };

  if (isNaN(safeData.date.getTime())) {
    res.status(400);
    throw new Error("Invalid date format");
  }

  const appointment = await Appointment.create(safeData);

  res.status(201).json({
    success: true,
    data: appointment,
  });
});

// PUT update appointment
export const updateAppointment = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid appointment ID");
  }

  const { name, email, date, message } = req.body;

  const updateData = {};

  if (name !== undefined) {
    updateData.name = String(name).trim();
  }

  if (email !== undefined) {
    if (!/\S+@\S+\.\S+/.test(email)) {
      res.status(400);
      throw new Error("Please enter a valid email");
    }
    updateData.email = String(email).toLowerCase().trim();
  }

  if (date !== undefined) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      res.status(400);
      throw new Error("Invalid date format");
    }
    updateData.date = parsedDate;
  }

  if (message !== undefined) {
    updateData.message = String(message).trim();
  }

  const updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  );

  if (!updated) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  res.status(200).json({
    success: true,
    data: updated,
  });
});

// Delete appointment
export const deleteAppointment = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid appointment ID");
  }

  const deleted = await Appointment.findByIdAndDelete(req.params.id);

  if (!deleted) {
    res.status(404);
    throw new Error("Appointment not found");
  }

  res.status(200).json({
    success: true,
    message: "Appointment deleted",
  });
});