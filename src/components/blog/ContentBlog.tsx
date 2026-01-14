import React from 'react';
import blogData from '@/data/blogData.json';



const ContentBlog: React.FC= () => {
    console.log('Blog Data in ContentBlog:', blogData);
    const principalBlog = blogData[0]; 

    // Función para procesar el contenido y crear párrafos
    const processContent = (content: string) => {
        // Dividir por doble salto de línea para crear párrafos
        const paragraphs = content.split('\n\n');
        
        return paragraphs
            .filter(paragraph => paragraph.trim() !== '') // Eliminar párrafos vacíos
            .map((paragraph, index) => {
                // Convertir saltos simples en <br>
                const processedParagraph = paragraph.replace(/\n/g, '<br>');
                return `<p class="news-paragraph text-lg text-gray-300 leading-relaxed text-justify mb-6">${processedParagraph}</p>`;
            })
            .join('');
    };

    return (
        <>
        <style>{`
            /* Estilos que no se pueden replicar completamente con Tailwind */
            .news-paragraph {
                hyphens: auto;
            }
            
            .news-paragraph:first-letter {
                font-weight: bold;
            }
            
            /* Responsive específico para el layout de noticias */
            @media (max-width: 1280px) {
                .flex {
                    flex-direction: column;
                }
                
                .w-1\\/2 {
                    width: 100%;
                }
                
                /* Reorganizar meta información para que el logo esté a la izquierda */
                .meta-date-container {
                    flex-direction: row !important;
                    gap: 0.5rem !important;
                }
                
                .meta-icon {
                    order: -1;
                }
                
                .meta-text {
                    white-space: nowrap;
                }
            }
        `}</style>
        <div className="min-h-screen bg-[#111] text-white">
            <div className="container mx-auto px-6 pt-24 pb-16">
            
                <div className="flex gap-8 items-start">
                    {/* Imagen */}
                    <div className="flex-shrink-0 w-1/2 xl:sticky top-24 self-start">
                        <h2 className=" xl:hidden text-4xl xl:text-5xl font-black text-white leading-tight mb-4 border-l-4 border-[#5b25d4] pl-4 font-sans drop-shadow-lg">
                               {principalBlog.title}
                        </h2>
                        <div className="transition-transform duration-300 hover:scale-105">
                            {principalBlog.youtube === null ? (
                                <>
                                    <img 
                                        src="/img/tratamientos/tratamientos1.webp" 
                                        alt="Cirugía Robótica" 
                                        className="w-full rounded-lg shadow-2xl "
                                    />
                                    <div className="news-category absolute top-4 left-4">
                                        <span className="bg-[#5b25d4] text-white px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                                            Tecnología Médica
                                        </span>
                                    </div>
                                </>
                            ):(
                                <>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${principalBlog.youtube}`}
                                        title="Video 1"
                                        className="w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] object-cover rounded-lg"
                                        allowFullScreen
                                        >
                                    </iframe>
                                </>
                            )}
                        </div>
                    </div>
                    
                    {/* Contenido de la Noticia */}
                    <div className="flex-1">
                        {/* Título de Portal de Noticias */}
                        <header className=" mb-6">
                            {/* Meta información de la noticia */}
                            <div className="flex items-center gap-6 text-sm text-gray-400 mb-6 pb-4">
                                <span className="flex items-center gap-2 meta-date-container">
                                    <svg className="w-4 h-4 text-[#ffffff] meta-icon" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="meta-text">{principalBlog.date}</span>
                                </span>
                            </div>
                            <h2 className="hidden xl:block text-4xl xl:text-5xl font-black text-white leading-tight mb-4 border-l-4 border-[#5b25d4] pl-4 font-sans drop-shadow-lg">
                                {principalBlog.title}
                            </h2>
                            
                        </header>
                        
                    
                        
                        {/* Párrafos del artículo */}
                        <article className="news-article space-y-6">
                            <div 
                                dangerouslySetInnerHTML={{ __html: processContent(principalBlog.develop) }}
                            />
                        </article>
                        
                        
                    </div>
                </div>
            
                {/* Portal de Noticias - Otras Noticias */}
                <section className="mt-16 border-t border-gray-700 pt-12">
                    <div className="mb-8">
                        <h3 className="text-3xl font-bold text-white border-l-4 border-[#5b25d4] pl-4 mb-2">Otras Noticias</h3>
                        <p className="text-gray-400 ml-6">Mantente informado con las últimas novedades de Motion Clinic</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Noticia 1 */}
                        <article className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <img 
                                    src="/img/tratamientos/tratamientos2.webp" 
                                    alt="Terapia de rehabilitación"
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        REHABILITACIÓN
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5b25d4] transition-colors">
                                    Nueva Unidad de Rehabilitación Acuática
                                </h4>
                                <p className="text-gray-400 text-sm mb-3">
                                    Inauguramos nuestro centro de hidroterapia para acelerar la recuperación de pacientes ortopédicos...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    28 Diciembre 2024
                                </div>
                            </div>
                        </article>

                        {/* Noticia 2 */}
                        <article className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <img 
                                    src="/img/tratamientos/tratamientos3.webp" 
                                    alt="Tecnología diagnóstica"
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        DIAGNÓSTICO
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5b25d4] transition-colors">
                                    Resonancia Magnética de Alta Resolución 3Tesla
                                </h4>
                                <p className="text-gray-400 text-sm mb-3">
                                    Nueva tecnología de imagen que permite diagnósticos más precisos en tiempo récord...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    26 Diciembre 2024
                                </div>
                            </div>
                        </article>

                        {/* Noticia 3 */}
                        <article className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <img 
                                    src="/img/tratamientos/tratamientos4.webp" 
                                    alt="Equipo médico especializado"
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        EQUIPO MÉDICO
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5b25d4] transition-colors">
                                    Nuevo Especialista en Cirugía de Columna
                                </h4>
                                <p className="text-gray-400 text-sm mb-3">
                                    El Dr. Martinez se incorpora al equipo con más de 15 años de experiencia internacional...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    24 Diciembre 2024
                                </div>
                            </div>
                        </article>

                        {/* Noticia 4 */}
                        <article className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <img 
                                    src="/img/tratamientos/tratamientos5.webp" 
                                    alt="Investigación clínica"
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        INVESTIGACIÓN
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5b25d4] transition-colors">
                                    Estudio Clínico sobre Regeneración Cartilaginosa
                                </h4>
                                <p className="text-gray-400 text-sm mb-3">
                                    Motion Clinic participa en investigación pionera sobre terapias regenerativas para articulaciones...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    22 Diciembre 2024
                                </div>
                            </div>
                        </article>

                        {/* Noticia 5 */}
                        <article className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <img 
                                    src="/img/tratamientos/tratamientos6.webp" 
                                    alt="Programas de prevención"
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        PREVENCIÓN
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5b25d4] transition-colors">
                                    Campaña de Evaluación Postural Gratuita
                                </h4>
                                <p className="text-gray-400 text-sm mb-3">
                                    Durante enero ofrecemos evaluaciones posturales sin costo para prevenir lesiones deportivas...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    20 Diciembre 2024
                                </div>
                            </div>
                        </article>

                        {/* Noticia 6 */}
                        <article className="group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2">
                            <div className="relative overflow-hidden rounded-lg mb-4">
                                <img 
                                    src="/img/tratamientos/tratamientos7.webp" 
                                    alt="Tecnología innovadora"
                                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                        INNOVACIÓN
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#5b25d4] transition-colors">
                                    Plataforma de Telemedicina para Seguimiento
                                </h4>
                                <p className="text-gray-400 text-sm mb-3">
                                    Nuevo sistema que permite monitorear la evolución de pacientes desde casa...
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                    </svg>
                                    18 Diciembre 2024
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Botón Ver Todas las Noticias */}
                    <div className="text-center mt-12">
                        <button className="group px-8 py-3 bg-gradient-to-r from-[#5b25d4] to-[#7c3aed] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                            Ver Todas las Noticias
                            <svg className="inline-block w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </section>
            
            </div>
    </div>
        </>
    );
};

export default ContentBlog;