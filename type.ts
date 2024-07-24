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
  