import Link from "next/link";
import PrimaryButton from "../buttons/primary";
import Payment from "../../domain/payments";

const InfoCard = (props: Payment) => {
  const { amount, balance, campus, card_type, date, effective_date, fulfilled, gateway_date, 
    guest_id, id, num_installments, payment_concept, ref_number, successful, user_id } = props;

  const getPaymentState = () => effective_date ? successful ? 'Exitoso' : 'Fallido' : 'Pendiente';
  const getColor = () => effective_date ? successful ? 'green' : 'red' : 'yellow';

  return (
    <div className='shadow-lg border-gray-300 border p-8 mx-auto my-12 flex justify-between rounded w-6/12'>
      <div>
        <div className='flex'>
          <p>
            <><b>Concepto: </b> {payment_concept}</>
          </p>
        </div>
        <div>
          <p className='pt-3'><b>Fecha de Pago: </b> {new Date(paymentDate).toLocaleDateString()} </p>
          <p className='pt-1'><b>No. de Factura: </b> {invoiceNumber} </p>
        </div>
      </div>

      <div className='text-center'>
        {
          isConcept ?
            <>
              <p> <b> ${amount} </b> </p>
              <Link href="">
                <a className=''>
                  <PrimaryButton text="Pagar" color={"blue"} />
                </a>
              </Link>
            </>
            :
            <>
              <p className={`text-${getColor()}-500`}> <b> {getPaymentState()} </b> </p>
              <p> <b> ${amount} </b> </p>
            </>
        }
      </div>
    </div>
  );
}

export default InfoCard;
