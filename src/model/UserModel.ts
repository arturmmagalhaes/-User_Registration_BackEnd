export interface UserModelCreate {
    id: string,
    email: string,
    password: string
}

export interface UserModelCPF {
    id: string,
    cpf: string,
    dateNow: string
}

export interface UserModelName {
    id: string,
    name: string,
    lastname: string,
    dateNow: string
}

export interface UserModelBirthday {
    id: string,
    birthday: string,
    dateNow: string
}