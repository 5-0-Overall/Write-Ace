export enum Role {
    USER = 'user',
    ADMIN = 'admin',
    TEACHER = 'teacher'
  }


  export const roleMap=new Map<number,string>([
    [0,Role.USER],
    [1,Role.ADMIN],
    [2,Role.TEACHER]
  ])


