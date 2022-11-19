import Head from "next/head";
import Header from "../components/header";
import Image from "next/image";
import { useRouter } from "next/router";

const Payment = () => {
    const router = useRouter();

    const { concept, invoiceNumber, amount} = router.query;
    const  amountNumber = Number(amount);
    return (
        <>
            <Head>
                <title>Resumen de Compra</title>
            </Head>
            <Header />
            <main>
                <div className="flex m-auto w-fit" style={{ height: '80vh' }}>
                    <div className="m-auto grid grid-cols-2  justify-items-center">
                        <div className="my-auto">
                            <h3 className="font-bold">Selecciona la forma de pago:</h3>


                            <div className="shadow-md border-gray-300 border p-4 mx-auto my-4 flex rounded-lg">
                            <div className="mr-4">
                                    <Image src="/icons/icons8-tarjetas-bancarias-64.png" width={64} height={64} />
                                </div>
                                <p className="m-auto">Tarjeta de credito/debito</p>
                            </div>

                            <div className="shadow-md border-gray-300 border p-4 mx-auto my-4 flex rounded-lg">
                                <div className="mr-4">
                                    <Image src="/icons/pse.png" width={64} height={64} />
                                </div>
                                <p className="m-auto">Pago por PSE</p>
                            </div>

                        </div>

                        <div className="py-14 shadow-md flex justify-center items-center border-gray-300 border p-4 w-96 flex-col rounded-lg">

                            <div>
                                <Image src="/icons/order_icon.png" width={150} height={150} />
                            </div>

                            <h3 className="font-bold mb-6">Resumen de compra</h3>

                            <div style={{width: '300px'}} className="">
                                <p><b>Referencia:</b> {invoiceNumber}</p>
                                <p className=""><b>Descripcion:</b> {concept} 
                                </p>
                                <p><b>Total a pagar:</b>  COP {amountNumber.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Payment;