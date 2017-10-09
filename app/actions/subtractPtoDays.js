import firebase, { firebaseRef, googleProvider } from 'app/firebase/';

export default (numberOfDays, startDate, description) => {
  return (dispatch, getState) => {
    const email = getState().auth.email;
    const employees = getState().recruiters;
    const recruiterObj = employees.find((rcruitr) => rcruitr.email === email);
    const daysRemaining = recruiterObj.daysLeft - numberOfDays;
    const ptoDescriptionRef = firebaseRef.child(`recruiters/${recruiterObj.id}/ptoDetails`);
    var recruiters = firebaseRef.child(`recruiters/${recruiterObj.id}`);
    return recruiters.child('daysLeft').set(daysRemaining)
      .then(() => {
        return ptoDescriptionRef.child('request').set({
          description,
          startDate,
        })
          .then(() => {
            console.log('successfully updated pto');
          })
          .catch((e) => console.log('error', e));
      })
      .catch((e) => {
        console.log('error in pto udpate', e);
      }
    )
  }
};
