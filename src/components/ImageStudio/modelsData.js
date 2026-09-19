/**
 * Image Studio Model Presets and Sample Generations
 * Ported & adapted from open-generative-ai
 */

export const IMAGE_MODELS = [
  {
    id: 'flux-schnell',
    name: 'Flux.1 Schnell ⚡',
    category: 'Ultra Fast',
    description: '1 to 4 step high quality diffusion transformer. State of the art prompt fidelity.',
    badge: 'Popular',
    speed: '0.8s',
  },
  {
    id: 'flux-dev',
    name: 'Flux.1 Dev 🎨',
    category: 'Flagship',
    description: '28-step open weights frontier model. Superior photorealism and typography.',
    badge: 'Frontier',
    speed: '3.2s',
  },
  {
    id: 'sdxl-base',
    name: 'SDXL Base 1.0',
    category: 'General',
    description: 'High resolution 1024x1024 baseline with deep community styling capability.',
    badge: 'Stable',
    speed: '2.1s',
  },
  {
    id: 'midjourney-v6',
    name: 'Midjourney v6 Style',
    category: 'Cinematic',
    description: 'Rich artistic aesthetics, painterly textures, and natural cinematic lighting.',
    badge: 'Aesthetic',
    speed: '2.5s',
  },
  {
    id: 'photoreal-v5',
    name: 'Realistic Vision v5.1',
    category: 'Photorealism',
    description: 'Photographic portraits, realistic skin texture, and studio lighting.',
    badge: 'Portrait',
    speed: '1.8s',
  },
  {
    id: 'anime-anything',
    name: 'Anything v5 (Anime)',
    category: 'Illustration',
    description: 'Sharp anime character designs, dynamic poses, and vibrant manga colors.',
    badge: 'Anime',
    speed: '1.5s',
  },
  {
    id: 'pixar-3d',
    name: 'Pixar 3D Animation',
    category: 'Stylized 3D',
    description: 'Charming 3D clay-render aesthetic with octane subsurface scattering.',
    badge: '3D',
    speed: '1.9s',
  },
  {
    id: 'cyberpunk-neo',
    name: 'Cyberpunk Neon 2077',
    category: 'Sci-Fi',
    description: 'Volumetric fog, neon drenched streets, and futuristic mechanical gear.',
    badge: 'Sci-Fi',
    speed: '2.0s',
  },
];

export const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1 Square', dimensions: '1024x1024' },
  { id: '9:16', label: '9:16 Vertical Short', dimensions: '720x1280' },
  { id: '16:9', label: '16:9 Landscape', dimensions: '1280x720' },
  { id: '4:5', label: '4:5 Social Feed', dimensions: '1024x1280' },
  { id: '3:2', label: '3:2 Classic Photo', dimensions: '1200x800' },
];

export const STYLE_PRESETS = [
  { id: 'none', name: 'Raw / No Filter', promptSuffix: '' },
  { id: 'cinematic', name: 'Cinematic 35mm', promptSuffix: ', 35mm film photograph, cinematic lighting, shallow depth of field, anamorphic bokeh, kodak portra 400' },
  { id: 'cyberpunk', name: 'Cyberpunk Glow', promptSuffix: ', cyberpunk neon aesthetic, volumetric lighting, reflections in wet pavement, chromatic aberration, 8k resolution' },
  { id: 'hyperreal', name: 'Hyperreal Studio', promptSuffix: ', hyper-realistic 8k portrait, studio softbox lighting, canon 5d mark iv, 85mm f/1.4 lens, ultra sharp texture' },
  { id: 'anime', name: 'Makoto Shinkai Anime', promptSuffix: ', makoto shinkai anime style, beautiful clouds, vibrant colors, lens flare, expressive eyes, masterwork' },
  { id: 'pixar', name: '3D Render', promptSuffix: ', modern 3d animation render, pixar character design, subsurface scattering, ambient occlusion, octane render' },
];

export const INITIAL_GALLERY = [
  {
    id: 'gallery-1',
    prompt: 'Futuristic robotic filmmaker holding an IMAX camera in a neon illuminated Tokyo alley at midnight',
    model: 'flux-schnell',
    aspectRatio: '9:16',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    createdAt: '2 mins ago',
  },
  {
    id: 'gallery-2',
    prompt: 'Cinematic portrait of an entrepreneur delivering a visionary keynote under holographic stage lights',
    model: 'midjourney-v6',
    aspectRatio: '16:9',
    url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    createdAt: '5 mins ago',
  },
  {
    id: 'gallery-3',
    prompt: 'Cosmic library floating in deep space with glowing planetary orbs and ancient holographic manuscripts',
    model: 'flux-dev',
    aspectRatio: '1:1',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    createdAt: '12 mins ago',
  },
  {
    id: 'gallery-4',
    prompt: 'Hyper-detailed cybernetic samurai in golden armor guarding a sacred digital temple in Kyoto',
    model: 'photoreal-v5',
    aspectRatio: '9:16',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    createdAt: '18 mins ago',
  },
];
