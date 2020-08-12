import React from 'react';
import firebase from '../firebase';

const UseUploadImg = async (image) => {

  let filesDir = image;

  let storageRef = firebase.storage().ref(`images/${filesDir.name}`);

  if (typeof (image) === "string") {
    return filesDir;
  } else {
    await storageRef.put(filesDir).catch((error) => { throw error })
    const url = await storageRef.getDownloadURL().catch((error) => { throw error });
    return url;
  }

}


export default UseUploadImg;
