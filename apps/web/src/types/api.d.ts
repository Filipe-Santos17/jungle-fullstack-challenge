export interface iMsgError {
    message: string
    statusCode: number
}

export interface iSuccessLogin {
    refreshToken: string;
    token: string;
    user: {
        id: string;
        email: string;
        username: string;
    }
}