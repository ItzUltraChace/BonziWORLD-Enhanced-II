self.addEventListener("install", (event) => {
    console.log("[Bonzi PWA] Service Worker : Installed!");

    event.waitUntil(
        (async () => {
            try {
                cache_obj = await caches.open(cache);
                cache_obj.addAll(caching_files);
            } catch {
                console.log("[Bonzi PWA] Error occured while caching...");
            }
        })()
    );
});
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("bonziworld-pwa").then(function (cache) {
            return cache.addAll([
                location.origin + "/index.html",
                location.origin + "/manifest.json",
                location.origin + "/sw.js",
                location.origin + "/arcade/index.html",
                location.origin + "/bees/index.html",
                location.origin + "/dist/css/arcade.css",
                location.origin + "/dist/css/bees.css",
                location.origin + "/dist/css/misc.css",
                location.origin + "/dist/css/readme.css",
                location.origin + "/dist/css/style.css",
                location.origin + "/dist/css/lib/animate.css",
                location.origin + "/dist/css/lib/bootstrap.css",
                location.origin + "/dist/font/Tahoma/Tahoma.eot",
                location.origin + "/dist/font/Tahoma/Tahoma.svg",
                location.origin + "/dist/font/Tahoma/Tahoma.ttf",
                location.origin + "/dist/font/Tahoma/Tahoma.woff",
                location.origin + "/dist/js/app.js",
                location.origin + "/dist/js/bees.js",
                location.origin + "/dist/js/platform.js",
                location.origin + "/dist/js/version_handler.js",
                location.origin + "/dist/js/lib/easeljs-0.8.2.min.js",
                location.origin + "/dist/js/lib/easeljs.min.js",
                location.origin + "/dist/js/lib/preloadjs-0.6.2.min.js",
                location.origin + "/dist/js/lib/seedrandom.min.js",
                location.origin + "/dist/js/lib/snowstorm-min.js",
                location.origin + "/dist/js/lib/socket.io-1.4.5.js",
                location.origin + "/dist/js/lib/webgl-0.8.2.min.js",
                location.origin + "/dist/js/lib/yt_widget_api.js",
                location.origin + "/dist/js/lib/jquery/jquery-3.6.1.min.js",
                location.origin + "/dist/js/lib/jquery/jquery.min.js",
                location.origin + "/dist/js/lib/jquery/plugins/jquery.contextMenu.min.js",
                location.origin + "/dist/js/lib/jquery/ui/AUTHORS.txt",
                location.origin + "/dist/js/lib/jquery/ui/jquery-ui.css",
                location.origin + "/dist/js/lib/jquery/ui/jquery-ui.min.css",
                location.origin + "/dist/js/lib/jquery/ui/jquery-ui.min.js",
                location.origin + "/dist/js/lib/jquery/ui/jquery-ui.structure.min.css",
                location.origin + "/dist/js/lib/jquery/ui/jquery-ui.theme.min.css",
                location.origin + "/dist/js/lib/jquery/ui/jquery.ui.position.min.js",
                location.origin + "/dist/js/lib/jquery/ui/LICENSE.txt",
                location.origin + "/dist/js/lib/jquery/ui/images/ui-icons_444444_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/images/ui-icons_555555_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/images/ui-icons_777620_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/images/ui-icons_777777_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/images/ui-icons_cc0000_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/images/ui-icons_ffffff_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/jquery-ui.css",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/jquery-ui.min.css",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/theme.css",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/images/ui-icons_444444_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/images/ui-icons_555555_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/images/ui-icons_777620_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/images/ui-icons_777777_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/images/ui-icons_cc0000_256x240.png",
                location.origin + "/dist/js/lib/jquery/ui/themes/base/images/ui-icons_ffffff_256x240.png",
                location.origin + "/dist/js/lib/md5/md5.min.js",
                location.origin + "/dist/js/lib/qtip2/jquery.qtip.min.css",
                location.origin + "/dist/js/lib/qtip2/jquery.qtip.min.js",
                location.origin + "/dist/js/lib/qtip2/jquery.qtip.min.map",
                location.origin + "/dist/js/lib/qtip2/basic/jquery.qtip.min.css",
                location.origin + "/dist/js/lib/qtip2/basic/jquery.qtip.min.js",
                location.origin + "/dist/js/lib/qtip2/basic/jquery.qtip.min.map",
                location.origin + "/dist/js/lib/tts/speakjs/speakClient.js",
                location.origin + "/dist/js/lib/tts/speakjs/speakGenerator.js",
                location.origin + "/dist/js/lib/tts/speakjs/speakWorker.js",
                location.origin + "/dist/json/readme.json",
                location.origin + "/dist/json/version.json",
                location.origin + "/icon/154.ico",
                location.origin + "/icon/633.ico",
                location.origin + "/icon/android-chrome-192x192.png",
                location.origin + "/icon/apple-touch-icon.png",
                location.origin + "/icon/browserconfig.xml",
                location.origin + "/icon/favicon-16x16.png",
                location.origin + "/icon/favicon-32x32.png",
                location.origin + "/icon/favicon.ico",
                location.origin + "/icon/favicon.png",
                location.origin + "/icon/favicon_info.png",
                location.origin + "/icon/favicon_info2.png",
                location.origin + "/icon/favicon_info3.png",
                location.origin + "/icon/mstile-150x150.png",
                location.origin + "/icon/safari-pinned-tab.svg",
                location.origin + "/icon/icon-128x128.png",
                location.origin + "/icon/icon-144x144.png",
                location.origin + "/icon/icon-152x152.png",
                location.origin + "/icon/icon-192x192.png",
                location.origin + "/icon/icon-256x256.png",
                location.origin + "/icon/icon-512x512.png",
                location.origin + "/img/agents/black.png",
                location.origin + "/img/agents/blue.png",
                location.origin + "/img/agents/brown.png",
                location.origin + "/img/agents/cyan.png",
                location.origin + "/img/agents/ghost.png",
                location.origin + "/img/agents/green.png",
                location.origin + "/img/agents/grey.png",
                location.origin + "/img/agents/lime.png",
                location.origin + "/img/agents/magenta.png",
                location.origin + "/img/agents/orange.png",
                location.origin + "/img/agents/overlay.png",
                location.origin + "/img/agents/overlay_cc.png",
                location.origin + "/img/agents/pink.png",
                location.origin + "/img/agents/pope.png",
                location.origin + "/img/agents/purple.png",
                location.origin + "/img/agents/red.png",
                location.origin + "/img/agents/white.png",
                location.origin + "/img/agents/yellow.png",
                location.origin + "/img/agents/__closeup/black.png",
                location.origin + "/img/agents/__closeup/blue.png",
                location.origin + "/img/agents/__closeup/brown.png",
                location.origin + "/img/agents/__closeup/cyan.png",
                location.origin + "/img/agents/__closeup/empty.png",
                location.origin + "/img/agents/__closeup/ghost.png",
                location.origin + "/img/agents/__closeup/green.png",
                location.origin + "/img/agents/__closeup/grey.png",
                location.origin + "/img/agents/__closeup/lime.png",
                location.origin + "/img/agents/__closeup/magenta.png",
                location.origin + "/img/agents/__closeup/orange.png",
                location.origin + "/img/agents/__closeup/pink.png",
                location.origin + "/img/agents/__closeup/pope.png",
                location.origin + "/img/agents/__closeup/purple.png",
                location.origin + "/img/agents/__closeup/red.png",
                location.origin + "/img/agents/__closeup/white.png",
                location.origin + "/img/agents/__closeup/yellow.png",
                location.origin + "/img/bubble/bubble_tail_b.png",
                location.origin + "/img/bubble/bubble_tail_l.png",
                location.origin + "/img/bubble/bubble_tail_r.png",
                location.origin + "/img/bubble/bubble_tail_t.png",
                location.origin + "/img/desktop/bg.png",
                location.origin + "/img/desktop/bg_acid.png",
                location.origin + "/img/desktop/bonzi.png",
                location.origin + "/img/desktop/bonzi_acid.png",
                location.origin + "/img/desktop/logo.backup.png",
                location.origin + "/img/desktop/logo.png",
                location.origin + "/img/desktop/start.png",
                location.origin + "/img/desktop/taskbar.png",
                location.origin + "/img/desktop/tile.png",
                location.origin + "/img/desktop/tray.png",
                location.origin + "/img/desktop/tray_left.png",
                location.origin + "/img/desktop/__Themes/Aero/logo-aero.png",
                location.origin + "/img/desktop/__Themes/Aero/show_desktop-aero.png",
                location.origin + "/img/desktop/__Themes/Aero/start-aero.png",
                location.origin + "/img/desktop/__Themes/Aero/taskbar-aero.png",
                location.origin + "/img/desktop/__Themes/Aero/tile-aero.png",
                location.origin + "/img/desktop/__Themes/Aero/tray-aero.png",
                location.origin + "/img/desktop/__Themes/Aero/tray_left-aero.png",
                location.origin + "/img/desktop/__Themes/Aero/wallpaper-aero.jpg",
                location.origin + "/img/desktop/__Themes/Aero/wallpaper-aero_beta.jpg",
                location.origin + "/img/desktop/__Themes/Aero/bubble/bubble_tail_b.png",
                location.origin + "/img/desktop/__Themes/Aero/bubble/bubble_tail_l.png",
                location.origin + "/img/desktop/__Themes/Aero/bubble/bubble_tail_r.png",
                location.origin + "/img/desktop/__Themes/Aero/bubble/bubble_tail_t.png",
                location.origin + "/img/desktop/__Themes/BonziVERSE/bg-verse.png",
                location.origin + "/img/desktop/__Themes/BonziVERSE/bonzi-verse.png",
                location.origin + "/img/desktop/__Themes/BonziVERSE/logo-verse.png",
                location.origin + "/img/desktop/__Themes/BonziVERSE/start-verse.png",
                location.origin + "/img/desktop/__Themes/BonziVERSE/taskbar-verse.png",
                location.origin + "/img/desktop/__Themes/BonziVERSE/wallpaper-verse.jpg",
                location.origin + "/img/desktop/__Themes/BonziVERSE/old/bg-verse.png",
                location.origin + "/img/desktop/__Themes/BonziVERSE/old/bonzi-verse.png",
                location.origin + "/img/desktop/__Themes/Classic/bg-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/bg_acid-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/bonzi-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/bonzi_acid-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/logo-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/start-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/taskbar-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/tile-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/tray-classic.png",
                location.origin + "/img/desktop/__Themes/Classic/tray_left-classic.png",
                location.origin + "/img/desktop/__Themes/Dark/bg-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/bonzi-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/go-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/logo-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/start-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/taskbar-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/tile-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/tray-dark.png",
                location.origin + "/img/desktop/__Themes/Dark/tray_left-dark.png",
                location.origin + "/img/desktop/__Themes/Light/bg-light.png",
                location.origin + "/img/desktop/__Themes/Light/bonzi-light.png",
                location.origin + "/img/desktop/__Themes/Light/go-light.png",
                location.origin + "/img/desktop/__Themes/Light/start-light.png",
                location.origin + "/img/desktop/__Themes/Light/taskbar-light.png",
                location.origin + "/img/desktop/__Themes/Light/tile-light.png",
                location.origin + "/img/desktop/__Themes/Light/tray-light.png",
                location.origin + "/img/desktop/__Themes/Light/tray_left-light.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/bg-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/bonzi-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/logo-vaporwave.backup.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/logo-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/start-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/taskbar-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/tile-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/tray-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/tray_left-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/tray_right-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/wallpaper-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/Aero/logo-aero_vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/Classic/logo-classic_vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/Dark/notif-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/Dark/notif_left-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/Dark/notif_right-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/Dark/taskbar-vaporwave.png",
                location.origin + "/img/desktop/__Themes/Vaporwave/Dark/tile-vaporwave.png",
                location.origin + "/img/desktop/__Themes/XP/start-xp.png",
                location.origin + "/img/desktop/__Themes/XP/taskbar-xp.png",
                location.origin + "/img/desktop/__Themes/XP/tray-xp.png",
                location.origin + "/img/desktop/__Themes/XP/tray_left-xp.png",
                location.origin + "/img/desktop/__Themes/XP/tray_right-xp.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Aquarium/notif-aquarium.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Aquarium/notif_right-aquarium.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Aquarium/start-aquarium.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Aquarium/taskbar-aquarium.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Aquarium/wallpaper-aquarium.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Da Vinci/start-davinci.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Da Vinci/taskbar-davinci.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Da Vinci/tray-davinci.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Da Vinci/tray_left-davinci.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Da Vinci/wallpaper-davinci.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Embedded/start-embed.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Embedded/taskbar-embed.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Embedded/tray-embed.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Embedded/tray_left-embed.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Embedded/tray_right-embed.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Embedded/wallpaper-embed.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Nature/start-nature.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Nature/taskbar-nature.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Nature/tray-nature.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Nature/tray_left-nature.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Nature/wallpaper-nature.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale/start-royale.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale/taskbar-royale.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale/tray-royale.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale/tray_left-royale.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale/tray_right-royale.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale/wallpaper-royale.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale_Noir/start-royalenoir.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale_Noir/taskbar-royalenoir.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale_Noir/tray-royalenoir.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale_Noir/tray_left-royalenoir.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Royale_Noir/wallpaper-royalenoir.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Space/start-space.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Space/taskbar-space.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Space/tray-space.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Space/tray_left-space.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Space/wallpaper-space.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Zune/start-zune.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Zune/wallpaper-zune.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Zune/zune-taskbar.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Zune/zune-tray.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Zune/zune-tray_left.png",
                location.origin + "/img/desktop/__Themes/XP/__Sub-Themes/Zune/zune-tray_right.png",
                location.origin + "/img/icons/app/3d.png",
                location.origin + "/img/icons/app/apple_app_store.png",
                location.origin + "/img/icons/app/desktop.png",
                location.origin + "/img/icons/app/edge_store.png",
                location.origin + "/img/icons/app/firefox_addon.png",
                location.origin + "/img/icons/app/google_play_store.png",
                location.origin + "/img/icons/app/microsoft_store.png",
                location.origin + "/img/icons/app/opera_addon_store.png",
                location.origin + "/img/icons/app/webstore.png",
                location.origin + "/img/icons/bonzi/1.png",
                location.origin + "/img/icons/bonzi/2.png",
                location.origin + "/img/icons/bonzi/3.png",
                location.origin + "/img/icons/bonzi/404.png",
                location.origin + "/img/icons/bonzi/pope_one_frame.png",
                location.origin + "/img/icons/bonzi/sad_bonzi.png",
                location.origin + "/img/icons/bonzi/swag_one_frame.png",
                location.origin + "/img/icons/bonzi/topjej.png",
                location.origin + "/img/icons/cursors/appstar1.gif",
                location.origin + "/img/icons/cursors/appstar2.gif",
                location.origin + "/img/icons/cursors/appstart.gif",
                location.origin + "/img/icons/cursors/banana.gif",
                location.origin + "/img/icons/cursors/barber.gif",
                location.origin + "/img/icons/cursors/coin.gif",
                location.origin + "/img/icons/cursors/drum.gif",
                location.origin + "/img/icons/cursors/handwait.gif",
                location.origin + "/img/icons/cursors/horse.gif",
                location.origin + "/img/icons/cursors/hourglass.gif",
                location.origin + "/img/icons/cursors/hourglass2.gif",
                location.origin + "/img/icons/cursors/hourglass3.gif",
                location.origin + "/img/icons/cursors/metronom.gif",
                location.origin + "/img/icons/cursors/piano.gif",
                location.origin + "/img/icons/cursors/stopwtch.gif",
                location.origin + "/img/icons/emoji/bonzi.png",
                location.origin + "/img/icons/emoji/disgust.png",
                location.origin + "/img/icons/emoji/doggis.png",
                location.origin + "/img/icons/emoji/earth.png",
                location.origin + "/img/icons/emoji/evil.png",
                location.origin + "/img/icons/emoji/flip.png",
                location.origin + "/img/icons/emoji/globe.png",
                location.origin + "/img/icons/emoji/pink.png",
                location.origin + "/img/icons/emoji/program.png",
                location.origin + "/img/icons/emoji/qmark.png",
                location.origin + "/img/icons/emoji/sad.png",
                location.origin + "/img/icons/emoji/swag.png",
                location.origin + "/img/icons/emoji/vomit.png",
                location.origin + "/img/icons/flags/sprite-flags-16x16.png",
                location.origin + "/img/icons/flags/sprite-flags-24x24.png",
                location.origin + "/img/icons/flags/sprite-flags-32x32.png",
                location.origin + "/img/icons/flags/sprite-flags-48x48.png",
                location.origin + "/img/icons/flags/sprite-flags-64x64.png",
                location.origin + "/img/icons/other/arcade.png",
                location.origin + "/img/icons/other/arcade_hover.png",
                location.origin + "/img/icons/other/arcade_v2.png",
                location.origin + "/img/icons/other/bee-auty.jpg",
                location.origin + "/img/icons/other/bg.gif",
                location.origin + "/img/icons/other/computer.png",
                location.origin + "/img/icons/other/error.png",
                location.origin + "/img/icons/other/file_explorer.png",
                location.origin + "/img/icons/other/font.png",
                location.origin + "/img/icons/other/macromedia.png",
                location.origin + "/img/icons/other/themes.png",
                location.origin + "/img/icons/other/themes_16.png",
                location.origin + "/img/icons/stickers/ban.png",
                location.origin + "/img/icons/stickers/big_bonzi.png",
                location.origin + "/img/icons/stickers/bonzi.png",
                location.origin + "/img/icons/stickers/bye.png",
                location.origin + "/img/icons/stickers/crybaby.png",
                location.origin + "/img/icons/stickers/cyan.png",
                location.origin + "/img/icons/stickers/flatearth.png",
                location.origin + "/img/icons/stickers/forehead.png",
                location.origin + "/img/icons/stickers/high.png",
                location.origin + "/img/icons/stickers/host.png",
                location.origin + "/img/icons/stickers/kiddie.png",
                location.origin + "/img/icons/stickers/lol.png",
                location.origin + "/img/icons/stickers/no.png",
                location.origin + "/img/icons/stickers/nyan_cat.png",
                location.origin + "/img/icons/stickers/sad.png",
                location.origin + "/img/icons/stickers/sans.png",
                location.origin + "/img/icons/stickers/sex.png",
                location.origin + "/img/icons/stickers/spook.png",
                location.origin + "/img/icons/stickers/swag.png",
                location.origin + "/img/icons/stickers/topjej.png",
                location.origin + "/img/icons/tips/swag.png",
                location.origin + "/img/logon/bottom.png",
                location.origin + "/img/logon/card.mobile.png",
                location.origin + "/img/logon/card.png",
                location.origin + "/img/logon/divider.png",
                location.origin + "/img/logon/go.png",
                location.origin + "/img/logon/logo.backup.png",
                location.origin + "/img/logon/logo.mobile.backup.png",
                location.origin + "/img/logon/logo.mobile.png",
                location.origin + "/img/logon/logo.png",
                location.origin + "/img/logon/top.png",
                location.origin + "/img/logon/topleft.png",
                location.origin + "/img/logon/__Themes/BonziVERSE/bottom.png",
                location.origin + "/img/logon/__Themes/BonziVERSE/card.png",
                location.origin + "/img/logon/__Themes/BonziVERSE/divider.png",
                location.origin + "/img/logon/__Themes/BonziVERSE/go.png",
                location.origin + "/img/logon/__Themes/BonziVERSE/logo.png",
                location.origin + "/img/logon/__Themes/BonziVERSE/top.png",
                location.origin + "/img/logon/__Themes/BonziVERSE/topleft.png",
                location.origin + "/img/logon/__Themes/Halloween/bottom.png",
                location.origin + "/img/logon/__Themes/Halloween/card.mobile.png",
                location.origin + "/img/logon/__Themes/Halloween/card.png",
                location.origin + "/img/logon/__Themes/Halloween/divider.png",
                location.origin + "/img/logon/__Themes/Halloween/go.png",
                location.origin + "/img/logon/__Themes/Halloween/logo.mobile.png",
                location.origin + "/img/logon/__Themes/Halloween/logo.png",
                location.origin + "/img/logon/__Themes/Halloween/top.png",
                location.origin + "/img/logon/__Themes/Halloween/topleft.png",
                location.origin + "/img/readme/logo.backup.png",
                location.origin + "/img/readme/logo.png",
                location.origin + "/readme/index.html",
                location.origin + "/rules/index.html",
                location.origin + "/sfx/agents/bonzi/beat_chest.mp3",
                location.origin + "/sfx/agents/bonzi/clap.mp3",
                location.origin + "/sfx/agents/bonzi/confused.mp3",
                location.origin + "/sfx/agents/bonzi/drums.mp3",
                location.origin + "/sfx/agents/bonzi/idea.mp3",
                location.origin + "/sfx/agents/bonzi/join.mp3",
                location.origin + "/sfx/agents/bonzi/jump.mp3",
                location.origin + "/sfx/agents/bonzi/land_on_ground.mp3",
                location.origin + "/sfx/agents/bonzi/land_on_ground2.mp3",
                location.origin + "/sfx/agents/bonzi/laugh.mp3",
                location.origin + "/sfx/agents/bonzi/leave.mp3",
                location.origin + "/sfx/agents/bonzi/mhmm.mp3",
                location.origin + "/sfx/agents/bonzi/paper.mp3",
                location.origin + "/sfx/agents/bonzi/paper2.mp3",
                location.origin + "/sfx/agents/bonzi/think.mp3",
                location.origin + "/sfx/agents/bonzi/whooo.mp3",
                location.origin + "/sfx/agents/bonzi/write.mp3",
                location.origin + "/sfx/agents/bonzi/yawn.mp3",
                location.origin + "/sfx/agents/bonzi/hd/join.mp3",
                location.origin + "/sfx/agents/bonzi/hd/leave.mp3",
                location.origin + "/sfx/memes/and-his-name-is-john-cena.mp3",
                location.origin + "/sfx/memes/bomb-has-been-planted.mp3",
                location.origin + "/sfx/memes/bruh.mp3",
                location.origin + "/sfx/memes/cod-mw2-mission-failed.mp3",
                location.origin + "/sfx/memes/cod4-lets-do-this.mp3",
                location.origin + "/sfx/memes/connection_terminated.mp3",
                location.origin + "/sfx/memes/counter-strike-double-kill.mp3",
                location.origin + "/sfx/memes/counter-strike-enemy-spotted.mp3",
                location.origin + "/sfx/memes/counter-strike-ok-lets-go.mp3",
                location.origin + "/sfx/memes/crewmate-join.mp3",
                location.origin + "/sfx/memes/discord-call.mp3",
                location.origin + "/sfx/memes/discord-join.mp3",
                location.origin + "/sfx/memes/discord-leave.mp3",
                location.origin + "/sfx/memes/discord-ping-sfx.mp3",
                location.origin + "/sfx/memes/fbi-open-up.mp3",
                location.origin + "/sfx/memes/fnaf-ambience.mp3",
                location.origin + "/sfx/memes/fnaf2-ambiance-music.mp3",
                location.origin + "/sfx/memes/god-damn.mp3",
                location.origin + "/sfx/memes/halo-betrayed.mp3",
                location.origin + "/sfx/memes/hello-your-computer-has-virus.mp3",
                location.origin + "/sfx/memes/hes-pulling-his-cock-out.mp3",
                location.origin + "/sfx/memes/holy.mp3",
                location.origin + "/sfx/memes/keyboard-meme.mp3",
                location.origin + "/sfx/memes/lego-breaking.mp3",
                location.origin + "/sfx/memes/lego-build.mp3",
                location.origin + "/sfx/memes/oof.mp3",
                location.origin + "/sfx/memes/robot_dance.mp3",
                location.origin + "/sfx/memes/samsung-notification-sound-bass-boosted.mp3",
                location.origin + "/sfx/memes/shut-the-fuck-up.mp3",
                location.origin + "/sfx/memes/sus.mp3",
                location.origin + "/sfx/memes/taco-bell-bong-sfx.mp3",
                location.origin + "/sfx/memes/that_was_easy.mp3",
                location.origin + "/sfx/memes/the-rap-battle-parody-oooohhhhhhhh.mp3",
                location.origin + "/sfx/memes/this-is-a-certified-hood-classic.mp3",
                location.origin + "/sfx/memes/trumpet.mp3",
                location.origin + "/sfx/memes/vine-boom.mp3",
                location.origin + "/sfx/memes/waltuh.mp3",
                location.origin + "/sfx/memes/was-that-the-bite-of-87.mp3",
                location.origin + "/sfx/memes/wasted.mp3",
                location.origin + "/sfx/memes/you-shall-not-pass.mp3",
                location.origin + "/sfx/ui/bonzi/ab_logon.mp3",
                location.origin + "/sfx/ui/bonzi/ban.mp3",
                location.origin + "/sfx/ui/bonzi/brrrrrrt.mp3",
                location.origin + "/sfx/ui/bonzi/go.mp3",
                location.origin + "/sfx/ui/bonzi/jumpscare.mp3",
                location.origin + "/sfx/ui/bonzi/kick.mp3",
                location.origin + "/sfx/ui/bonzi/no_fuck_off.mp3",
                location.origin + "/sfx/ui/bonzi/startup_espeak.mp3",
                location.origin + "/sfx/ui/other/ps1_startup.mp3",
                location.origin + "/sfx/ui/other/ps2_startup.mp3",
                location.origin + "/sfx/ui/other/ps3_startup.mp3",
                location.origin + "/sfx/ui/other/ps4_startup.mp3",
                location.origin + "/sfx/ui/other/xbox360_startup-kinect.mp3",
                location.origin + "/sfx/ui/other/xbox360_startup.mp3",
                location.origin + "/sfx/ui/other/xbox_one_startup.mp3",
                location.origin + "/sfx/ui/other/xbox_startup.mp3",
                location.origin + "/sfx/ui/win7/balloon.mp3",
                location.origin + "/sfx/ui/win7/chimes.mp3",
                location.origin + "/sfx/ui/win7/click.mp3",
                location.origin + "/sfx/ui/win7/default.mp3",
                location.origin + "/sfx/ui/win7/ding.mp3",
                location.origin + "/sfx/ui/win7/exclamation.mp3",
                location.origin + "/sfx/ui/win7/logoff.mp3",
                location.origin + "/sfx/ui/win7/logon.mp3",
                location.origin + "/sfx/ui/win7/notify.mp3",
                location.origin + "/sfx/ui/win7/notify2.mp3",
                location.origin + "/sfx/ui/win7/recycle.mp3",
                location.origin + "/sfx/ui/win7/ringin.mp3",
                location.origin + "/sfx/ui/win7/ringout.mp3",
                location.origin + "/sfx/ui/win7/shutdown.mp3",
                location.origin + "/sfx/ui/win7/startup.mp3",
                location.origin + "/sfx/ui/win7/swoosh.mp3",
                location.origin + "/sfx/ui/win7/swoosh2.mp3",
                location.origin + "/sfx/ui/win7/tada.mp3",
                location.origin + "/sfx/ui/win7/error/1.mp3",
                location.origin + "/sfx/ui/win7/error/2.mp3",
                location.origin + "/sfx/ui/win7/error/3.mp3",
                location.origin + "/sfx/ui/win9x/logoff.mp3",
                location.origin + "/sfx/ui/win9x/logon.mp3",
                location.origin + "/sfx/ui/win9x/startup.mp3",
                location.origin + "/sfx/ui/win9x/tada.mp3",
                location.origin + "/sfx/ui/win9x/vaporwave.mp3",
                location.origin + "/sfx/ui/winxp/balloon.mp3",
                location.origin + "/sfx/ui/winxp/chimes.mp3",
                location.origin + "/sfx/ui/winxp/click.mp3",
                location.origin + "/sfx/ui/winxp/default.mp3",
                location.origin + "/sfx/ui/winxp/ding.mp3",
                location.origin + "/sfx/ui/winxp/exclamation.mp3",
                location.origin + "/sfx/ui/winxp/logoff.mp3",
                location.origin + "/sfx/ui/winxp/logon.mp3",
                location.origin + "/sfx/ui/winxp/notify.mp3",
                location.origin + "/sfx/ui/winxp/notify2.mp3",
                location.origin + "/sfx/ui/winxp/recycle.mp3",
                location.origin + "/sfx/ui/winxp/ringin.mp3",
                location.origin + "/sfx/ui/winxp/ringout.mp3",
                location.origin + "/sfx/ui/winxp/shutdown.mp3",
                location.origin + "/sfx/ui/winxp/startup.mp3",
                location.origin + "/sfx/ui/winxp/swoosh.mp3",
                location.origin + "/sfx/ui/winxp/swoosh2.mp3",
                location.origin + "/sfx/ui/winxp/tada.mp3",
                location.origin + "/sfx/ui/winxp/error/1.mp3",
                location.origin + "/sfx/ui/winxp/error/2.mp3",
                location.origin + "/sfx/ui/winxp/error/3.mp3",
            ]);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});