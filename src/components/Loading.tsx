import { MutatingDots } from "react-loader-spinner";
import { useStore } from "@/store/storeGlobal.ts";
import { useEffect, useState, useRef } from "react";

export const Loading = () => {
    const { loading, changeLoading } = useStore();
    const [isVisible, setIsVisible] = useState(true);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (loading) {
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
                changeLoading();
            }, 2000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [loading]);

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-backBlack z-[70] flex flex-col justify-center items-center transition-all duration-500 delay-300 ${
                isVisible ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <img src="/svg/logo.svg" alt="Logo de Motion clinic" className={`h-7 xs:h-10 mid:h-14 lx:h-20 transition-all duration-1000 ${
                isVisible ? "sm:translate-y-0" : "sm:-translate-y-[26rem] sm:opacity-0 sm:scale-50 "
            }`} />
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#5b5bc4"
                secondaryColor="#5b5bc4"
                radius="14.5"
                ariaLabel="mutating-dots-loading"
            />
        </div>
    );
};

export default Loading;