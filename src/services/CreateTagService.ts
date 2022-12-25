import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"



class CreateTagService{
    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories)

        if(!name){
            throw new Error("Incorrect name!") // verifica se o nome ja foi preenchido
        }

            //SELECT * FROM TAGS WHERE NAME = "name"
        const tagAlreadyExists = await tagsRepositories.findOne({ //Verifica se a tag já existe
            name
        })
        if(tagAlreadyExists){
            throw new Error("Tag already exists!") // se já foi preenchida retorna um erro
        }

        const tag = tagsRepositories.create({ // e se ela existir a gente salva essa informação
            name
        })
        await tagsRepositories.save(tag)
        return tag
    }

}

export {CreateTagService}