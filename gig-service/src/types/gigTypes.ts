

export interface ParsedQs {
    [key: string]: string | undefined;
  }
export interface UserLoggedInEvent {
    userId: string;
    timestamp: Date;
}

export interface Gig {
    title: string;
    gigdescription: string;
    price: number;
    tags: string;
    image1: string; 
    image2: string; 
    image3: string; 
    video: string;   
    userId: string;
    status: boolean;
    refId: string;
}