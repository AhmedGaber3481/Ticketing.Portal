export interface TicketModel{
    title: string;
    type: string;
    category: string;
    priority: string;
    status: string;
    description: string;
    createdAt: string;
    subCategory: string;
    files: any[];
    attachments: TicketAttachment[];
}
export interface TicketAttachment{
    attachmentId: number;
    attachmentName: string;
    attachmentUrl: string;
}