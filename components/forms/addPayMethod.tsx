import { useState } from 'react';

import Cards, { Focused } from 'react-credit-cards';
import { useCookies } from 'react-cookie';
import 'react-credit-cards/es/styles-compiled.css';
import jwt from 'jsonwebtoken';

import Input from './input';
import PrimaryButton from '../buttons/primary';
import { ACCESS_TOKEN, CARD_TYPE_CREDIT, CARD_TYPE_DEBIT } from '../../utils/constants';
import { API_URL } from '../../config';

type Props = {
    closeModal: () => void;
    setLoadCards: (val: boolean) => void;
}

const AddPaymentMethod = ({ closeModal, setLoadCards }: Props) => {
    
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardType, setCardType] = useState(CARD_TYPE_CREDIT);
    const [focus, setFocus] = useState('name');
    const [errMsg, setErrMsg] = useState('');
    
    const [cookies] = useCookies([ACCESS_TOKEN]);

    const showErrMesg = (msg: string) => {
        setErrMsg(msg);
        setTimeout(() => {
            setErrMsg('');
        }, 3000);
    }
    
    const handleChange = (field: string, e: any) => {
        const value = e.target.value;

        switch (field) {
            case 'cardNumber':
                setCardNumber(value);
                setFocus('number');
                e.target.value = value.slice(0, 16)
                break;
            case 'cardName':
                setCardName(value);
                e.target.value = value.toUpperCase();
                setFocus('name');
                break;
            case 'cardType':
                setCardType(value);
                setFocus('type');
                break;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(cardNumber.length !== 16 || !cardName.length) {
            return showErrMesg('Por favor, ingrese los datos correctamente');
        }
        const token = cookies[ACCESS_TOKEN];

        if(token) {
            const user = jwt.decode(token) as { id: number, role: number };

            if (user) {
                const data = {
                    card_number: cardNumber,
                    owner: cardName,
                    card_type: cardType,
                }
                console.log(data);
    
                let response;
                try {
                    response = await fetch(`${API_URL}/users/${user.id}/pay-methods`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${cookies[ACCESS_TOKEN]}`
                        },
                        body: JSON.stringify(data)
                    });
                } catch (err) {
                    console.log(err);
                }
    
                if(!response) return showErrMesg('Error al agregar la tarjeta');
    
                if(response.status === 201) {
                    closeModal();
                    setLoadCards(true);
                } else if (response.status === 400) {
                    showErrMesg('La tarjeta ingresada ya existe en su cuenta o no se encuentra registrada en el sistema');
                } else {
                    showErrMesg('Error al agregar la tarjeta');
                }
            }            
        }

    }
    return (
        <form id='card-form' onSubmit={handleSubmit} className='relative'>
            <button
                className='absolute top-0 right-0 p-2 text-2xl font-bold text-gray-500 hover:text-gray-700'
                onClick={closeModal}
            >
                &times;
            </button>
            
            <div className='flex flex-col'>
                <div className='mt-14'>
                    <Cards number={cardNumber} cvc={'***'} expiry={'** / **'} name={cardName} focused={focus as Focused} />
                </div>
                <div className='mx-auto mt-10 grid grid-cols-2 gap-x-32 justify-items-center w-6/12'>
                    <Input onChange={e => handleChange('cardNumber', e)} label='Número de tarjeta' type='number' name='number'></Input>
                    <div>
                        <label className="block text-xl ml-1.5 my-2.5 font-semibold">Tipo de tarjeta</label>
                        <select
                            onChange={e => handleChange('cardType', e)}
                            className='border-gray-300 p-2 mb-3.5 shadow-md appearance-none border rounded-md w-80 h-10 text-l px-3 text-gray-700 focus:outline-none focus:shadow-outline'
                            name='type'
                        >
                            <option value={CARD_TYPE_CREDIT}>Crédito</option>
                            <option value={CARD_TYPE_DEBIT}>Débito</option>
                        </select>
                    </div>
                    <Input onChange={e => handleChange('cardName', e)} label='Nombre del propietario' type='text' name='name'></Input>
                    {/* <div></div> */}
                </div>

                {errMsg && <p className='text-red-500 text-center'>{errMsg}</p>}

                <div className='flex justify-center mt-2'>
                    <PrimaryButton type='submit' ></PrimaryButton>
                </div>
            </div>
        </form >
    );
}

export default AddPaymentMethod;
