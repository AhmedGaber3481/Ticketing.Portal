import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ":Lang",
    renderMode: RenderMode.Client
  },
  {
    path: ':Lang/tickets',
    renderMode: RenderMode.Client
  },
  {
    path: ':Lang/login',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [
      { Lang: 'en' },
      { Lang: 'ar' }
    ]
  },
  {
    path: ':Lang/newticket',
    renderMode: RenderMode.Client
  },
  {
    path: ':Lang/ticket/:TicketId',
    renderMode: RenderMode.Client
  },
  {
    path: ':Lang/error/:errorCode',
    renderMode: RenderMode.Server
  },
  {
    path: ':Lang/users',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
