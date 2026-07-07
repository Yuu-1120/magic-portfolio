'use client';

import OrbisNft from '@/components/play/OrbisNft';

export default function OrbisNftPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, overflowY: 'auto' }}>
      <OrbisNft />
    </div>
  );
}
