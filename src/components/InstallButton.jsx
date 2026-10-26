import React, { useEffect, useState } from 'react';

// Shows an "Install" button when the browser offers PWA installation, and an offline badge when there is no network.
export default function InstallButton() {
  const [evt, setEvt] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setEvt(e); };
    const onInstalled = () => setEvt(null);
    const up = () => setOnline(true), down = () => setOnline(false);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);

  const install = async () => { evt.prompt(); await evt.userChoice; setEvt(null); };

  return (
    <>
      {!online && <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">Offline mode</span>}
      {evt && (
        <button onClick={install} className="cursor-pointer rounded-lg bg-brand px-3 py-1 text-sm font-medium text-white hover:brightness-110">
          Install app
        </button>
      )}
    </>
  );
}
