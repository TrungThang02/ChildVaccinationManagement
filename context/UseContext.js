import {createContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';


export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({email:""});
  const [errMessage, setErrMessage] = useState(null);
  const Users = firestore().collection('users');

  let loginUser = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userEmail = userCredential.user.email;
      
      Users.doc(userEmail).onSnapshot(user => {
        if (!user.exists) {
          setErrMessage("Người dùng không tồn tại");
          return;
        }
        const userData = user.data();
        setUserInfo(userData);
        setErrMessage(null);
      });
    } catch (error) {
      setErrMessage(error.message);
    }
  };
  

  let logoutUser = () => {
    setUserInfo(null);
   
  };
  let contextData = {
    setUserInfo,
    errMessage,
    userInfo,
    loginUser,
    logoutUser,
    updateUserInformation
  };

  const updateUserInformation = async (newInfo) => {
    try {
      const userId = Users.id; 
      await db.collection('users').doc(userId).update(newInfo);

      console.log('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <UserContext.Provider value={{...contextData}}>{children}</UserContext.Provider>
  );
};