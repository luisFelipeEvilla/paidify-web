import Link from "next/link";
import PrimaryButton from "../buttons/primary";
import Payment from "../../domain/user/Payment";
import Router from "next/router";
import { displayFullDate, withDots } from "../../utils/general";

const InfoCard = (props: Payment) => {
  const { amount, campus, date, effective_date, id, payment_concept, ref_number, successful } = props;

  const getPaymentState = () => effective_date ? successful ? 'Exitoso' : 'Fallido' : 'Pendiente';
  const getColor = () => effective_date ? successful ? 'green' : 'red' : 'yellow';

  const handleClick = () => {
    Router.push(`/user/history/${ref_number}`);
  }
  
  return (
    <div
      className='shadow-lg border-gray-300 border p-8 mx-auto my-12 flex justify-between rounded w-6/12 cursor-pointer relative'
      onClick={handleClick}
    >
      <div>
        <div className='flex w-4/5'>
          <p>
            <><b>Concepto: </b> {payment_concept.payment_concept}</>
          </p>
          <p>
            <><b>Sede: </b> {campus}</>
          </p>
        </div>
        <div>
          <p className='pt-3'><b>Fecha de Pago: </b> {displayFullDate(new Date(date))} </p>
          <p className='pt-1'><b>Ref. de Pago: </b> {ref_number} </p>
        </div>
      </div>

      <div className='text-center'>
        <>
          <p className={`text-${getColor()}-500`}> <b> {getPaymentState()} </b> </p>
          <p> <b> ${withDots(payment_concept.amount)} </b> </p>
        </>
      </div>

      {/* <div
        className="absolute bg-gray-900 text-gray-100 bottom-0 -right-8 px-2"
        style={{rotate: '-35deg'}}
      >
        {campus}
      </div> */}
    </div>
  );
}

export default InfoCard;
