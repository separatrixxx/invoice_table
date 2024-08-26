import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    activeTab: string,
    setActiveTab: (e: string) => void,
}
