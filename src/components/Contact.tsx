"use client";

import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@/store/storeGlobal.ts";
import emailjs from "@emailjs/browser";

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

  const form = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");

      gsap.set(overlayRef.current, { scaleY: 1, transformOrigin: "top" });
      gsap.set(containerRef.current.querySelectorAll(".contact-anim"), {
        opacity: 0,
        y: 40,
        filter: "blur(15px)",
      });

      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        scaleY: 0,
        duration: 1.2,
        ease: "power3.inOut",
      });

      tl.to(
        containerRef.current.querySelectorAll(".contact-anim"),
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.6"
      );
    })();
  }, []);

  const clearError = (field) => {
    if (field === "username") setUsernameError("");
    if (field === "email") setEmailError("");
    if (field === "telefono") setTelefonoError("");
    if (field === "mensaje") setMensajeError("");
  };

  const validateUsername = (v = username) => {
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

  const validateEmail = (v = email) => {
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

  const validateTelefono = (v = telefono) => {
    if (!v.trim()) {
      setTelefonoError(
        myLang
          ? "Phone number is required"
          : "El número de teléfono es requerido"
      );
      return false;
    }
    const regex = /^[\+]?[0-9\s\-\(\)]+$/;
    if (!regex.test(v.trim()) || v.trim().length < 8) {
      setTelefonoError(
        myLang
          ? "Invalid phone number format"
          : "Formato de número de teléfono inválido"
      );
      return false;
    }
    return true;
  };

  const validateMensaje = (v = mensaje) => {
    if (!v.trim()) {
      setMensajeError(
        myLang ? "Message is required" : "El mensaje es requerido"
      );
      return false;
    }
    return true;
  };

  const sendEmail = async () => {
    const ok =
      validateUsername() &&
      validateEmail() &&
      validateTelefono() &&
      validateMensaje();

    if (!ok) return;

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

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setIsSubmitted(false);
    }
  };

  const handleButtonClick = async (e) => {
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
            <div className="grid md:grid-cols-2 contact-anim">
              <div className="relative">
                <div className="absolute -top-12 -left-1.5">
                  <a
                    href="/"
                    className="mb-4 flex items-center text-violet hover:text-violet/80 transition-colors"
                  >
                    <svg 
                      className="w-6 h-6 mr-2" 
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
                </div>
                <h2 className="text-4xl font-bold">
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
                </h2>
              </div>

              <p className="leading-7 w-[270px] md:w-[350px] text-lg md:text-2xl mt-4 lg:mt-2">
                {!myLang
                  ? "Complete el siguiente formulario y nos comunicaremos con usted a la brevedad."
                  : "Complete the following form and we will contact you shortly."}
              </p>
            </div>

            <div className="xl:grid grid-cols-2 contact-anim">
              <div className="relative my-10 mb-12">
                <input
                  id="username"
                  name="name"
                  type="text"
                  className="border-b bg-grey py-1 focus:border-blue-700 w-full"
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
                  <p className="absolute -bottom-12 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {usernameError}
                  </p>
                )}
              </div>

              <div className="relative my-10 mb-12">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border-b bg-grey py-1 focus:border-blue-700 w-full"
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
                  <p className="absolute -bottom-12 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {emailError}
                  </p>
                )}
              </div>
            </div>

            <div className="xl:grid grid-cols-2 contact-anim">
              <div className="relative my-10 mb-12">
                <input
                  id="telefono"
                  name="phone"
                  type="text"
                  className="border-b bg-grey py-1 focus:border-blue-700 w-full xl:translate-y-4"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value);
                    clearError("telefono");
                  }}
                  onBlur={() => validateTelefono(telefono)}
                />
                <label className="absolute left-0 -bottom-7 font-bold">
                  Telefono
                </label>
                {telefonoError && (
                  <p className="absolute -bottom-12 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {telefonoError}
                  </p>
                )}
              </div>

              <div className="relative my-10 mb-12">
                <textarea
                  id="mensaje"
                  name="message"
                  className="border-b bg-grey focus:border-blue-700 w-full resize-none"
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
                  <p className="absolute -bottom-12 text-red-500 text-sm bg-violet text-grey px-5 rounded-xl">
                    {mensajeError}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end group w-full contact-anim">
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={isLoading || isSubmitted}
                className="flex justify-end items-center mt-10 w-full"
              >
                <div
                  className={`bg-backBlack text-grey py-2 px-20 rounded-l-3xl w-full mid:w-fit transition-all duration-1000 ${
                    isLoading ? "opacity-90" : ""
                  }`}
                >
                  {isLoading
                    ? myLang
                      ? "Sending..."
                      : "Enviando..."
                    : myLang
                    ? "Send"
                    : "Enviar"}
                </div>

                {!isSubmitted && (
                  <div className="h-full">
                    <div className="bg-backBlack flex justify-center items-center rounded-r-full p-3 transition-all duration-1000">
                      <img
                        src="/svg/rightArrow-07.svg"
                        className="h-4 w-6 mid:w-4"
                      />
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
                className="bg-backBlack py-2 px-6 rounded-full hover:bg-gray-800 transition-colors"
              >
                {myLang ? "Back to home" : "Volver al inicio"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .myGradient {
          background: linear-gradient(0deg, rgba(232,232,232,1) 0%, rgba(237,221,83,0) 100%);
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
