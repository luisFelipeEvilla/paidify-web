class User {
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    doc_number!: string;
    doc_type!: string;
    zip_code!: string;
    address_line!: string;
    city!: string;
    department!: string;
    campus!: string | undefined;
    username!: string | undefined;
}

export default User;
