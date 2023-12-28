export interface StateManagedSelect  {
    value: string;
    label: string;
  };
  
 export interface FormData {
    title: string;
    category: StateManagedSelect[];
    gigdescription: string;
    price: string;
    tags: string;
    image1: File | string;
    image2: File | string;
    image3: File | string;
    video: File | string;
  }

export interface Gigs{
    _id: string,
    title: string,
    refId: string,
    image1: string,
    image2: string,
    image3: string,
    price: number,
    status: boolean
}