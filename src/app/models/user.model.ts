// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   gender: 'male' | 'female';
//   position: string;
//   role: 'user' | 'admin';
//   department: string;
//   status: 'active' | 'inactive';
// }


// export class UserQuery {
//   search?: string;
//   page = 1;
//   limit = 10;
//   status = '';
//   department = '';
// }

export class User {
  id!: number;
  fname!: string;
  lname!: string;
  email!: string;
  phone!: string;
  gender!: 'male' | 'female';
  position!: string;
  role!: 'user' | 'admin';
  department!: string;
  status!: 'active' | 'inactive';
  // search?: string;

  //  page?: number;
  // limit?: number;
  // totalPage?: number;
}

export class UserQuery {
  search = '';
  page = 1;
  limit = 10;
  status = '';
  department = '';
}
