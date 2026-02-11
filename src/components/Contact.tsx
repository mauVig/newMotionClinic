"use client";

import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@/store/storeGlobal.ts";
import emailjs from "@emailjs/browser";
import gsap from "gsap";

const ContactForm = () => {
  const { myLang } = useStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useRef<HTMLFormElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* ============================
     GSAP ENTRADA AWWARDS
  ============================ */
  useEffect(() => {
    if (!overlayRef.current || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll(".contact-anim");

    gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "top" });
    gsap.set(items, {
      opacity: 0,
      y: 40,
      filter: "blur(15px)",
    });

    const tl = gsap.timeline({ delay: 0.15 });

    tl.to(overlayRef.current, {
      scaleY: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });

    tl.to(
      items,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        stagger: 0.15,
      },
      "-=0.7"
    );
  }, []);

  /* ============================
     VALIDACIONES
  ============================ */
  const clearError = (field: string) => {
    if (field === "username") setUsernameError("");
    if (field === "email") setEmailError("");
    if (field === "telefono") setTelefonoError("");
    if (field === "mensaje") setMensajeError("");
  };

  const validateUsername = (v: string = username) => {
    if (!v.trim()) {
      setUsernameError(myLang ? "Name is required" : "El nombre es requerido");
      return false;
    }
    if (v.trim().length < 2) {
      setUsernameError(
        myLang
          ? "Name must be at least 2 characters"
          : "El nombre debe tener al menos 2 caracteres"
      );
      return false;
    }
    return true;
  };

  const validateEmail = (v: string = email) => {
    if (!v.trim()) {
      setEmailError(myLang ? "Email is required" : "El email es requerido");
      return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(v.trim())) {
      setEmailError(
        myLang ? "Invalid email format" : "Formato de email inválido"
      );
      return false;
    }
    return true;
  };

  const validateTelefono = (v: string = telefono) => {
    if (!v.trim()) {
      setTelefonoError(
        myLang
          ? "Phone number is required"
          : "El número de teléfono es requerido"
      );
      return false;
    }
    return true;
  };

  const validateMensaje = (v: string = mensaje) => {
    if (!v.trim()) {
      setMensajeError(myLang ? "Message is required" : "El mensaje es requerido");
      return false;
    }
    return true;
  };

  /* ============================
     EMAILJS
  ============================ */
  const sendEmail = async () => {
    const ok =
      validateUsername() &&
      validateEmail() &&
      validateTelefono() &&
      validateMensaje();

    if (!ok || !form.current) return;

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.EMAIL_SERVICE_ID,
        import.meta.env.EMAIL_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.EMAIL_PUBLIC_KEY,
        }
      );

      setIsSubmitted(true);
      setIsModalOpen(true);

      setUsername("");
      setEmail("");
      setTelefono("");
      setMensaje("");
    } catch (err) {
      console.log(err);
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await sendEmail();
  };

  return (
    <div ref={containerRef} className="relative">

      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
      />

     
      <div className="h-36 w-full bg-violet contact-anim" />

      <aside
        id="contact"
        className="bg-grey relative z-20 text-black px-6 py-20 flex flex-col items-center"
      >
    
        <div className="absolute w-full top-[-150px] h-[150px] myGradient contact-anim" />

        <div className="w-full mx-auto mt-8 max-w-screen-2xl">
          <form ref={form}>
      
            <div className="grid md:grid-cols-2 gap-6 contact-anim">
              <div className="relative">
          
                <a
                  href="/"
                  className="
               
                    inline-flex items-center gap-2
                    text-violet font-semibold
                    bg-white/70
                    px-5 py-2 rounded-full
                    shadow-[0_14px_40px_rgba(131,91,255,0.35)]
                    hover:bg-violet hover:text-black
                    transition-all duration-400
                  "
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  {myLang ? "Back" : "Volver"}
                </a>

                <h1 className="text-4xl font-bold mt-10">
                  {!myLang ? (
                    <>
                      Hacenos
                      <br />
                      <span className="text-violet">tu consulta</span>
                    </>
                  ) : (
                    <>
                      Send us
                      <br />
                      <span className="text-violet">your inquiry</span>
                    </>
                  )}
                </h1>
              </div>

              <p className="leading-7 w-[270px] md:w-[350px] text-lg md:text-2xl mt-4 lg:mt-2">
                {!myLang
                  ? "Complete el siguiente formulario y nos comunicaremos con usted a la brevedad."
                  : "Complete the following form and we will contact you shortly."}
              </p>
            </div>

            {/* NOMBRE / EMAIL */}
            <div className="xl:grid grid-cols-2 gap-10 contact-anim mt-10">
              <div className="relative mb-20">
                <input
                  id="username"
                  name="name"
                  type="text"
                  className="border-b bg-grey py-2 w-full"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    clearError("username");
                  }}
                  onBlur={() => validateUsername(username)}
                />
                <label className="absolute left-0 -bottom-7 font-bold">
                  {!myLang ? "Nombre" : "Name"}
                </label>
                {usernameError && (
                  <p className="absolute -bottom-14 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {usernameError}
                  </p>
                )}
              </div>

              <div className="relative mb-20">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border-b bg-grey py-2 w-full"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                  onBlur={() => validateEmail(email)}
                />
                <label className="absolute left-0 -bottom-7 font-bold">
                  Email
                </label>
                {emailError && (
                  <p className="absolute -bottom-14 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            <div className="xl:grid grid-cols-2 gap-10 contact-anim">
              <div className="relative mb-20">
                <input
                  id="telefono"
                  name="phone"
                  type="text"
                  className="border-b bg-grey py-2 w-full"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    clearError("telefono");
                  }}
                  onBlur={() => validateTelefono(telefono)}
                />
                <label className="absolute left-0 -bottom-7 font-bold">
                  Teléfono
                </label>
                {telefonoError && (
                  <p className="absolute -bottom-14 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {telefonoError}
                  </p>
                )}
              </div>

              <div className="relative mb-12">
                <textarea
                  id="mensaje"
                  name="message"
                  className="border-b bg-grey py-2 w-full resize-none"
                  value={mensaje}
                  onChange={(e) => {
                    setMensaje(e.target.value);
                    clearError("mensaje");
                  }}
                  onBlur={() => validateMensaje(mensaje)}
                />
                <label className="absolute left-0 -bottom-7 font-bold">
                  Mensaje
                </label>
                {mensajeError && (
                  <p className="absolute -bottom-14 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {mensajeError}
                  </p>
                )}
              </div>
            </div>

            <div className=" flex justify-end w-full contact-anim">
              <div className="inline-flex transition-transform duration-500 hover:-translate-y-1">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  disabled={isLoading || isSubmitted}
                  className={`
                    
                    inline-flex items-center gap-3
                    rounded-full
                    bg-backBlack text-grey
                    px-10 py-3
                    text-lg tracking-wide
                    border border-black/40
                    transition-all duration-500
                    ${
                      isLoading || isSubmitted
                        ? "opacity-60 cursor-default"
                        : "hover:bg-violet hover:text-black hover:shadow-[0_18px_45px_rgba(131,91,255,0.55)]"
                    }
                  `}
                >
                  <span className="whitespace-nowrap">
                    {isLoading
                      ? myLang
                        ? "Sending..."
                        : "Enviando..."
                      : myLang
                      ? "Send"
                      : "Enviar"}
                  </span>

                  {!isSubmitted && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80">
                      <img
                        src="/svg/rightArrow-07.svg"
                        className="h-4 w-4"
                        alt="Arrow"
                      />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </aside>

      {/* MODAL EXITO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-backBlack/80 flex items-center justify-center z-50 p-4">
          <div className="bg-violet text-grey rounded-lg p-8 max-w-md w-full relative shadow-2xl shadow-violet/30">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4">
                {myLang ? "Message Sent!" : "¡Mensaje Enviado!"}
              </h3>

              <p className="text-gray-200 mb-6">
                {myLang
                  ? "Thank you for your message. We will contact you."
                  : "Gracias por tu mensaje. Nos pondremos en contacto contigo."}
              </p>

              <button
                onClick={() => setIsModalOpen(false)}
                className=" bg-backBlack py-2 px-6 rounded-full hover:bg-gray-800 transition-colors"
              >
                {myLang ? "Back to home" : "Volver al inicio"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .myGradient {
          background: linear-gradient(
            0deg,
            rgba(232,232,232,1) 0%,
            rgba(237,221,83,0) 100%
          );
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
