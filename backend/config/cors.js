const parseOrigins = () => {
  const origins = new Set(['http://localhost:5173', 'http://localhost:4173']);

  if (process.env.CLIENT_URL) {
    process.env.CLIENT_URL.split(',').forEach((url) => {
      const trimmed = url.trim();
      if (trimmed) origins.add(trimmed);
    });
  }

  return origins;
};

const allowedOrigins = parseOrigins();

export const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.has(origin)) return callback(null, true);
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    return callback(null, false);
  },
  credentials: true,
};
