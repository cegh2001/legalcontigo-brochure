import { forwardRef, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import './App.css'

interface BrochurePage {
  heading: string
  subtitle: string
  points: string[]
  footer: string
}

interface FlipBookController {
  flipNext: () => void
  flipPrev: () => void
}

interface FlipBookRef {
  pageFlip: () => FlipBookController
}

interface FlipEventLike {
  data: number
}

interface PageCardProps {
  page: BrochurePage
  pageNumber: number
  totalPages: number
}

const brochurePages: BrochurePage[] = [
  {
    heading: 'LegalContigo',
    subtitle: 'Bufete digital para empresas y personas',
    points: [
      'Atencion legal en linea y acompanamiento humano.',
      'Respuesta rapida en civil, laboral, mercantil y familiar.',
      'Modelo por suscripcion o caso puntual para mayor control.',
    ],
    footer: 'Edicion 2026',
  },
  {
    heading: 'Servicios principales',
    subtitle: 'Cobertura completa para cada etapa del caso',
    points: [
      'Orientacion inicial con analisis de riesgo legal.',
      'Asignacion de abogado por especialidad y prioridad.',
      'Seguimiento con tableros y estado del caso en tiempo real.',
    ],
    footer: 'Atencion nacional',
  },
  {
    heading: 'Por que elegirnos',
    subtitle: 'Tecnologia y criterio juridico en una sola plataforma',
    points: [
      'Panel administrativo para equipos y firmas asociadas.',
      'Flujos claros desde recepcion hasta cierre del expediente.',
      'Metricas de productividad y carga por abogado.',
    ],
    footer: 'Confianza que escala',
  },
  {
    heading: 'Proceso de trabajo',
    subtitle: 'Metodo simple y transparente',
    points: [
      '1) Registro del cliente y validacion documental.',
      '2) Clasificacion del asunto y nivel de prioridad.',
      '3) Gestion legal, comunicacion y resultado final.',
    ],
    footer: 'Flujo trazable',
  },
  {
    heading: 'Planes sugeridos',
    subtitle: 'Opciones para negocio, pymes y consultoria continua',
    points: [
      'Plan Base: asesoria recurrente con soporte por tickets.',
      'Plan Pro: acompanamiento integral con SLA prioritario.',
      'Plan Enterprise: mesa legal dedicada para operaciones criticas.',
    ],
    footer: 'Precios flexibles',
  },
  {
    heading: 'Hablemos de tu caso',
    subtitle: 'Agenda una demo del panel y del brochure interactivo',
    points: [
      'Escribenos para una propuesta alineada a tus objetivos.',
      'Integramos procesos actuales sin friccion operativa.',
      'Disponible para implementacion inmediata en Vercel.',
    ],
    footer: 'contacto@legalcontigo.com',
  },
]

const PageCard = forwardRef<HTMLDivElement, PageCardProps>(function PageCard(
  { page, pageNumber, totalPages },
  ref,
) {
  return (
    <article className="page-card" ref={ref}>
      <div className="page-layer" />
      <header className="page-header">
        <p className="page-number">
          Pagina {pageNumber} / {totalPages}
        </p>
        <h2>{page.heading}</h2>
        <p className="page-subtitle">{page.subtitle}</p>
      </header>

      <ul className="page-points">
        {page.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <footer className="page-footer">{page.footer}</footer>
    </article>
  )
})

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const flipBookRef = useRef<FlipBookRef | null>(null)

  const handleFlip = (event: unknown) => {
    if (typeof event !== 'object' || event === null || !('data' in event)) {
      return
    }

    const maybePage = (event as FlipEventLike).data
    if (Number.isInteger(maybePage) && maybePage >= 0) {
      setCurrentPage(maybePage)
    }
  }

  const goToNextPage = () => {
    flipBookRef.current?.pageFlip().flipNext()
  }

  const goToPrevPage = () => {
    flipBookRef.current?.pageFlip().flipPrev()
  }

  return (
    <main className="brochure-shell">
      <section className="hero-copy">
        <p className="eyebrow">React + Vite + TypeScript</p>
        <h1>Brochure interactivo con efecto real de pagina</h1>
        <p>
          Base lista para catalogo, revista legal o presentacion comercial de
          LegalContigo.
        </p>
      </section>

      <section className="flipbook-section">
        <div className="book-toolbar">
          <button type="button" onClick={goToPrevPage}>
            Pagina anterior
          </button>
          <span>
            Viendo {currentPage + 1} de {brochurePages.length}
          </span>
          <button type="button" onClick={goToNextPage}>
            Pagina siguiente
          </button>
        </div>

        <HTMLFlipBook
          width={430}
          height={580}
          size="stretch"
          minWidth={280}
          maxWidth={520}
          minHeight={400}
          maxHeight={760}
          startPage={0}
          drawShadow
          flippingTime={900}
          maxShadowOpacity={0.3}
          showCover
          mobileScrollSupport={false}
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          startZIndex={0}
          autoSize
          usePortrait
          style={{}}
          className="brochure-book"
          ref={flipBookRef}
          onFlip={handleFlip}
        >
          {brochurePages.map((page, index) => (
            <PageCard
              key={page.heading}
              page={page}
              pageNumber={index + 1}
              totalPages={brochurePages.length}
            />
          ))}
        </HTMLFlipBook>
      </section>

      <p className="hint">Arrastra o haz swipe sobre cada hoja para navegar.</p>
    </main>
  )
}

export default App
