import CustomPc from '../models/CustomPc.js';

export const getAllCustomPcs = async (req, res) => {
  try {
    const customPcs = await CustomPc.find().populate('user').populate('parts.part');
    res.json(customPcs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom PCs', error: error.message });
  }
};

export const getCustomPcById = async (req, res) => {
  try {
    const customPc = await CustomPc.findById(req.params.id).populate('user').populate('parts.part');
    if (!customPc) {
      return res.status(404).json({ message: 'Custom PC not found' });
    }
    res.json(customPc);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching custom PC', error: error.message });
  }
};

export const createCustomPc = async (req, res) => {
  try {
    const customPc = new CustomPc(req.body);
    await customPc.save();
    res.status(201).json(customPc);
  } catch (error) {
    res.status(400).json({ message: 'Error creating custom PC', error: error.message });
  }
};

export const updateCustomPc = async (req, res) => {
  try {
    const customPc = await CustomPc.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!customPc) {
      return res.status(404).json({ message: 'Custom PC not found' });
    }
    res.json(customPc);
  } catch (error) {
    res.status(400).json({ message: 'Error updating custom PC', error: error.message });
  }
};

export const deleteCustomPc = async (req, res) => {
  try {
    const customPc = await CustomPc.findByIdAndDelete(req.params.id);
    if (!customPc) {
      return res.status(404).json({ message: 'Custom PC not found' });
    }
    res.json({ message: 'Custom PC deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting custom PC', error: error.message });
  }
};