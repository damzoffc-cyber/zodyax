<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Device Lock - Zodyacx</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            user-select: none;
        }

        body {
            font-family: 'Segoe UI', 'Inter', system-ui, -apple-system, 'Roboto', monospace;
            background: #000000;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            position: relative;
            cursor: pointer;
        }

        .video-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }

        .dark-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.55);
            z-index: 2;
            backdrop-filter: blur(3px);
        }

        .center-content {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 3;
            text-align: center;
            width: 90%;
            max-width: 450px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        }

        .center-photo {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5), 0 0 0 4px rgba(255, 75, 75, 0.4);
            margin-bottom: 24px;
            background: #1a1a2e;
        }

        .locked-title {
            font-size: 2.6rem;
            font-weight: 800;
            letter-spacing: 4px;
            background: linear-gradient(135deg, #ff4d4d, #ff9a3c);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            text-shadow: 0 0 10px rgba(255, 70, 70, 0.4);
            margin-bottom: 12px;
            text-transform: uppercase;
        }

        .subtext {
            color: #ffcd94;
            font-weight: 600;
            font-size: 1.1rem;
            letter-spacing: 1px;
            margin-bottom: 8px;
            background: rgba(0,0,0,0.5);
            display: inline-block;
            padding: 5px 18px;
            border-radius: 40px;
            backdrop-filter: blur(4px);
        }

        .permanent-badge {
            background: rgba(180, 40, 40, 0.75);
            display: inline-block;
            padding: 4px 16px;
            border-radius: 30px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-bottom: 20px;
            color: #ffc3a0;
            letter-spacing: 1px;
        }

        .footer-note {
            position: fixed;
            bottom: 20px;
            left: 0;
            width: 100%;
            text-align: center;
            z-index: 3;
            font-size: 11px;
            color: #ffaa66;
            background: rgba(0,0,0,0.5);
            padding: 8px;
            letter-spacing: 1px;
            pointer-events: none;
        }

        /* Indikator tap / audio status */
        .tap-indicator {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.7);
            color: #ffcd94;
            padding: 10px 24px;
            border-radius: 50px;
            font-size: 14px;
            z-index: 100;
            backdrop-filter: blur(8px);
            border: 1px solid #ff9a3c;
            white-space: nowrap;
            pointer-events: none;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .tap-indicator.hide {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
            visibility: hidden;
        }

        /* Audio active indicator di pojok */
        .audio-badge {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 4;
            background: rgba(0,0,0,0.5);
            border-radius: 30px;
            padding: 6px 14px;
            font-size: 11px;
            color: #4caf50;
            font-family: monospace;
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            gap: 6px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .audio-badge.show {
            opacity: 1;
        }

        .audio-badge span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #4caf50;
            border-radius: 50%;
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        @media (max-width: 550px) {
            .center-photo {
                width: 140px;
                height: 140px;
            }
            .locked-title {
                font-size: 1.9rem;
            }
            .subtext {
                font-size: 0.9rem;
            }
            .tap-indicator {
                font-size: 12px;
                padding: 8px 18px;
                bottom: 70px;
                white-space: nowrap;
            }
            .footer-note {
                font-size: 9px;
                bottom: 12px;
            }
        }
    </style>
</head>
<body>

    <!-- VIDEO BACKGROUND -->
    <video class="video-background" autoplay loop muted playsinline>
        <source src="https://files.catbox.moe/mialbf.mp4" type="video/mp4">
    </video>
    
    <div class="dark-overlay"></div>

    <!-- KONTEN TENGAH -->
    <div class="center-content">
        <img class="center-photo" 
             src="https://files.catbox.moe/ti1qu8.jpg" 
             alt="Lock Device Photo"
             onerror="this.src='https://picsum.photos/id/104/300/300'">
        
        <div class="locked-title">LOCK BY ZODYACメ</div>
        <div class="subtext">Hubungi Admin untuk Membuka</div>
        <div class="permanent-badge">⚠️ [PERMANENT LOCK] ⚠️</div>
    </div>
    
    <div class="footer-note">
        🔒 MODE TERKUNCI •
    </div>

    <!-- Indikator tap (akan hilang setelah audio menyala) -->
    <div class="tap-indicator" id="tapIndicator">
        TAP👆
    </div>

    <!-- Badge audio aktif -->
    <div class="audio-badge" id="audioBadge">
         <span></span> 
    </div>

    <script>
        // ========== AUDIO CONFIG ==========
        const AUDIO_URL = "https://files.catbox.moe/mialbf.mp4";
        
        const audio = new Audio();
        audio.src = AUDIO_URL;
        audio.loop = true;
        audio.volume = 0.65;
        
        let isAudioPlaying = false;
        let hasStarted = false;
        
        // Elemen DOM
        const tapIndicator = document.getElementById('tapIndicator');
        const audioBadge = document.getElementById('audioBadge');
        
        // Fungsi memulai audio
        function startAudio() {
            if (hasStarted) return;
            hasStarted = true;
            
            audio.play().then(() => {
                isAudioPlaying = true;
                console.log('✅ Audio berhasil dimulai');
                
                // Update UI
                tapIndicator.classList.add('hide');
                audioBadge.classList.add('show');
                
            }).catch((err) => {
                console.log('❌ Audio gagal:', err);
                hasStarted = false;
                isAudioPlaying = false;
                
                // Tampilkan pesan error dan reset
                tapIndicator.innerHTML = '⚠️ COBA LAGI • ⚠️';
                tapIndicator.style.borderColor = '#ff6666';
                tapIndicator.style.color = '#ffaaaa';
                
                setTimeout(() => {
                    if (!hasStarted) {
                        tapIndicator.innerHTML = '👆 TAP 👆';
                        tapIndicator.style.borderColor = '#ff9a3c';
                        tapIndicator.style.color = '#ffcd94';
                    }
                }, 2000);
            });
        }
        
        // Fungsi menghentikan audio (opsional untuk toggle, tapi tidak ada tombol)
        // Bisa ditambahkan double tap jika mau, tapi sesuai request: tanpa tombol
        
        // === EVENT TAP DI LAYAR MANA SAJA ===
        const handleScreenTap = function(e) {
            // Abaikan jika audio sudah berjalan
            if (hasStarted && isAudioPlaying) return;
            
            // Mulai audio
            startAudio();
        };
        
        // Pasang event listener untuk tap/klik
        document.addEventListener('click', handleScreenTap);
        document.addEventListener('touchstart', handleScreenTap);
        
        // === PERCOBAAN AUTOPLAY (opsional, tapi tidak dijamin) ===
        // Coba play otomatis saat halaman load, kalau berhasil bagus, kalau gagal ya tap
        setTimeout(() => {
            if (!hasStarted) {
                audio.play().then(() => {
                    // Berhasil autoplay! (jarang)
                    isAudioPlaying = true;
                    hasStarted = true;
                    tapIndicator.classList.add('hide');
                    audioBadge.classList.add('show');
                    console.log('✅ AUTOPLAY BERHASIL (langsung)');
                }).catch(() => {
                    console.log('⏳ Menunggu tap dari user...');
                });
            }
        }, 100);
        
        // Fallback video
        const videoBg = document.querySelector('.video-background');
        if (videoBg) {
            videoBg.addEventListener('error', () => {
                console.log('⚠️ Video background gagal');
            });
        }
        
        console.log('🎵 Siap - Tap di mana saja untuk audio');
    </script>
</body>
</html>
