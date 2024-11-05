import { prisma } from '../../connection'
import { deleteFiles } from '../../utils/delete.files'

export const createProfileService = async({imagesUploaded, birthDate, phoneNumber, address, usersId}: any) => {
    await prisma.$transaction(async(tx) => {
        const createdUserProfile = await tx.userProfile.create({
            data: {
                birthDate: new Date(birthDate), 
                phoneNumber, 
                address, 
                usersId
            }
        })
    
        const imagesToCreate = imagesUploaded.images.map((image: any) => {
            return { imageUrl: image.filename, directory: image.destination, userProfilesId: createdUserProfile.id }
        })
    
        await tx.userProfileImage.createMany({
            data: imagesToCreate
        })
    })
}

export const findProfileService = async({usersId}: any) => {
    return await prisma.userProfile.findFirst({
        where: {usersId},
        include: {
            userProfileImage: {
                select: {
                    imageUrl: true,
                    directory: true
                }
            }
        },
    })
}

export const updateProfileService = async({birthDate, address, phoneNumber, usersId, imagesUploaded}: any) => {
    await prisma.$transaction(async(tx) => {
        // Step-01 Update Profile to Update by usersId
        const updateProfile = await tx.userProfile.update({
            data: {
                birthDate: new Date(birthDate), 
                address, 
                phoneNumber
            },
            where: {
                usersId
            }
        })

        // Step-02 Find Image User from UserImageProfile by userProfileId
        const findProfileImages = await tx.userProfileImage.findMany({
            where: {
                userProfilesId: updateProfile.id
            }
        })

        // Step-04 Delete Current Data Image on UserImageProfile > Create New Data Image on UserImageProfile v
        await tx.userProfileImage.deleteMany({
            where: {
                userProfilesId: updateProfile.id 
            }
        })

        const imagesToCreate = imagesUploaded.images.map((image: any) => {
            return { imageUrl: image.filename, directory: image.destination, userProfilesId: updateProfile.id }
        })

        await tx.userProfileImage.createMany({
            data: imagesToCreate
        })

        // Step-03 Delete Image User File Based on Step-02
        const imagesToDelete = findProfileImages.map((image) => {
            return {path: `${image.directory}/${image.imageUrl}`}
        })

        deleteFiles({imagesUploaded: {images: imagesToDelete}})
    })
}