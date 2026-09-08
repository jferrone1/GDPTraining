/**
 * IndexedDB storage utility for user-uploaded GDP Scene Storyboard images (GDP1.jpeg, GDP2.jpeg, GDP3.jpeg, GDP4.jpeg).
 * Persists user images locally in the browser so they remain loaded across refreshes.
 */

const DB_NAME = 'gdp_scene_images_db';
const DB_VERSION = 1;
const STORE_NAME = 'scene_images';

export type SceneImageKey = 'GDP1' | 'GDP2' | 'GDP3' | 'GDP4' | 'GDP5';

export const ORDERED_IMAGE_KEYS: SceneImageKey[] = ['GDP1', 'GDP2', 'GDP3', 'GDP4', 'GDP5'];

export interface StoredSceneImage {
  key: SceneImageKey;
  blob: Blob;
  name: string;
  size: number;
  type: string;
  updatedAt: number;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save an image file or blob into IndexedDB
 */
export async function saveSceneImage(key: SceneImageKey, file: File | Blob, filename?: string): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const record: StoredSceneImage = {
      key,
      blob: file,
      name: filename || (file instanceof File ? file.name : `${key}.jpeg`),
      size: file.size,
      type: file.type || 'image/jpeg',
      updatedAt: Date.now(),
    };

    const request = store.put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieve a specific scene image from IndexedDB
 */
export async function getSceneImage(key: SceneImageKey): Promise<StoredSceneImage | null> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Retrieve all stored scene images
 */
export async function getAllSceneImages(): Promise<Record<SceneImageKey, StoredSceneImage>> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const records = request.result as StoredSceneImage[];
      const map = {} as Record<SceneImageKey, StoredSceneImage>;
      for (const rec of records) {
        map[rec.key] = rec;
      }
      resolve(map);
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * Delete a specific scene image from IndexedDB
 */
export async function deleteSceneImage(key: SceneImageKey): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Clear all scene images
 */
export async function clearAllSceneImages(): Promise<void> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Intelligently map an uploaded filename to one of the 4 scene slots (GDP1, GDP2, GDP3, GDP4)
 */
export function identifyImageSlot(filename: string): SceneImageKey | null {
  const clean = filename.trim().toLowerCase();

  // Explicit GDP numbering: GDP1, GDP-1, GDP_1, GDP 1, GDP4.jpeg, GDP5.jpeg, and gsp4 variant
  if (/gdp[_\s-]?1\b|gdp1/i.test(clean)) return 'GDP1';
  if (/gdp[_\s-]?2\b|gdp2/i.test(clean)) return 'GDP2';
  if (/gdp[_\s-]?3\b|gdp3/i.test(clean)) return 'GDP3';
  if (/g[ds]p[_\s-]?4\b|g[ds]p4/i.test(clean)) return 'GDP4';
  if (/gdp[_\s-]?5\b|gdp5/i.test(clean)) return 'GDP5';

  // Slide or Scene numbering: slide1, scene1, shot1
  if (/(slide|scene|shot|image|img|frame)[_\s-]?1\b/i.test(clean)) return 'GDP1';
  if (/(slide|scene|shot|image|img|frame)[_\s-]?2\b/i.test(clean)) return 'GDP2';
  if (/(slide|scene|shot|image|img|frame)[_\s-]?3\b/i.test(clean)) return 'GDP3';
  if (/(slide|scene|shot|image|img|frame)[_\s-]?4\b/i.test(clean)) return 'GDP4';
  if (/(slide|scene|shot|image|img|frame)[_\s-]?5\b/i.test(clean)) return 'GDP5';

  // Standalone leading or trailing numbers: 1.jpeg, 01.png
  const numMatch = clean.match(/\b([1-5])\b/);
  if (numMatch) {
    const n = parseInt(numMatch[1], 10);
    if (n >= 1 && n <= 5) {
      return `GDP${n}` as SceneImageKey;
    }
  }

  return null;
}
