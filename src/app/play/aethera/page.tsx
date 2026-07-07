'use client';

import Aethera from '@/components/play/Aethera';

export default function AetheraPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, overflowY: 'auto' }}>
      <Aethera />
    </div>
  );
}
