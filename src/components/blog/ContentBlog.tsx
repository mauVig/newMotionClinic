import React from 'react';
import blogData from '@/data/blogData.json';
import styles from './ContentBlog.module.css';

interface ContentBlogProps {
    blog?: any;
    isIndividual?: boolean;
}

const ContentBlog: React.FC<ContentBlogProps> = ({ blog, isIndividual = false }) => {
    console.log('Blog Data in ContentBlog:', blogData);
    
    // Función para generar slug
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    // Función para procesar el contenido y crear párrafos
    const processContent = (content: string) => {
        // Dividir por doble salto de línea para crear párrafos
        const paragraphs = content.split('\n\n');
        
        return paragraphs
            .filter(paragraph => paragraph.trim() !== '') // Eliminar párrafos vacíos
            .map((paragraph, index) => {
                // Convertir saltos simples en <br>
                const processedParagraph = paragraph.replace(/\n/g, '<br>');
                return `<p class="${styles.newsParagraph} text-lg text-gray-300 leading-relaxed text-justify mt-6">${processedParagraph}</p>`;
            })
            .join('');
    };

    // Si es vista individual, mostrar blog específico
    if (isIndividual && blog) {
        const principalBlog = blog;
        
        return (
            <div className="min-h-screen bg-[#111] text-white">
                <div className="container mx-auto px-6 pt-24 pb-16">
                
                    <div className={`flex gap-8 items-start ${styles.flex}`}>
                        {/* Imagen */}
                        <div className={`flex-shrink-0 w-1/2 xl:sticky top-24 self-start ${styles.w1_2}`}>
                            <h2 className=" xl:hidden text-4xl xl:text-5xl font-black text-white leading-tight mb-4 border-l-4 border-[#5b25d4] pl-4 font-sans drop-shadow-lg">
                                   {principalBlog.title}
                            </h2>
                            <div className="transition-transform duration-300">
                                {principalBlog.youtube  && (
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
                                {principalBlog.youtube === null && (
                                    <img 
                                        src={principalBlog.minImg} 
                                        alt="Cirugía Robótica"
                                        className="w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] object-cover rounded-lg"
                                        />
                                )}
                            </div>
                        </div>
                        
                        {/* Contenido de la Noticia */}
                        <div className="flex-1">
                            {/* Título de Portal de Noticias */}
                            <header className=" mb-6">
                                {/* Meta información de la noticia */}
                                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6 pb-4">
                                    <span className={`flex items-center gap-2 ${styles.metaDateContainer}`}>
                                        <svg className={`w-4 h-4 text-[#ffffff] ${styles.metaIcon}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                                        </svg>
                                        <span className={`${styles.metaText}`}>{principalBlog.date}</span>
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
                        <div className="mb-8 border-l-4 border-[#5b25d4]">
                            <h3 className="text-3xl font-bold text-white  pl-4 mb-2">Blog de noticias</h3>
                            <p className="text-gray-400 ml-4">Mantente informado con las últimas novedades de Motion Clinic</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogData.filter((_, index) => index !== blogData.findIndex(b => b.title === principalBlog.title)).map((blogItem, index) => (
                                <article className="group cursor-pointer transition-all duration-300 hover:transform 
                                    hover:bg-violet/10 p-4 rounded-lg " key={index}>
                                    
                                    <a href={`/blog/${generateSlug(blogItem.title)}`} className="block">
                                        <div className="relative overflow-hidden rounded-lg mb-4">
                                            <img 
                                                src={blogItem.minImg} 
                                                alt="Terapia de rehabilitación"
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        
                                        <div>
                                            <div className='h-[100px]'>
                                                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple transition-colors">
                                                    {blogItem.title}
                                                </h4>
                                            </div>
                                            <div 
                                                dangerouslySetInnerHTML={{ __html: processContent(blogItem.develop.substring(0, 210) + ' ...') }}
                                            />
                                        </div>
                                    </a>
                                </article>
                            ))}
                        </div>
                    </section>
                
                </div>
        </div>
        );
    }


};

export default ContentBlog;