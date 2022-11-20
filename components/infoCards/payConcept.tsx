import { useContext } from 'react';

import Link from 'next/link';
import PrimaryButton from '../buttons/primary';

import PayConcept from '../../domain/general/PayConcept';
import { withDots } from '../../utils/general';

import { AppState } from '../appState';

const InfoCard = (props: PayConcept) => {
  const { payment_concept, amount } = props;
  // const { user: { role } } : any = useContext(AppState);

  return (
    <div className='shadow-lg border-gray-300 border p-8 mx-auto my-12 flex justify-between rounded w-6/12'>
      <div>
        <div className='flex'>
          <p> <b>Concepto: </b> {payment_concept} </p>
        </div>
      </div>

      <div className='text-center'>
        <p> <b> ${withDots(amount)} </b> </p>
          <Link href={{ pathname: '/guest/payment', query: { 'pcid': props.id } }}>
          <a className=''>
            <PrimaryButton text='Pagar' color={'blue'} />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default InfoCard;
