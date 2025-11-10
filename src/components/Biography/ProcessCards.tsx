// "use client";
// import React, { useEffect } from "react";
// import "./ProcessCards.css";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// interface ProcessCard {
//   index: string;
//   title: string;
//   image: string;
//   description: string;
// }

// const processCardsData: ProcessCard[] = [
//   {
//     index: "01",
//     title: "Trayectoria",
//     image: "https://picsum.photos/800/400?random=1",
//     description:
//       "Más de 20 años de experiencia en cirugía ortopédica y traumatología avanzada.",
//   },
//   {
//     index: "02",
//     title: "Innovación",
//     image: "https://picsum.photos/800/400?random=2",
//     description:
//       "Pionero en el uso de tecnología robótica MAKO para procedimientos de alta precisión.",
//   },
//   {
//     index: "03",
//     title: "Compromiso",
//     image: "https://picsum.photos/800/400?random=3",
//     description:
//       "Enfoque humano y personalizado, priorizando la recuperación funcional de cada paciente.",
//   },
//   {
//     index: "04",
//     title: "Visión",
//     image: "https://picsum.photos/800/400?random=4",
//     description:
//       "Avanzar hacia una cirugía más inteligente, menos invasiva y plenamente adaptada a cada cuerpo.",
//   },
// ];

// const ProcessCards: React.FC = () => {
//   useEffect(() => {
//     const cards = gsap.utils.toArray<HTMLElement>(".process-card");

//     cards.forEach((card, index) => {
//       // Pin de cada card (excepto la última)
//       if (index < cards.length - 1) {
//         ScrollTrigger.create({
//           trigger: card,
//           start: "top top",
//           endTrigger: cards[cards.length - 1],
//           end: "top top",
//           pin: true,
//           pinSpacing: false,
//         });
//       }

//       // Escala y rotación entre cards
//       if (index < cards.length - 1) {
//         ScrollTrigger.create({
//           trigger: cards[index + 1],
//           start: "top bottom",
//           end: "top top",
//           onUpdate: (self) => {
//             const progress = self.progress;
//             const scale = 1 - progress * 0.25;
//             const rotation = (index % 2 === 0 ? 5 : -5) * progress;

//             gsap.set(card, {
//               scale,
//               rotation,
//               "--after-opacity": progress,
//             });
//           },
//         });
//       }
//     });

//     // Recalcular cuando todo está montado
//     setTimeout(() => ScrollTrigger.refresh(), 500);

//     return () => ScrollTrigger.getAll().forEach((t) => t.kill());
//   }, []);

//   return (
//     <div className="process-cards">
//       {processCardsData.map((c, i) => (
//         <div key={i} className="process-card">
//           <div className="process-card-index">
//             <h1>{c.index}</h1>
//           </div>

//           <div className="process-card-content">
//             <div className="process-card-content-wrapper">
//               <h2 className="process-card-header">{c.title}</h2>

//               <div className="process-card-img">
//                 <img src={c.image} alt={c.title} />
//               </div>

//               <div className="process-card-copy">
//                 <p>{c.description}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProcessCards;
