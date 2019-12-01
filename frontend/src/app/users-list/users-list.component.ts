import {Component, OnInit} from '@angular/core';

const AWS = require('aws-sdk');

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersListCognito = [];

  constructor() {
  }

  ngOnInit(): void {

    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: 'AKIAXHL3HMQ2CE3EBWJS',
      secretAccessKey: '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'
    });

    const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
    const params = {
      UserPoolId: 'us-east-1_IBVZb8BoB',
      AttributesToGet: [
        'email'

      ]
    };

    cognitoidentityserviceprovider.listUsers(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        this.usersListCognito = data.Users;
        console.log(data.Users);
      }           // successful response
    });

    /* const params3 = {
       UserPoolId: 'us-east-1_IBVZb8BoB',
       Username: '17355856-1c01-4210-ba24-57a293265f34'
     };

     cognitoidentityserviceprovider.adminGetUser(params3, (err, data) => {
       if (err) {
         console.log(err, err.stack);
       } else {
         console.log(data);
       }           // successful response
     });*/
    /*const params2 = {
      CustomAttributes: [
        {
          AttributeDataType: 'Number',
          Mutable: true,
          Name: 'role',
          NumberAttributeConstraints: {
            MaxValue: '1',
            MinValue: '0'
          },
          Required: false
        },

      ],
      UserPoolId: 'us-east-1_IBVZb8BoB'
    };
    cognitoidentityserviceprovider.addCustomAttributes(params2, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }           // successful response
    });*/

    /*const params2 = {
      UserAttributes: [
        {
          Name: 'custom:role',
          Value: '0'
        },

      ],
      UserPoolId: 'us-east-1_IBVZb8BoB',
      Username: '17355856-1c01-4210-ba24-57a293265f34'
    };*/

    /* cognitoidentityserviceprovider.adminUpdateUserAttributes(params2, (err, data) => {
       if (err) {
         console.log(err, err.stack);
       } else {
         console.log(data);
       }           // successful response
     });*/
  }


}
