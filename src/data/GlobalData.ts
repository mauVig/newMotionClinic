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
            es:'Cirugía Robótica MAKO',
            en:'MAKO Robotic Surgery'
        },
        description:{
            es:`Máxima e inigualable precisión en reemplazos articulares de cadera y rodilla, utilizando el sistema robótico más avanzado del mundo, MAKO SmartRoboticsTM. Ofrece beneficios como menor dolor postoperatorio, incisiones mínimas y una colocación personalizada de los implantes. <span class="text-purple">Esto permite una recuperación más rápida, optimiza la funcionalidad, mejora la calidad de vida y prolonga la durabilidad de los implantes.</span>`,
            en:`Maximum and unparalleled precision in hip and knee joint replacements, using the world's most advanced robotic system, MAKO SmartRoboticsTM. It offers benefits such as less postoperative pain, minimal incisions, and personalized implant placement. <span class="text-purple">This allows for faster recovery, optimizes functionality, improves quality of life, and prolongs the durability of the implants.</span>`
        },
        img:'/img/tratamientos/tratamientos1.webp'
    },
    {
        id:7,
        title:{
            es:'Incisiones Mini Invasivas',
            en:'Mini Invasive Incisions'
        },
        description:{
            es:`Técnica avanzada que reduce el trauma quirúrgico, permitiendo una recuperación mas rápida, menos dolor y cicatrices mínimas. <span class="text-purple">Apoyados en tecnología de precisión, preservamos tejidos sanos y mejoramos la movilidad en menos tiempo.</span>`,
            en:`Advanced technique that reduces surgical trauma, allowing for faster recovery, less pain, and minimal scarring. <span class="text-purple">Supported by precision technology, we preserve healthy tissues and improve mobility in less time.</span>`
        },
        img:'/img/tratamientos/tratamientos2.webp'

    },
    {
        id:2,
        title:{
            es:'Reemplazo Articular Convencional',
            en:'Conventional Joint Replacement'
        },
        description:{
            es:'Cirugías de reemplazo articular con técnicas tradicionales perfeccionadas para restaurar movilidad y aliviar dolor crónico por artrosis. <span class="text-purple">Enfocadas en resultados duraderos y recuperación funcional mediante procedimientos confiables y seguros.</span>',
            en:`Joint replacement surgeries with traditional techniques perfected to restore mobility and relieve chronic pain from osteoarthritis. <span class="text-purple">Focused on lasting results and functional recovery through reliable and safe procedures.</span>`
        },
        img:'/img/tratamientos/tratamientos3.webp'

    },
    {
        id:3,
        title:{
            es:'Medicina Regenerativa',
            en:'Regenerative Medicine'
        },
        description:{
            es:`Terapias biológicas innovadoras, como PRP (plasma rico en plaquetas) y Células Madre, que regeneran tejidos y alivian el dolor articular. <span class="text-purple">Ideales para tratar lesiones y ralentizar el deterioro articular, promoviendo una mejora natural en la movilidad y calidad de vida.</span>`,
            en:`Innovative biological therapies, such as PRP (platelet-rich plasma) and Stem Cells, that regenerate tissues and relieve joint pain. <span class="text-purple">Ideal for treating injuries and slowing down joint deterioration, promoting natural improvement in mobility and quality of life.</span>`
        },
        img:'/img/tratamientos/tratamientos4.webp'

    },
    {
        id:4,
        title:{
            es:'Medicina Deportiva',
            en:'Sports Medicine'
        },
        description:{
            es:`Abordaje especializado en lesiones deportivas con técnicas avanzadas de diagnóstico y tratamiento. <span class="text-purple">Ayuda a los pacientes a recuperar su rendimiento físico, previniendo recaídas y optimizando su retorno a la actividad.</span>`,
            en:`Specialized approach to sports injuries with advanced diagnostic and treatment techniques. <span class="text-purple">Helps patients recover their physical performance, preventing relapses and optimizing their return to activity.</span>`
        },
        img:'/img/tratamientos/tratamientos5.webp'

    },
    {
        id:5,
        title:{
            es:'Prevencion de Infecciones',
            en:'Infection Prevention'
        },
        description:{
            es:`Protocolo de última generación que minimiza el riesgo de infecciones durante y después de la cirugía, garantizando mayor seguridad y tranquilidad para los pacientes. <span class="text-purple">Este enfoque multidimensional abarca 10 estrategias clave, que van desde la preparación preoperatoria, cuidados intraoperatorios y seguimiento postoperatorio, asegurando un control integral y resultados óptimos en la prevención de infecciones.</span>`,
            en:`State-of-the-art protocol that minimizes the risk of infections during and after surgery, ensuring greater safety and peace of mind for patients. <span class="text-purple">This multidimensional approach encompasses 10 key strategies, ranging from preoperative preparation, intraoperative care, and postoperative follow-up, ensuring comprehensive control and optimal results in infection prevention.</span>`
        },
        img:'/img/tratamientos/tratamientos6.webp'
    },
    {
        id:6,
        title:{
            es:'Cierre de Heridas sin Puntos (Estético)',
            en:'Stitchless Wound Closure (magic clousure)'
        },

        description:{
            es:`Tecnología de última generación en cierre de heridas quirúrgicas, sin necesidad de puntos. El sistema sella la herida de forma hermética, reduciendo significativamente el riesgo de infecciones. Además, maximiza el confort del paciente al no requerir curaciones diarias y permitir baños de higiene personal sin complicaciones. <span class="text-purple">Como resultado, se obtienen cicatrices mínimas y resultados estéticos impecables que mejoran la confianza y satisfacción del paciente.</span>`,
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