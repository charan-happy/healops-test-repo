'use client';

import { useEffect, useState } from 'react';

interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
}

interface Item {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Home() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [healthRes, itemsRes] = await Promise.all([
          fetch(`${API_URL}/health`),
          fetch(`${API_URL}/items`),
        ]);

        if (!healthRes.ok || !itemsRes.ok) {
          throw new Error('API request failed');
        }

        setHealth(await healthRes.json());
        setItems(await itemsRes.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        HealOps Test App
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem' }}>
        Validating self-healing CI/CD pipeline
      </p>

      {/* Health Status */}
      <section
        style={{
          background: '#1a1a1a',
          borderRadius: 8,
          padding: '1.5rem',
          marginBottom: '1.5rem',
          border: '1px solid #333',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Backend Health
        </h2>
        {loading && <p style={{ color: '#888' }}>Checking...</p>}
        {error && (
          <p style={{ color: '#ef4444' }}>Error: {error}</p>
        )}
        {health && (
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div>
              <span style={{ color: '#888' }}>Status: </span>
              <span
                style={{
                  color: health.status === 'ok' ? '#22c55e' : '#ef4444',
                  fontWeight: 'bold',
                }}
              >
                {health.status.toUpperCase()}
              </span>
            </div>
            <div>
              <span style={{ color: '#888' }}>Uptime: </span>
              <span>{Math.floor(health.uptime)}s</span>
            </div>
          </div>
        )}
      </section>

      {/* Items List */}
      <section
        style={{
          background: '#1a1a1a',
          borderRadius: 8,
          padding: '1.5rem',
          border: '1px solid #333',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
          Items ({items.length})
        </h2>
        {items.length === 0 && !loading && (
          <p style={{ color: '#888' }}>No items found</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: '#222',
                borderRadius: 6,
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <p style={{ color: '#888', fontSize: '0.875rem', marginTop: 4 }}>
                  {item.description}
                </p>
              </div>
              <span
                style={{
                  background: item.status === 'active' ? '#166534' : '#7f1d1d',
                  color: item.status === 'active' ? '#22c55e' : '#ef4444',
                  padding: '4px 12px',
                  borderRadius: 12,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
