export class User {
    constructor(id: string, name: string, surname: string, email: string, role: boolean){
      this.id = id;
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.role = role;
    }

    id: string;
    name: string;
    surname: string;
    email: string;
    role: boolean;
  }
  