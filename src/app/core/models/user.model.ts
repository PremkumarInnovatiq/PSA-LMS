export interface Student {
    docs: Users[];
    totalDocs: number;
  }
  
  export interface Users {
    designation: any;
    _id: string;
    id:string;
    slug: string;
    name: string;
    phone_number: [];
    qualification: string;
    email: string;
    status: number;
    source: string;
    createdAt?: Date;
    updatedAt?: Date;
    type?: string;
    password: string;
    Active: any;
    menuItems: [];
  }
  
  export interface StudentDetail extends Users {
    profile: string;
  }
  
  export interface ImpactPartner {
    docs: ImpactPartnerUser[];
  }
  
  export interface ImpactPartnerUser {
    slug: string;
    status: number;
    type: string;
    _id: string;
    email: string;
    name: string;
    phone_number: PhoneNumber[];
    user_type: number;
  }
  
  export interface ImpactPartnerDetail extends ImpactPartnerUser {
    city: string;
    state: string;
    country: string;
    cityObj: {
      id: number;
      name: string;
    };
    countryObj: {
      id: number;
      name: string;
    };
    stateObj: {
      id: number;
      name: string;
    }
    impact_partner: ImpactPartnerObj;
  }
  
  interface ImpactPartnerObj {
    contact_person_for_collegey: ContactPerson[];
    organization_name: string;
    website: string;
  }
  
  export interface ContactPerson {
    phone_number: PhoneNumber[];
    name: string;
  }
  
  export interface PhoneNumber {
    _id: string;
    extension: string;
    number: number;
    tag: string;
  }
  
  export interface UniversityPartner {
    docs: UniversityPartnerUser[];
  }
  
  export interface UniversityPartnerUser {
    slug: string;
    status: number;
    type: string;
    _id: string;
    email: string;
    name: string;
    phone_number: PhoneNumber[];
    user_type: number;
  }
  
  export interface UniversityPartnerDetail extends UniversityPartnerUser {
    city: string;
    state: string;
    country: string;
    university_partner: UniversityPartnerObj;
  }
  
  export interface UniversityPartnerObj {
    contact_person_for_collegey: ContactPerson[];
    university_name: string;
    address: string;
  }
  
  export interface SchoolPartner {
    docs: SchoolPartnerUser[];
  }
  
  export interface SchoolPartnerUser {
    slug: string;
    status: number;
    type: string;
    _id: string;
    email: string;
    name: string;
    country: string;
    state: string;
    user_type: number;
  }
  export interface SchoolPartnerDetail extends SchoolPartnerUser {
    password: string;
    city: string;
    state: string;
    country: string;
    school_partner: SchoolPartnerObj;
  }
  
  export interface SchoolPartnerObj {
    principal_name: string;
    counselor_name: string;
    curriculum: string;
    other_text: string;
  }
  
  export interface UserType {
    _id: string;
    typeName?: string;
    menuItems: [];
    isAdmin: Boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
    export interface UserType {
      _id: string;
      typeName?: string;
      menuItems: [];
      isAdmin:Boolean;
      status:string;
      createdAt?: Date;
      updatedAt?: Date;
    }
  export interface MenuItemModel {
    id: number;
    title: string;
    children: MenuItemModel[];
    checked:boolean;
    indeterminate:boolean;
  }
  