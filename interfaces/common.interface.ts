export interface AnyObject {
  [key: string]: any;
}

export interface TokenSign {
  userId: string;
  deviceId: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AnyObject;
}
