import {Injectable} from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Observable} from 'rxjs';
import decode from 'jwt-decode';
import {codes} from '../codes';


const poolData = {
  UserPoolId: codes.USER_POOL_ID,
  ClientId: codes.CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  cognitoUser: any;
  attr: any;

  constructor() {
  }

  register(email, password) {

    const attributeList = [];

    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log('signUp error', err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log('signUp success', result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  confirmAuthCode(code) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log('confirmAuthCode() success', result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password, newPassword = null) {

    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          observer.next(null);
          observer.complete();
        },
        onFailure: (err) => {
          console.log(err);
          observer.error(err);
        },
        newPasswordRequired: function(userAttributes) {
          if (newPassword == null) {
            observer.next(userAttributes);
          } else {
            delete userAttributes.email_verified;
            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, {
              onSuccess: () =>{
                observer.next();
                observer.complete();
              },
              onFailure: (err: any) => {
                console.log(err);
                observer.error(err);
              }
            });
            observer.next();
          }
          observer.complete();
        }
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }

  //TODO: BEFORE DECODING, CHECK IF USER IS LOGGED
  getAuthenticatedUserRole() {
    const userDecodedToken = this.decode();
    return userDecodedToken['custom:role'];
  }

  decode() {
    const userId = localStorage.getItem('CognitoIdentityServiceProvider.' + poolData.ClientId +'.LastAuthUser');
    return decode(localStorage.getItem('CognitoIdentityServiceProvider.' + poolData.ClientId + '.' + userId + '.idToken'));
  }
}
