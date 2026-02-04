import { Brain, Ear, GraduationCap, Library } from 'lucide-react';


export interface Skill {
    id: number;
    title: { es: string; en: string };
    description: { es: string; en: string };
    img: string;
}


export const skillsData: Skill[] = [
    {
        id:1,
        title:{
            es:'Cirugía Robótica MAKO en Cadera y Rodilla',
            en:'MAKO Robotic Surgery'
        },
        description:{
            es:`La cirugía robótica MAKO aplicada a reemplazos de cadera y rodilla permite una planificación 3D personalizada y una ejecución quirúrgica de altísima precisión. En Motion Clinic, utilizamos tecnología MAKO SmartRobotics™ para lograr una colocación exacta del implante, menor daño en tejidos blandos y resultados funcionales más predecibles. <span class="text-purple"> Esto se traduce en menor dolor postoperatorio, recuperación más rápida, mejor movilidad y mayor durabilidad del implante, en un centro especializado en cirugía robótica ortopédica. </span>`,
            en:`Maximum and unparalleled precision in hip and knee joint replacements, using the world's most advanced robotic system, MAKO SmartRoboticsTM. It offers benefits such as less postoperative pain, minimal incisions, and personalized implant placement. <span class="text-purple">This allows for faster recovery, optimizes functionality, improves quality of life, and prolongs the durability of the implants.</span>`
        },
        img:'/img/tratamientos/tratamientos1.webp'
    },
    {
        id:7,
        title:{
            es:'Cirugía Mini Invasiva en Cadera y Rodilla',
            en:'Mini Invasive Incisions'
        },
        description:{
            es: `Las técnicas de cirugía mini invasiva permiten reducir el trauma quirúrgico en procedimientos de cadera y rodilla, favoreciendo una recuperación más rápida y menos dolorosa. En Motion Clinic aplicamos abordajes precisos que minimizan las incisiones y preservan tejidos sanos. <span class="text-purple">Esto mejora la movilidad en menos tiempo, reduce cicatrices visibles y optimiza la experiencia postoperatoria del paciente.</span>`,
            en:`Advanced technique that reduces surgical trauma, allowing for faster recovery, less pain, and minimal scarring. <span class="text-purple">Supported by precision technology, we preserve healthy tissues and improve mobility in less time.</span>`
        },
        img:'/img/tratamientos/tratamientos2.webp'

    },
    {
        id:2,
        title:{
            es: 'Reemplazo Articular Convencional de Cadera y Rodilla',
            en:'Conventional Joint Replacement'
        },
        description:{
            es: `El reemplazo articular convencional de cadera y rodilla continúa siendo una opción eficaz para tratar el dolor crónico y la pérdida de movilidad causada por artrosis avanzada. En Motion Clinic realizamos estos procedimientos con técnicas quirúrgicas optimizadas y protocolos de seguridad estrictos. <span class="text-purple">El objetivo es restaurar la función articular, aliviar el dolor y lograr resultados duraderos con una recuperación funcional confiable.</span>`,
            en:`Joint replacement surgeries with traditional techniques perfected to restore mobility and relieve chronic pain from osteoarthritis. <span class="text-purple">Focused on lasting results and functional recovery through reliable and safe procedures.</span>`
        },
        img:'/img/tratamientos/tratamientos3.webp'

    },
    {
        id:3,
        title:{
            es: 'Medicina Regenerativa para Articulaciones',
            en:'Regenerative Medicine'
        },
        description:{
            es: `La medicina regenerativa ofrece tratamientos biológicos como PRP (plasma rico en plaquetas) y terapias con células madre para aliviar el dolor articular y favorecer la regeneración de tejidos. Estas terapias son utilizadas en lesiones de cadera y rodilla y en etapas iniciales de artrosis. <span class="text-purple">Pueden ayudar a retrasar procedimientos quirúrgicos y mejorar la movilidad de forma natural y progresiva.</span>`,
            en:`Innovative biological therapies, such as PRP (platelet-rich plasma) and Stem Cells, that regenerate tissues and relieve joint pain. <span class="text-purple">Ideal for treating injuries and slowing down joint deterioration, promoting natural improvement in mobility and quality of life.</span>`
        },
        img:'/img/tratamientos/tratamientos4.webp'

    },
    {
        id:4,
        title:{
            es: 'Medicina Deportiva y Lesiones de Rodilla',
            en:'Sports Medicine'
        },
        description:{
            es: `La medicina deportiva en Motion Clinic está orientada al diagnóstico y tratamiento de lesiones deportivas, especialmente de rodilla y cadera. Aplicamos estrategias terapéuticas avanzadas para deportistas amateurs y profesionales. <span class="text-purple">El objetivo es recuperar el rendimiento físico, prevenir recaídas y optimizar el retorno seguro a la actividad deportiva.</span>`,
            en:`Specialized approach to sports injuries with advanced diagnostic and treatment techniques. <span class="text-purple">Helps patients recover their physical performance, preventing relapses and optimizing their return to activity.</span>`
        },
        img:'/img/tratamientos/tratamientos5.webp'

    },
    {
        id:5,
        title:{
            es: 'Prevención de Infecciones en Cirugía Ortopédica',
            en:'Infection Prevention'
        },
        description:{
            es: `Motion Clinic cuenta con un protocolo integral de prevención de infecciones quirúrgicas que abarca todas las etapas del proceso, desde la preparación preoperatoria hasta el seguimiento postoperatorio. Este enfoque reduce significativamente el riesgo de complicaciones infecciosas. <span class="text-purple">La aplicación de múltiples estrategias coordinadas garantiza cirugías ortopédicas más seguras y mayor tranquilidad para el paciente.</span>`,
            en:`State-of-the-art protocol that minimizes the risk of infections during and after surgery, ensuring greater safety and peace of mind for patients. <span class="text-purple">This multidimensional approach encompasses 10 key strategies, ranging from preoperative preparation, intraoperative care, and postoperative follow-up, ensuring comprehensive control and optimal results in infection prevention.</span>`
        },
        img:'/img/tratamientos/tratamientos6.webp'
    },
    {
        id:6,
        title:{
            es: 'Cierre de Heridas sin Puntos y Resultados Estéticos',
            en:'Stitchless Wound Closure (magic clousure)'
        },

        description:{
            es: `El cierre de heridas quirúrgicas sin puntos utiliza tecnología avanzada que sella la piel de forma hermética, reduciendo el riesgo de infección y mejorando el confort del paciente. Este sistema evita curaciones diarias y permite una higiene personal sin complicaciones. <span class="text-purple">El resultado son cicatrices mínimas, mejor resultado estético y mayor satisfacción del paciente tras la cirugía.</span>`,
            en:`State-of-the-art surgical techniques and technology in surgical wound closure, without the need for stitches. The system seals the wound hermetically, significantly reducing the risk of infections. It also maximizes patient comfort by not requiring daily dressings and allowing personal hygiene baths without complications. <span class="text-purple">As a result, minimal scars and impeccable aesthetic results are obtained that improve patient confidence and satisfaction.</span>`
        },
        img:'/img/tratamientos/tratamientos7.webp'
    },

]

