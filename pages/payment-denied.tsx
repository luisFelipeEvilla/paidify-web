/* eslint-disable react/no-children-prop */
import Head from "next/head";
import Header from "../components/header";
import Image from "next/image";
import Button from "../components/buttons/home";

const Paymentdenied = () => {

    return (
        <>
            <Head>
                <title>Pago exitoso</title>
            </Head>
            <Header />
            <main>
                <div>
                <div className="flex m-auto w-fit" style={{ height: '80vh' }}>
                        <div className="py-14 shadow-md flex justify-center items-center border-gray-300 border p-4 w-96 flex-col rounded-lg">
                            <div>
                                <Image src="/icons/denied_icon.png" width={150} height={150} />
                            </div>

                            <h3 className="font-bold mb-6">Pago exitoso</h3>

                            <div>
                                <p><b>Referencia:</b> 30239039</p>
                                <p><b>Descripcion:</b> Pago de matricula</p>
                            </div>
                        </div>
                        <div>

                        </div>
                </div>
                <Button>
                    Regresar al comercio
                </Button>
                </div>
            </main>
        </>
    )
}

export default Paymentdenied;