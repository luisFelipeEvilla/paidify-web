import PaymentConcept from "./paymentConcept";

class Payment {
    id!: number;
    date!: string;
    gateway_date!: string;
    ref_number!: string;
    num_installments!: number;
    card_type!: string;
    amount!: number;
    balance!: number;
    effective_date!: string;
    fulfilled: number | undefined ;
    successful: number | undefined ;
    guest_id: number | undefined ;
    campus!: string;
    payment_concept!: PaymentConcept;
}

export default Payment;