export const cardsBiografy = [
    {
      id: 2,
      icon: GraduationCap,
      titleEs: "Especialización Médica",
      titleEn: "Medical Specialization",
      contentEs: "Soy <span class='text-purple font-semibold'>Andrés Anania</span>, médico traumatólogo, subespecializado en las afecciones de la <span class='text-purple'>cadera</span> y <span class='text-purple'>rodilla</span>.",
      contentEn: "I am <span class='text-purple font-semibold'>Andrés Anania</span>, an orthopedic surgeon, specialized in hip and knee conditions."
    },
    {
      id: 1,
      icon: Library,
      titleEs: "Formación Académica",
      titleEn: "Academic Training",
      contentEs: "Mi formación incluye un <span class='text-purple font-semibold'>AVP Fellowship</span> en el Hospital for <span class='text-purple font-semibold'>Special Surgery en Nueva York</span>, un MBA en el IAE Business School, y programas ejecutivos en <span class='text-purple font-semibold'>Harvard Business School</span> y <span class='text-purple font-semibold'>Stanford</span> sobre transformación digital e <span class='text-purple font-semibold'>inteligencia artificial</span> aplicados a la salud.",
      contentEn: "My training includes an <span class='text-purple font-semibold'>AVP Fellowship</span> at the Hospital for <span class='text-purple font-semibold'>Special Surgery in New York</span>, an MBA from IAE Business School, and executive programs at <span class='text-purple font-semibold'>Harvard Business School</span> and <span class='text-purple font-semibold'>Stanford</span> on digital transformation and <span class='text-purple font-semibold'>artificial intelligence</span> applied to health."
    },
    {
      id: 3,
      icon: Brain,
      titleEs: "Innovación Médica",
      titleEn: "Medical Innovation",
      contentEs: "Con una sólida trayectoria en el campo de la <span class='text-purple font-semibold'>innovación médica</span> y experiencia en la adopción de <span class='text-purple font-semibold'>nuevas tecnologías</span>.",
      contentEn: "With a solid track record in the field of <span class='text-purple font-semibold'>medical innovation</span> and experience in the adoption of <span class='text-purple font-semibold'>new technologies</span>."
    },
    {
      id: 4,    
      icon: Ear,
      titleEs: "Compromiso con el Paciente",
      titleEn: "Patient Commitment",
      contentEs: "Mi objetivo es brindarte una <span class='text-purple font-semibold'>atención de excelencia</span> que combine <span class='text-purple font-semibold'>vanguardia</span> y <span class='text-purple font-semibold'>cuidado personalizado</span> para ayudarte a recuperar tu <span class='text-purple font-semibold'>movilidad</span> y <span class='text-purple font-semibold'>calidad de vida</span>.",
      contentEn: "My goal is to provide you with <span class='text-purple font-semibold'>excellent care</span> that combines <span class='text-purple font-semibold'>cutting-edge technology</span> and <span class='text-purple font-semibold'>personalized care</span> to help you regain your <span class='text-purple font-semibold'>mobility</span> and <span class='text-purple font-semibold'>quality of life</span>."
    }
  ];