import firebase, { firebaseRef, googleProvider } from 'app/firebase/';

export default (recruiter, numberOfDays) => {
  const daysRemaining = recruiter.daysLeft - numberOfDays;
  var recruiters = firebaseRef.child(`recruiters/${recruiter.id}`);
  return recruiters.child('daysLeft').set(daysRemaining)
     .then(() => {
       console.log('successfully updated pto');
     })
     .catch((e) => {
       console.log('error in pto udpate', e);
     })
};
