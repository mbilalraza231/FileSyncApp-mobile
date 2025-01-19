import { Filesystem } from '@capacitor/filesystem';

export const requestFilePermissions = async () => {
  const result = await Filesystem.requestPermissions();
  return result.publicStorage === 'granted';
};

export const fetchFilesFromDirectory = async (path) => {
  try {
    const result = await Filesystem.readdir({
      path,
      directory: 'Documents',
    });
    return result.files;
  } catch (error) {
    throw new Error('Error fetching files');
  }
}; 