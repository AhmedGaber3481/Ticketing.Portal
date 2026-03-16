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
    path: 'error/:errorCode',
    renderMode: RenderMode.Prerender,
     getPrerenderParams: async () => [
      { errorCode: '500' },
      { errorCode: '401' },
      { errorCode: '404' },
      { errorCode: '400' }
    ]
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
