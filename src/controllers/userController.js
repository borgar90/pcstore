import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Definer tillatelser for hver rolle
const rolePermissions = {
  user: ['read_own_profile'],
  admin: ['read_own_profile', 'read_all_profiles', 'edit_all_profiles', 'delete_profiles', 'manage_categories', 'manage_products', 'super']
};

// Hjelpefunksjon for å sjekke tillatelser
const checkPermission = (role, permission) => {
  return rolePermissions[role] && rolePermissions[role].includes(permission);
};

export const getUserPermissions = async (req, res) => {
  const { userId } = req.params;
  const { permission } = req.query;

  if (!userId || userId === 'undefined') {
    return res.status(400).json({ message: 'Ugyldig bruker-ID' });
  }


  if (!permission) {
    return res.status(400).json({ message: 'Tillatelse må spesifiseres' });
  }

  try {
    const user = await User.findById(userId);

    
    if (!user) {
      return res.status(404).json({ message: 'Bruker ikke funnet' });
    }

    // Sjekk om den innloggede brukeren har tilgang til å sjekke tillatelser
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Ingen tilgang til å sjekke tillatelser for denne brukeren' });
    }

    const hasPermission = checkPermission(user.role, permission);
    
    res.json({ hasPermission });
  } catch (error) {
    console.error('Feil ved sjekking av brukertillatelser:', error);
    res.status(500).json({ message: 'Serverfeil ved sjekking av tillatelser' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};