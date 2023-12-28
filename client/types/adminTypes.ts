


export interface Gig {
  _id: string;
  title: string;
  skills: any;
  price: number;
  username: string;
  phone: number;
  status: boolean;
  refId: string;
}

export interface User {
    _id: string;
    profilePicture: string;
    username: string;
    email: string;
    phone: string;
  }