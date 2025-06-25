import { auth } from '../services/firebase-web';

export const useUser = () => {
  const uid = auth?.currentUser?.uid;
  const fullName = auth?.currentUser?.displayName;
  const email = auth?.currentUser?.email;
  return {uid, email, fullName};
};
