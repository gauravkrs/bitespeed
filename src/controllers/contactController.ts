import { Op, Sequelize } from "sequelize"
import { Contact } from "../models/contactModel"
import { ResponseBody } from "../interface/contactInterface";

interface RequestBody {
    body: { email: string; phoneNumber: string };
}

export async function identifyContact(req: RequestBody, res: ResponseBody): Promise<Response>{
    const {email, phoneNumber} = req.body
    
    try {
        const primaryContact = await Contact.findOne({
            where:{
                [Op.or]:[{email},{phoneNumber}],
                linkPrecedence: 'primary'
            },
            raw: true
        })
        if(!primaryContact){
            const newContact = await Contact.create({phoneNumber,email, linkPrecedence: 'primary'})
            console.log('newContact', newContact)
            return res.json({
                contact:{
                    primaryContact: newContact.id,
                    emails: [newContact.dataValues.email].filter((email:string)=> email !== null && email !== undefined),
                    phoneNumbers: [newContact.dataValues.phoneNumber].filter((phone:string)=> phone !== null && phone !== undefined),
                    secondaryContactIds: []
                }
            })
        }
        const exactContact = await Contact.findOne({
            where: {email, phoneNumber},
            raw: true
        })
        if(!exactContact){
            const newSecondaryContact = await Contact.create({
                email, 
                phoneNumber, 
                linkPrecedence: 'secondary',
                linkedId: primaryContact.id
            })                
            console.log("newSecondaryContact: ", newSecondaryContact)
        }
        const existContacts = await Contact.findAll({
            where: {
                [Op.or]: [
                  { id: primaryContact.id },
                  { linkedId: primaryContact.id }
                ]
              },
              order: [['createdAt', 'ASC']],
              raw: true
        })
        return res.status(200).send({
            contact:{
                primaryContact: primaryContact.id,
                emails: [...new Set(existContacts.map(contact => contact.email))].filter(email => email !== null),
                phoneNumbers: [...new Set(existContacts.map(contact => contact.phoneNumber))].filter(phone => phone !== null),
                secondaryContactIds: existContacts.filter(contact => contact.id !== primaryContact.id).map(contact => contact.id)
            }
        })
    } catch (error) {
        return res.status(500).send({message:'INTERNAL_SERVER_ERROR'})
    }
}