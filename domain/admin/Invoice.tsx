import PayConcept from "../general/PayConcept";

class Invoice {
    id!: number;
    description!: string;
    invoice_number!: string;
    amount!: number;
    balance!: number;
    effective_date!: string;
    fulfilled!: number;
    successful!: number;
    num_installments!: number;
    card_type!: string;
    payment_concept!: PayConcept;
    guest!: Guest | undefined;
    user!: User | undefined;
}

class Guest {
    id!: number;
    email!: string;
}

class User {
    id!: number;
    email!: string;
}

export default Invoice;
