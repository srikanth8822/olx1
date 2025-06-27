const API_BASE_URL = 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const getFormHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Authentication APIs
export const authAPI = {
  register: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/authentication/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials: any) => {
    const response = await fetch(`${API_BASE_URL}/authentication/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  getUser: async () => {
    const response = await fetch(`${API_BASE_URL}/authentication/auth_user`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  updateUser: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/authentication/auth_user`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  updatePassword: async (passwordData: any) => {
    const response = await fetch(`${API_BASE_URL}/authentication/update_password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(passwordData)
    });
    return response.json();
  },

  uploadDisplayPicture: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/authentication/display_picture`, {
      method: 'POST',
      headers: getFormHeaders(),
      body: formData
    });
    return response.json();
  }
};

// Ad Posts APIs
export const adPostsAPI = {
  getAll: async (filters?: any) => {
    const params = filters ? new URLSearchParams(filters).toString() : '';
    const response = await fetch(`${API_BASE_URL}/adposts${params ? `?${params}` : ''}`);
    return response.json();
  },

  getByIds: async (ids: string[]) => {
    const response = await fetch(`${API_BASE_URL}/adposts_by_ids`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    return response.json();
  },

  create: async (adData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/adposts`, {
      method: 'POST',
      headers: getFormHeaders(),
      body: adData
    });
    return response.json();
  },

  getMyAds: async () => {
    const response = await fetch(`${API_BASE_URL}/adposts/my_ads`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  update: async (adData: any) => {
    const response = await fetch(`${API_BASE_URL}/adposts/update`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(adData)
    });
    return response.json();
  },

  markInactive: async (adId: string) => {
    const response = await fetch(`${API_BASE_URL}/adposts/mark_as_inactive`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adId })
    });
    return response.json();
  },

  publish: async (adId: string) => {
    const response = await fetch(`${API_BASE_URL}/adposts/publish`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adId })
    });
    return response.json();
  },

  remove: async (adId: string) => {
    const response = await fetch(`${API_BASE_URL}/adposts/remove`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adId })
    });
    return response.json();
  },

  makeFeatured: async (adId: string) => {
    const response = await fetch(`${API_BASE_URL}/adposts/make_featured`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adId })
    });
    return response.json();
  },

  markSold: async (adId: string) => {
    const response = await fetch(`${API_BASE_URL}/adposts/mark_as_sold`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adId })
    });
    return response.json();
  },

  uploadFile: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/adposts/upload_file`, {
      method: 'POST',
      headers: getFormHeaders(),
      body: formData
    });
    return response.json();
  },

  deleteAsset: async (assetId: string) => {
    const response = await fetch(`${API_BASE_URL}/adposts/delete_asset`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ asset_id: assetId })
    });
    return response.json();
  }
};

// Favorites APIs
export const favoritesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/favourite_adposts`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  add: async (adpostId: string) => {
    const response = await fetch(`${API_BASE_URL}/add_to_favourite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adpostId })
    });
    return response.json();
  },

  remove: async (adpostId: string) => {
    const response = await fetch(`${API_BASE_URL}/remove_from_favourite`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adpostId })
    });
    return response.json();
  }
};

// Chat APIs
export const chatAPI = {
  initiate: async (adpostId: string, sellerId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/initiate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ adpost_id: adpostId, seller_id: sellerId })
    });
    return response.json();
  },

  send: async (conversationId: string, message: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/send`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ conversation_id: conversationId, message })
    });
    return response.json();
  },

  getConversations: async () => {
    const response = await fetch(`${API_BASE_URL}/chat/conversations`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  getMessages: async (conversationId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/messages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ conversation_id: conversationId })
    });
    return response.json();
  },

  deactivate: async (conversationId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/deactivate`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ conversation_id: conversationId })
    });
    return response.json();
  },

  remove: async (conversationId: string) => {
    const response = await fetch(`${API_BASE_URL}/chat/removeConversation`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ conversation_id: conversationId })
    });
    return response.json();
  }
};

// Data APIs
export const dataAPI = {
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
  },

  getCities: async () => {
    const response = await fetch(`${API_BASE_URL}/cities`);
    return response.json();
  }
};

// Package APIs
export const packageAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/packages`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  subscribe: async (packageId: string) => {
    const response = await fetch(`${API_BASE_URL}/packages/subscribe`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ package_id: packageId })
    });
    return response.json();
  }
};

// Admin APIs
export const adminAPI = {
  updateUserStatus: async (userId: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/updateUserStatus`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ user_id: userId, status })
    });
    return response.json();
  },

  getUsersList: async (page: number = 1, limit: number = 10) => {
    const response = await fetch(`${API_BASE_URL}/admin/usersList`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ page, limit })
    });
    return response.json();
  }
};

// Utility APIs
export const utilityAPI = {
  ping: async () => {
    const response = await fetch(`${API_BASE_URL}/ping`);
    return response.json();
  },

  home: async () => {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.text();
  },

  about: async () => {
    const response = await fetch(`${API_BASE_URL}/about`);
    return response.text();
  },

  protectedEndpoint: async () => {
    const response = await fetch(`${API_BASE_URL}/protected_endpoint`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }
};