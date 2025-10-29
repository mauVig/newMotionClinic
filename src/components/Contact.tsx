import React, { useRef, useState } from 'react';   
import { useStore } from "@/store/storeGlobal.ts";   
import emailjs from '@emailjs/browser';   

const ContactForm: React.FC = () => {   
    const { myLang } = useStore();   
    const [username, setUsername] = useState('');   
    const [email, setEmail] = useState('');   
    const [telefono, setTelefono] = useState('');   
    const [mensaje, setMensaje] = useState('');   
    const [usernameError, setUsernameError] = useState('');   
    const [emailError, setEmailError] = useState('');   
    const [telefonoError, setTelefonoError] = useState('');   
    const [mensajeError, setMensajeError] = useState('');   
    const [isSubmitted, setIsSubmitted] = useState(false);   
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
       
    const form = useRef<HTMLFormElement>(null);   

    const clearError = (field: string) => {  
        switch (field) {  
            case 'username':  
                setUsernameError('');  
                break;  
            case 'email':  
                setEmailError('');  
                break;  
            case 'telefono':  
                setTelefonoError('');  
                break;  
            case 'mensaje':  
                setMensajeError('');  
                break;  
        }  
    };  

    const validateUsername = (value: string = username) => {   
        if (!value.trim()) {   
            setUsernameError(myLang ? 'Name is required' : 'El nombre es requerido');   
            return false;   
        }   
        if (value.trim().length < 2) {  
            setUsernameError(myLang ? 'Name must be at least 2 characters' : 'El nombre debe tener al menos 2 caracteres');  
            return false;  
        }  
        setUsernameError('');   
        return true;   
    };   

    const validateEmail = (value: string = email) => {   
        if (!value.trim()) {   
            setEmailError(myLang ? 'Email is required' : 'El email es requerido');   
            return false;   
        }   
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   
        if (!emailRegex.test(value.trim())) {   
            setEmailError(myLang ? 'Invalid email format' : 'Formato de email inválido');   
            return false;   
        }   
        setEmailError('');   
        return true;   
    };   

    const validateTelefono = (value: string = telefono) => {   
        if (!value.trim()) {   
            setTelefonoError(myLang ? 'Phone number is required' : 'El número de teléfono es requerido');   
            return false;   
        }   
        const telefonoRegex = /^[\+]?[0-9\s\-\(\)]+$/;   
        if (!telefonoRegex.test(value.trim()) || value.trim().length < 8) {   
            setTelefonoError(myLang ? 'Invalid phone number format' : 'Formato de número de teléfono inválido');   
            return false;   
        }   
        setTelefonoError('');   
        return true;   
    };   

    const validateMensaje = (value: string = mensaje) => {   
        if (!value.trim()) {   
            setMensajeError(myLang ? 'Message is required' : 'El mensaje es requerido');   
            return false;   
        }  
       
        setMensajeError('');   
        return true;   
    };   
    
    const sendEmail = async () => {
        const isUsernameValid = validateUsername();   
        const isEmailValid = validateEmail();   
        const isTelefonoValid = validateTelefono();   
        const isMensajeValid = validateMensaje();   
           
        if (isUsernameValid && isEmailValid && isTelefonoValid && isMensajeValid) {   
            setIsLoading(true);   

            try {  
                const result = await emailjs.sendForm(   
                    import.meta.env.EMAIL_SERVICE_ID,   
                    import.meta.env.EMAIL_TEMPLATE_ID,  
                    form.current!,   
                    {   
                        publicKey: import.meta.env.EMAIL_PUBLIC_KEY,   
                    }   
                );  

                console.log('SUCCESS!', result.text);   
                setIsLoading(false);   
                setIsSubmitted(true);
                setIsModalOpen(true);   
                
                setUsername('');   
                setEmail('');   
                setTelefono('');   
                setMensaje('');  
                  

            } catch (error) {  
                console.log('FAILED...', error);   
                setIsLoading(false);   
                setIsSubmitted(false);   
            }  
        } else {   
            console.error('Formulario inválido');   
        }   
    };
    const handleButtonClick = async (e: React.MouseEvent) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        
        await sendEmail();
    };   

    return (   
       <div>    
         <div className='h-36 w-full bg-violet'/>   
         <aside id='contact' className='bg-grey relative z-20 text-black px-6 py-20 flex flex-col items-center'>   
                <div className="absolute w-full top-[-150px] h-[150px] myGradient" />   
                <div className='w-full mx-auto mt-8 max-w-screen-2xl'>
                    <form ref={form}>   
                        <div className='grid md:grid-cols-2'>   
                            <h2 className='text-4xl font-bold'>   
                                {!myLang ? (   
                                    <span>   
                                           Hacenos<br />  <span className='text-violet'>tu consulta</span> 
                                    </span>   
                                ) : (   
                                    <span>   
                                             Send us<br />  <span className='text-violet'>your inquiry</span>
                                    </span>   
                                )}   
                            </h2>   
                            <p className='leading-7 w-[270px] md:w-[350px] text-lg md:text-2xl mt-4 lg:mt-2'>   
                                {!myLang ? 'Complete el siguiente formulario y nos comunicaremos con usted a la brevedad.' : 'Complete the following form and we will contact you shortly.'}   
                            </p>   
                     </div>   
                     <div className='xl:grid grid-cols-2'>   
                         <div className='relative my-10 mb-12'>   
                             <input   
                                 id='username'   
                                 name='name'   
                                 type='text'   
                                 placeholder=''   
                                 className='border-b bg-grey py-1 focus:border-blue-700 transition-colors focus:outline-none w-full'   
                                 value={username}   
                                 onChange={(e) => {  
                                     setUsername(e.target.value);  
                                     clearError('username');  
                                 }}   
                                 onBlur={() => validateUsername(username)}   
                             />   
                             <label htmlFor='username' className='absolute left-0 -bottom-7 font-bold'>   
                                 {!myLang ? 'Nombre' : 'Name'}   
                             </label>   
                             {usernameError && <p className='text-red-500 text-sm absolute -bottom-12 mid:left-20 mid:-bottom-7 bg-violet text-grey rounded-xl px-5'>{usernameError}</p>}   
                         </div>   
                         <div className='relative my-10 mb-12'>   
                             <input   
                                 id='email'   
                                 name='email'   
                                 type='email'   
                                 placeholder=''   
                                 className='border-b bg-grey py-1 focus:border-blue-700 transition-colors focus:outline-none w-full'   
                                 value={email}   
                                 onChange={(e) => {  
                                     setEmail(e.target.value);  
                                     clearError('email');  
                                 }}   
                                 onBlur={() => validateEmail(email)}   
                             />   
                             <label htmlFor='email' className='absolute left-0 -bottom-7 font-bold'>Email</label>   
                             {emailError && <p className='text-red-500 text-sm absolute -bottom-12 mid:left-20 mid:-bottom-7 bg-violet text-grey rounded-xl px-5'>{emailError}</p>}   
                         </div>   
                     </div>   
                     <div className='xl:grid grid-cols-2'>   
                         <div className='relative my-10 mb-12 xl:pt-4'>   
                             <input   
                                 id='telefono'   
                                 name='phone'   
                                 type='text'   
                                 placeholder=''   
                                 className='border-b bg-grey py-1 focus:border-blue-700 transition-colors focus:outline-none w-full'   
                                 value={telefono}   
                                 onChange={(e) => {  
                                     setTelefono(e.target.value);  
                                     clearError('telefono');  
                                 }}   
                                 onBlur={() => validateTelefono(telefono)}   
                             />   
                             <label htmlFor='telefono' className='absolute left-0 -bottom-7 font-bold'>   
                                 Telefono   
                             </label>   
                             {telefonoError && <p className='text-red-500 text-sm absolute -bottom-12 mid:left-20 mid:-bottom-7 bg-violet text-grey rounded-xl px-5'>{telefonoError}</p>}   
                         </div>   
                         <div className='relative xl:my-10 my-16 '>   
                             <textarea   
                                 id='mensaje'   
                                 name='message'   
                                 placeholder=''   
                                 className='border-b bg-grey focus:border-blue-700 transition-colors focus:outline-none w-full resize-none'   
                                 value={mensaje}   
                                 onChange={(e) => {  
                                     setMensaje(e.target.value);  
                                     clearError('mensaje');  
                                 }}   
                                 onBlur={() => validateMensaje(mensaje)}   
                             ></textarea>   
                             <label htmlFor='mensaje' className='absolute left-0 -bottom-7 font-bold'>   
                                 Mensaje   
                             </label>   
                             {mensajeError && <p className='text-red-500 text-sm absolute -bottom-12 mid:left-20 mid:-bottom-7 bg-violet text-grey rounded-xl px-5'>{mensajeError}</p>}   
                         </div>   
                     </div>   
                     <div className='flex justify-end group w-full'>
                        <button 
                            type="button"
                            onClick={handleButtonClick} 
                            disabled={isLoading || isSubmitted}
                            className='flex justify-end items-center mt-10 w-full hover:cursor-pointer disabled:opacity-90 disabled:cursor-not-allowed'
                        >   
                           
                            <div   
                                className={`bg-backBlack text-grey py-2 px-20 rounded-l-3xl w-full mid:w-fit group-hover:rounded-r-3xl transition-all duration-1000 ${isLoading ? ' opacity-90' : ''}`}   
                            >   
                                {isLoading ? (myLang ? 'Sending...' : 'Enviando...') : (myLang ? 'Send' : 'Enviar')}  
                            </div>   
                            {!isSubmitted && (
                                <div className='h-full'>   
                                    <div className='bg-backBlack flex justify-center items-center rounded-r-full group-hover:rounded-l-full ml-0.5  p-3 transition-all duration-1000'>   
                                        <img src='/svg/rightArrow-07.svg' alt='Arrow' className='h-4 w-6 mid:w-4' />   
                                    </div>   
                                </div>                               
                            )}
                        </button> 
                     </div> 
                 </form> 
             </div>   
         </aside>   
         
         {isModalOpen && (
             <div className="fixed inset-0 bg-backBlack/80 flex items-center justify-center z-50 p-4">
                 <div className="bg-violet text-grey rounded-lg p-8 max-w-md w-full relative">
                     <div className="text-center">
                         <div className="mb-6">
                            <div className="flex justify-center">
                                <svg fill="#e8e8e8" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  
                                    width="120px" viewBox="0 0 70 70" enable-background="new 0 0 70 70" >
                                    <g>
                                        <g>
                                            <path d="M58.582,11.456c0.979,0,1.967,0.333,2.779,1.015c1.823,1.527,2.073,4.231,0.56,6.038l-30.5,36.383
                                                c-0.833,0.993-3.233,3.652-3.233,3.652s-2.053-2.032-3.191-3.309L8.394,39.479c-1.703-1.63-1.753-4.344-0.11-6.064
                                                c0.852-0.892,1.991-1.342,3.128-1.342c1.058,0,2.113,0.389,2.934,1.174l13.361,12.661l27.611-32.935
                                                C56.156,11.972,57.362,11.456,58.582,11.456 M58.582,7.456c-2.453,0-4.761,1.075-6.331,2.948L27.373,40.081l-10.276-9.737
                                                c-1.525-1.46-3.549-2.271-5.684-2.271c-2.261,0-4.456,0.939-6.021,2.579C2.23,33.964,2.337,39.22,5.628,42.369l16.497,15.657
                                                c1.22,1.351,3.163,3.276,3.247,3.36c0.75,0.742,1.762,1.157,2.814,1.157c0.037,0,0.074-0.001,0.112-0.002
                                                c1.093-0.03,2.125-0.507,2.856-1.317c0.101-0.111,2.46-2.726,3.329-3.763l30.501-36.384c1.423-1.698,2.094-3.851,1.889-6.062
                                                c-0.203-2.198-1.249-4.191-2.945-5.612C62.433,8.148,60.533,7.456,58.582,7.456L58.582,7.456z"/>
                                        </g>
                                        <g>
                                            <path d="M54.491,20.763c-0.225,0-0.45-0.075-0.637-0.23c-0.426-0.353-0.484-0.982-0.132-1.407l2.063-2.488
                                                c0.352-0.425,0.982-0.485,1.407-0.132c0.426,0.353,0.484,0.982,0.132,1.407L55.262,20.4C55.064,20.64,54.779,20.763,54.491,20.763
                                                z"/>
                                        </g>
                                        <g>
                                            <path d="M42.292,34.891c-0.236,0-0.474-0.083-0.664-0.253c-0.413-0.366-0.45-0.999-0.083-1.411l9.834-11.063
                                                c0.366-0.414,0.999-0.451,1.411-0.083c0.413,0.366,0.45,0.999,0.083,1.411l-9.834,11.063
                                                C42.842,34.777,42.567,34.891,42.292,34.891z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                         </div>
                         <h3 className="text-4xl font-bold text-gray-800 mb-4">
                             {myLang ? 'Message Sent!' : '¡Mensaje Enviado!'}
                         </h3>
                         <p className="text-gray-600 mb-6 font-bold">
                             {myLang 
                                 ? 'Thank you for your message. We will contact you.' 
                                 : 'Gracias por tu mensaje. Nos pondremos en contacto contigo.'}
                         </p>
                         <button
                             onClick={() => setIsModalOpen(false)}
                             className="bg-backBlack hover:bg py-2 px-6 rounded-full hover:bg-gray-800 transition-colors"
                         >
                             {myLang ? 'Back to home' : 'Volver al inicio'}
                         </button>
                     </div>
                 </div>
             </div>
         )}
            <style>{`   
                .myGradient{   
                    background: linear-gradient(0deg,rgba(232, 232, 232, 1) 0%, rgba(237, 221, 83, 0) 100%);   
                }   
            `}</style>   
       </div>   
    );   
};   

export default ContactForm;