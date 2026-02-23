import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ":Lang",
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { Lang: 'en' },
      { Lang: 'ar' }
    ]
  },
  {
    path: ':Lang/tickets',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { Lang: 'en' },
      { Lang: 'ar' }
    ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
