import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest{
    name: string
    email: string
    admin?: boolean

}

class CreateUserService{
    async execute({name, email, admin}: IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories)
 
        console.log("Email", email)

        if(!email){
            throw new Error('Email incorrect') //verifica se o email está preenchido 
        }

        const userAlreadyExists = await usersRepository.findOne({ // Verifica se o usuario já existe
            email
        })

        if(userAlreadyExists){
            throw new Error('User already exists') // Lança um erro na camada que está a classe se o erro existir
        }

        const user = usersRepository.create({ // Se tiver tudo certo até aqui cria a instancia e salva o objeto no banco de dados
            name,
            email,
            admin,
        })
        await usersRepository.save(user)
        return user
    }
}

export {CreateUserService}