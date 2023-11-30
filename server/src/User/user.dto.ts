type UserDto = {
    id: string;
    name: string;
    profile_picture_url?: string;
    password?: string;
}

type CreateUserDto = {
    name: string;
    password: string;
}

export { UserDto, CreateUserDto };