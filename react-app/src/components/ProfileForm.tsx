import { useState } from "react";
import { authAPI } from "../services/api";

interface ProfileFormProps {
  user: any;
  onUpdate: () => void;
}

const ProfileForm = ({ user, onUpdate }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || ''
  });

  const handleSave = async () => {
    try {
      const result = await authAPI.updateUser(formData);
      if (result.message === 'User updated successfully') {
        alert('Profile updated successfully!');
        setIsEditing(false);
        onUpdate();
      } else {
        alert(result.error || 'Update failed');
      }
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name *</label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name *</label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => setFormData({...formData, last_name: e.target.value})}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full p-3 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            disabled={!isEditing}
            className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            disabled={!isEditing}
            className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100"
            rows={3}
            placeholder="Street address"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({...formData, pincode: e.target.value})}
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded disabled:bg-gray-100"
            />
          </div>
        </div>
        
        {isEditing && (
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;