import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {codes} from '../../app/codes';
import { HttpClient } from '@angular/common/http';

const AWS = require('aws-sdk');

@Injectable({
  providedIn: 'root'
})

export class UsersManagementService {
  private RECRUITER_ROLE = '0';
  private CANDIDATE_ROLE = '1';
  private RECRUITER_OWNER = '0';
  private auth: AuthenticationService;
  private UserPoolId = codes.USER_POOL_ID;
  private cognitoidentityserviceprovider: any;

  constructor(private http: HttpClient) {
    AWS.config.update({
      region: codes.REGION,
      // accessKeyId: codes.ACCESS_KEY_ID,
      // secretAccessKey: codes.SECRET_ACCESS_KEY
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

  getAllUsers() {
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
      this.http.get(`https://kn0z5zq8j2.execute-api.us-east-1.amazonaws.com/new/user`).subscribe(
        (res) => {
          let temp = res as [];
          observer.next(res);
          // return res;
        }, 
        (err) => {
          console.log(err)
        }
      )
    });
  }

  getAllCandidates() {

    return Observable.create(observer => {
      this.getAllUsers().subscribe(
        (res) => {
          console.log(res);
          let candidates = res.filter(user => user.attributes[5].value == "1");
          observer.next(candidates);
          observer.complete()
        }, 
        (err) => {
          console.log(err)
          observer.complete()
        }
      );
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
