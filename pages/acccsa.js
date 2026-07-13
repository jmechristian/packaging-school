import React from 'react';
import AcccsaHero from '../components/acccsa/AcccsaHero';
import AcccsaCourses from '../components/acccsa/AcccsaCourses';
import Link from 'next/link';
import Script from 'next/script';
import Meta from '../components/shared/Meta';
import {
  buildHomeJsonLd,
  buildBreadcrumbJsonLd,
} from '../libs/seo/organizationJsonLd';

const courses = [
  {
    category: 'Industria',
    items: [
      {
        name: 'Conceptos básicos del corrugado 101,102,103',
        duration: '3 horas',
        subtext: '1 hora por curso',
        description:
          'Este curso ofrece una perspectiva general de la historia y de la industria, los usos del cartón, y la fabricación y la conversión del cartón. La serie en tres partes denominada Conceptos básicos del corrugado 101, 102, 103 inicia con un análisis de la industria moderna del corrugado. Analiza la construcción, las configuraciones y los tipos de cartón. Explica cómo se fabrica el cartón, las especificaciones del cartón líner, del médium y del cartón corrugado combinado terminado, así como los ensayos que garantizan la calidad. Por último, estudia las formas más comunes de empaques corrugados, la terminología de las cajas, y los blancos de las cajas antes de construirlas.',
      },
      {
        name: 'Cómo realizar una auditoría a la corrugadora',
        duration: '60 Minutos',
        description:
          'Ya sea que se haga en el lugar o se compre en otro lugar, la medición cuidadosa y el monitoreo de la calidad de la hoja es esencial para la fabricación profesional de cajas. Este curso define las herramientas y el proceso para controlar mejor su corrugado, o para hablar con su proveedor con datos útiles y convincentes.',
      },
    ],
  },
  {
    category: 'Procesos y sistemas',
    items: [
      {
        name: 'La eficiencia general de los equipos (OEE) en la industria de empaques',
        duration: '60 Minutos',
        description:
          'Este curso define la eficiencia general de los equipos y explica cómo se ha convertido en una medida práctica y equilibrada para la productividad. Scott Heilmann hace un recorrido por los pasos para recopilar las medidas de referencia, calcular OEE, cuantificar los ahorros derivados, compensar el impacto de la conversión y establecer metas de producción motivadoras. Permite el acceso del usuario a materiales complementarios.',
      },
      {
        name: 'Creando un lugar de trabajo visual de trabajo usando las 5S ó 7S',
        duration: '60 Minutos',
        description:
          'La organización del entorno de trabajo es fundamental para mejorar. Si el lugar de trabajo es desorganizado, será imposible mantener ganancias en la productividad. Este curso describe las 5 S y los dos resultados esperados para que las motivaciones de los empleados concuerden con las metas de la empresa. Analiza los conceptos y las mejores prácticas de las actividades de organización y los acuerdos necesarios con los empleados para mantener el progreso del Entorno visual de Psquared Team.',
      },
      {
        name: 'Reducción de la configuración',
        duration: '60 Minutos',
        description:
          'Este curso explica las técnicas de manufactura esbelta con el propósito de eliminar el desperdicio de tiempo por el cambio entre órdenes. Los participantes utilizarán la herramienta TIMWOOD para identificar los siete tipos de desperdicio. Utiliza un vídeo que presenta una preparación de diez minutos, para supervisar a los operadores con un diagrama de espagueti; luego, describe el proceso para establecer las prioridades y el equilibrio del trabajo. Analiza las tareas y el tiempo que toma cumplirlas y completa la capacitación requerida. La mayoría de las veces, los resultados de este tiempo de preparación se reducen a la mitad.',
      },
      {
        name: 'Introducción al diseño de cargas unitarias de cajas a nivel de sistema',
        duration: '60 Minutos',
        description:
          '¿Sabían que las cajas y las tarimas interactúan entre si al ensamblarlas en una carga unitaria? Dicha interacción es la responsable del desempeño, es decir, el éxito o el fracaso, de las cajas y tarimas. A fin de obtener el máximo beneficio, se debe efectuar la optimización tomando en consideración todo el sistema. En este curso se presenta una introducción al diseño de cargas unitarias de cajas a nivel de sistema, incluyendo beneficios, posibles ahorros de costos, impactos ambientales, ingeniería y desarrollo. También se analizan algunos estudios de caso y se trata a mayor detalle la interacción entre las cajas y las tarimas.',
      },
      {
        name: 'Factores que afectan la resistencia a la estiba en los empaques de cartón corrugado',
        duration: '120 Minutos',
        description:
          'En este curso aprenderá algunos de los factores que pueden afectar la resistencia a la estiba como son un mal diseño, aplastamiento de la flauta por exceso de presión en las impresoras, mal acomodo en las tarimas, humedad, etc. Como hacer el cálculo de la resistencia ECT y BTC partiendo de las medidas exteriores de una caja y su tipo de flauta dependiendo la resistencia o el peso que se requiere soportar utilizando la formula de Mckee.',
      },
      {
        name: 'Principios básicos de las tintas a base de agua para impresión flexográfica',
        duration: '60 Minutos',
        description:
          'Aunque existen opciones cuando se trata de escoger entre las distintas tintas para impresión, es un hecho que las tintas son fundamentales para lograr un trabajo de impresión de calidad. Este curso enseña los conceptos básicos que todo impresor o proveedor debe saber sobre las tintas flexo a base de agua y cómo diseñarlas para que entreguen una impresión consistente y de calidad.',
      },
    ],
  },
  {
    category: 'Producción',
    items: [
      {
        name: 'El pandeo y cómo controlarlo',
        duration: '60 Minutos',
        description:
          'En curso analiza cómo reacciona el papel o el cartón combinado a la humedad o a la tensión y cómo corregir el pandeo cuando el operador realiza los ajustes necesarios. Los participantes aprenderán más sobre el proceso de control de la humedad en el corrugador manteniendo intacta la integridad de la adhesión.',
      },
      {
        name: 'Fundamentos de la impresión flexográfica',
        duration: '60 Minutos',
        description:
          'La impresión flexográfica de alta calidad en los sustratos corrugados siempre ha sido un desafío. Este curso demuestra cómo producir colores limpios lisos y grabados en línea, así como semitonos y los colores de la mancha. Analiza varios aspectos relacionados con la solución de problemas que abarcan la ganancia de punto y el troquelado para el diseño gráfico apropiado para el corrugado para garantizar los mejores resultados. Parte de los objetivos centrales estudiados en el taller presencial impartido en la PrintCon de Clemson.',
      },
      {
        name: 'Cómo especificar una caja',
        duration: '60 Minutos',
        description:
          'En curso enseña a definir el tipo de caja que medirá, el material con que construirá la caja, la forma de prepararla para realizar una medición precisa y, por último, a definir el largo y el ancho interno de una caja.',
      },
      {
        name: 'Las matemáticas para producción de empaques',
        duration: '60 Minutos',
        description:
          'Este curso es una guía práctica sobre la forma de utilizar las habilidades matemáticas en la producción de empaques. El instructor de matemáticas Greg Davis repasa fracciones, el uso de la cinta de medir, la conversión de medidas estándar y métricas a decimales y la estimación del conteo de productos. Este curso no es un curso de matemática en sí mismo, pero prepara a los trabajadores enseñándoles de qué forma les ayudará la destreza matemática y dónde aplicarla para que lograr una producción de empaques exitosa.',
      },
      {
        name: 'Cómo optimizar la impresión flexográfica',
        duration: '120 Minutos',
        description:
          '¿Cuántos de nosotros sabemos cómo transformarnos en nuestra mejor versión? Muchos no tenemos la menor idea y lo mismo les ocurre a nuestros procesos de impresión flexográfica. Por eso, este curso está diseñado para mostrar las tecnologías y los sistemas más avanzados que le permitirán lograr una mejor versión de su prensa.',
      },
      {
        name: 'Comprensión de las combinaciones del cartón corrugado',
        duration: '60 Minutos',
        description:
          'Los diferentes gramajes del cartón para empaques permiten realizar todo tipo de ECT. Los líneres y los médiums se fabrican en una gran diversidad de propiedades de resistencia. La tendencia es elegir mayor resistencia con menor gramaje al menor costo. Aprenda sobre la capacidad del corrugador para maximizar las resistencias inherentes de las materias primas.',
      },
    ],
  },
  {
    category: 'Seguridad',
    items: [
      {
        name: 'Fundamentos de seguridad 101,102,103',
        duration: '3 horas',
        subtext: '1 hora por curso',
        description:
          'Este curso ofrece una perspectiva general de la historia y de la industria, los usos del cartón, y la fabricación y la conversión del cartón. La serie en tres partes denominada Conceptos básicos del corrugado 101, 102, 103 inicia con un análisis de la industria moderna del corrugado. Analiza la construcción, las configuraciones y los tipos de cartón. Explica cómo se fabrica el cartón, las especificaciones del cartón líner, del médium y del cartón corrugado combinado terminado, así como los ensayos que garantizan la calidad. Por último, estudia las formas más comunes de empaques corrugados, la terminología de las cajas, y los blancos de las cajas antes de construirlas.',
      },
      {
        name: 'Cómo realizar una auditoría a la corrugadora',
        duration: '60 Minutos',
        description:
          'Este curso provee a los empleados el conocimiento y las destrezas necesarias para que desempeñen con seguridad las funciones asignadas, identifiquen los peligros potenciales y los eviten. Los temas incluyen: análisis de seguridad laboral, los equipos de protección personal, prevención de las lesiones ergonómicas, el orden y la limpieza, la seguridad en los servicios públicos, la seguridad en las máquinas, la seguridad en el montacargas, la recolección de polvo, la seguridad química, la seguridad contra incendios y seguridad en las herramientas.',
      },
    ],
  },
];

