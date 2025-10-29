import { useEffect, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import st from '../style/nav.module.css';
import { useStore } from "@/store/storeGlobal.ts";

export const Welcome = () => {
    const CSSEffect = 30;
    const { myLang, loading } = useStore();
    const [textOpacity, setTextOpacity] = useState(0); 
    const [textVisible, setTextVisible] = useState(false); 

    useEffect(() => {
        const checkViewportAndLoadImage = () => {
            const isMobile = window.innerWidth < 1024;
            const imageToLoad = new Image();

            if (isMobile) {
                imageToLoad.src = '/img/welcome-cell.webp';
            } else {
                imageToLoad.src = '/img/welcome.webp';
            }
        };

        checkViewportAndLoadImage();
    }, []);

    useEffect(() => {
        if (!loading) {
            setTextVisible(true); 
            setTimeout(() => {
                setTextOpacity(1); 
            }, 100); 
        } else {
            setTextOpacity(0);
            setTextVisible(false);
        }
    }, [loading]);

    return (
        <ParallaxProvider>
            <Parallax translateY={[-CSSEffect, CSSEffect]} className={st.back}>
                <div className="min-h-screen max-w-screen-2xl mx-auto w-full relative px-6 text-grey">
                    <div className={`absolute bottom-[30%] sm:bottom-[27%] md:bottom-[26%] lg:bottom-[25%] xl:bottom-[20%] transition-all delay-500 duration-1000 ${textVisible ? 'translate-y-0': 'translate-y-8'}`} style={{ opacity: textOpacity, visibility: textVisible ? 'visible' : 'hidden' }}>
                        <h2 className={`text-7xl mid:text-[5.5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] font-bold w-32`} style={{ lineHeight: '.8' }}>
                            The perfect surgery
                        </h2>
                        <p className="text-[.8rem] mid:text-[.9rem] sm:text-[1.1rem] md:text-[1.4rem] lg:text-[1.8rem] mt-6 lg:mt-8 mb-8">
                            {myLang ? (
                                <>
                                    A masterpiece of modern hip and  
                                    <br />
                                    knee surgery.
                                </>
                            ) : (
                                <>
                                    Primer Centro Integral de Cirugía Robótica
                                    <br />
                                    en Cadera y Rodilla de Argentina.                                    
                                </>
                            )}
                        </p>
                        <a href="/contacto" className="px-8 sm:px-24 py-2 bg-grey text-black rounded-full text-lg md:text-2xl truncate buttom">
                            {myLang ? 'Contact' : 'Contacto'}
                        </a>
                        <style>{`
                            .buttom {
                                box-shadow: inset -1px 2px 5px 5px rgba(0, 0, 0, 0.45);
                                transition: all 0.8s;
                            }
                            .buttom:hover {
                                box-shadow: inset -1px 2px 5px 5px rgba(0, 0, 0, 0.3);
                                background: #b1b1db;
                            }
                            .buttom:active {
                                box-shadow: inset -2px 3px 6px 6px rgba(0, 0, 0, 0.45);
                            }
                        `}</style>
                    </div>
                </div>
            </Parallax>
        </ParallaxProvider>
    );
};

export default Welcome;