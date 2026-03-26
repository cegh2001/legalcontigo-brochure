import { QRCodeSVG } from 'qrcode.react'
// import { Share2 } from 'lucide-react'
import './App.css'

function App() {
  const imageUrl = 'https://legalcontigo-brochure.vercel.app/FOLLETO.png'

  /*
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Folleto LegalContigo',
          text: 'Descarga nuestro folleto informativo.',
          url: imageUrl,
        })
      } catch (error) {
        console.log('Error compartiendo:', error)
      }
    } else {
      navigator.clipboard.writeText(imageUrl)
      alert('¡Enlace copiado al portapapeles!')
    }
  }
  */

  return (
    <main className="qr-page">
      <div className="qr-card">
        <header className="qr-header">
          <img
            src="/imagotipo.png"
            alt="LegalContigo Logo"
            className="brand-logo"
          />
        </header>

        <div className="qr-body">
          <h1 className="qr-title">Descarga nuestro Folleto</h1>
          <p className="qr-desc">
            Escanea este código QR con la cámara de tu teléfono para descargar el
            folleto informativo de LegalContigo.
          </p>

          <div className="qr-code-wrapper">
            <QRCodeSVG
              value={imageUrl}
              size={"100%" as any}
              style={{ width: "100%", height: "100%" }}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              includeMargin={false}
            />
          </div>
          
          {/*
          <button className="btn-share" onClick={handleShare}>
            <Share2 size={20} />
            Compartir Enlace
          </button>
          */}
        </div>
      </div>
    </main>
  )
}

export default App
