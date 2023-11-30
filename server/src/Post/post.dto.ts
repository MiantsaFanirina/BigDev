type postDto = {
    id?: string;
    description: string;
    user_id: string;
    media?: mediaDto[];
    createdAt?: Date;
    comments?: commentDto[];
    likes?: likeDto[];
}

type mediaDto = {
    id: string;
    url: string;
    post_id?: string;
}

type likeDto = {
    user_id: string;
    post_id: string;
}

type commentDto = {
    id: string;          
    message: string;
    createdAt: Date;    
    updatedAt: Date;     
    post_id: string;
    parent?: commentDto;    
    children?: commentDto[]; 
    parent_id?: string;
  };

export {postDto}
