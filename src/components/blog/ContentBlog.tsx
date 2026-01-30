import React from 'react';
import blogData from '@/data/blogData.json';
import styles from './ContentBlog.module.css';
import { generateSlugPath } from '@/utility/grobalUtility';

interface ContentBlogProps {
    blog?: any;
    isIndividual?: boolean;
}

const ContentBlog: React.FC<ContentBlogProps> = ({ blog, isIndividual = false }) => {

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
                                <img 
                                    src={principalBlog.img} 
                                    alt={principalBlog.title}
                                    className="w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] object-cover rounded-lg"
                                    />
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
                            <article className="text-xl space-y-6">
                                <div 
                                    dangerouslySetInnerHTML={{ __html: principalBlog.develop }}
                                />
                                {/* Fuente del artículo */}
                                {principalBlog.source && (
                                    <div className="mt-8 pt-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-400">
                                            
                                            <span className="font-medium text-gray-300">Fuente:</span>
                                            <a 
                                                href={principalBlog.source}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="magnetic relative inline-flex items-center justify-center
                                                           px-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(0.3rem,0.6vw,0.5rem)]
                                                           rounded-[0.7rem] font-semibold text-[clamp(0.8rem,1vw,1rem)]
                                                           uppercase tracking-wide text-white bg-transparent border border-[#5b25d4]
                                                           overflow-hidden group
                                                           hover:bg-[#5b25d4]/10 hover:shadow-[0_0_25px_rgba(91,37,212,0.5)]
                                                           focus-visible:ring-2 focus-visible:ring-[#5b25d4]/60
                                                           active:scale-[0.97]
                                                           transition-all duration-300"
                                            >
                                                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                                                    {new URL(principalBlog.source).hostname.replace('www.', '')}
                                                </span>
                                                <span
                                                    className="absolute inset-0 bg-gradient-to-r from-[#5b25d4] to-[#8b5cf6]
                                                               opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out
                                                               rounded-[0.7rem]"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                )}
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
                                    
                                    <a href={`/blog/${generateSlugPath(blogItem.title)}`} className="block">
                                        <div className="relative overflow-hidden rounded-lg mb-4">
                                            <img 
                                                src={blogItem.img} 
                                                alt={blogItem.title}
                                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        
                                        <div>
                                            <div>
                                                <h4 className="h-14 text-xl font-bold text-white mb-2 group-hover:text-purple transition-colors">
                                                    {blogItem.title}
                                                </h4>
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: blogItem.develop.substring(0, 210) + ' ...' }}
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