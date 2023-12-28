

export interface AuthState {
    isAuth: boolean;
    username: string;
    uid: string;
    isAdmin: boolean;
    token: string;
    
  }
  
 export  interface userDataType{
    email: string | null;
    password: string | null,
    google: boolean
    
  }
 export  interface userDataTypeG{
    email: string | null;
    google: boolean | null;
  }

  export interface userDataTypeSignup{
    username: string | null;
    email: string | null;
    google: boolean;
    password: string | null,
    phone: number | string | null
  }


  