import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ":Lang",
    renderMode: RenderMode.Client
    // getPrerenderParams: async () => [
    //   { Lang: 'en' },
    //   { Lang: 'ar' }
    // ]
  },
  {
    path: ':Lang/tickets',
    renderMode: RenderMode.Client
    // getPrerenderParams: async () => [
    //   { Lang: 'en' },
    //   { Lang: 'ar' }
    // ]
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
    // getPrerenderParams: async () => [
    //   { Lang: 'en' },
    //   { Lang: 'ar' }
    // ]
  },
  {
    path: ':Lang/ticket/:TicketId',
    renderMode: RenderMode.Client
    // getPrerenderParams: async () => [
    //   { Lang: 'en',TicketId:'' },
    //   { Lang: 'ar',TicketId: '' }
    // ]
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
