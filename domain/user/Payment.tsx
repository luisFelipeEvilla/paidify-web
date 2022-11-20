import PayConcept from "../general/PayConcept";

class Payment {
    id!: number;
    date!: string;
    gateway_date!: string;
    ref_number!: string;
    num_installments!: number;
    card_type!: string;
    amount!: number | undefined;
    balance!: number | undefined;
    effective_date!: string | undefined;
    fulfilled: number | undefined ;
    successful: number | undefined ;
    campus!: string;
    payment_concept!: PayConcept;
}

export default Payment;
