export interface LocationDto {
  id: number
  name: string
  code: string
  description: string
  createdAt: string
  modifiedAt: string
}

/* -Usuario devuelto por login, login-google, validate-token */
export interface AccountUser {
  id: number
  birthDate: string
  fullName: string
  identity: string
  genderId: number
  gender: string
  email: string
  phone: string
  statusId: number
  status: string
  avatar: string
  avatarMimeType: string
  locationId: number
  roleId: number
  location: LocationDto
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginGoogleRequest {
  idToken: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  confirmationPassword: string
  birthday: string
  phone?: string
  gender: number
}

export interface RefreshTokenRequest {
  token: string
  refreshToken: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfileRequest {
  fullName: string
  gender: number
  birthday: string
  phone?: string
}

export interface ChangeStatusRequest {
  email: string
  active: boolean
}

export interface ValidateTokenRequest {
  token: string
}

/* -Error estándar del API (400, 401, 404) */
export interface AccountErrorResponse {
  statusCode: number
  customStatusCode: number
  message: string
}
