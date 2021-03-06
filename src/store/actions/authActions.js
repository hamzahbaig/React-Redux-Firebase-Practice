export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        if (newUser.userType == "Individual") {
          return firestore.collection("users").doc(resp.user.uid).set({
            firstName: newUser.individualFirstName,
            lastName: newUser.individualLastName,
            city: newUser.individualCity,
            address: newUser.individualAddress,
            contact: newUser.individualContact,
            cnic: newUser.individualCNIC,
            email: newUser.email,
            NGO: false,
          });
        } else {
          return firestore.collection("users").doc(resp.user.uid).set({
            email: newUser.email,
            ngoName: newUser.ngoName,
            ngoEmail: newUser.ngoEmail,
            ngoCity: newUser.ngoCity,
            ngoAddress: newUser.ngoAddress,
            ngoContact: newUser.ngoContact,
            ngoWebsiteLink: newUser.ngoWebsiteLink,
            NGO: true,
          });
        }
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};
