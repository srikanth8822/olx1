export const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Authentication APIs
  REGISTER: '/authentication/register',
  LOGIN: '/authentication/login',
  AUTH_USER: '/authentication/auth_user',
  UPDATE_PASSWORD: '/authentication/update_password',
  DISPLAY_PICTURE: '/authentication/display_picture',
  GET_DISPLAY_PICTURES: '/display_pictures',

  // Admin APIs
  UPDATE_USER_STATUS: '/admin/updateUserStatus',
  USERS_LIST: '/admin/usersList',

  // Package & Subscription APIs
  PACKAGES: '/packages',
  SUBSCRIBE: '/packages/subscribe',

  // Ad Posts APIs
  ADPOSTS: '/adposts',
  ADPOSTS_BY_IDS: '/adposts_by_ids',
  MY_ADS: '/adposts/my_ads',
  UPDATE_AD: '/adposts/update',
  MARK_INACTIVE: '/adposts/mark_as_inactive',
  PUBLISH_AD: '/adposts/publish',
  REMOVE_AD: '/adposts/remove',
  MAKE_FEATURED: '/adposts/make_featured',
  MARK_SOLD: '/adposts/mark_as_sold',
  UPLOAD_FILE: '/adposts/upload_file',
  DELETE_ASSET: '/adposts/delete_asset',
  ADPOST_ASSETS: '/adpost_assets',

  // Favorites APIs
  FAVOURITE_ADPOSTS: '/favourite_adposts',
  ADD_TO_FAVOURITE: '/add_to_favourite',
  REMOVE_FROM_FAVOURITE: '/remove_from_favourite',

  // Chat APIs
  CHAT_INITIATE: '/chat/initiate',
  CHAT_SEND: '/chat/send',
  CHAT_CONVERSATIONS: '/chat/conversations',
  CHAT_MESSAGES: '/chat/messages',
  CHAT_DEACTIVATE: '/chat/deactivate',
  CHAT_REMOVE: '/chat/removeConversation',

  // Data APIs
  CATEGORIES: '/categories',
  CITIES: '/cities',

  // Utility APIs
  HOME: '/',
  ABOUT: '/about',
  PROTECTED: '/protected_endpoint',
  PING: '/ping'
};