const Page = () => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://packagingschool.com';
  const { organization, website } = buildHomeJsonLd(siteUrl);
  const breadcrumb = buildBreadcrumbJsonLd(
    [{ name: 'ACCCSA', path: '/acccsa' }],
    siteUrl,
  );

  return (
    <>
      <Meta
        title={'Packaging School | ACCCSA'}
        description={
          'Los cursos de ACCCSA, elegidos por expertos, maximizan el aprendizaje rápido. La educación en línea de AICC y The Packaging School ofrece cursos gratuitos.'
        }
        image={'https://packschool.s3.amazonaws.com/acccsa-seoImage.webp'}
        url='/acccsa'
        structuredData={[organization, website, breadcrumb]}
      />
      <div className='!relative z-0'>
        {/* <div
        className='w-full flex justify-center items-center bg-base-mid overflow-scroll'
        id='scrollers'
      >
        <div className='flex gap-12 max-w-7xl mx-auto py-4'>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='http://www.acccsa.org/'>ACCCSA.org</Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='http://www.revistacorrugando.com/'>
              RevistaCorrugando.com
            </Link>
          </div>
          <div className='font-greycliff text-white font-semibold text-lg'>
            <Link href='#Registrese'>Registrese</Link>
          </div>
        </div>
      </div> */}
        <AcccsaHero />
        <AcccsaCourses courses={courses} />
        <div className='relative flex bg-slate-200 rounded-lg py-9 px-6'>
          <div className='max-w-7xl mx-auto flex gap-9'>
            <div className='p-12'>
              <div className='text-5xl font-greycliff font-semibold'>
                Regístrese aquí
              </div>
              <p className='my-6 text-xl'>
                Los cursos de The Packaging School – AICC son un beneficio para
                los Asociados de ACCCSA.
              </p>
              <p className='my-6 text-xl'>
                Debe registrarse y ser aprobado antes de acceder al los cursos
                en línea.
              </p>
              <p className='my-6 text-xl'>
                ACCCSA le enviará un usuario y contraseña.
              </p>
            </div>
            <div className='_form_51 max-w-fit py-9' id='Registrese'></div>
            <Script
              src='https://packagingschool42200.activehosted.com/f/embed.php?id=51'
              type='text/javascript'
              charset='utf-8'
            ></Script>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
