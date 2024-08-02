export interface Position {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface OrganizationTeam {
    id: string;
    name: string;
    slug: string;
    status: boolean;
    displayOrder?: number | null;
    createdAt: Date;
    updatedAt: Date;
    members?: Member[]; 
  }
  
  export interface Member {
    id: string;
    organizationTeamId: string;
    name: string;
    positionId: string;
    displayOrder?: number | null;
    avatarUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
    organizationTeam: OrganizationTeam; 
    position: Position; 
  }
  

  export interface Message {
    id: string;
    memberId: string;
    message: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    member: Member;
  }


  export interface SMTPConnection {
      servername: string | undefined;
      port: number | undefined;
      username: string | undefined;
      password: string | undefined;
      displayname: string | undefined;
      to: string | null | undefined;
      from: string | undefined;

  }


  export interface Gallery {
    id: string;
    title: string;
    slug: string;
    images?: IImage[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IImage {
    id: string;
    url: string;
    altText?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  

  // Interfaces for TypeScript

export interface User {
  id: string;
  name?: string;
  username?: string;
  email: string;
  passwordHash?: string;
  image?: string;
  roleId: number;
  Role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: number;
  name: string;
  users?: User[];
}
