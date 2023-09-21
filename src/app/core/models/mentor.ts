export interface MentorListing {
    docs: Mentor[];
  }
  export interface Mentor {
    // gender: any;
    qualification: any;
    name: any;
    docs: Mentor[];
    totalDocs: number;
    // slug: string;
    status: any;
    Active: any;
    _id: string;
    
    // type: string;
    email: string;
    password :string;
    phone_number : string;
  };

  export interface Admin {
    // gender: any;
    qualification: any;
    name: any;
    docs: Mentor[];
    totalDocs: number;
    // slug: string;
    status: any;
    Active: any;
    _id: string;
    type: string;
    email: string;
    password :string;
    last_name:string,
    // phone_number : string;
  };

  export interface Student{
    // gender: any;
    qualification: any;
    name: any;
    docs: Mentor[];
    totalDocs: number;
    // slug: string;
    status: any;
    Active: any;
    _id: string;
    // type: string;
    email: string;
    // password :string;
    last_name:string,
    // phone_number : string;
  };

  export interface MentorPerks { 
    description: any;
    featured:any;
    short_description: any; 
    totalDocs: number;
    slug: string; 
    _id: string;
    title: string; 
    tags: string[]; 
    image: string; 
  };


  export interface CollegeyOpportunities{
    description: any;
    short_description: any; 
    totalDocs: number;
    slug: string; 
    _id: string;
    title: string; 
    tags: string[]; 
    image: string; 
  }