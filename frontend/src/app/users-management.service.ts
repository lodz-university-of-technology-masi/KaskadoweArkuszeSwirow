import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';

const AWS = require('aws-sdk');

@Injectable({
  providedIn: 'root'
})

export class UsersManagementService {
  private RECRUITER_ROLE = '0';
  private CANDIDATE_ROLE = '1';
  private RECRUITER_OWNER = '0';
  private auth: AuthenticationService;
  private UserPoolId = 'us-east-1_IBVZb8BoB';
  private cognitoidentityserviceprovider: any;

  constructor() {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: 'AKIAXHL3HMQ2CE3EBWJS',
      secretAccessKey: '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'
    });
    this.cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
  }

  deleteUser(username) {
    const params = {
      UserPoolId: this.UserPoolId,
      Username: username
    };
    this.cognitoidentityserviceprovider.adminDeleteUser(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  }

  getUsers(username) {
    const params = {
      UserPoolId: this.UserPoolId,
      AttributesToGet: [
        'email',
        'given_name',
        'family_name',
        'custom:role',
        'custom:recruiter'

      ],
      // Filter:  `custom:recruiter = \"${username}\"` nie mozna tak :(
    };

    return Observable.create(observer => {
      this.cognitoidentityserviceprovider.listUsers(params, (err, data) => {
        if (err) {
          observer.next([]);
          console.log(err, err.stack);
        } else {
          observer.next(data.Users.filter((element, index, array) => {
            return element.Attributes[2].Value === username;
          }));
        }
        observer.complete();
      });
    });

  }

  createCandidate(email, firstName, lastName, recruiterUsername) {
    this.createUser(email, firstName, lastName, recruiterUsername, this.CANDIDATE_ROLE);
  }

  createRecruiter(email, firstName, lastName) {
    this.createUser(email, firstName, lastName, this.RECRUITER_OWNER, this.RECRUITER_ROLE);
  }

  private createUser(email, firstName, lastName, recruiter, role) {
    const params = {
      UserPoolId: this.UserPoolId,
      Username: email,
      DesiredDeliveryMediums: [
        'EMAIL',
      ],
      UserAttributes: [
        {
          Name: 'email',
          Value: email
        },
        {
          Name: 'given_name',
          Value: firstName
        },
        {
          Name: 'family_name',
          Value: lastName
        },
        {
          Name: 'custom:role',
          Value: role
        },
        {
          Name: 'custom:recruiter',
          Value: recruiter
        }

      ]
    };
    this.cognitoidentityserviceprovider.adminCreateUser(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    });
  }
}
