// Mock implementations for web compatibility
export const Q = {
  where: (field: string, value?: any) => ({ field, value, type: 'where' }),
};

// Mock database collections
const mockData = {
  messages: [],
  channels: [],
};

const createMockObservable = (data: any[]) => ({
  observe: () => ({
    subscribe: (callback: Function) => {
      callback(data);
      return { unsubscribe: () => {} };
    },
  }),
  observeWithColumns: (columns: string[]) => ({
    subscribe: (callback: Function) => {
      callback(data);
      return { unsubscribe: () => {} };
    },
  }),
  count: Promise.resolve(data.length),
});

const createMockCollection = (name: string) => ({
  query: (...args: any[]) => createMockObservable(mockData[name]),
  create: async (callback: Function) => {
    const item = { id: Date.now().toString() };
    callback(item);
    return item;
  },
});

export const database = {
  collections: {
    get: (name: string) => createMockCollection(name),
  },
  write: async (callback: Function) => {
    return await callback();
  },
};

// Mock helper functions
export const messageCollection = createMockCollection('messages');
export const channelCollection = createMockCollection('channels');

export const observeMessage = () => createMockObservable([]);
export const observeChannels = () => createMockObservable([]);
export const observeChannelCount = () => createMockObservable([]);
export const observeUnreadCount = (id: string) => createMockObservable([]);
export const unreadCount = () => createMockObservable([]);
export const observeDeliveryStatus = () => createMockObservable([]);

export const offlineMessages = async () => [];
export const addChannel = async (data: any) => ({ id: Date.now().toString(), ...data });
export const sendMessage = async (data: any) => ({ id: Date.now().toString(), ...data });
export const updateDeliveryStatus = async (status: string, messageID: string) => {};
export const updateAllDeliveryStatus = async (status: string, patient: string, type: string) => {};

// Mock withObservables for React components
export const withObservables = (keys: string[], observablesForProps: Function) => (Component: any) => {
  return (props: any) => {
    // Return the component with empty observables for web
    const mockObservables = {};
    return Component({ ...props, ...mockObservables });
  };
};
