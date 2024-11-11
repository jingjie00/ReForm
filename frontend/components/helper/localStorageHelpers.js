
// Key to store records in localStorage
const LOCAL_STORAGE_KEY = 'records';

/**
 * Save records to localStorage
 * @param {Array} records - Array of record objects to save
 */
export const saveRecordsToLocalStorage = (records) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Failed to save records to localStorage:', error);
  }
};

/**
 * Load records from localStorage
 * @returns {Array} - Array of record objects loaded from localStorage, or an empty array if not found
 */
export const loadRecordsFromLocalStorage = () => {
  try {
    const savedRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedRecords ? JSON.parse(savedRecords) : [];
  } catch (error) {
    console.error('Failed to load records from localStorage:', error);
    return [];
  }
};

/**
 * Initialize records in localStorage if they don't already exist
 * @param {Array} initialRecords - Default array of records to initialize with, if localStorage is empty
 */
export const initializeLocalStorageWithDefaultRecords = (initialRecords = []) => {
  const existingRecords = loadRecordsFromLocalStorage();
  if (existingRecords.length === 0) {
    saveRecordsToLocalStorage(initialRecords);
  }
};

