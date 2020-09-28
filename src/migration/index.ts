import { UserTable } from "./UserTable";
import dotenv from 'dotenv';
import { PhoneTable } from "./PhoneTable";
import { AddressTable } from "./AddressTable";
import { AmountTable } from "./AmountTable";

dotenv.config();

const user = new UserTable();
const phone = new PhoneTable();
const address = new AddressTable();
const amount = new AmountTable();

async function createTables() {
    await user.createTable();
    await phone.createTable();
    await address.createTable();
    await amount.createTable();
}

createTables();