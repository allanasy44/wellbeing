// Firebase Web SDK compatibility layer
import { Platform } from 'react-native';

// Mock Firebase types for web compatibility
export interface FirebaseFirestoreTypes {
  DocumentData: any;
  DocumentSnapshot: any;
  QuerySnapshot: any;
  QueryDocumentSnapshot: any;
}

// Mock Firebase Auth
const createMockAuth = () => ({
  currentUser: null,
  onAuthStateChanged: (callback: Function) => {
    // Mock user for demo
    setTimeout(() => {
      callback({
        uid: 'demo-user-123',
        email: 'demo@example.com',
        displayName: 'Demo User'
      });
    }, 100);
    return () => {}; // unsubscribe function
  },
  signInWithEmailAndPassword: async (email: string, password: string) => ({
    user: {
      uid: 'demo-user-123',
      email,
      displayName: 'Demo User'
    }
  }),
  createUserWithEmailAndPassword: async (email: string, password: string) => ({
    user: {
      uid: 'demo-user-123',
      email,
      displayName: 'Demo User'
    }
  }),
  signOut: async () => {},
  sendPasswordResetEmail: async (email: string) => {},
});

// Mock Firestore
const createMockFirestore = () => ({
  collection: (path: string) => ({
    doc: (id?: string) => ({
      get: async () => ({
        exists: true,
        data: () => ({ id: id || 'mock-id', name: 'Mock Data' }),
        id: id || 'mock-id'
      }),
      set: async (data: any) => {},
      update: async (data: any) => {},
      delete: async () => {},
      onSnapshot: (callback: Function) => {
        callback({
          exists: true,
          data: () => ({ id: id || 'mock-id', name: 'Mock Data' }),
          id: id || 'mock-id'
        });
        return () => {}; // unsubscribe
      }
    }),
    where: (field: string, operator: string, value: any) => ({
      get: async () => ({
        docs: [],
        forEach: (callback: Function) => {},
        size: 0
      }),
      onSnapshot: (callback: Function) => {
        callback({
          docs: [],
          forEach: (callback: Function) => {},
          size: 0
        });
        return () => {}; // unsubscribe
      }
    }),
    orderBy: (field: string, direction?: string) => ({
      get: async () => ({
        docs: [],
        forEach: (callback: Function) => {},
        size: 0
      }),
      limit: (num: number) => ({
        get: async () => ({
          docs: [],
          forEach: (callback: Function) => {},
          size: 0
        })
      })
    }),
    add: async (data: any) => ({
      id: Date.now().toString()
    }),
    get: async () => ({
      docs: [],
      forEach: (callback: Function) => {},
      size: 0
    })
  }),
  doc: (path: string) => ({
    get: async () => ({
      exists: true,
      data: () => ({ id: 'mock-id', name: 'Mock Data' }),
      id: 'mock-id'
    }),
    set: async (data: any) => {},
    update: async (data: any) => {},
    delete: async () => {}
  })
});

// Mock Storage
const createMockStorage = () => ({
  ref: (path?: string) => ({
    putFile: async (filePath: string) => ({
      state: 'success',
      downloadURL: 'https://example.com/mock-file.jpg'
    }),
    getDownloadURL: async () => 'https://example.com/mock-file.jpg',
    delete: async () => {}
  })
});

// Export mock instances
export const auth = createMockAuth();
export const firestore = createMockFirestore();
export const storage = createMockStorage();

// Mock additional functions
export const addDoc = async (collection: any, data: any) => ({
  id: Date.now().toString()
});

// Default exports to match react-native-firebase structure
export default {
  auth: () => auth,
  firestore: () => firestore,
  storage: () => storage
};
