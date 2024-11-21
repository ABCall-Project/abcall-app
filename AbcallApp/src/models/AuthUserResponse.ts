class AuthUserResponse {
    id: string;
    name: string;
    last_name: string;
    phone_number: string;
    email: string;
    address: string;
    birthdate: string;
    role_id: string;
    token: string;
    customer_id: string;
    constructor(id: string,
        name: string,
        last_name: string,
        phone_number: string,
        email: string,
        address: string,
        birthdate: string,
        role_id: string,
        token: string,
        customer_id: string)
        {
            this.id = id;
            this.name = name;
            this.last_name = last_name;
            this.phone_number = phone_number;
            this.email = email;
            this.address = address;
            this.birthdate = birthdate;
            this.role_id = role_id;
            this.token = token;
            this.customer_id = customer_id;
        }
}
export { AuthUserResponse };
