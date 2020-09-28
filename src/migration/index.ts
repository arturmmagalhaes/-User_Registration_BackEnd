import { UserTable } from "./UserTable";
import dotenv from 'dotenv';
import { PhoneTable } from "./PhoneTable";
import { AddressTable } from "./AddressTable";

dotenv.config();

const user = new UserTable();
const phone = new PhoneTable();
const address = new AddressTable();

async function createTables() {
    await user.createTable();
    await phone.createTable();
    await address.createTable();
}

createTables();